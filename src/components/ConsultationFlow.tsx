"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { SignatureDisplay } from "./SignatureDisplay";
import { CastingStage, Instrument, IkinStage, WorkingStep } from "./CastingStage";
import { markProgressFlag } from "@/lib/progress";
import { screenQuestion, SafetyScreenResult } from "@/lib/safety/guardrails";
import { simulatedCast, learningCast, userSelectedCast, manualCast } from "@/lib/casting/cast";
import { oduFactBySignature } from "@/lib/odu/facts";
import { resolveLocalDisplay, LocalDisplay } from "@/lib/interpretation/localDisplay";
import { EseVerses } from "./EseVerses";
import { versesForOdu } from "@/lib/content/verses";
import { IboRefinement } from "./IboRefinement";

const AREAS = [
  "GENERAL", "HEALTH", "FAMILY", "MARRIAGE", "MONEY",
  "WORK", "TRAVEL", "CONFLICT", "SPIRITUAL", "PERSONAL_DECISION",
] as const;

const CASTING_MODES = [
  { value: "SIMULATED", label: "Simulated digital cast" },
  { value: "LEARNING", label: "Learning mode (walkthrough)" },
  { value: "USER_SELECTED", label: "Select a known Odù" },
  { value: "MANUAL_BABALAWO", label: "Manual entry (Babalawo)" },
] as const;

type Step = "mode" | "area" | "question" | "safety" | "cast" | "result";
type SaveState = "idle" | "saving" | "saved" | "error";

interface ResultShape {
  odu: { name: string; signature: string; factualSummary: string; slug: string } | null;
  display: LocalDisplay;
}

const posName = (i: number) => `${i < 4 ? "right" : "left"} leg, position ${(i % 4) + 1}`;

