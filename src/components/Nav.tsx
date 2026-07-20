import Link from "next/link";
import { MobileNav } from "./MobileNav";

// Public navigation is organised around two user journeys instead of exposing
// every route as an equal top-level destination. Specialist/admin routes stay
// available at their URLs without crowding the cultural learning experience.

interface NavLink {
  href: string;
  label: string;
  sub: string;
}

const GROUPS: { label: string; links: NavLink[] }[] = [
  {
    label: "Learn",
    links: [
      { href: "/learn", label: "Learn Ifá", sub: "Foundations, structure, mathematics" },
      { href: "/games", label: "Practice", sub: "Learn to recognise marks and figures" },
      { href: "/history", label: "Tradition · history", sub: "The tradition across time" },
      { href: "/museum", label: "Tradition · objects", sub: "Instruments, art, living practice" },
      { href: "/library", label: "Sources & glossary", sub: "Research, provenance, Yorùbá terms" },
    ],
  },
  {
    label: "Explore Odù",
    links: [
      { href: "/odu", label: "The 256 Odù", sub: "Browse names, marks, and structure" },
      { href: "/graph", label: "Connections", sub: "See concepts and figures as a network" },
      { href: "/assistant", label: "Ask about an Odù", sub: "Explore reviewed material in context" },
      { href: "/search", label: "Search", sub: "Find anything" },
    ],
  },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ifa-border bg-ifa-bg/[0.88] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-nowrap items-center gap-x-3 px-4 py-3.5 sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
        <MobileNav links={GROUPS.flatMap((g) => g.links.map((l) => ({ href: l.href, label: l.label })))} />
        <Link href="/" className="whitespace-nowrap font-serif text-lg font-semibold tracking-[0.08em] text-ifa-gold hover:text-ifa-gold">
          Online Ifá
        </Link>
        <div className="hidden flex-1 flex-wrap items-center gap-x-5 gap-y-1 text-[13px] tracking-[0.01em] sm:flex">
          {GROUPS.map((g) => (
            <div key={g.label} className="group relative">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-[13px] tracking-[0.01em] text-ifa-cream/85 group-hover:text-ifa-gold group-focus-within:text-ifa-gold"
              >
                {g.label}
                <span aria-hidden className="text-[9px] text-ifa-cream/50">▾</span>
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="w-[236px] rounded-2xl border border-ifa-border bg-ifa-deep p-2 shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
                  {g.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block rounded-xl px-3.5 py-2.5 text-ifa-cream/90 transition-colors hover:bg-ifa-gold/[0.08] hover:text-ifa-gold"
                    >
                      <span className="block text-[13.5px] font-medium">{l.label}</span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-ifa-cream/45">{l.sub}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 sm:hidden" />
        <Link
          href="/disclaimer?next=/consult"
          className="whitespace-nowrap rounded-full bg-ifa-gold px-3.5 py-2 text-[12px] font-semibold text-ifa-bg transition-colors hover:bg-ifa-cream sm:px-4 sm:text-[12.5px]"
        >
          Start a consultation
        </Link>
      </nav>
    </header>
  );
}
