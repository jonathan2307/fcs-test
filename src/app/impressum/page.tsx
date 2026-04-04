import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Informationen des FC Schwarzach.",
};

export default function ImpressumPage() {
  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ChevronLeft size={14} /> Zurück zur Startseite
          </Link>
          <h1 className="font-heading text-4xl sm:text-5xl font-700 text-white uppercase">
            Impressum
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-10 font-body text-text">
          <section>
            <h2 className="font-heading text-xl font-700 text-text uppercase mb-4 pb-2 border-b border-border">
              Informationen gemäß § 5 ECG
            </h2>
            <div className="space-y-2 text-sm text-text-muted leading-relaxed">
              <p><strong className="text-text">Vereinsname:</strong> FC Schwarzach</p>
              <p><strong className="text-text">Rechtsform:</strong> Verein (ZVR-Zahl: wird ergänzt)</p>
              <p><strong className="text-text">Vereinssitz:</strong> Klosterwiesweg 31, 6858 Schwarzach, Österreich</p>
              <p><strong className="text-text">Gegründet:</strong> 1955</p>
              <p><strong className="text-text">Obmann:</strong> Roman Eder</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-700 text-text uppercase mb-4 pb-2 border-b border-border">
              Kontakt
            </h2>
            <div className="space-y-2 text-sm text-text-muted leading-relaxed">
              <p>
                <strong className="text-text">E-Mail:</strong>{" "}
                <a href="mailto:fcschwarzach1955@gmail.com" className="text-primary hover:underline">
                  fcschwarzach1955@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-text">Telefon:</strong>{" "}
                <a href="tel:+43557241400" className="text-primary hover:underline">
                  +43 5572 / 41400
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-700 text-text uppercase mb-4 pb-2 border-b border-border">
              Haftungsausschluss
            </h2>
            <div className="space-y-3 text-sm text-text-muted leading-relaxed">
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
                Gewähr übernehmen.
              </p>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Als Diensteanbieter sind wir
                jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
                überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
                jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
                umgehend entfernen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-700 text-text uppercase mb-4 pb-2 border-b border-border">
              Urheberrecht
            </h2>
            <div className="space-y-3 text-sm text-text-muted leading-relaxed">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-700 text-text uppercase mb-4 pb-2 border-b border-border">
              Datenschutz
            </h2>
            <div className="space-y-3 text-sm text-text-muted leading-relaxed">
              <p>
                Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten
                möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name,
                Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich,
                stets auf freiwilliger Basis.
              </p>
              <p>
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der
                Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz
                der Daten vor dem Zugriff durch Dritte ist nicht möglich.
              </p>
              <p>
                Bei Fragen zum Datenschutz wende dich bitte an:{" "}
                <a href="mailto:fcschwarzach1955@gmail.com" className="text-primary hover:underline">
                  fcschwarzach1955@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
