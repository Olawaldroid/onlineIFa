import Link from "next/link";
import { allOduFacts, searchFacts } from "@/lib/odu/facts";

// Odù library list — all 256, filterable. Pure facts, renders without a DB.
export default function OduLibraryPage({
  searchParams,
}: {
  searchParams: { q?: string; type?: string };
}) {
  const q = searchParams.q ?? "";
  const typeFilter = searchParams.type ?? "all";

  let items = q ? searchFacts(q) : allOduFacts();
  if (typeFilter === "primary") items = items.filter((o) => o.isPrimary);
  if (typeFilter === "combined") items = items.filter((o) => !o.isPrimary);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ifa-gold">Odù Library</h1>
          <p className="mt-1 text-sm text-ifa-cream/70">
            {items.length} of 256 Odù
          </p>
        </div>
        <form className="flex flex-wrap gap-2" action="/odu">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Name, slug, or signature (e.g. 1111)"
            className="rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2 text-sm text-ifa-cream"
          />
          <select name="type" defaultValue={typeFilter} className="rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2 text-sm">
            <option value="all">All</option>
            <option value="primary">Principal (16)</option>
            <option value="combined">Combined (240)</option>
          </select>
          <button type="submit" className="btn-secondary">Filter</button>
        </form>
      </header>

      <div className="overflow-hidden rounded-xl border border-ifa-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-ifa-surface text-ifa-sage">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Signature</th>
              <th className="px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 300).map((o) => (
              <tr key={o.slug} className="border-t border-ifa-border hover:bg-ifa-surface/50">
                <td className="px-4 py-2 text-ifa-sage">{o.rank}</td>
                <td className="px-4 py-2">
                  <Link href={`/odu/${o.slug}`} className="font-medium">{o.name}</Link>
                </td>
                <td className="px-4 py-2 signature-mark text-ifa-gold">{o.signature}</td>
                <td className="px-4 py-2 text-ifa-cream/70">
                  {o.isPrimary ? "Principal" : "Combined"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
