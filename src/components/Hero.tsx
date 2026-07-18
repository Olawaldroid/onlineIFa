import Link from "next/link";

// Homepage hero — spinning tray emblem, floating gold particles, title and
// real onboarding CTAs. Visual treatment matches /lab's Hero exactly; this
// component is independent (not imported from src/app/lab) so the two stay
// decoupled and /lab can be retired without touching this page.

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260718);
const rnd = (a: number, b: number) => a + rand() * (b - a);

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: rnd(4, 96).toFixed(1) + "%",
  top: rnd(8, 92).toFixed(1) + "%",
  size: rnd(2, 5).toFixed(1) + "px",
  delay: (i * 0.6).toFixed(1) + "s",
  dur: rnd(6, 12).toFixed(1) + "s",
}));

const NOTCHES = Array.from({ length: 16 }, (_, i) => `rotate(${i * 22.5}deg) translateY(-158px) translateX(-1.5px)`);

/** The emblem's leg pattern: ǀ, ǀǀ, ǀ, ǀǀ on both columns. */
const EMBLEM_LEGS = ["ǀ", "ǀ ǀ", "ǀ", "ǀ ǀ"];

const CTAS = [
  { href: "/disclaimer?next=/learn", label: "Learn Ifá", primary: true },
  { href: "/disclaimer?next=/consult", label: "Start Consultation", primary: false },
  { href: "/learn", label: "Discover Mathematics", primary: false },
  { href: "/history", label: "Watch History", primary: false },
];

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-10 pb-24 pt-16 text-center"
      style={{ background: "radial-gradient(1200px 600px at 50% -10%, #2b2016 0%, #1a140f 60%), #1a140f" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage: "radial-gradient(rgba(201,162,39,.12) 1px, transparent 1.4px)",
          backgroundSize: "34px 34px",
        }}
      />
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full bg-ifa-gold opacity-30"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `omFloat ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      <div className="relative mb-11 h-[330px] w-[330px]">
        <div
          className="absolute inset-0 rounded-full border-[11px] border-ifa-border"
          style={{
            background: "radial-gradient(circle at 38% 32%, #4a3623, #2b2016 55%, #211812 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,.6), 0 0 60px rgba(201,162,39,.12) inset",
          }}
        />
        <div
          className="absolute inset-3.5 rounded-full border-2 border-dashed border-ifa-gold/35"
          style={{ animation: "omSpin 46s linear infinite" }}
        />
        <div className="absolute inset-[30px] rounded-full border border-ifa-gold/[0.22]" />
        {NOTCHES.map((tf, i) => (
          <div key={i} className="absolute left-1/2 top-1/2 h-4 w-[3px] rounded-sm bg-ifa-gold/50" style={{ transform: tf }} />
        ))}
        <div
          className="absolute inset-16 flex items-center justify-center gap-[26px] rounded-full font-mono text-[21px] tracking-[0.1em] text-ifa-gold"
          style={{
            background: "radial-gradient(circle, rgba(243,233,217,.14), rgba(243,233,217,.05) 70%, transparent)",
            animation: "omGlow 5s ease-in-out infinite",
          }}
        >
          {[0, 1].map((col) => (
            <div key={col} className="flex flex-col gap-3">
              {EMBLEM_LEGS.map((leg, i) => (
                <span key={i}>{leg}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ animation: "omFadeUp 1s ease .1s both" }}>
        <div className="mb-[18px] text-xs tracking-[0.42em] text-ifa-sage">
          THE DIGITAL HOUSE OF IFÁ
        </div>
        <h1 className="m-0 font-serif text-7xl font-medium leading-none tracking-[0.04em] text-ifa-cream sm:text-8xl">
          Online <span className="text-ifa-gold">Ifá</span>
        </h1>
        <p className="mx-auto mt-[26px] max-w-[560px] text-[19px] leading-relaxed text-ifa-cream/75">
          A respectful, educational space to explore one of humanity&rsquo;s oldest knowledge systems —
          philosophy, poetry, memory and mathematics, inscribed by UNESCO as intangible cultural heritage.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3.5" style={{ animation: "omFadeUp 1s ease .3s both" }}>
        {CTAS.map((c) =>
          c.primary ? (
            <Link key={c.href} href={c.href} className="btn-primary">
              {c.label}
            </Link>
          ) : (
            <Link key={c.href} href={c.href} className="btn-secondary">
              {c.label}
            </Link>
          ),
        )}
      </div>
    </header>
  );
}
