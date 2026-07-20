import Link from "next/link";
import { OponIfaEmblem } from "@/components/IfaArtifactGlyphs";

// Homepage hero — a restrained vector-like ọpọ́n Ifá emblem, quiet particles,
// and two clear journeys. The object stays still so it reads as a carved tray,
// not as a generic spinning technology mark.

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

const CTAS = [
  { href: "/disclaimer?next=/consult", label: "Start a consultation", primary: true },
  { href: "/learn", label: "Explore Ifá", primary: false },
];

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-16 text-center sm:px-10"
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

      {/* One still, hand-worked tray: broad carved rim, powder field and Odù. */}
      <div className="relative mb-11 aspect-square h-auto w-[78vw] max-w-[352px]">
        <div className="absolute inset-[3%] rounded-full bg-black/45 blur-2xl" />
        <OponIfaEmblem
          label="A carved ọ̀pọ́n Ifá with an Odù signature marked in ìyẹ̀ròsùn powder"
          className="relative h-full w-full drop-shadow-[0_28px_30px_rgba(0,0,0,.52)]"
        />
      </div>

      <div style={{ animation: "omFadeUp 1s ease .1s both" }}>
        <div className="mb-[18px] text-xs tracking-[0.42em] text-ifa-sage">
          THE DIGITAL HOUSE OF IFÁ
        </div>
        <h1 className="m-0 font-serif text-6xl font-medium leading-none tracking-[0.04em] text-ifa-cream sm:text-8xl">
          Online <span className="text-ifa-gold">Ifá</span>
        </h1>
        <p className="mx-auto mt-[26px] max-w-[560px] text-[19px] leading-relaxed text-ifa-cream/75">
          A respectful home for one of humanity&rsquo;s oldest knowledge systems: philosophy, poetry,
          memory and mathematics, recognised by UNESCO as cultural heritage.
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
