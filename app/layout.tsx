import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karim & Salma — Our Engagement",
  description: "Join Karim and Salma on 25 September 2026 at 7:00 PM at Viola Hall.",
  openGraph: {
    title: "Karim & Salma — 25.09.2026",
    description: "25 September 2026 · 7:00 PM · Viola Hall",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
