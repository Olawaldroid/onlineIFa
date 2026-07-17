import { Nav } from "@/components/Nav";

// Site chrome (nav + centered container + footer) for the main app pages.
// The /lab route lives outside this group and renders full-bleed.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mt-12 border-t border-ifa-border px-4 py-6 text-center text-xs text-ifa-sage">
        Online Ifá is an educational and cultural tool. It does not replace a
        trained Babalawo or professional advice. Interpretations are original,
        public-domain, licensed, or contributor-submitted — never copied.
      </footer>
    </>
  );
}
