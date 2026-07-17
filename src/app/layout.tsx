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
      <body>{children}</body>
    </html>
  );
}
