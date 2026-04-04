export type BoardMember = {
  id: string;
  name: string;
  role: string;
  email?: string;
  isMain: boolean;
};

export const boardMembers: BoardMember[] = [
  {
    id: "1",
    name: "Roman Eder",
    role: "Obmann",
    email: "fcschwarzach1955@gmail.com",
    isMain: true,
  },
  {
    id: "2",
    name: "Jürgen Hämmerle",
    role: "Vizeobmann / Kassier",
    isMain: true,
  },
  {
    id: "3",
    name: "Stefan Theißl",
    role: "Schriftführer",
    isMain: true,
  },
  {
    id: "4",
    name: "Erkan Özcan",
    role: "Nachwuchsleiter",
    isMain: true,
  },
  {
    id: "5",
    name: "Hannes Gasser",
    role: "Sportlicher Leiter",
    isMain: true,
  },
  {
    id: "6",
    name: "Christoph Adler",
    role: "Sportlicher Leiter",
    isMain: true,
  },
  {
    id: "7",
    name: "Florian Hämmerle",
    role: "Marketing & Sponsoren",
    isMain: true,
  },
  {
    id: "8",
    name: "Julian Pfefferkorn",
    role: "Eventmanager",
    isMain: true,
  },
  {
    id: "9",
    name: "Mathias Ludescher",
    role: "Techniker",
    isMain: true,
  },
  {
    id: "10",
    name: "Klaus Rhomberg",
    role: "Beirat",
    isMain: false,
  },
  {
    id: "11",
    name: "Peter Hagen",
    role: "Beirat",
    isMain: false,
  },
  {
    id: "12",
    name: "Martin Lorenz",
    role: "Beirat",
    isMain: false,
  },
];
