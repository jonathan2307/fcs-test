import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { type Sponsor } from "@/data/sponsors";

const tierBadge: Record<string, string> = {
  Gold:   "bg-yellow-100 text-yellow-800",
  Silber: "bg-gray-100 text-gray-700",
  Bronze: "bg-orange-50 text-orange-700",
};

export function SponsorCard({
  sponsor,
  bildUrl,
}: {
  sponsor: Sponsor;
  bildUrl: string | null;
}) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-border rounded-[5px] overflow-hidden hover:border-primary hover:shadow-md transition-all h-full"
    >
      {/* Logo */}
      <div className="bg-surface-alt h-32 flex items-center justify-center p-4 relative">
        {bildUrl ? (
          <Image
            src={bildUrl}
            alt={`${sponsor.name} Logo`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <span className="font-heading text-2xl font-700 text-text-muted/40 uppercase tracking-wide text-center">
            {sponsor.name}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="font-heading font-700 text-base text-text uppercase group-hover:text-primary transition-colors leading-tight">
            {sponsor.name}
          </p>
          <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-[4px] ${tierBadge[sponsor.tier]}`}>
            {sponsor.tier}
          </span>
        </div>
        <p className="text-sm text-text-muted font-body leading-relaxed mb-3">
          {sponsor.description}
        </p>
        <div className="flex items-center gap-1 text-primary text-xs font-semibold">
          Website besuchen <ExternalLink size={12} />
        </div>
      </div>
    </a>
  );
}
