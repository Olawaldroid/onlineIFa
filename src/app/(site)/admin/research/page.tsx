import { localBookIndexStatus, searchLocalBooks } from "@/lib/research/localBooks";

export const dynamic = "force-dynamic";

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim() ?? "";
  const [status, results] = await Promise.all([
    localBookIndexStatus(),
    query ? searchLocalBooks(query) : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Private book research</h1>
        <p className="mt-2 max-w-3xl text-sm text-ifa-cream/70">
          Search locally indexed PDF and EPUB books for research and drafting. Results are not
          approved content and must not be published without licence review and contributor approval.
        </p>
      </div>

      <div className="card text-sm text-ifa-sage">
        {status.available ? (
          <p>
            {status.searchableBooks} of {status.books} books are searchable. Index generated {" "}
            {new Date(status.generatedAt).toLocaleString()}.
          </p>
        ) : (
          <p>No local index found. Run <code>npm run books:index</code> on the server.</p>
        )}
      </div>

      <form className="flex gap-3" action="/admin/research">
        <input
          className="min-w-0 flex-1 rounded-lg border border-ifa-border bg-ifa-surface px-4 py-2 text-ifa-cream"
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search concepts, Odù names, themes…"
        />
        <button className="btn-primary" type="submit">Search</button>
      </form>

      {query && results.length === 0 && (
        <p className="text-sm text-ifa-cream/70">No local research matches for “{query}”.</p>
      )}

      <div className="space-y-4">
        {results.map((result) => (
          <article className="card" key={result.chunkId}>
            <h2 className="font-semibold text-ifa-cream">{result.title}</h2>
            <p className="mt-3 text-sm leading-6 text-ifa-cream/80">{result.excerpt}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ifa-rust">
              Local research only · permission pending
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
