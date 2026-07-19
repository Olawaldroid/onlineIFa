import Link from "next/link";
import { MobileNav } from "./MobileNav";

// Top navigation. The dozen destinations are grouped into two dropdown
// clusters (Learn / Explore) plus the three standalone links people reach for
// most, so the bar stays uncrowded. Dropdowns are CSS-only (hover +
// focus-within) so this stays a server component and works without JS.

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
      { href: "/games", label: "Learn to play", sub: "Practice reading the instruments" },
      { href: "/history", label: "History", sub: "A timeline of the tradition" },
      { href: "/library", label: "Library", sub: "Sources you can read today" },
    ],
  },
  {
    label: "Explore",
    links: [
      { href: "/odu", label: "Odù Library", sub: "All 256 figures" },
      { href: "/graph", label: "Graph", sub: "The 256 as a network" },
      { href: "/museum", label: "Museum", sub: "Instruments & artefacts" },
      { href: "/search", label: "Search", sub: "Find anything" },
    ],
  },
];

const SINGLES = [
  { href: "/assistant", label: "Assistant" },
  { href: "/contribute", label: "Contribute" },
  { href: "/admin", label: "Admin" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ifa-border bg-ifa-bg/[0.88] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-nowrap items-center gap-x-3 px-4 py-3.5 sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
        <MobileNav links={[...GROUPS.flatMap((g) => g.links.map((l) => ({ href: l.href, label: l.label }))), ...SINGLES]} />
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
          {SINGLES.map((l) => (
            <Link key={l.href} href={l.href} className="text-ifa-cream/85 hover:text-ifa-gold">
              {l.label}
            </Link>
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
