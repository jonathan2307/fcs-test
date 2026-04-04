import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NextMatchCard } from "@/components/home/NextMatchCard";
import { NewsTeaser } from "@/components/home/NewsTeaser";
import { StatsBar } from "@/components/home/StatsBar";
import { SponsorsStrip } from "@/components/home/SponsorsStrip";
import { fetchInstagramFeed } from "@/lib/instagram-feed";

export const metadata: Metadata = {
  title: "FC Schwarzach – Fußballclub seit 1955",
  description:
    "Willkommen beim FC Schwarzach – Ihrem Fußballverein aus Schwarzach, Vorarlberg. Aktuelle Spielberichte, Spielplan, Mannschaften und mehr.",
};

export default async function HomePage() {
  const posts = await fetchInstagramFeed();

  return (
    <>
      <Hero />
      <NextMatchCard />
      <NewsTeaser posts={posts} />
      <StatsBar />
      <SponsorsStrip />
    </>
  );
}
