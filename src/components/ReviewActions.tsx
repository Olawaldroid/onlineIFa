"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Admin review controls: approve / request changes / reject an interpretation.
// Calls PATCH /api/interpretations/:id/review (reviewer resolved server-side).
export function ReviewActions({ interpretationId }: { interpretationId: string }) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function decide(decision: "APPROVED" | "CHANGES_REQUESTED" | "REJECTED") {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/interpretations/${interpretationId}/review`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, comment: comment || undefined }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMsg(json.error ?? "Action failed");
      } else {
        setMsg(`Marked ${decision.replace("_", " ").toLowerCase()}.`);
        router.refresh(); // re-fetch the server-rendered queue
      }
    } catch (e: any) {
      setMsg(e.message ?? "Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 space-y-2">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        placeholder="Reviewer comment (optional)"
        className="w-full rounded-lg border border-ifa-border bg-ifa-bg p-2 text-sm"
      />
      <div className="flex flex-wrap gap-2">
        <button disabled={busy} onClick={() => decide("APPROVED")} className="btn-primary text-sm">
          Approve
        </button>
        <button disabled={busy} onClick={() => decide("CHANGES_REQUESTED")} className="btn-secondary text-sm">
          Request changes
        </button>
        <button
          disabled={busy}
          onClick={() => decide("REJECTED")}
          className="btn text-sm border border-ifa-rust text-ifa-rust hover:bg-ifa-rust/10"
        >
          Reject
        </button>
      </div>
      {msg && <p className="text-xs text-ifa-sage">{msg}</p>}
    </div>
  );
}
