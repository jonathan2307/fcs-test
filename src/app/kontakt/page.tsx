import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktiere den FC Schwarzach – Adresse, Telefon, E-Mail und Karte.",
};

export default function KontaktPage() {
  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-sm font-600 uppercase tracking-widest text-white/60 mb-1">
            FC Schwarzach
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-700 text-white uppercase">
            Kontakt
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left – contact info + form */}
          <div className="space-y-10">
            {/* Info */}
            <div>
              <p className="font-heading text-sm font-600 uppercase tracking-widest text-primary mb-1">
                Erreichbarkeit
              </p>
              <h2 className="font-heading text-2xl font-700 text-text uppercase mb-6">
                So erreichst du uns
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body font-semibold text-text text-sm">Adresse</p>
                    <p className="font-body text-text-muted text-sm">
                      Klosterwiesweg 31<br />6858 Schwarzach, Österreich
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body font-semibold text-text text-sm">Telefon</p>
                    <a
                      href="tel:+43557241400"
                      className="font-body text-text-muted text-sm hover:text-primary transition-colors"
                    >
                      +43 5572 / 41400
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body font-semibold text-text text-sm">E-Mail</p>
                    <a
                      href="mailto:fcschwarzach1955@gmail.com"
                      className="font-body text-text-muted text-sm hover:text-primary transition-colors"
                    >
                      fcschwarzach1955@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body font-semibold text-text text-sm">Trainingszeiten</p>
                    <p className="font-body text-text-muted text-sm">
                      Dienstag & Donnerstag, 19:00 Uhr<br />
                      Sportplatz Schwarzach
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-heading text-2xl font-700 text-text uppercase mb-6">
                Nachricht schreiben
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-semibold text-text mb-1">
                      Vorname
                    </label>
                    <input
                      type="text"
                      className="w-full border border-border rounded-[5px] px-4 py-2.5 text-sm font-body bg-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-semibold text-text mb-1">
                      Nachname
                    </label>
                    <input
                      type="text"
                      className="w-full border border-border rounded-[5px] px-4 py-2.5 text-sm font-body bg-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="Mustermann"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-text mb-1">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    className="w-full border border-border rounded-[5px] px-4 py-2.5 text-sm font-body bg-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="max@beispiel.at"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-text mb-1">
                    Betreff
                  </label>
                  <input
                    type="text"
                    className="w-full border border-border rounded-[5px] px-4 py-2.5 text-sm font-body bg-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Wie können wir helfen?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-text mb-1">
                    Nachricht
                  </label>
                  <textarea
                    rows={5}
                    className="w-full border border-border rounded-[5px] px-4 py-2.5 text-sm font-body bg-white focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Deine Nachricht..."
                  />
                </div>
                <button
                  type="button"
                  className="bg-primary text-white font-body font-semibold px-8 py-3 rounded-[5px] hover:bg-primary-hover transition-colors text-sm uppercase tracking-wide"
                >
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>

          {/* Right – map */}
          <div>
            <p className="font-heading text-sm font-600 uppercase tracking-widest text-primary mb-1">
              Anfahrt
            </p>
            <h2 className="font-heading text-2xl font-700 text-text uppercase mb-6">
              Sportplatz Schwarzach
            </h2>
            <div className="rounded-[5px] overflow-hidden border border-border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2672.0!2d9.7745!3d47.4678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS2xvc3RlcndpZXN3ZWcgMzEsIDY4NTggU2Nod2FyemFjaA!5e0!3m2!1sde!2sat!4v1700000000000!5m2!1sde!2sat"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FC Schwarzach Standort"
              />
            </div>
            <p className="text-sm text-text-muted font-body mt-3">
              Klosterwiesweg 31, 6858 Schwarzach
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
