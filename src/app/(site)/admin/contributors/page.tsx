export const dynamic = "force-dynamic";
import Link from "next/link";

async function load() {
  try {
    const { prisma } = await import("@/lib/db");
    return { items: await prisma.contributor.findMany({ include: { user: true } }), ok: true as const };
  } catch {
    return { items: [], ok: false as const };
  }
}

// Contributor management — verify roles (Babalawo, researcher, translator,
// editor, admin) and manage accounts.
export default async function AdminContributorsPage() {
  const { items, ok } = await load();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Contributors</h1>
        <Link href="/admin" className="btn-secondary">← Admin</Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((c: any) => (
          <div key={c.id} className="card">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ifa-cream">{c.displayName}</h2>
              <span className={`rounded-full px-3 py-1 text-xs ${c.verified ? "bg-ifa-sage/30" : "bg-ifa-rust/30"}`}>
                {c.verified ? "verified" : "unverified"}
              </span>
            </div>
            <p className="text-xs text-ifa-sage">{c.role} · {c.user?.email}</p>
            {c.lineage && <p className="mt-1 text-sm text-ifa-cream/70">Lineage: {c.lineage}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
