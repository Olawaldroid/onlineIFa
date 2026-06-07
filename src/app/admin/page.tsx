export const dynamic = "force-dynamic";
import Link from "next/link";

// Admin flow hub. Each card links to a management area. Counts load from the
// DB when available and degrade gracefully when it is not.
async function counts() {
  try {
    const { prisma } = await import("@/lib/db");
    const [odu, submitted, sources, pendingPerms, contributors, flagged] = await Promise.all([
      prisma.odu.count(),
      prisma.interpretation.count({ where: { reviewStatus: "SUBMITTED" } }),
      prisma.source.count(),
      prisma.source.count({ where: { permissionStatus: "PENDING" } }),
      prisma.contributor.count(),
      prisma.interpretation.count({ where: { flagged: true } }),
    ]);
    return { odu, submitted, sources, pendingPerms, contributors, flagged, ok: true };
  } catch {
    return { ok: false } as const;
  }
}

const SECTIONS = [
  { href: "/admin/interpretations", title: "Interpretations", desc: "Review submissions, approve / reject / request changes." },
  { href: "/admin/sources", title: "Sources & permissions", desc: "Track licences and permission status." },
  { href: "/admin/contributors", title: "Contributors", desc: "Verify roles and manage accounts." },
  { href: "/admin/odu", title: "Odù & verses", desc: "Manage facts, themes, and verses." },
  { href: "/admin/audit", title: "Audit logs", desc: "Every change, who made it, and when." },
];

export default async function AdminPage() {
  const c = await counts();
  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">Admin</h1>

      {c.ok ? (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Odù" value={c.odu} />
          <Stat label="Awaiting review" value={c.submitted} accent />
          <Stat label="Sources" value={c.sources} />
          <Stat label="Pending permissions" value={c.pendingPerms} accent />
          <Stat label="Contributors" value={c.contributors} />
          <Stat label="Flagged" value={c.flagged} accent />
        </div>
      ) : (
        <p className="rounded-lg border border-ifa-border bg-ifa-surface px-4 py-2 text-sm text-ifa-sage">
          Database not connected. Run migrations and seed to see live counts.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} className="card block hover:border-ifa-gold">
            <h2 className="font-semibold text-ifa-cream">{s.title}</h2>
            <p className="mt-1 text-sm text-ifa-cream/70">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="card text-center">
      <div className={`text-2xl font-bold ${accent ? "text-ifa-rust" : "text-ifa-gold"}`}>{value}</div>
      <div className="text-xs text-ifa-sage">{label}</div>
    </div>
  );
}
