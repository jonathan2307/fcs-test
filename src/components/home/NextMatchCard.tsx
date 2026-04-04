"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { matches, type Match } from "@/data/matches";
import { formatDateLong } from "@/lib/utils";

function MatchCard({ match, label }: { match: Match; label: string }) {
  return (
    <div className="bg-white rounded-[5px] border border-border overflow-hidden shadow-sm">
      <div className="bg-primary h-1.5" />
      <div className="p-6">
        <span className="inline-block text-xs font-semibold font-heading uppercase tracking-wide text-primary mb-4">
          {label}
        </span>

        {/* Teams */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="text-center flex-1">
            <p className="font-heading text-lg sm:text-xl font-700 text-text uppercase leading-tight">
              {match.homeTeam}
            </p>
          </div>
          <div className="shrink-0">
            <span className="font-heading text-2xl font-700 text-primary">VS</span>
          </div>
          <div className="text-center flex-1">
            <p className="font-heading text-lg sm:text-xl font-700 text-text uppercase leading-tight">
              {match.awayTeam}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 text-sm text-text-muted border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary shrink-0" />
            <span>{formatDateLong(match.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-primary shrink-0" />
            <span>{match.time} Uhr</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary shrink-0" />
            <span>{match.venue}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-block text-xs font-semibold bg-surface-alt text-text-muted px-3 py-1 rounded-[5px]">
            {match.competition}
          </span>
        </div>
      </div>
    </div>
  );
}

export function NextMatchCard() {
  const nextKM = matches.find((m) => !m.isFinished && m.team === "KM");
  const next1b = matches.find((m) => !m.isFinished && m.team === "1b");

  if (!nextKM && !next1b) return null;

  return (
    <section className="py-14 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-heading text-sm font-600 uppercase tracking-widest text-primary mb-2">
                Nächste Spiele
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-700 text-text uppercase">
                Spielvorschau
              </h2>
            </div>
            <Link
              href="/spielplan"
              className="hidden sm:inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
            >
              Alle Spiele <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nextKM && <MatchCard match={nextKM} label="Kampfmannschaft" />}
            {next1b && <MatchCard match={next1b} label="1b" />}
          </div>

          <div className="mt-6 sm:hidden text-center">
            <Link
              href="/spielplan"
              className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
            >
              Alle Spiele <ChevronRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
