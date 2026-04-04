import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, User, Mail, Phone } from "lucide-react";
import { teams } from "@/data/players";
import { getKader, getTrainer, type SheetPlayer, type SheetTrainer } from "@/lib/sheets";

type Props = { params: { team: string } };

const DETAIL_TEAMS = ["km", "1b", "ah"];

export function generateStaticParams() {
  return DETAIL_TEAMS.map((team) => ({ team }));
}

export function generateMetadata({ params }: Props): Metadata {
  const team = teams.find((t) => t.id === params.team);
  if (!team) return { title: "Nicht gefunden" };
  return {
    title: team.name,
    description: `Kader der ${team.name} des FC Schwarzach.`,
  };
}

// Reihenfolge der Positionsgruppen
const POSITIONS = ["Torwart", "Abwehr", "Mittelfeld", "Sturm", "Ohne"];

const positionColor: Record<string, string> = {
  Torwart:   "bg-yellow-50 text-yellow-700",
  Abwehr:    "bg-blue-50 text-blue-700",
  Mittelfeld:"bg-green-50 text-green-700",
  Sturm:     "bg-primary/10 text-primary",
  Ohne:      "bg-surface-alt text-text-muted",
};

// ── Trainer-Karte ──────────────────────────────────────────────────────────────
function TrainerCard({ trainer }: { trainer: SheetTrainer }) {
  return (
    <div className="bg-white border border-border rounded-[5px] overflow-hidden hover:border-primary hover:shadow-sm transition-all">
      <div className="bg-surface-alt h-40 relative overflow-hidden">
        {trainer.fotoUrl ? (
          <Image
            src={trainer.fotoUrl}
            alt={trainer.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <User size={24} className="text-primary/40" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 space-y-1.5">
        <p className="font-heading font-700 text-sm text-text uppercase leading-tight">
          {trainer.name}
        </p>
        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-[4px] uppercase tracking-wide bg-primary/10 text-primary">
          {trainer.funktion || "Trainer"}
        </span>
        {trainer.email && (
          <a
            href={`mailto:${trainer.email}`}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors pt-0.5"
          >
            <Mail size={11} className="shrink-0" />
            <span className="truncate">{trainer.email}</span>
          </a>
        )}
        {trainer.tel && (
          <a
            href={`tel:${trainer.tel}`}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors"
          >
            <Phone size={11} className="shrink-0" />
            {trainer.tel}
          </a>
        )}
      </div>
    </div>
  );
}

// ── Spieler-Karte ──────────────────────────────────────────────────────────────
function PlayerCard({ player }: { player: SheetPlayer }) {
  return (
    <div className="bg-white border border-border rounded-[5px] overflow-hidden hover:border-primary hover:shadow-sm transition-all">
      <div className="bg-surface-alt h-40 relative overflow-hidden">
        {player.fotoUrl ? (
          <Image
            src={player.fotoUrl}
            alt={player.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <User size={24} className="text-primary/40" />
              </div>
              <p className="font-heading text-2xl font-700 text-primary/30 mt-1">
                #{player.nummer}
              </p>
            </div>
          </div>
        )}
        <span className="absolute top-2 left-2 bg-primary text-white font-heading font-700 text-xs px-2 py-0.5 rounded-[4px]">
          #{player.nummer}
        </span>
      </div>
      <div className="p-4">
        <p className="font-heading font-600 text-sm text-text uppercase leading-tight">
          {player.name}
        </p>
        <span
          className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-[4px] uppercase tracking-wide ${
            positionColor[player.position] ?? "bg-surface-alt text-text-muted"
          }`}
        >
          {player.position || "—"}
        </span>
      </div>
    </div>
  );
}

// ── Seite ──────────────────────────────────────────────────────────────────────
export default async function TeamDetailPage({ params }: Props) {
  const team = teams.find((t) => t.id === params.team);
  if (!team || !DETAIL_TEAMS.includes(params.team)) notFound();

  // Kader aus Google Sheets (nur KM und 1b)
  let roster: SheetPlayer[] = [];
  if (params.team === "km") roster = await getKader("KaderKM");
  else if (params.team === "1b") roster = await getKader("Kader1b");

  // Trainer aus Google Sheets, gefiltert nach Mannschaft
  const allTrainer = await getTrainer();
  const trainer = allTrainer.filter(
    (t) => t.mannschaft.trim().toLowerCase() === team.shortName.toLowerCase()
  );

  // Spieler nach Position gruppieren
  const grouped = POSITIONS.map((pos) => ({
    pos,
    players: roster.filter(
      (p) => p.position.trim().toLowerCase() === pos.toLowerCase()
    ),
  })).filter((g) => g.players.length > 0);

  // Spieler ohne bekannte Position
  const ungrouped = roster.filter(
    (p) => !POSITIONS.some((pos) => pos.toLowerCase() === p.position.trim().toLowerCase())
  );

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/mannschaften"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ChevronLeft size={14} /> Alle Mannschaften
          </Link>
          <p className="font-heading text-sm font-600 uppercase tracking-widest text-white/60 mb-1">
            {team.league}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-700 text-white uppercase">
            {team.name}
          </h1>
          <p className="text-white/80 font-body mt-2 max-w-xl">{team.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Trainerteam */}
        {trainer.length > 0 && (
          <section>
            <h2 className="font-heading text-xl font-700 text-text uppercase mb-6 pb-2 border-b border-border">
              Trainerteam
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {trainer.map((t, i) => (
                <TrainerCard key={i} trainer={t} />
              ))}
            </div>
          </section>
        )}

        {/* Kader */}
        {roster.length > 0 ? (
          <section>
            <h2 className="font-heading text-xl font-700 text-text uppercase mb-8 pb-2 border-b border-border">
              Kader {new Date().getFullYear()}/{new Date().getFullYear() + 1}
            </h2>

            {grouped.map(({ pos, players }) => (
              <div key={pos} className="mb-10">
                <h3 className="font-heading text-sm font-600 uppercase tracking-widest text-text-muted mb-4">
                  {pos}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {players
                    .sort((a, b) => a.nummer - b.nummer)
                    .map((p, i) => (
                      <PlayerCard key={i} player={p} />
                    ))}
                </div>
              </div>
            ))}

            {ungrouped.length > 0 && (
              <div className="mb-10">
                <h3 className="font-heading text-sm font-600 uppercase tracking-widest text-text-muted mb-4">
                  Weitere Spieler
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {ungrouped
                    .sort((a, b) => a.nummer - b.nummer)
                    .map((p, i) => (
                      <PlayerCard key={i} player={p} />
                    ))}
                </div>
              </div>
            )}
          </section>
        ) : (
          <div className="bg-surface-alt rounded-[5px] p-12 text-center">
            <p className="font-heading text-lg font-600 text-text-muted uppercase">
              Kader wird noch ergänzt
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
