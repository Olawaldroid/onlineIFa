"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LabOdu, ODU_BY_SIG, relatedTextOf, summaryOf, themesOf } from "../corpus";
import { SectionHeading } from "./SectionHeading";
import { useLabProgress } from "./progress";

// Section 02 — transparent, educational casting simulation.
// Ọ̀pẹ̀lẹ̀: one animated throw writes all eight marks. Ìkín: eight animated
// rounds, one mark each. Every random draw is narrated in the working log.

type Instrument = "opele" | "ikin";
type Phase = "idle" | "casting" | "done";

interface Step {
  n: string;
  text: string;
}

interface IkinStage {
  round: number;
  phase: "beating" | "result";
  remainder?: number;
}

/** Scatter positions for the 16 ìkín inside the 170×124 cluster box. */
const NUT_SPOTS: [number, number][] = [
  [8, 30], [30, 12], [52, 34], [74, 10], [96, 30], [118, 14], [140, 36],
  [22, 58], [48, 62], [72, 54], [98, 60], [124, 58],
  [36, 88], [62, 92], [90, 86], [116, 90],
];

const posName = (i: number) => `${i < 4 ? "right" : "left"} leg, position ${(i % 4) + 1}`;

export function Simulator() {
  const { markFlag } = useLabProgress();
  const [instrument, setInstrument] = useState<Instrument>("opele");
  const [working, setWorking] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [marks, setMarks] = useState<number[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<LabOdu | null>(null);
  const [shaking, setShaking] = useState(false);
  const [chainLanded, setChainLanded] = useState(false);
  const [ikinStage, setIkinStage] = useState<IkinStage | null>(null);
  const [seedsLeft, setSeedsLeft] = useState(16);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const resetDraw = useCallback(() => {
    setPhase("idle");
    setMarks([]);
    setSteps([]);
    setResult(null);
    setShaking(false);
    setChainLanded(false);
    setIkinStage(null);
    setSeedsLeft(16);
  }, []);

  const pickInstrument = (inst: Instrument) => {
    clearTimers();
    setInstrument(inst);
    resetDraw();
  };

  const finish = useCallback((all: number[]) => {
    const sig = all.slice(0, 4).join("") + "|" + all.slice(4).join("");
    const odu = ODU_BY_SIG[sig];
    setPhase("done");
    setMarks(all);
    setResult(odu);
    setIkinStage(null);
    setSteps((st) => [
      ...st,
      {
        n: "★",
        text: `The figure is complete: ${sig}. Read right leg first → this is ${odu.name}${odu.isPrimary ? ", one of the 16 principal Odù (Méjì)" : ", a combined Odù (àmúlù)"} — figure ${odu.rank} of 256.`,
      },
    ]);
  }, []);

  const castOpele = useCallback(() => {
    setShaking(true);
    setChainLanded(false);
    setSteps([
      {
        n: "·",
        text: "The ọ̀pẹ̀lẹ̀ — a chain of eight half-pods in two strands of four — is held at the middle and swung. One throw yields a complete figure.",
      },
    ]);
    after(1700, () => {
      setShaking(false);
      setChainLanded(true);
      const drawn = Array.from({ length: 8 }, () => (Math.random() < 0.5 ? 1 : 2));
      if (working) {
        drawn.forEach((m, i) => {
          after((i + 1) * 850, () => {
            setMarks((ms) => [...ms, m]);
            setSteps((st) => [
              ...st,
              {
                n: String(i + 1),
                text: `Pod ${i + 1} (${posName(i)}) lands ${m === 1 ? "concave face up → a SINGLE mark ǀ" : "convex face up → a DOUBLE mark ǁ"}. (Which face maps to which mark varies by lineage — this is our stated convention.)`,
              },
            ]);
          });
        });
        after(8 * 850 + 400, () => finish(drawn));
      } else {
        setMarks(drawn);
        setSteps((st) => [
          ...st,
          { n: "✓", text: "All eight pods read at once, right leg first, top to bottom." },
        ]);
        after(500, () => finish(drawn));
      }
    });
  }, [after, finish, working]);

  const castIkin = useCallback(() => {
    setSteps([
      {
        n: "·",
        text: "Sixteen ìkín (sacred palm nuts) are held. In each of 8 rounds the diviner strikes at the nuts with one hand; the remainder left behind — one or two — writes one mark.",
      },
    ]);
    const drawn: number[] = [];
    const round = (i: number) => {
      if (i === 8) {
        after(500, () => finish(drawn));
        return;
      }
      setIkinStage({ round: i, phase: "beating" });
      setSeedsLeft(16);
      after(900, () => {
        const remainder = Math.random() < 0.5 ? 1 : 2;
        const m = remainder === 1 ? 2 : 1;
        drawn.push(m);
        setIkinStage({ round: i, phase: "result", remainder });
        setSeedsLeft(remainder);
        setMarks((ms) => [...ms, m]);
        if (working) {
          setSteps((st) => [
            ...st,
            {
              n: String(i + 1),
              text: `Round ${i + 1}: ${remainder} nut${remainder > 1 ? "s" : ""} remain${remainder > 1 ? "" : "s"} → ${m === 1 ? "a SINGLE mark ǀ" : "a DOUBLE mark ǁ"} traced in the ìyẹ̀rọ̀sùn powder (${posName(i)}). One left → two marks; two left → one mark, in many lineages.`,
            },
          ]);
        }
        after(750, () => round(i + 1));
      });
    };
    round(0);
  }, [after, finish, working]);

  const startCast = () => {
    if (phase === "casting") return;
    clearTimers();
    resetDraw();
    setPhase("casting");
    markFlag("cast");
    if (instrument === "opele") castOpele();
    else castIkin();
  };

  const isOpele = instrument === "opele";
  const beating = ikinStage?.phase === "beating";
  const resultStage = ikinStage?.phase === "result";

  return (
    <section id="consult" className="bg-ifa-bg px-10 pb-[120px] pt-[110px]">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading num="02" title="Consultation Simulator" />
        <p className="mb-0 mt-[18px] max-w-[640px] text-base leading-[1.65] text-ifa-cream/70">
          A transparent, educational simulation of how a figure of Ifá is generated — not a real
          divination, and no claim of spiritual authority. Real consultation is the work of a
          trained babaláwo or ìyánífá.
        </p>
        <div className="mt-[18px] inline-flex items-center gap-2.5 rounded-[10px] border border-ifa-rust/40 bg-ifa-rust/[0.16] px-4 py-[9px] text-[13px] text-ifa-cream">
          ⚠ This is a simulation for learning. Every draw is random and clearly labelled as such.
        </div>

        <div className="mt-11 grid grid-cols-[1fr_380px] items-start gap-[26px]">
          {/* Left: instrument + animation stage */}
          <div className="rounded-[18px] border border-ifa-border bg-ifa-surface p-[30px]">
            <div className="flex gap-3">
              <InstrumentButton
                active={isOpele}
                onClick={() => pickInstrument("opele")}
                title="Ọ̀pẹ̀lẹ̀"
                sub="divining chain — one throw"
              />
              <InstrumentButton
                active={!isOpele}
                onClick={() => pickInstrument("ikin")}
                title="Ìkín"
                sub="16 sacred palm nuts — 8 rounds"
              />
            </div>

            <div className="mt-[22px] flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ifa-cream/85">
                <button
                  onClick={() => setWorking((w) => !w)}
                  aria-pressed={working}
                  className={`relative h-6 w-[42px] cursor-pointer rounded-full border-none ${working ? "bg-ifa-gold" : "bg-ifa-border"}`}
                >
                  <span
                    className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-ifa-cream transition-[left] duration-200"
                    style={{ left: working ? 21 : 3 }}
                  />
                </button>
                <span>
                  <strong className="text-ifa-gold">Show your working</strong> — replay every step
                  and why each mark forms
                </span>
              </label>
              <button
                onClick={startCast}
                className="cursor-pointer rounded-full border-none bg-ifa-gold px-[26px] py-3 text-sm font-bold text-ifa-bg transition-colors hover:bg-ifa-cream"
                style={{ animation: "omPulse 3s infinite" }}
              >
                {phase === "casting" ? "Casting…" : phase === "done" ? "Cast again" : "Cast"}
              </button>
            </div>

            {/* Stage */}
            <div
              className="mt-[26px] flex min-h-[300px] items-center justify-center rounded-[14px] border border-ifa-border p-[26px]"
              style={{ background: "radial-gradient(560px 280px at 50% 30%, #2b2016, #1f1711)" }}
            >
              {isOpele ? (
                <div className="flex w-full items-center justify-center">
                  {!chainLanded ? (
                    <HangingChain shaking={shaking} />
                  ) : (
                    <div className="flex gap-[60px]">
                      <LandedStrand label="ÒSÌ · LEFT" marks={marks} offset={4} />
                      <LandedStrand label="Ọ̀TÚN · RIGHT" marks={marks} offset={0} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full text-center">
                  <div className="relative mx-auto h-40 max-w-[430px]">
                    {/* Left palm */}
                    <div
                      className="absolute left-1 top-[42px] h-[78px] w-[106px] shadow-[0_10px_20px_rgba(0,0,0,.4)]"
                      style={{
                        borderRadius: "46% 54% 58% 42%",
                        backgroundImage:
                          "repeating-linear-gradient(90deg, transparent 0 16px, rgba(0,0,0,.14) 16px 18px), linear-gradient(140deg,#8a5a33,#5d3a20)",
                      }}
                    />
                    <div
                      className="absolute left-[94px] top-[34px] h-[18px] w-9 rotate-[26deg] rounded-[10px] bg-[#7a4a26]"
                    />
                    {/* Nut cluster */}
                    <div
                      className="absolute left-[126px] top-[18px] h-[124px] w-[170px]"
                      style={{ animation: beating ? "omJitter .3s linear infinite" : "none" }}
                    >
                      {NUT_SPOTS.map(([x, y], i) => {
                        const kept = i < seedsLeft;
                        const flung = resultStage && !kept;
                        return (
                          <div
                            key={i}
                            className="absolute h-[22px] w-[19px] border border-black/35 transition-all duration-[450ms] ease-out"
                            style={{
                              left: x,
                              top: y,
                              borderRadius: "50% 50% 55% 45%",
                              background: "radial-gradient(circle at 35% 28%, #9a6a3a, #5d3a20)",
                              boxShadow:
                                resultStage && kept
                                  ? "0 0 16px rgba(201,162,39,.9)"
                                  : "0 2px 4px rgba(0,0,0,.4)",
                              opacity: flung ? 0 : 1,
                              transform: flung ? "translate(80px,-34px) scale(.2)" : "none",
                            }}
                          />
                        );
                      })}
                    </div>
                    {/* Right palm (sweeps to strike) */}
                    <div
                      className="absolute right-1 top-[34px] h-[78px] w-[106px] shadow-[0_10px_20px_rgba(0,0,0,.4)]"
                      style={{
                        borderRadius: "54% 46% 42% 58%",
                        backgroundImage:
                          "repeating-linear-gradient(90deg, transparent 0 16px, rgba(0,0,0,.14) 16px 18px), linear-gradient(220deg,#8a5a33,#5d3a20)",
                        animation: beating ? "omSweep 0.9s ease-in-out infinite" : "none",
                      }}
                    />
                  </div>
                  <div className="mt-3 min-h-[22px] text-sm text-ifa-cream/85">
                    {ikinStage
                      ? ikinStage.phase === "beating"
                        ? `Round ${ikinStage.round + 1} of 8 — striking at the nuts…`
                        : `Round ${ikinStage.round + 1}: ${ikinStage.remainder} remain${ikinStage.remainder! > 1 ? "" : "s"}`
                      : phase === "done"
                        ? "Eight rounds complete."
                        : "Sixteen ìkín rest in the palm."}
                  </div>
                </div>
              )}
            </div>

            {/* Tray: carved ọpọn, ìyẹ̀rọ̀sùn sand, finger-pressed marks */}
            <div className="mt-6 flex flex-col items-center gap-3.5">
              <div
                className="relative h-[340px] w-[340px] rounded-full shadow-[0_26px_60px_rgba(0,0,0,.55),inset_0_2px_6px_rgba(255,255,255,.08)]"
                style={{ background: "radial-gradient(circle at 40% 32%, #5a3d24, #3a2817 72%)" }}
              >
                <div className="lab-tray-rim absolute inset-1 rounded-full opacity-90" />
                <div className="absolute inset-[18px] rounded-full border-[3px] border-ifa-gold/[0.28]" />
                <div className="lab-tray-rays absolute inset-[26px] rounded-full" />
                {/* Èṣù medallion at the head of the tray */}
                <div
                  className="absolute left-1/2 top-[5px] z-[2] flex h-[54px] w-11 -translate-x-1/2 flex-col items-center justify-center gap-[5px] border-2 border-[#2e2012] shadow-[0_4px_10px_rgba(0,0,0,.45)]"
                  style={{
                    borderRadius: "50% 50% 42% 42%",
                    background: "linear-gradient(#6b4426,#3f2917)",
                  }}
                >
                  <div className="flex gap-[9px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1f1711]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1f1711]" />
                  </div>
                  <div className="h-[13px] w-[3px] rounded-sm bg-[#1f1711]" />
                </div>
                {/* ìyẹ̀rọ̀sùn sand bed */}
                <div
                  className="absolute inset-[52px] shadow-[inset_0_8px_20px_rgba(90,61,36,.45),inset_0_-3px_10px_rgba(255,255,255,.25)]"
                  style={{
                    borderRadius: "48% 52% 51% 49%",
                    background:
                      "radial-gradient(circle at 44% 38%, #ecd9a8, #dcc389 58%, #c9ac70 88%, #b8985c)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(120,84,44,.22) 1px, transparent 1.4px), radial-gradient(rgba(255,246,220,.55) 1px, transparent 1.3px)",
                      backgroundSize: "9px 9px, 13px 13px",
                      backgroundPosition: "0 0, 5px 7px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-[52px]">
                    <SandColumn marks={marks} offset={4} casting={phase === "casting"} />
                    <SandColumn marks={marks} offset={0} casting={phase === "casting"} />
                  </div>
                </div>
              </div>
              <div className="text-center font-mono text-[11px] tracking-[0.14em] text-ifa-sage">
                MARKS PRESSED THROUGH THE ÌYẸ̀RỌ̀SÙN WITH THE FINGERTIPS
                <br />
                LEFT LEG&nbsp;&nbsp;·&nbsp;&nbsp;RIGHT LEG (READ FIRST)
              </div>
            </div>
          </div>

          {/* Right: working log / result */}
          <div className="flex flex-col gap-[18px]">
            <div className="max-h-[360px] overflow-y-auto rounded-[18px] border border-ifa-border bg-ifa-surface p-6">
              <div className="mb-3.5 text-[11px] tracking-[0.26em] text-ifa-sage">
                SHOW YOUR WORKING
              </div>
              {steps.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {steps.map((st, i) => (
                    <div key={i} className="flex gap-3 text-[13px] leading-[1.55] text-ifa-cream/85">
                      <div className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full border border-ifa-gold/45 bg-ifa-gold/[0.16] font-mono text-[11px] text-ifa-gold">
                        {st.n}
                      </div>
                      <div>{st.text}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="m-0 text-[13.5px] leading-relaxed text-ifa-cream/50">
                  Choose an instrument and cast. Each mark will be explained here, step by step —
                  how it was drawn, and why it lands where it does.
                </p>
              )}
            </div>

            {result ? (
              <div
                className="rounded-[18px] border border-ifa-gold/50 p-[26px]"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(201,162,39,.14), rgba(201,162,39,.04)), #241b14",
                  animation: "omFadeUp .6s ease both",
                }}
              >
                <div className="mb-2 text-[11px] tracking-[0.26em] text-ifa-gold">
                  {result.isPrimary ? "PRINCIPAL ODÙ · MÉJÌ" : "COMBINED ODÙ · ÀMÚLÙ"}
                </div>
                <h3 className="m-0 font-serif text-[32px] font-medium text-ifa-cream">{result.name}</h3>
                <div className="mt-3 flex gap-4 font-mono text-[13px] text-ifa-cream/80">
                  <span>sig {result.signature}</span>
                  <span>bin {result.signature.replace(/2/g, "0").replace("|", " ")}</span>
                  <span>rank {result.rank} / 256</span>
                </div>
                <p className="mb-0 mt-4 text-sm leading-[1.65] text-ifa-cream/85">{summaryOf(result)}</p>
                <div className="mt-3.5 text-[12.5px] text-ifa-sage">Themes — {themesOf(result)}</div>
                <div className="mt-3.5 text-[12.5px] leading-relaxed text-ifa-cream/60">
                  {relatedTextOf(result)}
                </div>
                <p className="mb-0 mt-4 border-t border-ifa-border pt-3.5 text-[11.5px] leading-[1.55] text-ifa-cream/50">
                  Educational summary of commonly-taught themes. Not a divination; not a substitute
                  for a trained babaláwo.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function InstrumentButton({
  active,
  onClick,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 cursor-pointer rounded-xl border p-4 text-[15px] font-semibold ${
        active
          ? "border-ifa-gold/70 bg-ifa-gold/[0.14] text-ifa-gold"
          : "border-ifa-border bg-transparent text-ifa-cream/70"
      }`}
    >
      {title}
      <span className="mt-[3px] block text-xs font-normal opacity-75">{sub}</span>
    </button>
  );
}

function HangingChain({ shaking }: { shaking: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="h-[22px] w-14 shadow-[0_4px_10px_rgba(0,0,0,.4)]"
        style={{
          borderRadius: "12px 12px 18px 18px",
          background: "linear-gradient(#8a5a33,#5d3a20)",
        }}
      />
      <div
        className="flex origin-top gap-[38px] pt-1"
        style={{
          animation: shaking ? "omSwing .5s ease-in-out infinite" : "omSwing 3.8s ease-in-out infinite",
        }}
      >
        {[5, -5].map((rot) => (
          <div
            key={rot}
            className="flex origin-top flex-col items-center gap-1"
            style={{ transform: `rotate(${rot}deg)` }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="contents">
                <div className="h-[13px] w-1 rounded-sm bg-ifa-gold/45" />
                <div
                  className="h-10 w-[30px] shadow-[0_3px_6px_rgba(0,0,0,.35)]"
                  style={{
                    borderRadius: "50% 50% 46% 46%",
                    background: "radial-gradient(circle at 36% 28%, #7a4a26, #462c1a)",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 text-[13.5px] text-ifa-cream/60">
        {shaking
          ? "The chain is swung…"
          : "The ọ̀pẹ̀lẹ̀ hangs ready — two strands of four pods, held at the middle."}
      </div>
    </div>
  );
}

function LandedStrand({ label, marks, offset }: { label: string; marks: number[]; offset: number }) {
  return (
    <div className="relative flex flex-col items-center gap-3">
      {/* strand cord */}
      <div
        className="absolute left-1/2 top-[34px] bottom-[30px] w-[3px] -translate-x-1/2 rounded-sm"
        style={{ background: "linear-gradient(rgba(90,61,36,.9),rgba(90,61,36,.45))" }}
      />
      <div className="text-[10.5px] tracking-[0.2em] text-ifa-sage">{label}</div>
      {[0, 1, 2, 3].map((i) => {
        const m = marks[offset + i];
        const drawn = m !== undefined;
        return (
          <div
            key={i}
            className="relative z-[1] flex flex-col items-center gap-[5px] opacity-0"
            style={{ animation: drawn ? "omFlipIn .55s ease both" : "none" }}
          >
            <div
              className={`flex h-[58px] w-[46px] items-center justify-center border-2 shadow-[0_4px_10px_rgba(0,0,0,.35)] ${drawn ? "border-ifa-gold/60" : "border-ifa-border"}`}
              style={{
                borderRadius: "50% 50% 46% 46%",
                background: drawn
                  ? "radial-gradient(circle at 38% 30%, #7a4a26, #4a2f1c)"
                  : "radial-gradient(circle at 38% 30%, #6b4426, #3f2917)",
              }}
            >
              <div
                className="h-7 w-5 rounded-full"
                style={{
                  background: !drawn
                    ? "transparent"
                    : m === 1
                      ? "radial-gradient(circle at 50% 42%, #e8d5ab, #8a5a33)"
                      : "radial-gradient(circle at 32% 24%, #8a5a33, #3f2917)",
                }}
              />
            </div>
            <div className={`font-mono text-[10.5px] ${drawn ? "text-ifa-gold" : "text-ifa-sage"}`}>
              {drawn ? (m === 1 ? "ǀ · concave" : "ǁ · convex") : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** One leg of marks pressed in the sand, top to bottom. */
function SandColumn({ marks, offset, casting }: { marks: number[]; offset: number; casting: boolean }) {
  const lastIndex = marks.length - 1;
  return (
    <div className="flex flex-col gap-3.5">
      {[0, 1, 2, 3].map((i) => {
        const globalIndex = offset + i;
        const m = marks[globalIndex];
        const showFinger = casting && globalIndex === lastIndex && m !== undefined;
        return (
          <div key={i} className="relative flex min-h-[34px] items-center justify-center gap-[11px]">
            {m !== undefined ? <div className="lab-sand-mark" /> : null}
            {m === 2 ? <div className="lab-sand-mark" /> : null}
            {m === undefined ? <div className="h-2 w-2 rounded-full bg-[rgba(120,84,44,.28)]" /> : null}
            {showFinger ? (
              <div
                className="absolute left-1/2 -top-1 z-[3] h-[26px] w-6 shadow-[0_3px_8px_rgba(0,0,0,.4)]"
                style={{
                  borderRadius: "50% 50% 46% 54%",
                  background: "radial-gradient(circle at 35% 30%, #a06b3c, #6b4426)",
                  animation: "omFinger .7s ease both",
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
