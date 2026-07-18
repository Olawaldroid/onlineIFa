import { Nav } from "@/components/Nav";

// Full-bleed chrome (nav + footer, no centered/padded <main>) for the
// primary IFA LAB-styled pages: home, learn, odu, consult, library, graph,
// history, games, museum. Each page composes its own edge-to-edge
// <PageSection>s. Utility pages (search, admin, auth, …) stay in the
// (site) group's centered layout instead.
export default function FullBleedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <footer className="border-t border-ifa-border bg-ifa-deep px-6 py-14 text-center sm:px-10">
        <div className="font-serif text-lg tracking-[0.1em] text-ifa-gold">Online Ifá</div>
        <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-ifa-sage">
          Online Ifá is an educational and cultural tool. It does not replace a
          trained Babalawo or professional advice. Interpretations are original,
          public-domain, licensed, or contributor-submitted — never copied.
        </p>
      </footer>
    </>
  );
}
