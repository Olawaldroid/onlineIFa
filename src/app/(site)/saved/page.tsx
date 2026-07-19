export const dynamic = "force-dynamic";
import Link from "next/link";

// Saved consultation flow. Lists a user's saved consultations. Users can
// revisit, add private notes, export as PDF, and delete their data.
// (Auth wiring is a later phase; this lists saved sessions when a DB exists.)
async function load() {
  try {
    const { prisma } = await import("@/lib/db");
    return {
      items: await prisma.consultation.findMany({
        where: { saved: true },
        include: { odu: true, notes: true },
        orderBy: { updatedAt: "desc" },
        take: 50,
      }),
      ok: true as const,
    };
  } catch {
    return { items: [], ok: false as const };
  }
}

export default async function SavedPage() {
  const { items, ok } = await load();
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">Saved consultations</h1>
      {ok && items.length === 0 && (
        <p className="text-sm text-ifa-cream/60">
          No saved consultations yet. <Link href="/consult">Start one →</Link>
        </p>
      )}
      <div className="space-y-3">
        {items.map((c: any) => (
          <div key={c.id} className="card">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ifa-cream">{c.odu?.name ?? "—"}</h2>
              <span className="text-xs text-ifa-sage">{new Date(c.updatedAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-ifa-cream/70">{c.concernArea} · {c.question}</p>
            <div className="mt-2 flex gap-3 text-sm">
              <a href={`/api/consultation/${c.id}/export`} className="text-ifa-gold">Export PDF</a>
              <span className="text-ifa-cream/40">·</span>
              <span className="text-ifa-cream/50">{c.notes.length} private note(s)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
