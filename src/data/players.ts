export type Position = "Torwart" | "Abwehr" | "Mittelfeld" | "Sturm";

export type Player = {
  id: string;
  number: number;
  name: string;
  position: Position;
  team: string;
};

export type Coach = {
  name: string;
  role: string;
  team: string;
};

export const coaches: Coach[] = [
  { name: "Hannes Gasser", role: "Trainer", team: "KM" },
  { name: "Christoph Adler", role: "Co-Trainer", team: "KM" },
  { name: "Thomas Mayer", role: "Trainer", team: "1b" },
  { name: "Erkan Özcan", role: "Nachwuchsleiter / Trainer", team: "U16" },
  { name: "Marco Fink", role: "Trainer", team: "U15" },
  { name: "Luca Bertolini", role: "Trainer", team: "U14" },
  { name: "Stefan Theißl", role: "Trainer", team: "U13" },
  { name: "Klaus Rhomberg", role: "Trainer", team: "U12" },
  { name: "Peter Hagen", role: "Trainer", team: "U11" },
  { name: "Martin Lorenz", role: "Trainer", team: "U10" },
];

export const players: Player[] = [
  // KM
  { id: "km-1", number: 1, name: "Markus Feurstein", position: "Torwart", team: "KM" },
  { id: "km-2", number: 13, name: "David Böhler", position: "Torwart", team: "KM" },
  { id: "km-3", number: 4, name: "Patrick Hagen", position: "Abwehr", team: "KM" },
  { id: "km-4", number: 5, name: "Simon Grabher", position: "Abwehr", team: "KM" },
  { id: "km-5", number: 6, name: "Lukas Wohlgenannt", position: "Abwehr", team: "KM" },
  { id: "km-6", number: 3, name: "Jonas Mähr", position: "Abwehr", team: "KM" },
  { id: "km-7", number: 2, name: "Tobias Ritter", position: "Abwehr", team: "KM" },
  { id: "km-8", number: 8, name: "Andreas Ender", position: "Mittelfeld", team: "KM" },
  { id: "km-9", number: 10, name: "Michael Kaufmann", position: "Mittelfeld", team: "KM" },
  { id: "km-10", number: 7, name: "Rafael Sohm", position: "Mittelfeld", team: "KM" },
  { id: "km-11", number: 14, name: "Dominik Natter", position: "Mittelfeld", team: "KM" },
  { id: "km-12", number: 16, name: "Florian Bechter", position: "Mittelfeld", team: "KM" },
  { id: "km-13", number: 11, name: "Kevin Müller", position: "Sturm", team: "KM" },
  { id: "km-14", number: 9, name: "Stefan Dür", position: "Sturm", team: "KM" },
  { id: "km-15", number: 17, name: "Nico Vonbank", position: "Sturm", team: "KM" },
  { id: "km-16", number: 19, name: "Mathias Tschofen", position: "Sturm", team: "KM" },
  // 1b
  { id: "1b-1", number: 1, name: "Thomas Bereuter", position: "Torwart", team: "1b" },
  { id: "1b-2", number: 4, name: "Florian Ratz", position: "Abwehr", team: "1b" },
  { id: "1b-3", number: 5, name: "Christoph Zwickle", position: "Abwehr", team: "1b" },
  { id: "1b-4", number: 6, name: "Harald Metzler", position: "Abwehr", team: "1b" },
  { id: "1b-5", number: 3, name: "Leo Schwärzler", position: "Abwehr", team: "1b" },
  { id: "1b-6", number: 8, name: "Remo Längle", position: "Mittelfeld", team: "1b" },
  { id: "1b-7", number: 10, name: "Benjamin Mohr", position: "Mittelfeld", team: "1b" },
  { id: "1b-8", number: 7, name: "Jan Ohr", position: "Mittelfeld", team: "1b" },
  { id: "1b-9", number: 11, name: "Robin Flatz", position: "Sturm", team: "1b" },
  { id: "1b-10", number: 9, name: "Klaus Hämmerle", position: "Sturm", team: "1b" },
];

export const teams = [
  {
    id: "km",
    name: "Kampfmannschaft",
    shortName: "KM",
    league: "3. Landesklasse",
    description:
      "Die Kampfmannschaft des FC Schwarzach spielt in der 3. Landesklasse und ist das Aushängeschild des Vereins.",
  },
  {
    id: "1b",
    name: "1b Mannschaft",
    shortName: "1b",
    league: "5. Landesklasse Unterland",
    description:
      "Die 1b Mannschaft bietet Spielern eine wichtige Plattform zur Weiterentwicklung und zum Anschluss an die Kampfmannschaft.",
  },
  {
    id: "ah",
    name: "Alte Herren",
    shortName: "AH",
    league: "Freundschaftsspiele",
    description:
      "Die Alten Herren halten die Vereinstreue aufrecht und bieten erfahrenen Spielern die Möglichkeit, weiter ihrem Sport nachzugehen.",
  },
  {
    id: "u16",
    name: "U16",
    shortName: "U16",
    league: "Landesliga U16 (SG Hofsteig)",
    description:
      "Die U16 ist die älteste Nachwuchsmannschaft und bereitet Talente auf den Übergang in den Seniorenbereich vor.",
  },
  {
    id: "u15",
    name: "U15",
    shortName: "U15",
    league: "Landesklasse U15 (SG Hofsteig)",
    description: "Die U15 befindet sich in einer entscheidenden Entwicklungsphase und trainiert regelmäßig mehrmals pro Woche.",
  },
  {
    id: "u14",
    name: "U14",
    shortName: "U14",
    league: "Landesklasse U14 (SG Hofsteig)",
    description: "Die U14 legt den Fokus auf taktische Grundausbildung und technische Fertigkeiten.",
  },
  {
    id: "u13",
    name: "U13",
    shortName: "U13",
    league: "Meisterschaft U13 (SG Hofsteig)",
    description: "In der U13 wird die Spielintelligenz gezielt gefördert.",
  },
  {
    id: "u12",
    name: "U12",
    shortName: "U12",
    league: "Meisterschaft U12 (SG Hofsteig)",
    description: "Die U12 steht für Spaß am Fußball und erste taktische Grundbegriffe.",
  },
  {
    id: "u11",
    name: "U11",
    shortName: "U11",
    league: "Meisterschaft U11 (SG Hofsteig)",
    description: "Die U11 verbessert technische Grundfertigkeiten durch abwechslungsreiche Trainingsformen.",
  },
  {
    id: "u10",
    name: "U10",
    shortName: "U10",
    league: "Meisterschaft U10 (SG Hofsteig)",
    description: "Die U10 ist der Einstieg in den organisierten Fußball – mit viel Freude und wenig Druck.",
  },
];
