import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Ifá — Learn & Consult",
  description:
    "An educational Ifá app that separates Odù facts from interpretations. Original, licensed, or contributor-reviewed content only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- site-wide
            display fonts loaded as a stylesheet (not next/font) so builds never
            depend on fetching font binaries at compile time; see src/app/lab. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..500&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
