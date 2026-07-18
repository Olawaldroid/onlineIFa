import Link from "next/link";
import { allOduFacts, searchFacts } from "@/lib/odu/facts";
import { CombinedOduFact } from "@/lib/odu/combine";

const markGlyph = (c: string) => (c === "1" ? "ǀ" : "ǁ");

/** 4-line glyph block: left column then right column, matching tray layout. */
function glyphOf(o: CombinedOduFact): string {
  const [right, left] = o.signature.split("|");
  return [0, 1, 2, 3].map((i) => `${markGlyph(left[i])}  ${markGlyph(right[i])}`).join("\n");
}

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
          <p className="eyebrow">Library</p>
          <h1 className="section-title mt-2 text-4xl">Odù Library</h1>
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
            className="rounded-lg border border-ifa-border bg-ifa-surface px-3 py-2 text-sm text-ifa-cream outline-none placeholder:text-ifa-cream/40"
          />
          <select name="type" defaultValue={typeFilter} className="rounded-lg border border-ifa-border bg-ifa-surface px-3 py-2 text-sm">
            <option value="all">All</option>
            <option value="primary">Principal (16)</option>
            <option value="combined">Combined (240)</option>
          </select>
          <button type="submit" className="btn-secondary">Filter</button>
        </form>
      </header>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {items.slice(0, 300).map((o) => (
          <Link
            key={o.slug}
            href={`/odu/${o.slug}`}
            className={`rounded-xl border px-2 py-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-ifa-gold ${
              o.isPrimary ? "border-ifa-gold/35 bg-ifa-gold/[0.06]" : "border-ifa-border bg-ifa-surface"
            }`}
          >
            <div className="whitespace-pre font-mono text-xs leading-[1.7] text-ifa-gold">{glyphOf(o)}</div>
            <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-ifa-cream/80">
              {o.name}
            </div>
          </Link>
        ))}
      </div>
      {items.length > 300 && (
        <p className="text-center text-xs text-ifa-sage">Showing the first 300 matches — refine your search to narrow further.</p>
      )}
    </div>
  );
}
