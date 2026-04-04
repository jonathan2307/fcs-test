const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID!;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY!;

const BASE = "https://sheets.googleapis.com/v4/spreadsheets";

/** Baut eine proxied Bild-URL für Google Drive File-IDs. */
function driveImg(fileId: string): string {
  const src = `https://drive.usercontent.google.com/download?id=${fileId.trim()}&export=view`;
  return `/api/image-proxy?url=${encodeURIComponent(src)}`;
}

async function fetchRange(tab: string): Promise<string[][]> {
  const url = `${BASE}/${SHEET_ID}/values/${encodeURIComponent(tab)}?key=${API_KEY}`;
  const res = await fetch(url, { next: { revalidate: 300 } }); // 5-min cache
  if (!res.ok) {
    throw new Error(`Google Sheets fetch failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return (json.values ?? []) as string[][];
}

/** Map a row array to an object using the header row. */
function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (rows.length < 2) return [];
  const [headers, ...data] = rows;
  return data.map((row) =>
    Object.fromEntries(headers.map((h, i) => [h.trim(), (row[i] ?? "").trim()]))
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SheetMatch = {
  datum: string;
  uhrzeit: string;
  heim: string;
  gast: string;
  liga: string;
  runde: string;
  ort: string;
  ergebnis_heim: string;
  ergebnis_gast: string;
  /** true when both ergebnis fields are filled */
  isFinished: boolean;
  /** true when FC Schwarzach is the home team */
  fcsIsHome: boolean;
};

export type SheetTableRow = {
  rang: number;
  mannschaft: string;
  spiele: number;
  siege: number;
  unentschieden: number;
  niederlagen: number;
  tore_plus: number;
  tore_minus: number;
  tordifferenz: number;
  punkte: number;
  /** true when the row belongs to FC Schwarzach */
  isFCS: boolean;
};

// ─── JSON data (written by scraper, no API call needed) ──────────────────────

import spielplanKMData from "@/data/spielplan-km.json";
import spielplan1bData from "@/data/spielplan-1b.json";
import tabelleKMData   from "@/data/tabelle-km.json";
import tabelle1bData   from "@/data/tabelle-1b.json";

function mapSpielplan(raw: typeof spielplanKMData): SheetMatch[] {
  return raw
    .filter((r) => r.heim || r.gast)
    .map((r) => ({
      datum: r.datum ?? "",
      uhrzeit: r.uhrzeit ?? "",
      heim: r.heim ?? "",
      gast: r.gast ?? "",
      liga: r.liga ?? "",
      runde: r.runde ?? "",
      ort: r.ort ?? "",
      ergebnis_heim: r.ergebnis_heim ?? "",
      ergebnis_gast: r.ergebnis_gast ?? "",
      isFinished: r.ergebnis_heim !== "" && r.ergebnis_gast !== "",
      fcsIsHome: r.heim?.toLowerCase().includes("schwarzach") ?? false,
    }));
}

function mapTabelle(raw: typeof tabelleKMData): SheetTableRow[] {
  return raw
    .filter((r) => r.mannschaft)
    .map((r) => ({
      rang: parseInt(r.rang ?? "0", 10) || 0,
      mannschaft: r.mannschaft ?? "",
      spiele: parseInt(r.spiele ?? "0", 10) || 0,
      siege: parseInt(r.siege ?? "0", 10) || 0,
      unentschieden: parseInt(r.unentschieden ?? "0", 10) || 0,
      niederlagen: parseInt(r.niederlagen ?? "0", 10) || 0,
      tore_plus: parseInt(r.tore_plus ?? "0", 10) || 0,
      tore_minus: parseInt(r.tore_minus ?? "0", 10) || 0,
      tordifferenz: parseInt(r.tordifferenz ?? "0", 10) || 0,
      punkte: parseInt(r.punkte ?? "0", 10) || 0,
      isFCS: r.mannschaft?.toLowerCase().includes("schwarzach") ?? false,
    }));
}

// ─── API functions ─────────────────────────────────────────────────────────────

export function getSpielplan(tab: "SpielplanKM" | "Spielplan1b" = "SpielplanKM"): SheetMatch[] {
  return mapSpielplan(tab === "SpielplanKM" ? spielplanKMData : spielplan1bData);
}

export function getTabelle(tab: "TabelleKM" | "Tabelle1b" = "TabelleKM"): SheetTableRow[] {
  return mapTabelle(tab === "TabelleKM" ? tabelleKMData : tabelle1bData);
}

export type SheetPlayer = {
  nummer: number;
  name: string;
  position: string;
  fotoUrl: string | null; // null = kein Foto vorhanden
};

export async function getKader(tab: "KaderKM" | "Kader1b"): Promise<SheetPlayer[]> {
  const rows = await fetchRange(tab);
  const objects = rowsToObjects(rows);

  return objects
    .filter((r) => r.name)
    .map((r) => ({
      nummer: parseInt(r.nummer ?? "0", 10) || 0,
      name: r.name ?? "",
      position: r.position ?? "",
      fotoUrl: r.foto
        ? driveImg(r.foto)
        : null,
    }));
}

export type SheetTrainer = {
  name: string;
  funktion: string;
  email: string;
  tel: string;
  mannschaft: string;
  fotoUrl: string | null;
};

export async function getTrainer(): Promise<SheetTrainer[]> {
  const rows = await fetchRange("Trainer");
  const objects = rowsToObjects(rows);

  return objects
    .filter((r) => r.name)
    .map((r) => ({
      name: r.name ?? "",
      funktion: r.funktion ?? "",
      email: r.email ?? "",
      tel: r.tel ?? "",
      mannschaft: r.mannschaft ?? "",
      fotoUrl: r.foto
        ? driveImg(r.foto)
        : null,
    }));
}

export type SheetSponsorBild = {
  name: string;
  bildUrl: string | null;
};

export async function getSponsoren(): Promise<SheetSponsorBild[]> {
  const rows = await fetchRange("Sponsoren");
  const objects = rowsToObjects(rows);

  return objects
    .filter((r) => r.name)
    .map((r) => ({
      name: r.name ?? "",
      bildUrl: r.bild
        ? driveImg(r.bild)
        : null,
    }));
}

export type SheetMitglied = {
  name: string;
  funktion: string;
  email: string;
  bildUrl: string | null;
};

export async function getMitglieder(): Promise<SheetMitglied[]> {
  const rows = await fetchRange("Mitglieder");
  const objects = rowsToObjects(rows);

  return objects
    .filter((r) => r.name)
    .map((r) => ({
      name: r.name ?? "",
      funktion: r.funktion ?? "",
      email: r.email ?? "",
      bildUrl: r.bild
        ? driveImg(r.bild)
        : null,
    }));
}

export type SheetMannschaftsfoto = {
  mannschaft: string; // z.B. "km", "1b", "u16" …
  bildUrl: string | null;
};

// Normalisiert Sheet-Werte auf die internen Team-IDs aus players.ts
const TEAM_ID_ALIASES: Record<string, string> = {
  kampfmannschaft: "km",
  "1. mannschaft": "km",
  altherren: "ah",
  "alte herren": "ah",
  "alte-herren": "ah",
  reserve: "1b",
  "1b mannschaft": "1b",
};

function normalizeTeamId(raw: string): string {
  const lower = raw.trim().toLowerCase();
  return TEAM_ID_ALIASES[lower] ?? lower;
}

export async function getMannschaftsfotos(): Promise<SheetMannschaftsfoto[]> {
  try {
    const rows = await fetchRange("Mannschaftsfotos");
    const objects = rowsToObjects(rows);

    return objects
      .filter((r) => r.mannschaft)
      .map((r) => ({
        mannschaft: normalizeTeamId(r.mannschaft),
        bildUrl: r.bild
          ? driveImg(r.bild)
          : null,
      }));
  } catch {
    return [];
  }
}

