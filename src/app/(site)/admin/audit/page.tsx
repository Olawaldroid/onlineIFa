export const dynamic = "force-dynamic";
import Link from "next/link";

async function load() {
  try {
    const { prisma } = await import("@/lib/db");
    return {
      items: await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { actor: true } }),
      ok: true as const,
    };
  } catch {
    return { items: [], ok: false as const };
  }
}

// Audit log — every create/update/delete/publish/approve/reject action.
export default async function AdminAuditPage() {
  const { items, ok } = await load();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Audit logs</h1>
        <Link href="/admin" className="btn-secondary">← Admin</Link>
      </div>
      {!ok && <p className="text-sm text-ifa-sage">Database not connected.</p>}
      {ok && items.length === 0 && <p className="text-sm text-ifa-cream/60">No audit entries yet.</p>}
      <ul className="space-y-2 text-sm">
        {items.map((a: any) => (
          <li key={a.id} className="card flex items-center justify-between">
            <span>
              <span className="font-mono text-ifa-gold">{a.action}</span> {a.entityType}{" "}
              <span className="text-ifa-cream/60">{a.summary}</span>
            </span>
            <span className="text-xs text-ifa-sage">
              {a.actor?.email ?? "system"} · {new Date(a.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
