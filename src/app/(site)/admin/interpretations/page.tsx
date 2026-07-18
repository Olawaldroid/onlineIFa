export const dynamic = "force-dynamic";
import Link from "next/link";
import { ReviewActions } from "@/components/ReviewActions";
import { listSubmissions, storeLocation, type FileSubmission } from "@/lib/contributions/store";

// Admin review queue. Lists submitted/in-review interpretations with their
// source permission status so an admin can approve only publishable content.
// Without a database it reads the file-backed contribution store instead, so
// review works with zero setup (see src/lib/contributions/store.ts).
async function load() {
  try {
    const { prisma } = await import("@/lib/db");
    const items = await prisma.interpretation.findMany({
      where: { reviewStatus: { in: ["SUBMITTED", "IN_REVIEW", "CHANGES_REQUESTED"] } },
      include: { odu: true, source: true, contributor: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return { mode: "db" as const, items };
  } catch {
    const all = await listSubmissions();
    return {
      mode: "file" as const,
      pending: all.filter((s) => s.status === "SUBMITTED" || s.status === "CHANGES_REQUESTED"),
      decided: all.filter((s) => s.status === "APPROVED" || s.status === "REJECTED").slice(0, 10),
      store: await storeLocation(),
    };
  }
}

export default async function AdminInterpretationsPage() {
  const data = await load();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Review queue</h1>
        <Link href="/admin" className="btn-secondary">← Admin</Link>
      </div>

      {data.mode === "db" ? (
        <>
          {data.items.length === 0 && <p className="text-sm text-ifa-cream/60">Nothing awaiting review.</p>}
          <div className="space-y-3">
            {data.items.map((i: any) => (
              <div key={i.id} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-ifa-cream">{i.title ?? "(untitled)"} · {i.odu.name}</h2>
                    <p className="text-xs text-ifa-sage">
                      {i.sourceType} · {i.contributor?.displayName ?? "unknown contributor"} ·{" "}
                      source permission: {i.source?.permissionStatus ?? "NOT_REQUIRED"}
                    </p>
                  </div>
                  <span className="rounded-full bg-ifa-rust/30 px-3 py-1 text-xs">{i.reviewStatus}</span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm text-ifa-cream/70">{i.contentMd}</p>
                <ReviewActions interpretationId={i.id} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="rounded-lg border border-ifa-border bg-ifa-surface px-4 py-2 text-sm text-ifa-sage">
            No database connected — reviewing from the file store
            {data.store.ephemeral ? " (temp dir: data resets when the server restarts)" : ""}:{" "}
            <code className="text-ifa-cream/70">{data.store.file}</code>. Approved submissions appear
            on their Odù page immediately.
          </p>

          {data.pending.length === 0 && <p className="text-sm text-ifa-cream/60">Nothing awaiting review.</p>}
          <div className="space-y-3">
            {data.pending.map((s) => (
              <SubmissionCard key={s.id} s={s} withActions />
            ))}
          </div>

          {data.decided.length > 0 && (
            <>
              <h2 className="pt-4 font-serif text-xl text-ifa-cream">Recently decided</h2>
              <div className="space-y-3">
                {data.decided.map((s) => (
                  <SubmissionCard key={s.id} s={s} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function SubmissionCard({ s, withActions }: { s: FileSubmission; withActions?: boolean }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-ifa-cream">{s.title || "(untitled)"} · {s.oduName}</h2>
          <p className="text-xs text-ifa-sage">
            {s.sourceType} · {s.language}
            {s.tradition ? ` · ${s.tradition}` : ""} ·{" "}
            {new Date(s.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            s.status === "APPROVED"
              ? "bg-ifa-gold/25 text-ifa-gold"
              : s.status === "REJECTED"
                ? "bg-ifa-rust/30"
                : "bg-ifa-rust/30"
          }`}
        >
          {s.status.replace("_", " ")}
        </span>
      </div>
      <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm text-ifa-cream/70">{s.contentMd}</p>
      {s.notes && <p className="mt-1 text-xs text-ifa-sage">Contributor notes: {s.notes}</p>}
      {s.reviewComment && <p className="mt-1 text-xs text-ifa-sage">Reviewer: {s.reviewComment}</p>}
      {withActions && <ReviewActions interpretationId={s.id} />}
    </div>
  );
}
