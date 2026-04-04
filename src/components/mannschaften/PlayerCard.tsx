import { type Player } from "@/data/players";
import { User } from "lucide-react";

const positionColor: Record<string, string> = {
  Torwart: "bg-yellow-50 text-yellow-700",
  Abwehr: "bg-blue-50 text-blue-700",
  Mittelfeld: "bg-green-50 text-green-700",
  Sturm: "bg-primary/10 text-primary",
};

export function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="bg-white border border-border rounded-[5px] overflow-hidden hover:border-primary hover:shadow-sm transition-all">
      {/* Photo placeholder */}
      <div className="bg-surface-alt h-40 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <User size={28} className="text-primary/40" />
          </div>
          <p className="font-heading text-3xl font-700 text-primary/30 mt-1">
            #{player.number}
          </p>
        </div>
      </div>

      <div className="p-4">
        <p className="font-heading font-600 text-base text-text uppercase leading-tight">
          {player.name}
        </p>
        <span
          className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-[4px] uppercase tracking-wide ${
            positionColor[player.position] ?? "bg-surface-alt text-text-muted"
          }`}
        >
          {player.position}
        </span>
      </div>
    </div>
  );
}
