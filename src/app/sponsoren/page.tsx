import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { sponsors } from "@/data/sponsors";
import { SponsorCard } from "@/components/sponsoren/SponsorCard";
import { getSponsoren } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Sponsoren",
  description:
    "Unsere Partner und Sponsoren – der FC Schwarzach dankt allen Unterstützern für ihr Engagement.",
};


export default async function SponsorenPage() {
  // Bilder aus Google Sheet laden und nach Name mappen
  const sheetBilder = await getSponsoren();
  const bildMap = Object.fromEntries(
    sheetBilder.map((s) => [s.name.toLowerCase().trim(), s.bildUrl])
  );

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-sm font-600 uppercase tracking-widest text-white/60 mb-1">
            FC Schwarzach
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-700 text-white uppercase">
            Unsere Sponsoren
          </h1>
          <p className="text-white/80 font-body mt-2 max-w-xl">
            Ohne die Unterstützung unserer Partner wäre der FC Schwarzach nicht möglich. Herzlichen
            Dank an alle, die unseren Verein tragen!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sponsors.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                bildUrl={bildMap[sponsor.name.toLowerCase().trim()] ?? null}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-[5px] p-8 sm:p-12 text-white text-center">
          <h2 className="font-heading text-3xl font-700 uppercase mb-3">Sponsor werden</h2>
          <p className="font-body text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
            Unterstütze den FC Schwarzach als Sponsor und profitiere von attraktiver Sichtbarkeit
            in der Region Vorarlberg. Wir freuen uns auf deine Kontaktaufnahme.
          </p>
          <a
            href="mailto:fcschwarzach1955@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-primary font-body font-semibold px-8 py-3 rounded-[5px] hover:bg-surface-warm transition-colors text-sm uppercase tracking-wide"
          >
            <Mail size={16} />
            Kontakt aufnehmen
          </a>
          <p className="text-white/60 text-sm font-body mt-4">
            Ansprechpartner: Florian Hämmerle – Marketing & Sponsoren
          </p>
        </section>
      </div>
    </div>
  );
}
