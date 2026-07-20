import { Nav } from "@/components/Nav";

// Site chrome (nav + centered container + footer) for utility pages
// (search, assistant, contribute, pricing, saved, auth, admin) that don't
// need the full-bleed IFA LAB section treatment. See src/app/(full)/layout
// for the primary pages (home, learn, odu, consult, library, graph,
// history, games, museum).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">{children}</main>
      <footer className="mt-16 border-t border-ifa-border bg-ifa-deep px-4 py-8 text-center">
        <div className="font-serif text-base tracking-[0.1em] text-ifa-gold">Online Ifá</div>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-ifa-sage">
          Online Ifá is an educational and cultural tool. It does not replace a
          trained Babalawo or professional advice. Published material is reviewed,
          source-attributed, and presented within its publication terms.
        </p>
      </footer>
    </>
  );
}
