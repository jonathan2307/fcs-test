import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NextMatchCard } from "@/components/home/NextMatchCard";
import { NewsTeaser } from "@/components/home/NewsTeaser";
import { StatsBar } from "@/components/home/StatsBar";
import { SponsorsStrip } from "@/components/home/SponsorsStrip";
import { fetchInstagramFeed } from "@/lib/instagram-feed";
import { getSpielplan } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "FC Schwarzach – Fußballclub seit 1955",
  description:
    "Willkommen beim FC Schwarzach – Ihrem Fußballverein aus Schwarzach, Vorarlberg. Aktuelle Spielberichte, Spielplan, Mannschaften und mehr.",
};

export default async function HomePage() {
  const posts = await fetchInstagramFeed();

  const today = new Date().toISOString().split("T")[0];
  const nextKM = getSpielplan("SpielplanKM").find((m) => !m.isFinished && m.datum >= today);
  const next1b = getSpielplan("Spielplan1b").find((m) => !m.isFinished && m.datum >= today);

  return (
    <>
      <Hero />
      <NextMatchCard nextKM={nextKM} next1b={next1b} />
      <NewsTeaser posts={posts} />
      <StatsBar />
      <SponsorsStrip />
    </>
  );
}
