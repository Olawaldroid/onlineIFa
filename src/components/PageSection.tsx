// Full-bleed section wrapper for the primary IFA LAB-styled pages — an
// edge-to-edge background with a centred max-width content column, matching
// /lab's section rhythm. tone picks the background/text pairing.
const TONES = {
  dark: "bg-ifa-bg text-ifa-cream",
  light: "bg-ifa-paper text-ifa-ink",
  deep: "border-t border-ifa-border bg-ifa-deep text-ifa-cream",
} as const;

export function PageSection({
  id,
  tone = "dark",
  className = "",
  innerClassName = "",
  children,
}: {
  id?: string;
  tone?: keyof typeof TONES;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`px-6 py-20 sm:px-10 sm:py-[110px] ${TONES[tone]} ${className}`}>
      <div className={`mx-auto max-w-[1120px] ${innerClassName}`}>{children}</div>
    </section>
  );
}
