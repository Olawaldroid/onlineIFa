import "./lab.css";

// Full-bleed layout for the IFA LAB experience. Loads the lab's display
// fonts (Newsreader + IBM Plex Mono) via a stylesheet link rather than
// next/font so builds never depend on fetching font binaries.
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-ifa-bg text-ifa-cream"
      style={
        {
          "--font-serif": "Newsreader, Georgia, serif",
          "--font-mono": "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
        } as React.CSSProperties
      }
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font -- fonts are
          scoped to the lab experience; next/font would make builds depend on
          fetching font binaries at compile time */}
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..500&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      {children}
    </div>
  );
}
