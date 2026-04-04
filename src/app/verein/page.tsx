import type { Metadata } from "next";
import { getMitglieder } from "@/lib/sheets";
import { Timeline } from "@/components/verein/Timeline";
import { BoardCard } from "@/components/verein/BoardCard";

export const metadata: Metadata = {
  title: "Verein",
  description:
    "Geschichte, Vorstand und Werte des FC Schwarzach – seit 1955 Leidenschaft für Fußball in Vorarlberg.",
};

export const dynamic = "force-dynamic";

export default async function VereinPage() {
  const mitglieder = await getMitglieder();

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-sm font-600 uppercase tracking-widest text-white/60 mb-1">
            FC Schwarzach
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-700 text-white uppercase">
            Unser Verein
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">
        {/* History */}
        <section>
          <div className="max-w-2xl mb-10">
            <p className="font-heading text-sm font-600 uppercase tracking-widest text-primary mb-1">
              Geschichte
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-700 text-text uppercase mb-4">
              70 Jahre FC Schwarzach
            </h2>
            <p className="font-body text-text-muted leading-relaxed">
              Seit der Gründung im Jahr 1955 ist der FC Schwarzach ein fester Bestandteil des
              sportlichen und gesellschaftlichen Lebens in Schwarzach, Vorarlberg. Was als kleiner
              Dorfclub begann, ist heute ein lebendiger Verein mit über 250 Mitgliedern und 10
              Mannschaften.
            </p>
          </div>
          <Timeline />
        </section>

        {/* Values */}
        <section className="bg-surface-warm rounded-[5px] p-8 sm:p-12">
          <p className="font-heading text-sm font-600 uppercase tracking-widest text-primary mb-1">
            Unsere Werte
          </p>
          <h2 className="font-heading text-3xl font-700 text-text uppercase mb-8">
            Was uns antreibt
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Leidenschaft",
                desc: "Fußball ist mehr als ein Sport – er ist unsere Leidenschaft. Mit vollem Einsatz und Herzblut treten wir auf jedem Platz an.",
              },
              {
                title: "Zusammenhalt",
                desc: "Wir sind mehr als eine Mannschaft. Als Verein stehen wir füreinander ein – auf und neben dem Platz.",
              },
              {
                title: "Verwurzelung",
                desc: "Als Verein aus Schwarzach fühlen wir uns unserer Region und Gemeinschaft verpflichtet. Heimat ist uns wichtig.",
              },
            ].map((v) => (
              <div key={v.title}>
                <h3 className="font-heading text-xl font-700 text-text uppercase mb-2">{v.title}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Board */}
        <section>
          <p className="font-heading text-sm font-600 uppercase tracking-widest text-primary mb-1">
            Vorstand
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-700 text-text uppercase mb-8">
            Funktionäre & Vorstand
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {mitglieder.map((member, i) => (
              <BoardCard key={i} member={member} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
