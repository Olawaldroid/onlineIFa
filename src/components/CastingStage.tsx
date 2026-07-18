"use client";

// The visual casting stage for the real consultation flow — chain-swing /
// nut-striking animation, the carved ọpọn tray with ìyẹ̀rọ̀sùn sand marks,
// and the "show your working" log. Purely presentational: it reveals marks
// it's given, it never invents them. The real Odù signature is decided by
// the server (POST /api/consultation/:id/cast) before any animation starts;
// ConsultationFlow only controls the pacing of the reveal.

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
          <InstrumentButton active={isOpele} onClick={() => onPickInstrument("opele")} title="Ọ̀pẹ̀lẹ̀" sub="divining chain — one throw" disabled={animating} />
          <InstrumentButton active={!isOpele} onClick={() => onPickInstrument("ikin")} title="Ìkín" sub="16 sacred palm nuts — 8 rounds" disabled={animating} />
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
              <strong className="text-ifa-gold">Show your working</strong> — replay every step and why each mark forms
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
                  <LandedStrand label="ÒSÌ · LEFT" marks={marks} offset={4} />
                  <LandedStrand label="Ọ̀TÚN · RIGHT" marks={marks} offset={0} />
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
                          borderRadius: "50% 50% 55% 45%",
                          background: "radial-gradient(circle at 35% 28%, #9a6a3a, #5d3a20)",
                          boxShadow: resultStage && kept ? "0 0 16px rgba(201,162,39,.9)" : "0 2px 4px rgba(0,0,0,.4)",
                          opacity: flung ? 0 : 1,
                          transform: flung ? "translate(80px,-34px) scale(.2)" : "none",
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
                    ? `Round ${ikinStage.round + 1} of 8 — striking at the nuts…`
                    : `Round ${ikinStage.round + 1}: ${ikinStage.remainder} remain${ikinStage.remainder! > 1 ? "" : "s"}`
                  : animating
                    ? "Eight rounds complete."
                    : "Sixteen ìkín rest in the palm."}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3.5">
          <div className="relative h-[280px] w-[280px] rounded-full shadow-[0_26px_60px_rgba(0,0,0,.55),inset_0_2px_6px_rgba(255,255,255,.08)] sm:h-[340px] sm:w-[340px]" style={{ background: "radial-gradient(circle at 40% 32%, #5a3d24, #3a2817 72%)" }}>
            <div className="lab-tray-rim absolute inset-1 rounded-full opacity-90" />
            <div className="absolute inset-[18px] rounded-full border-[3px] border-ifa-gold/[0.28]" />
            <div className="lab-tray-rays absolute inset-[26px] rounded-full" />
            <div
              className="absolute left-1/2 top-[5px] z-[2] flex h-[54px] w-11 -translate-x-1/2 flex-col items-center justify-center gap-[5px] border-2 border-[#2e2012] shadow-[0_4px_10px_rgba(0,0,0,.45)]"
              style={{ borderRadius: "50% 50% 42% 42%", background: "linear-gradient(#6b4426,#3f2917)" }}
            >
              <div className="flex gap-[9px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1f1711]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#1f1711]" />
              </div>
              <div className="h-[13px] w-[3px] rounded-sm bg-[#1f1711]" />
            </div>
            <div
              className="absolute inset-[42px] shadow-[inset_0_8px_20px_rgba(90,61,36,.45),inset_0_-3px_10px_rgba(255,255,255,.25)] sm:inset-[52px]"
              style={{ borderRadius: "48% 52% 51% 49%", background: "radial-gradient(circle at 44% 38%, #ecd9a8, #dcc389 58%, #c9ac70 88%, #b8985c)" }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundImage: "radial-gradient(rgba(120,84,44,.22) 1px, transparent 1.4px), radial-gradient(rgba(255,246,220,.55) 1px, transparent 1.3px)",
                  backgroundSize: "9px 9px, 13px 13px",
                  backgroundPosition: "0 0, 5px 7px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center gap-9 sm:gap-[52px]">
                <SandColumn marks={marks} offset={4} casting={animating} />
                <SandColumn marks={marks} offset={0} casting={animating} />
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
            Choose an instrument and cast. Each mark will be explained here, step by step — how it
            was drawn, and why it lands where it does.
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
    <div className="flex flex-col items-center">
      <div className="h-[22px] w-14 shadow-[0_4px_10px_rgba(0,0,0,.4)]" style={{ borderRadius: "12px 12px 18px 18px", background: "linear-gradient(#8a5a33,#5d3a20)" }} />
      <div className="flex origin-top gap-[38px] pt-1" style={{ animation: shaking ? "omSwing .5s ease-in-out infinite" : "omSwing 3.8s ease-in-out infinite" }}>
        {[5, -5].map((rot) => (
          <div key={rot} className="flex origin-top flex-col items-center gap-1" style={{ transform: `rotate(${rot}deg)` }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="contents">
                <div className="h-[13px] w-1 rounded-sm bg-ifa-gold/45" />
                <div className="h-10 w-[30px] shadow-[0_3px_6px_rgba(0,0,0,.35)]" style={{ borderRadius: "50% 50% 46% 46%", background: "radial-gradient(circle at 36% 28%, #7a4a26, #462c1a)" }} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 text-[13.5px] text-ifa-cream/60">
        {shaking ? "The chain is swung…" : "The ọ̀pẹ̀lẹ̀ hangs ready — two strands of four pods, held at the middle."}
      </div>
    </div>
  );
}

function LandedStrand({ label, marks, offset }: { label: string; marks: number[]; offset: number }) {
  return (
    <div className="relative flex flex-col items-center gap-3">
      <div className="absolute left-1/2 top-[34px] bottom-[30px] w-[3px] -translate-x-1/2 rounded-sm" style={{ background: "linear-gradient(rgba(90,61,36,.9),rgba(90,61,36,.45))" }} />
      <div className="text-[10.5px] tracking-[0.2em] text-ifa-sage">{label}</div>
      {[0, 1, 2, 3].map((i) => {
        const m = marks[offset + i];
        const drawn = m !== undefined;
        return (
          <div key={i} className="relative z-[1] flex flex-col items-center gap-[5px] opacity-0" style={{ animation: drawn ? "omFlipIn .55s ease both" : "none" }}>
            <div
              className={`flex h-[58px] w-[46px] items-center justify-center border-2 shadow-[0_4px_10px_rgba(0,0,0,.35)] ${drawn ? "border-ifa-gold/60" : "border-ifa-border"}`}
              style={{ borderRadius: "50% 50% 46% 46%", background: drawn ? "radial-gradient(circle at 38% 30%, #7a4a26, #4a2f1c)" : "radial-gradient(circle at 38% 30%, #6b4426, #3f2917)" }}
            >
              <div
                className="h-7 w-5 rounded-full"
                style={{ background: !drawn ? "transparent" : m === 1 ? "radial-gradient(circle at 50% 42%, #e8d5ab, #8a5a33)" : "radial-gradient(circle at 32% 24%, #8a5a33, #3f2917)" }}
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
                className="absolute left-1/2 -top-1 z-[3] h-[26px] w-6 shadow-[0_3px_8px_rgba(0,0,0,.4)]"
                style={{ borderRadius: "50% 50% 46% 54%", background: "radial-gradient(circle at 35% 30%, #a06b3c, #6b4426)", animation: "omFinger .7s ease both" }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
