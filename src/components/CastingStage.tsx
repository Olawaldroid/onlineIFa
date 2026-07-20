"use client";

import { OpeleGlyph, OponIfaEmblem } from "@/components/IfaArtifactGlyphs";

// The visual casting stage for the real consultation flow — chain-swing /
// nut-striking animation, the carved ọpọn tray with ìyẹ̀rọ̀sùn sand marks,
// and the "show your working" log. Purely presentational: it reveals marks
// it's given, it never invents them. The real Odù signature is decided
// before any animation starts (src/lib/casting/cast.ts, run client-side so
// the whole flow works for guests with no database); this component only
// controls the pacing of the reveal.

export type Instrument = "opele" | "ikin";
export interface WorkingStep {
  n: string;
  text: string;
}
export interface IkinStage {
  round: number;
  phase: "beating" | "result";
  remainder?: number;
}

const NUT_SPOTS: [number, number][] = [
  [8, 30], [30, 12], [52, 34], [74, 10], [96, 30], [118, 14], [140, 36],
  [22, 58], [48, 62], [72, 54], [98, 60], [124, 58],
  [36, 88], [62, 92], [90, 86], [116, 90],
];

export function CastingStage({
  instrument,
  onPickInstrument,
  working,
  onToggleWorking,
  onCast,
  busy,
  animating,
  marks,
  landedMarks,
  workingSteps,
  shaking,
  chainLanded,
  ikinStage,
  seedsLeft,
}: {
  instrument: Instrument;
  onPickInstrument: (i: Instrument) => void;
  working: boolean;
  onToggleWorking: () => void;
  onCast: () => void;
  busy: boolean;
  animating: boolean;
  marks: number[];
  landedMarks: number[];
  workingSteps: WorkingStep[];
  shaking: boolean;
  chainLanded: boolean;
  ikinStage: IkinStage | null;
  seedsLeft: number;
}) {
  const isOpele = instrument === "opele";
  const beating = ikinStage?.phase === "beating";
  const resultStage = ikinStage?.phase === "result";

  return (
    <div className="grid gap-[26px] lg:grid-cols-[1fr_380px]">
      <div className="rounded-[18px] border border-ifa-border bg-ifa-surface p-[30px]">
        <div className="flex gap-3">
          <InstrumentButton active={isOpele} onClick={() => onPickInstrument("opele")} title="Ọ̀pẹ̀lẹ̀" sub="one throw" disabled={animating} />
          <InstrumentButton active={!isOpele} onClick={() => onPickInstrument("ikin")} title="Ìkín" sub="16 palm nuts, 8 rounds" disabled={animating} />
        </div>

        <div className="mt-[22px] flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ifa-cream/85">
            <button
              type="button"
              onClick={onToggleWorking}
              aria-pressed={working}
              disabled={animating}
              className={`relative h-6 w-[42px] cursor-pointer rounded-full border-none ${working ? "bg-ifa-gold" : "bg-ifa-border"}`}
            >
              <span className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-ifa-cream transition-[left] duration-200" style={{ left: working ? 21 : 3 }} />
            </button>
            <span>
              <strong className="text-ifa-gold">Show your working</strong>
            </span>
          </label>
          <button
            type="button"
            onClick={onCast}
            disabled={busy || animating}
            className="cursor-pointer rounded-full border-none bg-ifa-gold px-[26px] py-3 text-sm font-bold text-ifa-bg transition-colors hover:bg-ifa-cream disabled:cursor-default disabled:opacity-70"
            style={{ animation: animating ? "none" : "omPulse 3s infinite" }}
          >
            {animating ? "Casting…" : "Cast"}
          </button>
        </div>

        <div className="mt-[26px] flex min-h-[300px] items-center justify-center rounded-[14px] border border-ifa-border p-[26px]" style={{ background: "radial-gradient(560px 280px at 50% 30%, #2b2016, #1f1711)" }}>
          {isOpele ? (
            <div className="flex w-full items-center justify-center">
              {!chainLanded ? (
                <HangingChain shaking={shaking} />
              ) : (
                <div className="flex gap-[60px]">
                  <LandedStrand label="ÒSÌ · LEFT" marks={landedMarks} offset={4} side="left" />
                  <LandedStrand label="Ọ̀TÚN · RIGHT" marks={landedMarks} offset={0} side="right" />
                </div>
              )}
            </div>
          ) : (
            <div className="w-full text-center">
              <div className="relative mx-auto h-40 max-w-[430px]">
                <div
                  className="absolute left-1 top-[42px] h-[78px] w-[106px] shadow-[0_10px_20px_rgba(0,0,0,.4)]"
                  style={{ borderRadius: "46% 54% 58% 42%", backgroundImage: "repeating-linear-gradient(90deg, transparent 0 16px, rgba(0,0,0,.14) 16px 18px), linear-gradient(140deg,#8a5a33,#5d3a20)" }}
                />
                <div className="absolute left-[94px] top-[34px] h-[18px] w-9 rotate-[26deg] rounded-[10px] bg-[#7a4a26]" />
                <div className="absolute left-[126px] top-[18px] h-[124px] w-[170px]" style={{ animation: beating ? "omJitter .3s linear infinite" : "none" }}>
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
                          borderRadius: "46% 54% 42% 58% / 52% 47% 53% 48%",
                          backgroundImage:
                            "repeating-linear-gradient(88deg,transparent 0 3px,rgba(224,170,100,.38) 3px 4px),radial-gradient(circle at 35% 28%,#9a6a3a,#5d3a20)",
                          boxShadow: resultStage && kept ? "0 0 16px rgba(201,162,39,.9)" : "0 2px 4px rgba(0,0,0,.4)",
                          opacity: flung ? 0 : 1,
                          transform: flung
                            ? "translate(80px,-34px) scale(.2)"
                            : `rotate(${(i % 5) * 9 - 18}deg)`,
                        }}
                      />
                    );
                  })}
                </div>
                <div
                  className="absolute right-1 top-[34px] h-[78px] w-[106px] shadow-[0_10px_20px_rgba(0,0,0,.4)]"
                  style={{
                    borderRadius: "54% 46% 42% 58%",
                    backgroundImage: "repeating-linear-gradient(90deg, transparent 0 16px, rgba(0,0,0,.14) 16px 18px), linear-gradient(220deg,#8a5a33,#5d3a20)",
                    animation: beating ? "omSweep 0.9s ease-in-out infinite" : "none",
                  }}
                />
              </div>
              <div className="mt-3 min-h-[22px] text-sm text-ifa-cream/85">
                {ikinStage
                  ? ikinStage.phase === "beating"
                    ? `Round ${ikinStage.round + 1} of 8. Striking at the nuts…`
                    : `Round ${ikinStage.round + 1}: ${ikinStage.remainder} remain${ikinStage.remainder! > 1 ? "" : "s"}`
                  : animating
                    ? "Eight rounds complete."
                    : "Sixteen ìkín rest in the palm."}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3.5">
          <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px]">
            <OponIfaEmblem
              showSignature={false}
              className="absolute inset-0 h-full w-full drop-shadow-[0_26px_28px_rgba(0,0,0,.55)]"
            />
            <div
              className="lab-sand-bed absolute bottom-[13%] left-[16%] right-[14%] top-[22%] overflow-hidden shadow-[inset_0_7px_16px_rgba(92,64,34,.28),inset_0_-3px_9px_rgba(255,255,255,.8)]"
              style={{ borderRadius: "47% 53% 49% 51% / 43% 46% 54% 57%" }}
            >
              <div className="absolute inset-0 flex items-center justify-center gap-9 sm:gap-[52px]">
                <SandColumn marks={marks} offset={4} casting={animating} />
                <SandColumn marks={marks} offset={0} casting={animating} />
              </div>
            </div>
          </div>
          <div className="text-center font-mono text-[11px] tracking-[0.14em] text-ifa-sage">
            LEFT LEG&nbsp;&nbsp;·&nbsp;&nbsp;RIGHT LEG (READ FIRST)
          </div>
        </div>
      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-[18px] border border-ifa-border bg-ifa-surface p-6">
        <div className="mb-3.5 text-[11px] tracking-[0.26em] text-ifa-sage">SHOW YOUR WORKING</div>
        {workingSteps.length > 0 ? (
          <div className="flex flex-col gap-3">
            {workingSteps.map((st, i) => (
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
            Choose an instrument and cast. Each mark gets explained here as it lands.
          </p>
        )}
      </div>
    </div>
  );
}

function InstrumentButton({ active, onClick, title, sub, disabled }: { active: boolean; onClick: () => void; title: string; sub: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 cursor-pointer rounded-xl border p-4 text-[15px] font-semibold disabled:cursor-default ${
        active ? "border-ifa-gold/70 bg-ifa-gold/[0.14] text-ifa-gold" : "border-ifa-border bg-transparent text-ifa-cream/70"
      }`}
    >
      {title}
      <span className="mt-[3px] block text-xs font-normal opacity-75">{sub}</span>
    </button>
  );
}

function HangingChain({ shaking }: { shaking: boolean }) {
  return (
    <div className="opele-perspective flex min-h-[230px] flex-col items-center justify-start">
      <OpeleGlyph
        label={shaking ? "Ọ̀pẹ̀lẹ̀ cast opening from its midpoint and turning toward the mat" : "Ọ̀pẹ̀lẹ̀ held at its midpoint, with eight plates on one chain"}
        className={`opele-chain h-[190px] w-[260px] drop-shadow-[0_12px_12px_rgba(0,0,0,.45)] ${shaking ? "opele-chain-casting" : ""}`}
      />
      <div className="mt-4 text-[13.5px] text-ifa-cream/60">
        {shaking
          ? "The midpoint leads; the free ends unfurl outward and settle nearest the diviner…"
          : "The ọ̀pẹ̀lẹ̀ hangs ready — four pods on each side of the midpoint."}
      </div>
    </div>
  );
}

function LandedStrand({
  label,
  marks,
  offset,
  side,
}: {
  label: string;
  marks: number[];
  offset: number;
  side: "left" | "right";
}) {
  return (
    <div className={`opele-landed-strand opele-landed-${side} relative flex flex-col items-center gap-3`}>
      <div className="absolute left-1/2 top-[34px] bottom-[30px] w-[3px] -translate-x-1/2 rounded-sm" style={{ background: "linear-gradient(rgba(90,61,36,.9),rgba(90,61,36,.45))" }} />
      <div className="text-[10.5px] tracking-[0.2em] text-ifa-sage">{label}</div>
      {[0, 1, 2, 3].map((i) => {
        const m = marks[offset + i];
        const drawn = m !== undefined;
        return (
          <div
            key={i}
            className="relative z-[1] flex flex-col items-center gap-[5px] opacity-0"
            style={{
              animation: drawn ? "omOpeleLand .62s cubic-bezier(.2,.75,.3,1) both" : "none",
              animationDelay: drawn ? `${i * 90}ms` : undefined,
            }}
          >
            <div style={{ transform: `rotate(${side === "left" ? -3 + i * 2 : 3 - i * 1.5}deg)` }}>
              <div
                className={`relative flex h-[54px] w-[43px] items-center justify-center border-2 shadow-[0_4px_10px_rgba(0,0,0,.35)] ${drawn ? "border-ifa-gold/60" : "border-ifa-border"}`}
                style={{
                  borderRadius: "40% 33% 43% 36% / 22% 25% 20% 24%",
                  background: drawn
                    ? "linear-gradient(145deg, #855936, #4a2f1c 72%)"
                    : "linear-gradient(145deg, #6b4426, #3f2917)",
                }}
              >
                <span className="absolute top-[4px] h-[5px] w-[5px] rounded-full bg-ifa-bg/80" />
                <span className="absolute bottom-[4px] h-[5px] w-[5px] rounded-full bg-ifa-bg/80" />
                <span
                  className="h-7 w-[15px] rounded-[48%]"
                  style={{
                    background: !drawn
                      ? "transparent"
                      : m === 1
                        ? "linear-gradient(90deg,#3a2417,#b27d48 48%,#42291a)"
                        : "linear-gradient(90deg,#714526,#b9844c 45%,#5b371f)",
                    boxShadow: drawn && m === 1
                      ? "inset 4px 0 6px rgba(0,0,0,.55), inset -2px 0 3px rgba(238,213,171,.25)"
                      : "inset 2px 0 2px rgba(255,236,194,.22), 2px 0 3px rgba(0,0,0,.28)",
                  }}
                />
              </div>
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

function SandColumn({ marks, offset, casting }: { marks: number[]; offset: number; casting: boolean }) {
  const lastIndex = marks.length - 1;
  return (
    <div className="flex flex-col gap-2 sm:gap-3.5">
      {[0, 1, 2, 3].map((i) => {
        const globalIndex = offset + i;
        const m = marks[globalIndex];
        const showFinger = casting && globalIndex === lastIndex && m !== undefined;
        return (
          <div key={i} className="relative flex min-h-[28px] items-center justify-center gap-2 sm:min-h-[34px] sm:gap-[11px]">
            {m !== undefined ? <div className="lab-sand-mark" /> : null}
            {m === 2 ? <div className="lab-sand-mark" /> : null}
            {m === undefined ? <div className="h-2 w-2 rounded-full bg-[rgba(120,84,44,.28)]" /> : null}
            {showFinger ? (
              <div
                aria-hidden="true"
                className="lab-drawing-hand absolute left-1/2 z-[4] h-24 w-24"
                style={{
                  backgroundImage: `url(/assets/casting/hand-${m === 1 ? "single" : "double"}.png)`,
                  animation: "omFinger .9s cubic-bezier(.22,.61,.36,1) both",
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
