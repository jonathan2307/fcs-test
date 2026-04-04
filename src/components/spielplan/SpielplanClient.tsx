"use client";

import { useState } from "react";
import { type SheetMatch, type SheetTableRow } from "@/lib/sheets";
import { SheetMatchRow } from "./SheetMatchRow";
import { LeagueTable } from "./LeagueTable";

type TabKey = "upcoming" | "results";
type TeamKey = "km" | "1b";

export function SpielplanClient({
  matchesKM,
  matches1b,
  tabelleKM,
  tabelle1b,
  ligaNameKM,
  ligaName1b,
}: {
  matchesKM: SheetMatch[];
  matches1b: SheetMatch[];
  tabelleKM: SheetTableRow[];
  tabelle1b: SheetTableRow[];
  ligaNameKM: string;
  ligaName1b: string;
}) {
  const [activeTeam, setActiveTeam] = useState<TeamKey>("km");
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

  const matches = activeTeam === "km" ? matchesKM : matches1b;
  const tabelle = activeTeam === "km" ? tabelleKM : tabelle1b;
  const ligaName = activeTeam === "km" ? ligaNameKM : ligaName1b;

  const ligas = Array.from(new Set(matches.map((m) => m.liga).filter(Boolean)));
  const [ligaFilter, setLigaFilter] = useState<string>("alle");

  const visible = matches.filter((m) => {
    const statusOk = activeTab === "upcoming" ? !m.isFinished : m.isFinished;
    const ligaOk = ligaFilter === "alle" || m.liga === ligaFilter;
    return statusOk && ligaOk;
  });

  const upcoming = matches.filter((m) => !m.isFinished);
  const results = matches.filter((m) => m.isFinished);

  function switchTeam(team: TeamKey) {
    setActiveTeam(team);
    setActiveTab("upcoming");
    setLigaFilter("alle");
  }

  return (
    <div className="space-y-6">
      {/* Team-Umschalter KM / 1b */}
      <div className="flex gap-2">
        {([["km", "Kampfmannschaft"], ["1b", "1b Mannschaft"]] as [TeamKey, string][]).map(
          ([key, label]) => (
            <button
              key={key}
              onClick={() => switchTeam(key)}
              className={`px-5 py-2 rounded-[5px] font-heading text-sm font-600 uppercase tracking-wide transition-colors ${
                activeTeam === key
                  ? "bg-primary text-white"
                  : "bg-surface-alt text-text-muted hover:bg-border hover:text-text"
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* ── Main column ── */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex border-b border-border mb-5">
            {(["upcoming", "results"] as TabKey[]).map((tab) => {
              const count = tab === "upcoming" ? upcoming.length : results.length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-3 font-heading text-sm font-600 uppercase tracking-wide transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text"
                  }`}
                >
                  {tab === "upcoming" ? "Kommende Spiele" : "Ergebnisse"}
                  {count > 0 && (
                    <span className="ml-2 text-xs bg-surface-alt text-text-muted rounded-full px-1.5 py-0.5 font-body font-semibold">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Liga filter – only shown when multiple ligas exist */}
          {ligas.length > 1 && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <button
                onClick={() => setLigaFilter("alle")}
                className={`px-4 py-1.5 rounded-[5px] text-sm font-body font-semibold transition-colors ${
                  ligaFilter === "alle"
                    ? "bg-primary text-white"
                    : "bg-surface-alt text-text-muted hover:bg-border hover:text-text"
                }`}
              >
                Alle
              </button>
              {ligas.map((liga) => (
                <button
                  key={liga}
                  onClick={() => setLigaFilter(liga)}
                  className={`px-4 py-1.5 rounded-[5px] text-sm font-body font-semibold transition-colors ${
                    ligaFilter === liga
                      ? "bg-primary text-white"
                      : "bg-surface-alt text-text-muted hover:bg-border hover:text-text"
                  }`}
                >
                  {liga}
                </button>
              ))}
            </div>
          )}

          {/* Match list */}
          <div className="bg-white border border-border rounded-[5px] p-4">
            {visible.length > 0 ? (
              visible.map((match, i) => <SheetMatchRow key={i} match={match} />)
            ) : (
              <div className="py-12 text-center">
                <p className="font-heading text-lg font-600 text-text-muted uppercase">
                  Keine Spiele gefunden
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar: league table ── */}
        <div className="mt-10 lg:mt-0">
          <h2 className="font-heading text-xl font-700 text-text uppercase mb-4">{ligaName}</h2>
          {tabelle.length > 0 ? (
            <>
              <div className="bg-white border border-border rounded-[5px] overflow-hidden">
                <LeagueTable rows={tabelle} />
              </div>
              <p className="text-xs text-text-muted mt-2 font-body">
                Stand wird automatisch aus dem Google Sheet geladen.
              </p>
            </>
          ) : (
            <div className="bg-surface-alt rounded-[5px] p-6 text-center">
              <p className="text-sm text-text-muted font-body">Tabelle nicht verfügbar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
