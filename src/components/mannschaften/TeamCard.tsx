import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type teams } from "@/data/players";

type Team = (typeof teams)[number];

export function TeamCard({ team, fotoUrl }: { team: Team; fotoUrl?: string | null }) {
  return (
    <Link href={`/mannschaften/${team.id}`} className="group block">
      <div className="bg-white border border-border rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary h-full flex flex-col">
        {/* Foto oder Fallback */}
        {fotoUrl ? (
          <div className="relative overflow-hidden aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotoUrl}
              alt={`${team.name} Mannschaftsfoto`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4">
              <span className="font-heading text-xs font-600 uppercase tracking-widest text-white/70">
                {team.league}
              </span>
              <p className="font-heading text-xl font-700 text-white uppercase leading-tight">
                {team.name}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-primary h-1.5" />
            <div className="px-6 pt-6 pb-2">
              <span className="font-heading text-4xl font-700 text-primary/20 leading-none">
                {team.shortName}
              </span>
              <h3 className="font-heading text-xl font-700 text-text uppercase leading-tight mt-1 group-hover:text-primary transition-colors">
                {team.name}
              </h3>
              <p className="text-xs font-body font-semibold text-text-muted uppercase tracking-wide mt-0.5">
                {team.league}
              </p>
            </div>
          </>
        )}

        <div className="p-5 flex flex-col flex-1">
          <p className="text-sm text-text-muted font-body leading-relaxed flex-1">
            {team.description}
          </p>
          <div className="mt-5 flex items-center gap-1 text-primary text-sm font-semibold">
            Zur Mannschaft <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
