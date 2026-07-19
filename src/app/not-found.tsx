import Link from "next/link";

// House-style 404: the same sand-and-tray language as the rest of the site.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <div
        className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-ifa-border font-mono text-2xl tracking-[0.3em] text-ifa-gold/70"
        style={{ background: "radial-gradient(circle at 40% 32%, #5a3d24, #3a2817 72%)" }}
        aria-hidden
      >
        ǁ&nbsp;ǀ
      </div>
      <p className="eyebrow mt-8">NOT AMONG THE 256</p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-ifa-gold">This path is not an Odù</h1>
      <p className="mt-3 text-sm leading-relaxed text-ifa-cream/70">
        The page you were looking for doesn&rsquo;t exist. Every valid figure is in the library —
        all 256 of them.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/odu" className="btn-secondary">Browse the 256 Odù</Link>
      </div>
    </div>
  );
}
