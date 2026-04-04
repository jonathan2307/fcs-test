import { type SheetTableRow } from "@/lib/sheets";
import { cn } from "@/lib/utils";

export function LeagueTable({ rows }: { rows: SheetTableRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="bg-primary text-white">
            <th className="px-3 py-2.5 text-left font-heading font-600 text-xs uppercase tracking-wide w-8">
              #
            </th>
            <th className="px-3 py-2.5 text-left font-heading font-600 text-xs uppercase tracking-wide">
              Verein
            </th>
            <th className="px-3 py-2.5 text-center font-heading font-600 text-xs uppercase tracking-wide">
              Sp
            </th>
            <th className="px-3 py-2.5 text-center font-heading font-600 text-xs uppercase tracking-wide hidden sm:table-cell">
              G
            </th>
            <th className="px-3 py-2.5 text-center font-heading font-600 text-xs uppercase tracking-wide hidden sm:table-cell">
              U
            </th>
            <th className="px-3 py-2.5 text-center font-heading font-600 text-xs uppercase tracking-wide hidden sm:table-cell">
              V
            </th>
            <th className="px-3 py-2.5 text-center font-heading font-600 text-xs uppercase tracking-wide hidden md:table-cell">
              Tore
            </th>
            <th className="px-3 py-2.5 text-center font-heading font-600 text-xs uppercase tracking-wide">
              Pkt
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-b border-border transition-colors",
                row.isFCS ? "bg-primary/5" : "bg-white hover:bg-surface-alt"
              )}
            >
              <td className="px-3 py-2.5 text-text-muted text-center">{row.rang}</td>
              <td
                className={cn(
                  "px-3 py-2.5 font-body",
                  row.isFCS ? "text-primary font-bold" : "text-text"
                )}
              >
                {row.mannschaft}
              </td>
              <td className="px-3 py-2.5 text-center text-text-muted">{row.spiele}</td>
              <td className="px-3 py-2.5 text-center text-text-muted hidden sm:table-cell">
                {row.siege}
              </td>
              <td className="px-3 py-2.5 text-center text-text-muted hidden sm:table-cell">
                {row.unentschieden}
              </td>
              <td className="px-3 py-2.5 text-center text-text-muted hidden sm:table-cell">
                {row.niederlagen}
              </td>
              <td className="px-3 py-2.5 text-center text-text-muted hidden md:table-cell">
                {row.tore_plus}:{row.tore_minus}
              </td>
              <td
                className={cn(
                  "px-3 py-2.5 text-center font-heading font-700",
                  row.isFCS ? "text-primary" : "text-text"
                )}
              >
                {row.punkte}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
