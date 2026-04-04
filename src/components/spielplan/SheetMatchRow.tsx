import { type SheetMatch } from "@/lib/sheets";
import { Home, Plane, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

function formatDatum(datum: string): { day: string; weekday: string } {
  // Handles both "2025-08-16" and "16.08.2025" formats
  let date: Date;
  if (datum.includes("-")) {
    date = new Date(datum + "T00:00:00"); // avoid UTC offset shift
  } else if (datum.includes(".")) {
    const [d, m, y] = datum.split(".");
    date = new Date(`${y}-${m}-${d}T00:00:00`);
  } else {
    return { day: datum, weekday: "" };
  }
  if (isNaN(date.getTime())) return { day: datum, weekday: "" };
  const day = date.toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit" });
  const weekday = WEEKDAYS[date.getDay()];
  return { day, weekday };
}

function resultColor(match: SheetMatch): string {
  const h = parseInt(match.ergebnis_heim, 10);
  const g = parseInt(match.ergebnis_gast, 10);
  if (isNaN(h) || isNaN(g)) return "text-text-muted";
  if (h === g) return "text-text-muted";
  const fcsWon = match.fcsIsHome ? h > g : g > h;
  return fcsWon ? "text-green-600" : "text-primary";
}

export function SheetMatchRow({ match }: { match: SheetMatch }) {
  const { day, weekday } = formatDatum(match.datum);
  const result = match.isFinished
    ? `${match.ergebnis_heim}:${match.ergebnis_gast}`
    : null;

  return (
    <div className="py-4 border-b border-border last:border-0 hover:bg-surface-alt/40 px-4 -mx-4 rounded-[5px] transition-colors">
      <div className="flex items-center gap-3">
        {/* Date + time */}
        <div className="w-14 shrink-0 text-center">
          {weekday && (
            <p className="text-[10px] font-body font-semibold text-text-muted uppercase tracking-wide">
              {weekday}
            </p>
          )}
          <p className="font-heading text-sm font-600 text-text leading-tight">{day}</p>
          <p className="text-xs text-text-muted">{match.uhrzeit}</p>
        </div>

        {/* H/A icon */}
        <div className="w-5 shrink-0 flex justify-center">
          {match.fcsIsHome ? (
            <Home size={13} className="text-primary" aria-label="Heimspiel" />
          ) : (
            <Plane size={13} className="text-text-muted" aria-label="Auswärtsspiel" />
          )}
        </div>

        {/* Teams */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-heading font-600 text-sm uppercase leading-tight truncate",
              match.fcsIsHome ? "text-primary" : "text-text"
            )}
          >
            {match.heim}
          </p>
          <p
            className={cn(
              "font-heading font-600 text-sm uppercase leading-tight truncate",
              !match.fcsIsHome ? "text-primary" : "text-text"
            )}
          >
            {match.gast}
          </p>
        </div>

        {/* Result or Runde badge */}
        <div className="shrink-0 text-right min-w-[52px]">
          {result ? (
            <span
              className={cn(
                "font-heading text-xl font-700 tabular-nums",
                resultColor(match)
              )}
            >
              {result}
            </span>
          ) : (
            <span className="text-[11px] font-body font-semibold text-text-muted bg-surface-alt px-2 py-1 rounded-[4px] whitespace-nowrap">
              {match.runde ? `Runde ${match.runde}` : match.liga}
            </span>
          )}
        </div>
      </div>

      {/* Location – only for upcoming matches */}
      {!match.isFinished && match.ort && (
        <div className="flex items-center gap-1.5 mt-1.5 pl-[76px]">
          <MapPin size={11} className="text-text-muted shrink-0" />
          <p className="text-[11px] text-text-muted font-body truncate">{match.ort}</p>
        </div>
      )}
    </div>
  );
}
