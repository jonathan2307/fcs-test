"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "1953",
    title: "Gründung des Schutzvereins",
    desc: "Erste organisatorische Schritte zur Gründung eines Fußballvereins in Schwarzach.",
  },
  {
    year: "1955",
    title: "Offizielle Vereinsgründung",
    desc: "Am 1. Mai 1955 wird der FC Schwarzach offiziell gegründet. Der Verein tritt dem Vorarlberger Fußballverband bei.",
  },
  {
    year: "1969/70",
    title: "Aufstieg in die Landesliga",
    desc: "Historischer sportlicher Erfolg: Die Kampfmannschaft steigt erstmals in die Landesliga auf.",
  },
  {
    year: "1985",
    title: "Neubau Sportplatz",
    desc: "Der Sportplatz am Klosterwiesweg wird ausgebaut und modernisiert. Der Verein wächst auf über 150 Mitglieder.",
  },
  {
    year: "2000",
    title: "Aufbau Nachwuchsarbeit",
    desc: "Der FC Schwarzach verstärkt seine Nachwuchsabteilung und tritt der Spielgemeinschaft Hofsteig bei.",
  },
  {
    year: "2010",
    title: "SG Hofsteig",
    desc: "Offizielle Partnerschaft im Rahmen der SG Hofsteig für alle Nachwuchsmannschaften von U10 bis U16.",
  },
  {
    year: "2020",
    title: "Digitale Erneuerung",
    desc: "Der Verein modernisiert seine Infrastruktur, baut Social-Media-Präsenz aus und stärkt die Sponsorenbeziehungen.",
  },
  {
    year: "Heute",
    title: "FC Schwarzach – stark in die Zukunft",
    desc: "Mit 10 Mannschaften, über 250 Mitgliedern und einer lebendigen Vereinsgemeinschaft blickt der FC Schwarzach optimistisch in die Zukunft.",
  },
];

export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

      <div className="space-y-10">
        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`relative flex items-start gap-6 sm:gap-0 ${
              i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            {/* Content */}
            <div
              className={`pl-12 sm:pl-0 sm:w-[calc(50%-2rem)] ${
                i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"
              }`}
            >
              <p className="font-heading text-xl font-700 text-primary">{m.year}</p>
              <h3 className="font-heading text-lg font-600 text-text uppercase mt-0.5 mb-1">
                {m.title}
              </h3>
              <p className="text-sm text-text-muted font-body leading-relaxed">{m.desc}</p>
            </div>

            {/* Dot */}
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm mt-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
