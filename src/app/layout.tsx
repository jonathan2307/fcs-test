import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FC Schwarzach – Fußballclub seit 1955",
    template: "%s | FC Schwarzach",
  },
  description:
    "Offizieller Webauftritt des FC Schwarzach – Fußballverein aus Schwarzach, Vorarlberg. Gegründet 1955. Aktuelle Spielberichte, Spielplan, Mannschaften und mehr.",
  keywords: ["FC Schwarzach", "Fußball", "Vorarlberg", "Schwarzach", "3. Landesklasse"],
  openGraph: {
    siteName: "FC Schwarzach",
    locale: "de_AT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-background text-text font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
