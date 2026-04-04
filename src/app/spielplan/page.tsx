import type { Metadata } from "next";
import { getSpielplan, getTabelle } from "@/lib/sheets";
import { SpielplanClient } from "@/components/spielplan/SpielplanClient";

export const metadata: Metadata = {
  title: "Spielplan & Ergebnisse",
  description:
    "Aktuelle Spielpläne, Ergebnisse und Tabelle der Mannschaften des FC Schwarzach.",
};

// Always render at request time so data is never stale
export const dynamic = "force-dynamic";

export default async function SpielplanPage() {
  const [matchesKM, matches1b, tabelleKM, tabelle1b] = await Promise.all([
    getSpielplan("SpielplanKM"),
    getSpielplan("Spielplan1b"),
    getTabelle("TabelleKM"),
    getTabelle("Tabelle1b"),
  ]);

  const ligaNameKM = tabelleKM.find((r) => r.isFCS)
    ? matchesKM.find((m) => m.liga)?.liga ?? "Tabelle"
    : "Tabelle";
  const ligaName1b = tabelle1b.find((r) => r.isFCS)
    ? matches1b.find((m) => m.liga)?.liga ?? "Tabelle"
    : "Tabelle";

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-sm font-600 uppercase tracking-widest text-white/60 mb-1">
            FC Schwarzach
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-700 text-white uppercase">
            Spielplan & Ergebnisse
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SpielplanClient
          matchesKM={matchesKM}
          matches1b={matches1b}
          tabelleKM={tabelleKM}
          tabelle1b={tabelle1b}
          ligaNameKM={ligaNameKM}
          ligaName1b={ligaName1b}
        />
      </div>
    </div>
  );
}
