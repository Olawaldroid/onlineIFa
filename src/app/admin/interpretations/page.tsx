export const dynamic = "force-dynamic";
import Link from "next/link";

// Admin review queue. Lists submitted/in-review interpretations with their
// source permission status so an admin can approve only publishable content.
async function load() {
  try {
    const { prisma } = await import("@/lib/db");
    const items = await prisma.interpretation.findMany({
      where: { reviewStatus: { in: ["SUBMITTED", "IN_REVIEW", "CHANGES_REQUESTED"] } },
      include: { odu: true, source: true, contributor: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return { items, ok: true as const };
  } catch {
    return { items: [], ok: false as const };
  }
}

export default async function AdminInterpretationsPage() {
  const { items, ok } = await load();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Review queue</h1>
        <Link href="/admin" className="btn-secondary">← Admin</Link>
      </div>

      {!ok && <p className="text-sm text-ifa-sage">Database not connected.</p>}
      {ok && items.length === 0 && <p className="text-sm text-ifa-cream/60">Nothing awaiting review.</p>}

      <div className="space-y-3">
        {items.map((i: any) => (
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
            <form action={`/api/interpretations/${i.id}/review`} method="post" className="mt-3 flex gap-2 text-sm text-ifa-sage">
              {/* Real approve/reject buttons call PATCH via client JS; this is the
                  documented endpoint. See README for the admin workflow. */}
              <span>PATCH /api/interpretations/{i.id}/review</span>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
