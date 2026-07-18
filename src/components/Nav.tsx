import Link from "next/link";

const LINKS = [
  { href: "/lab", label: "IFA Lab" },
  { href: "/learn", label: "Learn Ifá" },
  { href: "/odu", label: "Odù Library" },
  { href: "/library", label: "Books" },
  { href: "/consult", label: "Consultation" },
  { href: "/search", label: "Search" },
  { href: "/assistant", label: "Assistant" },
  { href: "/contribute", label: "Contribute" },
  { href: "/admin", label: "Admin" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ifa-border bg-ifa-bg/[0.88] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3.5">
        <Link href="/" className="font-serif text-lg font-semibold tracking-[0.08em] text-ifa-gold hover:text-ifa-gold">
          Online Ifá
        </Link>
        <div className="flex flex-1 flex-wrap gap-x-4 gap-y-1 text-[13px] tracking-[0.01em]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-ifa-cream/85 hover:text-ifa-gold">
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href="/disclaimer?next=/consult"
          className="whitespace-nowrap rounded-full bg-ifa-gold px-4 py-2 text-[12.5px] font-semibold text-ifa-bg transition-colors hover:bg-ifa-cream"
        >
          Start a consultation
        </Link>
      </nav>
    </header>
  );
}
