// Renders a binary-style Odù signature as two columns of marks.
// "1" = single mark (|), "2" = double mark (||).

export function SignatureDisplay({ signature }: { signature: string }) {
  const [right, left] = signature.split("|");
  const rows = right?.length ?? 0;

  return (
    <div className="inline-flex gap-6 rounded-lg border border-ifa-border bg-ifa-bg/40 px-6 py-3">
      <Leg leg={left} label="Left" rows={rows} />
      <Leg leg={right} label="Right" rows={rows} />
    </div>
  );
}

function Leg({ leg, label, rows }: { leg?: string; label: string; rows: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: rows }).map((_, i) => {
        const mark = leg?.[i];
        return (
          <div key={i} className="signature-mark text-lg text-ifa-gold">
            {mark === "1" ? "|" : "| |"}
          </div>
        );
      })}
      <span className="mt-1 text-xs text-ifa-sage">{label}</span>
    </div>
  );
}
