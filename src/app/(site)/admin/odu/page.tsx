import Link from "next/link";
import { allOduFacts } from "@/lib/odu/facts";

// Odù & verse management. Facts are generated; this view is the admin entry to
// editing themes, relations, proverbs and verses (verse editing in DB phase).
export default function AdminOduPage() {
  const items = allOduFacts().slice(0, 16);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Odù & verses</h1>
        <Link href="/admin" className="btn-secondary">← Admin</Link>
      </div>
      <p className="text-sm text-ifa-cream/70">
        Showing the 16 principal Odù. The full corpus of 256 is managed via the{" "}
        <Link href="/odu">library</Link>. Verse text is only stored when a source
        has GRANTED or NOT_REQUIRED permission.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((o) => (
          <Link key={o.slug} href={`/odu/${o.slug}`} className="card block hover:border-ifa-gold">
            <h2 className="font-serif text-ifa-cream">{o.name}</h2>
            <p className="font-mono text-sm text-ifa-gold">{o.signature}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
