// The spinning Ọpọn Ifá emblem used on the homepage hero — a smaller sibling
// of src/app/lab/components/Hero.tsx's tray, kept independent so the (site)
// group and /lab stay decoupled.

const NOTCHES = Array.from({ length: 16 }, (_, i) => `rotate(${i * 22.5}deg) translateY(-118px) translateX(-1.5px)`);
const EMBLEM_LEGS = ["ǀ", "ǀ ǀ", "ǀ", "ǀ ǀ"];

export function OduEmblem() {
  return (
    <div className="relative mx-auto h-[248px] w-[248px]">
      <div
        className="absolute inset-0 rounded-full border-8 border-ifa-border"
        style={{
          background: "radial-gradient(circle at 38% 32%, #4a3623, #2b2016 55%, #211812 100%)",
          boxShadow: "0 24px 60px rgba(0,0,0,.55), 0 0 44px rgba(201,162,39,.12) inset",
        }}
      />
      <div
        className="absolute inset-2.5 rounded-full border-2 border-dashed border-ifa-gold/35"
        style={{ animation: "omSpin 46s linear infinite" }}
      />
      <div className="absolute inset-[22px] rounded-full border border-ifa-gold/[0.22]" />
      {NOTCHES.map((tf, i) => (
        <div key={i} className="absolute left-1/2 top-1/2 h-3 w-[2.5px] rounded-sm bg-ifa-gold/50" style={{ transform: tf }} />
      ))}
      <div
        className="absolute inset-12 flex items-center justify-center gap-5 rounded-full font-mono text-base tracking-[0.1em] text-ifa-gold"
        style={{
          background: "radial-gradient(circle, rgba(243,233,217,.14), rgba(243,233,217,.05) 70%, transparent)",
          animation: "omGlow 5s ease-in-out infinite",
        }}
      >
        {[0, 1].map((col) => (
          <div key={col} className="flex flex-col gap-2">
            {EMBLEM_LEGS.map((leg, i) => (
              <span key={i}>{leg}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
