import type { Metadata } from "next";
import { teams } from "@/data/players";
import { getMannschaftsfotos } from "@/lib/sheets";
import { TeamCard } from "@/components/mannschaften/TeamCard";

export const metadata: Metadata = {
  title: "Mannschaften",
  description:
    "Alle Mannschaften des FC Schwarzach – Kampfmannschaft, 1b, Alte Herren und Nachwuchs.",
};

export default async function MannschaftenPage() {
  const fotos = await getMannschaftsfotos();
  const fotoMap = Object.fromEntries(fotos.map((f) => [f.mannschaft, f.bildUrl]));

  const seniorTeams = teams.filter((t) => ["km", "1b", "ah"].includes(t.id));
  const youthTeams = teams.filter((t) => !["km", "1b", "ah"].includes(t.id));

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-sm font-600 uppercase tracking-widest text-white/60 mb-1">
            FC Schwarzach
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-700 text-white uppercase">
            Unsere Mannschaften
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* Senioren */}
        <section>
          <h2 className="font-heading text-2xl font-700 text-text uppercase mb-6 pb-3 border-b border-border">
            Senioren
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seniorTeams.map((team) => (
              <TeamCard key={team.id} team={team} fotoUrl={fotoMap[team.id] ?? null} />
            ))}
          </div>
        </section>

        {/* Nachwuchs */}
        <section>
          <h2 className="font-heading text-2xl font-700 text-text uppercase mb-2 pb-3 border-b border-border">
            Nachwuchs
          </h2>
          <p className="text-sm text-text-muted font-body mb-6">
            Im Rahmen der <strong>SG Hofsteig</strong> – Nachwuchsfußball von U10 bis U16.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {youthTeams.map((team) => {
              const foto = fotoMap[team.id];
              return foto ? (
                <div key={team.id} className="rounded-[5px] overflow-hidden border border-border shadow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foto}
                      alt={`${team.name} Mannschaftsfoto`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3">
                      <p className="font-heading text-base font-700 text-white uppercase">
                        {team.name}
                      </p>
                      <p className="text-xs text-white/70">{team.league}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={team.id} className="bg-white border border-border rounded-[5px] overflow-hidden">
                  <div className="bg-primary h-1.5" />
                  <div className="p-5">
                    <span className="font-heading text-3xl font-700 text-primary/20 leading-none block mb-1">
                      {team.shortName}
                    </span>
                    <p className="font-heading font-700 text-base text-text uppercase leading-tight">
                      {team.name}
                    </p>
                    <p className="text-xs font-body text-text-muted mt-0.5">{team.league}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
