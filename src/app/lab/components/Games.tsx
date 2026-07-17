"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PrimaryOduFact } from "@/lib/odu/primary";
import { ODU_BY_SLUG, PRIMARY_ODU, glyphOf, legGlyphOfNumber } from "../corpus";
import { SectionHeading } from "./SectionHeading";
import { useLabProgress } from "./progress";

// Section 09 — two quick-fire recognition games plus the badge row.

function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((x) => [Math.random(), x] as const)
    .sort((a, b) => a[0] - b[0])
    .map((p) => p[1]);
}

interface G1Round {
  answer: PrimaryOduFact;
  options: PrimaryOduFact[];
}

interface G2Round {
  num: number;
  options: { v: number; glyph: string }[];
}

function newG1(): G1Round {
  const answer = PRIMARY_ODU[Math.floor(Math.random() * 16)];
  const others = shuffle(PRIMARY_ODU.filter((o) => o !== answer)).slice(0, 3);
  return { answer, options: shuffle([answer, ...others]) };
}

function newG2(): G2Round {
  const num = Math.floor(Math.random() * 16);
  const others = shuffle(Array.from({ length: 16 }, (_, i) => i).filter((i) => i !== num)).slice(0, 3);
  return { num, options: shuffle([num, ...others]).map((v) => ({ v, glyph: legGlyphOfNumber(v) })) };
}

export function Games() {
  const { flags, bestStreak, reportStreak } = useLabProgress();

  // Rounds are random, so they're generated on the client after mount to keep
  // server and client HTML identical.
  const [g1, setG1] = useState<G1Round | null>(null);
  const [g2, setG2] = useState<G2Round | null>(null);
  const [g1Streak, setG1Streak] = useState(0);
  const [g1Best, setG1Best] = useState(0);
  const [g1Fb, setG1Fb] = useState("");
  const [g2Streak, setG2Streak] = useState(0);
  const [g2Best, setG2Best] = useState(0);
  const [g2Fb, setG2Fb] = useState("");

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);
  useEffect(() => {
    setG1(newG1());
    setG2(newG2());
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const g1Pick = (o: PrimaryOduFact) => {
    if (!g1) return;
    const ok = o === g1.answer;
    const streak = ok ? g1Streak + 1 : 0;
    const best = Math.max(g1Best, streak);
    setG1Fb(ok ? `Correct — ${o.name}, rank ${o.rank}.` : `Not quite — that was ${g1.answer.name}.`);
    setG1Streak(streak);
    setG1Best(best);
    reportStreak(best);
    after(1200, () => setG1(newG1()));
    after(2400, () => setG1Fb(""));
  };

  const g2Pick = (v: number) => {
    if (!g2) return;
    const ok = v === g2.num;
    const streak = ok ? g2Streak + 1 : 0;
    const best = Math.max(g2Best, streak);
    setG2Fb(ok ? "Correct." : `Not quite — ${g2.num} is ${g2.num.toString(2).padStart(4, "0")}.`);
    setG2Streak(streak);
    setG2Best(best);
    reportStreak(best);
    after(1200, () => setG2(newG2()));
    after(2400, () => setG2Fb(""));
  };

  const badges = [
    { name: "First cast", got: flags.cast },
    { name: "Opened an Odù", got: flags.odu },
    { name: "Explored the graph", got: flags.graph },
    { name: "Streak of 3 — Learner", got: bestStreak >= 3 },
    { name: "Streak of 6 — Reader", got: bestStreak >= 6 },
    { name: "Streak of 10 — Keeper of marks", got: bestStreak >= 10 },
  ];

  return (
    <section id="games" className="bg-ifa-bg px-10 pb-[120px] pt-[110px]">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading num="09" title="Interactive learning" />
        <div className="mt-11 grid grid-cols-2 gap-6">
          {/* Game 1 — read the marks */}
          <div className="rounded-[18px] border border-ifa-border bg-ifa-surface p-[30px]">
            <div className="flex items-baseline justify-between">
              <h3 className="m-0 font-serif text-2xl font-medium text-ifa-cream">Read the marks</h3>
              <div className="font-mono text-xs text-ifa-sage">
                streak {g1Streak} · best {g1Best}
              </div>
            </div>
            <p className="mb-0 mt-2 text-[13.5px] text-ifa-cream/65">Which principal Odù is this?</p>
            <div className="mx-auto my-[22px] w-max whitespace-pre rounded-xl bg-ifa-cream/5 px-[30px] py-[18px] text-center font-mono text-[22px] leading-[1.9] text-ifa-gold">
              {g1 ? glyphOf(ODU_BY_SLUG[g1.answer.slug]) : "\n\n\n"}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {(g1?.options ?? []).map((op) => (
                <button
                  key={op.slug}
                  onClick={() => g1Pick(op)}
                  className="cursor-pointer rounded-[10px] border border-ifa-border bg-transparent p-3 text-sm text-ifa-cream hover:border-ifa-gold"
                >
                  {op.name}
                </button>
              ))}
            </div>
            <div
              className={`mt-3.5 min-h-6 text-[13.5px] ${g1Fb.startsWith("Correct") ? "text-ifa-sage" : "text-ifa-rust"}`}
            >
              {g1Fb}
            </div>
          </div>

          {/* Game 2 — binary match */}
          <div className="rounded-[18px] border border-ifa-border bg-ifa-surface p-[30px]">
            <div className="flex items-baseline justify-between">
              <h3 className="m-0 font-serif text-2xl font-medium text-ifa-cream">Binary match</h3>
              <div className="font-mono text-xs text-ifa-sage">
                streak {g2Streak} · best {g2Best}
              </div>
            </div>
            <p className="mb-0 mt-2 text-[13.5px] text-ifa-cream/65">
              Which leg pattern writes this 4-bit number? (1 = ǀ, 0 = ǁ)
            </p>
            <div className="mx-auto my-[22px] w-max text-center">
              <div className="font-mono text-[42px] font-semibold text-ifa-gold">{g2?.num ?? 0}</div>
              <div className="mt-1 font-mono text-sm text-ifa-cream/55">
                {(g2?.num ?? 0).toString(2).padStart(4, "0")} in binary
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {(g2?.options ?? []).map((op) => (
                <button
                  key={op.v}
                  onClick={() => g2Pick(op.v)}
                  className="cursor-pointer whitespace-pre rounded-[10px] border border-ifa-border bg-transparent px-2 py-3.5 font-mono text-base leading-[1.8] text-ifa-gold hover:border-ifa-gold"
                >
                  {op.glyph}
                </button>
              ))}
            </div>
            <div
              className={`mt-3.5 min-h-6 text-[13.5px] ${g2Fb.startsWith("Correct") ? "text-ifa-sage" : "text-ifa-rust"}`}
            >
              {g2Fb}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-[26px] flex flex-wrap gap-3.5">
          {badges.map((bd) => (
            <div
              key={bd.name}
              className={`flex items-center gap-2.5 rounded-full border px-[18px] py-2.5 text-[13px] ${
                bd.got
                  ? "border-ifa-gold/60 bg-ifa-gold/[0.12] text-ifa-cream"
                  : "border-ifa-border bg-transparent text-ifa-cream/40"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${bd.got ? "bg-ifa-gold" : "bg-ifa-border"}`} />
              {bd.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
