// Shared eyebrow + title used by every numbered section of the lab page.
export function SectionHeading({
  num,
  title,
  light,
  suffix,
}: {
  num: string;
  title: React.ReactNode;
  /** true when the section sits on the light paper background */
  light?: boolean;
  suffix?: string;
}) {
  return (
    <>
      <div className={`mb-3.5 text-xs tracking-[0.34em] ${light ? "text-ifa-rust" : "text-ifa-sage"}`}>
        SECTION {num}
        {suffix ? ` · ${suffix}` : ""}
      </div>
      <h2
        className={`m-0 font-serif text-[54px] font-medium leading-[1.1] ${light ? "" : "text-ifa-cream"}`}
      >
        {title}
      </h2>
    </>
  );
}
