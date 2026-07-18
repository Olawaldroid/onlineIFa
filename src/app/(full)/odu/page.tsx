import Link from "next/link";
import { allOduFacts, searchFacts } from "@/lib/odu/facts";
import { glyphOf } from "@/lib/odu/glyph";
import { PageSection } from "@/components/PageSection";
import { SectionHeading } from "@/components/SectionHeading";

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
    <PageSection tone="dark">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading num="01" title="Explore all 256 Odù" />
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
      </div>
      <div className="mt-2 font-mono text-[13px] text-ifa-sage">{items.length} of 256 figures</div>

      <div className="mt-7 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {items.slice(0, 300).map((o) => (
          <Link
            key={o.slug}
            href={`/odu/${o.slug}`}
            className={`rounded-xl border px-2 py-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-ifa-gold ${
              o.isPrimary ? "border-ifa-gold/35 bg-ifa-gold/[0.06]" : "border-ifa-border bg-ifa-surface"
            }`}
          >
            <div className="whitespace-pre font-mono text-xs leading-[1.7] text-ifa-gold">{glyphOf(o.signature)}</div>
            <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-ifa-cream/80">
              {o.name}
            </div>
          </Link>
        ))}
      </div>
      {items.length > 300 && (
        <p className="mt-4 text-center text-xs text-ifa-sage">Showing the first 300 matches — refine your search to narrow further.</p>
      )}
    </PageSection>
  );
}