// Everything up to and including the cast result is computed entirely in the
// browser — no account, no database round-trip — using the same real facts,
// casting logic, and safety screening the server uses (src/lib/{casting,
// safety,odu}/*). Only the optional "Save consultation" action touches the
// database, replaying the same inputs (and, for animated modes, the same
// seed) through the real API so a saved record goes through the full
// audited state machine.
export function ConsultationFlow({ presetOduSlug }: { presetOduSlug?: string }) {
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<string>(presetOduSlug ? "USER_SELECTED" : "SIMULATED");
  const [area, setArea] = useState<string>("GENERAL");
  const [question, setQuestion] = useState("");
  const [signature, setSignature] = useState("1111|1111");
  const [seed, setSeed] = useState<string | null>(null);
  const [safety, setSafety] = useState<SafetyScreenResult | null>(null);
  const [result, setResult] = useState<ResultShape | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  // Casting-stage animation state. Purely presentational pacing over an
  // already-decided (locally computed) signature.
  const [instrument, setInstrument] = useState<Instrument>("opele");
  const [working, setWorking] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [marks, setMarks] = useState<number[]>([]);
  const [workingSteps, setWorkingSteps] = useState<WorkingStep[]>([]);
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

  function buildResult(sig: string): ResultShape {
    const fact = oduFactBySignature(sig);
    return {
      odu: fact
        ? { name: fact.name, signature: fact.signature, factualSummary: fact.factualSummary, slug: fact.slug }
        : null,
      display: resolveLocalDisplay(fact?.slug ?? null),
    };
  }

  async function buildResolvedResult(sig: string): Promise<ResultShape> {
    const fallback = buildResult(sig);
    if (!fallback.odu) return fallback;
    try {
      const response = await fetch(`/api/interpretations?oduSlug=${encodeURIComponent(fallback.odu.slug)}`);
      if (!response.ok) return fallback;
      const payload = await response.json();
      return { ...fallback, display: payload.display as LocalDisplay };
    } catch {
      return fallback;
    }
  }

  function start() {
    setStep("area");
  }

  function submitArea() {
    setStep("question");
  }

  function submitQuestion() {
    const s = screenQuestion(question);
    setSafety(s);
    setStep("safety");
  }

  function acknowledge() {
    setStep("cast");
  }

  // USER_SELECTED / MANUAL_BABALAWO: the Odù is already known (typed in) —
  // resolve it straight to a result, no animation needed.
  async function submitKnownOdu() {
    const cast = mode === "MANUAL_BABALAWO" ? manualCast(signature, "") : userSelectedCast(signature);
    markProgressFlag("cast");
    setResult(await buildResolvedResult(cast.signature));
    setStep("result");
  }

  const finishAnimation = useCallback((all: number[], sig: string) => {
    setMarks(all);
    setIkinStage(null);
    setWorkingSteps((st) => [
      ...st,
      { n: "★", text: `The figure is complete: ${sig}. Read right leg first.` },
    ]);
    after(600, async () => {
      setAnimating(false);
      setResult(await buildResolvedResult(sig));
      setStep("result");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [after]);

  const animateOpele = useCallback(
    (realMarks: number[], sig: string) => {
      setShaking(true);
      setChainLanded(false);
      setWorkingSteps([
        {
          n: "·",
          text: "The ọ̀pẹ̀lẹ̀ — a chain of eight half-pods in two strands of four — is held at the middle and swung. One throw yields a complete figure.",
        },
      ]);
      after(1700, () => {
        setShaking(false);
        setChainLanded(true);
        if (working) {
          realMarks.forEach((m, i) => {
            after((i + 1) * 850, () => {
              setMarks((ms) => [...ms, m]);
              setWorkingSteps((st) => [
                ...st,
                {
                  n: String(i + 1),
                  text: `Pod ${i + 1} (${posName(i)}) lands ${m === 1 ? "concave face up → a SINGLE mark ǀ" : "convex face up → a DOUBLE mark ǁ"}. (Which face maps to which mark varies by lineage — this is our stated convention.)`,
                },
              ]);
            });
          });
          after(8 * 850 + 400, () => finishAnimation(realMarks, sig));
        } else {
          setMarks(realMarks);
          setWorkingSteps((st) => [
            ...st,
            { n: "✓", text: "All eight pods read at once, right leg first, top to bottom." },
          ]);
          after(500, () => finishAnimation(realMarks, sig));
        }
      });
    },
    [after, working, finishAnimation],
  );

  const animateIkin = useCallback(
    (realMarks: number[], sig: string) => {
      setWorkingSteps([
        {
          n: "·",
          text: "Sixteen ìkín (sacred palm nuts) are held. In each of 8 rounds the diviner strikes at the nuts with one hand; the remainder left behind — one or two — writes one mark.",
        },
      ]);
      const round = (i: number) => {
        if (i === 8) {
          after(500, () => finishAnimation(realMarks, sig));
          return;
        }
        setIkinStage({ round: i, phase: "beating" });
        setSeedsLeft(16);
        after(900, () => {
          const m = realMarks[i];
          const remainder = m === 1 ? 2 : 1;
          setIkinStage({ round: i, phase: "result", remainder });
          setSeedsLeft(remainder);
          setMarks((ms) => [...ms, m]);
          if (working) {
            setWorkingSteps((st) => [
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
    },
    [after, working, finishAnimation],
  );

  function startAnimatedCast() {
    if (animating) return;
    clearTimers();
    setMarks([]);
    setWorkingSteps([]);
    setShaking(false);
    setChainLanded(false);
    setIkinStage(null);
    setSeedsLeft(16);
    setAnimating(true);
    const newSeed = `${Date.now()}-${Math.random()}`;
    setSeed(newSeed);
    const cast = mode === "LEARNING" ? learningCast(newSeed) : simulatedCast(newSeed);
    markProgressFlag("cast");
    const realMarks = cast.signature.replace("|", "").split("").map(Number);
    if (instrument === "opele") animateOpele(realMarks, cast.signature);
    else animateIkin(realMarks, cast.signature);
  }

  // The result is already known locally; this only persists it to the
  // database, replaying the same inputs through the real, audited API.
  async function saveConsultation() {
    if (!result || saveState === "saving" || saveState === "saved") return;
    setSaveState("saving");
    try {
      const startRes = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ castingMode: mode }),
      });
      const startJson = await startRes.json();
      if (!startRes.ok) throw new Error("save failed");
      const newId: string = startJson.consultation.id;

      const patch = async (body: unknown) => {
        const res = await fetch(`/api/consultation/${newId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("save failed");
        return res.json();
      };

      await patch({ action: "select-area", area });
      await patch({ action: "enter-question", question });
      await patch({ action: "acknowledge-safety" });

      const castRes = await fetch(`/api/consultation/${newId}/cast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(animatedModes ? { seed } : { signature }),
      });
      if (!castRes.ok) throw new Error("save failed");

      await patch({ action: "interpret" });
      await patch({ action: "save" });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  const animatedModes = mode === "SIMULATED" || mode === "LEARNING";

  return (
    <div className="space-y-6">
      <Progress step={step} />

      {step === "mode" && (
        <div className="card mx-auto max-w-2xl space-y-4">
          <h2 className="font-serif text-xl text-ifa-gold">Choose a casting mode</h2>
          <p className="text-sm text-ifa-cream/70">
            Casting modes are honest about what they are. A simulation is a learning tool,
            not spiritual authority. No account or database is needed to try it as a guest.
          </p>
          <div className="space-y-2">
            {CASTING_MODES.map((m) => (
              <label key={m.value} className="flex items-center gap-3">
                <input type="radio" name="mode" value={m.value} checked={mode === m.value} onChange={() => setMode(m.value)} className="accent-ifa-gold" />
                {m.label}
              </label>
            ))}
          </div>
          <button className="btn-primary" onClick={start}>Begin</button>
        </div>
      )}

      {step === "area" && (
        <div className="card mx-auto max-w-2xl space-y-4">
          <h2 className="font-serif text-xl text-ifa-gold">Area of concern</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {AREAS.map((a) => (
              <button key={a} onClick={() => setArea(a)} className={`btn ${area === a ? "btn-primary" : "btn-secondary"}`}>
                {a.replace("_", " ").toLowerCase()}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={submitArea}>Continue</button>
        </div>
      )}

      {step === "question" && (
        <div className="card mx-auto max-w-2xl space-y-4">
          <h2 className="font-serif text-xl text-ifa-gold">Your question</h2>
          <p className="text-sm text-ifa-rust">
            Emergencies and medical, legal, or financial matters need a qualified professional —
            this app cannot advise on them.
          </p>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-ifa-border bg-ifa-surface p-3 text-sm text-ifa-cream outline-none placeholder:text-ifa-cream/40"
            placeholder="What would you like to reflect on?"
          />
          <button className="btn-primary" disabled={!question.trim()} onClick={submitQuestion}>Continue</button>
        </div>
      )}

      {step === "safety" && (
        <div className="card mx-auto max-w-2xl space-y-4">
          <h2 className="font-serif text-xl text-ifa-gold">A moment of care</h2>
          {safety && safety.messages.length > 0 ? (
            <ul className="space-y-2 text-sm text-ifa-cream">
              {safety.messages.map((m, i) => (
                <li key={i} className="rounded-lg bg-ifa-rust/20 px-3 py-2">{m}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ifa-cream/70">
              No safety concerns detected. Remember this is an educational tool.
            </p>
          )}
          {safety?.blocking ? (
            <p className="text-sm text-ifa-rust">
              Please seek appropriate professional help before continuing.
            </p>
          ) : (
            <button className="btn-primary" onClick={acknowledge}>
              I understand, continue
            </button>
          )}
        </div>
      )}

      {step === "cast" && animatedModes && (
        <div className="space-y-4">
          <div className="mx-auto max-w-2xl rounded-[10px] border border-ifa-rust/40 bg-ifa-rust/[0.16] px-4 py-[9px] text-[13px] text-ifa-cream">
            ⚠ Every draw is genuinely random, generated on your device, and clearly labelled. This
            is a learning tool, not spiritual authority.
          </div>
          <CastingStage
            instrument={instrument}
            onPickInstrument={setInstrument}
            working={working}
            onToggleWorking={() => setWorking((w) => !w)}
            onCast={startAnimatedCast}
            busy={false}
            animating={animating}
            marks={marks}
            workingSteps={workingSteps}
            shaking={shaking}
            chainLanded={chainLanded}
            ikinStage={ikinStage}
            seedsLeft={seedsLeft}
          />
        </div>
      )}

      {step === "cast" && !animatedModes && (
        <div className="card mx-auto max-w-2xl space-y-4">
          <h2 className="font-serif text-xl text-ifa-gold">Casting</h2>
          <label className="block text-sm">
            Signature (rightLeg|leftLeg, e.g. 1111|2222)
            <input
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ifa-border bg-ifa-surface p-2 font-mono text-ifa-cream outline-none"
            />
          </label>
          <button className="btn-primary" onClick={submitKnownOdu}>
            Submit Odù
          </button>
        </div>
      )}

      {step === "result" && result && (
        <div className="mx-auto max-w-2xl">
          <Result result={result} saveState={saveState} onSave={saveConsultation} />
        </div>
      )}
    </div>
  );
}

function Result({ result, saveState, onSave }: { result: ResultShape; saveState: SaveState; onSave: () => void }) {
  const odu = result.odu;
  const display = result.display;
  return (
    <div className="space-y-6">
      <div className="card text-center">
        <p className="text-sm text-ifa-sage">Selected Odù</p>
        <h2 className="font-serif text-3xl text-ifa-gold">{odu?.name ?? "—"}</h2>
        {odu?.signature && (
          <div className="mt-3 flex justify-center">
            <SignatureDisplay signature={odu.signature} />
          </div>
        )}
        {odu?.factualSummary && (
          <p className="mt-3 text-sm text-ifa-cream/70">{odu.factualSummary}</p>
        )}
      </div>

      <div className="card">
        <h3 className="mb-2 font-serif text-xl text-ifa-gold">
          {display.isPlaceholder ? "Interpretation (awaiting review)" : "Interpretation"}
        </h3>
        <div className="prose-ifa">
          <ReactMarkdown>{display.contentMd}</ReactMarkdown>
        </div>
        {display.sourceTitle && (
          <p className="mt-3 text-xs text-ifa-sage">
            Source: {display.sourceTitle}
            {display.contentCategory ? ` · Category: ${display.contentCategory.replaceAll("_", " ")}` : ""}
            {display.licence ? ` · Licence: ${display.licence}` : ""}
          </p>
        )}
        {display.citation && <p className="mt-1 text-xs text-ifa-sage">Citation: {display.citation}</p>}
      </div>

      {odu?.slug && <EseVerses verses={versesForOdu(odu.slug)} heading="Ifá speaks — a recorded ẹsẹ for this Odù" />}

      <IboRefinement />

      <div className="card">
        <h3 className="mb-2 font-serif text-xl text-ifa-gold">Reflection questions</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-ifa-cream/80">
          {(display.reflectionQuestions.length
            ? display.reflectionQuestions
            : [
                "What in this resonates with your situation, and what does not?",
                "What small, wise next step is within your control?",
                "Who could you talk to for grounded, practical support?",
              ]
          ).map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {odu?.slug && <a href={`/odu/${odu.slug}`} className="btn-secondary">View this Odù</a>}
        <button className="btn-primary" disabled={saveState === "saving" || saveState === "saved"} onClick={onSave}>
          {saveState === "saved" ? "Saved ✓" : saveState === "saving" ? "Saving…" : "Save consultation"}
        </button>
        {saveState === "error" && (
          <span className="text-xs text-ifa-rust">Couldn&rsquo;t save — this reading above is still yours to keep.</span>
        )}
      </div>
    </div>
  );
}

function Progress({ step }: { step: Step }) {
  const steps: Step[] = ["mode", "area", "question", "safety", "cast", "result"];
  const idx = steps.indexOf(step);
  return (
    <div className="mx-auto flex max-w-2xl gap-1">
      {steps.map((s, i) => (
        <div key={s} className={`h-1 flex-1 rounded ${i <= idx ? "bg-ifa-gold" : "bg-ifa-border"}`} />
      ))}
    </div>
  );
}
