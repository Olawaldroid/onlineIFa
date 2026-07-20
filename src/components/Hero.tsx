import Link from "next/link";

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

/** The emblem's leg pattern (ǀ, ǀǀ, ǀ, ǀǀ), pressed into the sand on both columns. */
const EMBLEM_LEGS = [1, 2, 1, 2];

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

      {/* The ọpọn Ifá — carved notched rim, Èṣù face at the head, ìyẹ̀rọ̀sùn
          sand centre with the emblem pressed into it. Same tray language as
          the consultation's CastingStage so the two boards read as one. */}
      <div className="relative mb-11 aspect-square h-auto w-[76vw] max-w-[330px]">
        <div className="absolute -inset-3 rounded-full border border-ifa-gold/25" />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 40% 32%, #5a3d24, #3a2817 72%)",
            boxShadow: "0 30px 80px rgba(0,0,0,.6), inset 0 2px 6px rgba(255,255,255,.08)",
          }}
        />
        <div className="lab-tray-rim absolute inset-1 rounded-full opacity-90" />
        <div className="absolute inset-[18px] rounded-full border-[3px] border-ifa-gold/[0.28]" />
        <div className="lab-tray-rays absolute inset-[26px] rounded-full" />
        <div
          className="absolute left-1/2 top-[7px] z-[2] flex h-[52px] w-[42px] -translate-x-1/2 flex-col items-center justify-center gap-[5px] border-2 border-[#2e2012] shadow-[0_4px_10px_rgba(0,0,0,.45)]"
          style={{ borderRadius: "50% 50% 42% 42%", background: "linear-gradient(#6b4426,#3f2917)" }}
        >
          <div className="flex gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1f1711]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#1f1711]" />
          </div>
          <div className="h-3 w-[3px] rounded-sm bg-[#1f1711]" />
        </div>
        <div
          className="absolute inset-[54px] shadow-[inset_0_8px_20px_rgba(90,61,36,.45),inset_0_-3px_10px_rgba(255,255,255,.25)]"
          style={{
            borderRadius: "48% 52% 51% 49%",
            background: "radial-gradient(circle at 44% 38%, #ecd9a8, #dcc389 58%, #c9ac70 88%, #b8985c)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage:
                "radial-gradient(rgba(120,84,44,.22) 1px, transparent 1.4px), radial-gradient(rgba(255,246,220,.55) 1px, transparent 1.3px)",
              backgroundSize: "9px 9px, 13px 13px",
              backgroundPosition: "0 0, 5px 7px",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,246,220,.35), transparent 72%)",
              animation: "omGlow 5s ease-in-out infinite",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center gap-11">
            {[0, 1].map((col) => (
              <div key={col} className="flex flex-col gap-3">
                {EMBLEM_LEGS.map((count, i) => (
                  <div key={i} className="flex items-center justify-center gap-2.5">
                    {Array.from({ length: count }, (_, k) => (
                      <div key={k} className="lab-sand-mark" style={{ animationDelay: `${(col * 4 + i) * 0.12}s` }} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
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
