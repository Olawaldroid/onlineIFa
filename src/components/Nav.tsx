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
    <header className="border-b border-ifa-border bg-ifa-surface/60 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3">
        <Link href="/" className="font-serif text-lg font-bold text-ifa-gold">
          Online Ifá
        </Link>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
