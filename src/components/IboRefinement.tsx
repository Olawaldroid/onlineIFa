"use client";

import { useState } from "react";

// The ibò stage — the traditional yes/no refinement after an Odù has fallen.
// A pair of cowries answers "yes" (ire, blessing); a piece of bone answers
// "no" (ibi, obstacle). The client holds the instruments, the diviner does
// not know which hand holds which, and the revealed hand answers the
// question. Mechanics as documented in Pogoson & Akande (2011), open access.
// This is a simplified educational rendering: one round, honestly labelled —
// a real consultation works through successive alternatives.

type Stage = "intro" | "holding" | "revealed";

export function IboRefinement() {
  const [stage, setStage] = useState<Stage>("intro");
  const [cowrieHand, setCowrieHand] = useState<"left" | "right">("left");
  const [picked, setPicked] = useState<"left" | "right" | null>(null);

  function start() {
    setCowrieHand(Math.random() < 0.5 ? "left" : "right");
    setPicked(null);
    setStage("holding");
  }

  function reveal(hand: "left" | "right") {
    setPicked(hand);
    setStage("revealed");
  }

  const isIre = picked === cowrieHand;

  return (
    <div className="card">
      <h3 className="mb-1 font-serif text-xl text-ifa-gold">Refine with ibò</h3>
      <p className="mb-3 text-[13px] leading-relaxed text-ifa-cream/70">
        After the Odù falls, tradition refines the reading with <strong className="text-ifa-cream">ibò</strong>.
        A pair of cowries answers <em>yes</em> (ire, blessing). A piece of bone answers <em>no</em> (ibi,
        obstacle). The diviner never knows which hand holds which.
      </p>

      {stage === "intro" && (
        <button type="button" onClick={start} className="btn-primary text-sm">
          Ask: does this Odù come with ire?
        </button>
      )}

      {stage === "holding" && (
        <div>
          <p className="mb-3 text-sm text-ifa-cream/85">
            The cowries and the bone have been shuffled between your hands. The question is posed:{" "}
            <em>“Ire ni?” — does this reading come with blessing?</em> Reveal a hand.
          </p>
          <div className="flex gap-3">
            <button type="button" onClick={() => reveal("left")} className="btn-secondary flex-1">
              ✊ Left hand
            </button>
            <button type="button" onClick={() => reveal("right")} className="btn-secondary flex-1">
              ✊ Right hand
            </button>
          </div>
        </div>
      )}

      {stage === "revealed" && (
        <div>
          <div
            className={`rounded-xl border p-4 text-center ${
              isIre ? "border-ifa-gold/50 bg-ifa-gold/[0.08]" : "border-ifa-rust/50 bg-ifa-rust/[0.08]"
            }`}
          >
            <div className="text-3xl">{isIre ? "🐚🐚" : "🦴"}</div>
            <div className={`mt-2 font-serif text-2xl ${isIre ? "text-ifa-gold" : "text-ifa-rust"}`}>
              {isIre ? "Ire — the cowries" : "Ibi — the bone"}
            </div>
            <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-ifa-cream/80">
              {isIre
                ? "The reading leans toward blessing. Tradition would next ask which ire it is: health, prosperity, or long life."
                : "The reading leans toward obstacle. Take it as counsel, not doom. Tradition would next ask what to guard against and what puts things right."}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button type="button" onClick={start} className="btn-secondary text-sm">
              Cast ibò again
            </button>
            <details className="text-xs text-ifa-sage">
              <summary className="cursor-pointer select-none opacity-80 hover:text-ifa-gold hover:opacity-100">
                Show reference
              </summary>
              <p className="mb-0 mt-1.5">
                This is one simplified round. A babaláwo works through many alternatives. The mechanics
                here follow{" "}
                <a href="https://journals.openedition.org/cea/196" target="_blank" rel="noreferrer">
                  Pogoson and Akande (2011)
                </a>
                .
              </p>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
