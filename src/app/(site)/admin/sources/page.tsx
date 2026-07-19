export const dynamic = "force-dynamic";
import Link from "next/link";

// Source & permission management. Every source carries title, author, publisher,
// year, source type, licence type, permission status, permission doc URL, and
// attribution text. Unapproved copyrighted content can never be published.
async function load() {
  try {
    const { prisma } = await import("@/lib/db");
    return { items: await prisma.source.findMany({ orderBy: { createdAt: "desc" } }), ok: true as const };
  } catch {
    return { items: [], ok: false as const };
  }
}

export default async function AdminSourcesPage() {
  const { items, ok } = await load();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Sources & permissions</h1>
        <Link href="/admin" className="btn-secondary">← Admin</Link>
      </div>
      <div className="overflow-x-auto rounded-xl border border-ifa-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-ifa-surface text-ifa-sage">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Author</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Licence</th>
              <th className="px-3 py-2">Permission</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s: any) => (
              <tr key={s.id} className="border-t border-ifa-border">
                <td className="px-3 py-2">{s.title}</td>
                <td className="px-3 py-2 text-ifa-cream/70">{s.author ?? "—"}</td>
                <td className="px-3 py-2 text-ifa-cream/70">{s.sourceType}</td>
                <td className="px-3 py-2 text-ifa-cream/70">{s.licenceType}</td>
                <td className="px-3 py-2">
                  <span className={s.permissionStatus === "DENIED" ? "text-ifa-rust" : "text-ifa-sage"}>
                    {s.permissionStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
