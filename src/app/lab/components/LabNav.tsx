const LINKS = [
  { href: "#learn", label: "What is Ifá" },
  { href: "#consult", label: "Consultation" },
  { href: "#math", label: "Mathematics" },
  { href: "#odu", label: "256 Odù" },
  { href: "#graph", label: "Graph" },
  { href: "#timeline", label: "Timeline" },
  { href: "#cs", label: "Ifá & CS" },
  { href: "#games", label: "Learn" },
  { href: "#library", label: "Library" },
  { href: "#museum", label: "Museum" },
];

export function LabNav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center gap-7 border-b border-ifa-border bg-ifa-bg/[0.88] px-10 py-3.5 backdrop-blur-xl">
      <a
        href="#top"
        className="font-serif text-xl font-semibold tracking-[0.14em] text-ifa-gold hover:text-ifa-gold"
      >
        IFA&nbsp;LAB
      </a>
      <div className="flex flex-1 flex-wrap gap-x-[22px] gap-y-1 text-[13px] tracking-[0.02em]">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="text-ifa-cream hover:text-ifa-gold">
            {l.label}
          </a>
        ))}
      </div>
      <a
        href="#consult"
        className="whitespace-nowrap rounded-full bg-ifa-gold px-4 py-2 text-[12.5px] font-semibold text-ifa-bg transition-colors hover:bg-ifa-cream hover:text-ifa-bg"
      >
        Start a simulation
      </a>
    </nav>
  );
}
