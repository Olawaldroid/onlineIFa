import { Nav } from "@/components/Nav";

// Site chrome (nav + centered container + footer) for the main app pages.
// The /lab route lives outside this group and renders full-bleed.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">{children}</main>
      <footer className="mt-16 border-t border-ifa-border bg-ifa-deep px-4 py-8 text-center">
        <div className="font-serif text-base tracking-[0.1em] text-ifa-gold">Online Ifá</div>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-ifa-sage">
          Online Ifá is an educational and cultural tool. It does not replace a
          trained Babalawo or professional advice. Interpretations are original,
          public-domain, licensed, or contributor-submitted — never copied.
        </p>
      </footer>
    </>
  );
}
