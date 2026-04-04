import { type Match } from "@/data/matches";
import { formatDateShort } from "@/lib/utils";
import { Home, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export function MatchRow({ match }: { match: Match }) {
  const isWin =
    match.isFinished && match.result
      ? (() => {
          const [home, away] = match.result.split(":").map(Number);
          return match.isHome ? home > away : away > home;
        })()
      : false;

  const isDraw =
    match.isFinished && match.result
      ? match.result.split(":")[0] === match.result.split(":")[1]
      : false;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0 hover:bg-surface-alt/50 px-4 -mx-4 rounded-[5px] transition-colors">
      {/* Date */}
      <div className="w-12 shrink-0 text-center">
        <p className="font-heading text-base font-600 text-text">{formatDateShort(match.date)}</p>
        <p className="text-xs text-text-muted">{match.time}</p>
      </div>

      {/* H/A indicator */}
      <div className="w-6 shrink-0 flex justify-center">
        {match.isHome ? (
          <Home size={14} className="text-primary" aria-label="Heimspiel" />
        ) : (
          <Plane size={14} className="text-text-muted" aria-label="Auswärtsspiel" />
        )}
      </div>

      {/* Teams */}
      <div className="flex-1 min-w-0">
        <p className="font-heading font-600 text-sm text-text uppercase leading-tight truncate">
          {match.homeTeam}
        </p>
        <p className="font-heading font-600 text-sm text-text uppercase leading-tight truncate">
          {match.awayTeam}
        </p>
      </div>

      {/* Result / Status */}
      <div className="shrink-0 text-right">
        {match.isFinished && match.result ? (
          <span
            className={cn(
              "font-heading text-lg font-700 px-2",
              isDraw
                ? "text-text-muted"
                : isWin
                ? "text-green-600"
                : "text-primary"
            )}
          >
            {match.result}
          </span>
        ) : (
          <span className="text-xs font-body text-text-muted bg-surface-alt px-2 py-1 rounded-[4px]">
            {match.competition}
          </span>
        )}
      </div>
    </div>
  );
}
