import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Online Ifá — Learn & Consult",
  description:
    "An educational Ifá app that separates Odù facts from interpretations. Original, licensed, or contributor-reviewed content only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mt-12 border-t border-ifa-border px-4 py-6 text-center text-xs text-ifa-sage">
          Online Ifá is an educational and cultural tool. It does not replace a
          trained Babalawo or professional advice. Interpretations are original,
          public-domain, licensed, or contributor-submitted — never copied.
        </footer>
      </body>
    </html>
  );
}
