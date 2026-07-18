"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { SignatureDisplay } from "./SignatureDisplay";

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

export function ConsultationFlow({ presetOduSlug }: { presetOduSlug?: string }) {
  const [step, setStep] = useState<Step>("mode");
  const [id, setId] = useState<string | null>(null);
  const [mode, setMode] = useState<string>(presetOduSlug ? "USER_SELECTED" : "SIMULATED");
  const [area, setArea] = useState<string>("GENERAL");
  const [question, setQuestion] = useState("");
  const [signature, setSignature] = useState("1111|1111");
  const [safety, setSafety] = useState<{ messages: string[]; blocking: boolean } | null>(null);
  const [result, setResult] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function call(url: string, body: unknown, method = "PATCH") {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Request failed");
      return json;
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Is the database running?");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function start() {
    const json = await call("/api/consultation", { castingMode: mode }, "POST");
    if (json) {
      setId(json.consultation.id);
      setStep("area");
    }
  }

  async function submitArea() {
    if (!id) return;
    const json = await call(`/api/consultation/${id}`, { action: "select-area", area });
    if (json) setStep("question");
  }

  async function submitQuestion() {
    if (!id) return;
    const json = await call(`/api/consultation/${id}`, { action: "enter-question", question });
    if (json) {
      setSafety(json.safety);
      setStep("safety");
    }
  }

  async function acknowledge() {
    if (!id) return;
    const json = await call(`/api/consultation/${id}`, { action: "acknowledge-safety" });
    if (json) setStep("cast");
  }

  async function doCast() {
    if (!id) return;
    const needsSig = mode === "USER_SELECTED" || mode === "MANUAL_BABALAWO";
    const json = await call(
      `/api/consultation/${id}/cast`,
      needsSig ? { signature } : {},
      "POST",
    );
    if (json) {
      const interp = await call(`/api/consultation/${id}`, { action: "interpret" });
      if (interp) {
        setResult({ consultation: json.consultation, ...interp });
        setStep("result");
      }
    }
  }

  return (
    <div className="space-y-6">
      <Progress step={step} />
      {error && <p className="rounded-lg bg-ifa-rust/30 px-4 py-2 text-sm">{error}</p>}

      {step === "mode" && (
        <div className="card space-y-4">
          <h2 className="font-serif text-xl text-ifa-gold">Choose a casting mode</h2>
          <p className="text-sm text-ifa-cream/70">
            Casting modes are honest about what they are. A simulation is a learning tool,
            not spiritual authority.
          </p>
          <div className="space-y-2">
            {CASTING_MODES.map((m) => (
              <label key={m.value} className="flex items-center gap-3">
                <input type="radio" name="mode" value={m.value} checked={mode === m.value} onChange={() => setMode(m.value)} className="accent-ifa-gold" />
                {m.label}
              </label>
            ))}
          </div>
          <button className="btn-primary" disabled={busy} onClick={start}>Begin</button>
        </div>
      )}

      {step === "area" && (
        <div className="card space-y-4">
          <h2 className="font-serif text-xl text-ifa-gold">Area of concern</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {AREAS.map((a) => (
              <button key={a} onClick={() => setArea(a)} className={`btn ${area === a ? "btn-primary" : "btn-secondary"}`}>
                {a.replace("_", " ").toLowerCase()}
              </button>
            ))}
          </div>
          <button className="btn-primary" disabled={busy} onClick={submitArea}>Continue</button>
        </div>
      )}

      {step === "question" && (
        <div className="card space-y-4">
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
          <button className="btn-primary" disabled={busy || !question.trim()} onClick={submitQuestion}>Continue</button>
        </div>
      )}

      {step === "safety" && (
        <div className="card space-y-4">
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
            <button className="btn-primary" disabled={busy} onClick={acknowledge}>
              I understand, continue
            </button>
          )}
        </div>
      )}

      {step === "cast" && (
        <div className="card space-y-4">
          <h2 className="font-serif text-xl text-ifa-gold">Casting</h2>
          {(mode === "USER_SELECTED" || mode === "MANUAL_BABALAWO") && (
            <label className="block text-sm">
              Signature (rightLeg|leftLeg, e.g. 1111|2222)
              <input
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="mt-1 w-full rounded-lg border border-ifa-border bg-ifa-surface p-2 font-mono text-ifa-cream outline-none"
              />
            </label>
          )}
          <button className="btn-primary" disabled={busy} onClick={doCast}>
            {mode === "SIMULATED" || mode === "LEARNING" ? "Cast" : "Submit Odù"}
          </button>
        </div>
      )}

      {step === "result" && result && <Result result={result} />}
    </div>
  );
}

function Result({ result }: { result: any }) {
  const c = result.consultation;
  const display = result.display;
  return (
    <div className="space-y-6">
      <div className="card text-center">
        <p className="text-sm text-ifa-sage">Selected Odù</p>
        <h2 className="font-serif text-3xl text-ifa-gold">{c.odu?.name ?? "—"}</h2>
        {c.odu?.signature && (
          <div className="mt-3 flex justify-center">
            <SignatureDisplay signature={c.odu.signature} />
          </div>
        )}
        {c.odu?.factualSummary && (
          <p className="mt-3 text-sm text-ifa-cream/70">{c.odu.factualSummary}</p>
        )}
      </div>

      <div className="card">
        <h3 className="mb-2 font-serif text-xl text-ifa-gold">
          {display?.isPlaceholder ? "Interpretation (awaiting review)" : "Interpretation"}
        </h3>
        <div className="prose-ifa">
          <ReactMarkdown>{display?.contentMd ?? "This Odù has not yet been reviewed by a contributor."}</ReactMarkdown>
        </div>
        {display?.sourceTitle && (
          <p className="mt-3 text-xs text-ifa-sage">Source: {display.sourceTitle} · Licence: {display.licence}</p>
        )}
      </div>

      <div className="card">
        <h3 className="mb-2 font-serif text-xl text-ifa-gold">Reflection questions</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-ifa-cream/80">
          <li>What in this resonates with your situation, and what does not?</li>
          <li>What small, wise next step is within your control?</li>
          <li>Who could you talk to for grounded, practical support?</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <a href={`/odu/${c.odu?.slug}`} className="btn-secondary">View this Odù</a>
        <button
          className="btn-primary"
          onClick={() =>
            fetch(`/api/consultation/${c.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "save" }),
            })
          }
        >
          Save consultation
        </button>
      </div>
    </div>
  );
}

function Progress({ step }: { step: Step }) {
  const steps: Step[] = ["mode", "area", "question", "safety", "cast", "result"];
  const idx = steps.indexOf(step);
  return (
    <div className="flex gap-1">
      {steps.map((s, i) => (
        <div key={s} className={`h-1 flex-1 rounded ${i <= idx ? "bg-ifa-gold" : "bg-ifa-border"}`} />
      ))}
    </div>
  );
}
