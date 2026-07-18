import { PUBLIC_DOMAIN_BOOKS } from "@/lib/sources/publicDomain";

// Public-domain library. Surfaces openly-accessible books on Yorùbá religion
// and Ifá so users can read the actual sources. These are bibliographic
// references + links — not reproduced text.
export const metadata = {
  title: "Public-domain library — Online Ifá",
};

export default function LibraryPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow">Library</p>
        <h1 className="section-title mt-2 text-4xl text-ifa-gold">
          Public-domain library
        </h1>
        <p className="mt-2 max-w-2xl text-ifa-cream/80">
          Openly-accessible works (public domain) on Yorùbá religion and Ifá that
          you can read in full. We link to the original scans rather than
          reproducing text, and we track each as a source in the app.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {PUBLIC_DOMAIN_BOOKS.map((b) => (
          <article key={b.id} className="card flex flex-col">
            <h2 className="font-serif text-lg text-ifa-cream">{b.title}</h2>
            <p className="mt-1 text-sm text-ifa-sage">
              {b.author} · {b.year}
            </p>
            <p className="mt-2 flex-1 text-sm text-ifa-cream/70">{b.note}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a href={b.archiveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Read on archive.org
              </a>
              {b.fullTextUrl && (
                <a href={b.fullTextUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                  Full text
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <section className="card text-sm text-ifa-cream/75">
        <h2 className="font-serif text-lg text-ifa-gold">About these sources</h2>
        <p className="mt-2">
          These titles were published before 1929 and are in the public domain in
          the United States. The colonial-era ethnographies (Ellis, Dennett,
          Frobenius) reflect the biases of their time — we use them for factual
          and historical grounding and read their interpretation critically,
          preferring Yorùbá-authored and contemporary scholarship for meaning.
          Any passage quoted in the app is added by a contributor with an exact
          page citation and reviewed before publishing.
        </p>
      </section>
    </div>
  );
}
