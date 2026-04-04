export type SponsorTier = "Gold" | "Silber" | "Bronze";

export type Sponsor = {
  id: string;
  name: string;
  url: string;
  tier: SponsorTier;
  description: string;
};

export const sponsors: Sponsor[] = [
  {
    id: "atw",
    name: "ATW",
    url: "https://www.atw.cc/",
    tier: "Gold",
    description: "Langjähriger Hauptsponsor und starker Partner des FC Schwarzach.",
  },
  {
    id: "spar",
    name: "Spar Albrecht",
    url: "https://sparalbrecht.at/",
    tier: "Gold",
    description: "Lebensmittelnahversorger aus der Region – ein verlässlicher Partner.",
  },
  {
    id: "mohren",
    name: "Mohrenbräu",
    url: "https://www.mohrenbrauerei.at/",
    tier: "Gold",
    description: "Vorarlbergs bekannteste Brauerei unterstützt den Verein seit vielen Jahren.",
  },
  {
    id: "voues",
    name: "Vo Üs",
    url: "https://www.voues.at/",
    tier: "Silber",
    description: "Regionale Marke mit Heimatgefühl – perfekt zum FC Schwarzach.",
  },
  {
    id: "mew",
    name: "MEW",
    url: "https://mew.at/",
    tier: "Silber",
    description: "Innovativer Technologiepartner aus Vorarlberg.",
  },
  {
    id: "imaschelling",
    name: "IMA Schelling",
    url: "https://www.imaschelling.com/",
    tier: "Silber",
    description: "Internationaler Maschinenbauspezialist mit lokalen Wurzeln.",
  },
  {
    id: "sparkasse",
    name: "Dornbirner Sparkasse",
    url: "https://www.sparkasse.at/dornbirn",
    tier: "Bronze",
    description: "Regionaler Finanzdienstleister, der Sport und Gemeinschaft fördert.",
  },
  {
    id: "autohof",
    name: "Autohof Lingg",
    url: "https://www.autohof-lingg.com/",
    tier: "Bronze",
    description: "Autohaus mit Tradition – unser lokaler Mobilitätspartner.",
  },
];
