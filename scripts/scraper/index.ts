import { chromium } from 'playwright';
import { scrapeSpielplan, SpielplanRow } from './scrape-spielplan';
import { scrapeTabelle, TabelleRow } from './scrape-tabelle';
import { readSheet, appendRows, updateRow, overwriteSheet } from './sheets';

// Load .env.local for local development
import { config } from 'dotenv';
config({ path: '.env.local' });

const URLS = {
  spielplanKM: 'https://www.ligaportal.at/vbg/3-landesklasse/spielplan',
  tabelleKM: 'https://www.ligaportal.at/vbg/3-landesklasse/tabelle',
  spielplan1b: 'https://www.ligaportal.at/vbg/5-landesklasse/5-landesklasse-unterland/spielplan',
  tabelle1b: 'https://www.ligaportal.at/vbg/5-landesklasse/5-landesklasse-unterland/tabelle',
};

const SHEET_TABS = {
  spielplanKM: 'SpielplanKM',
  tabelleKM: 'TabelleKM',
  spielplan1b: 'Spielplan1b',
  tabelle1b: 'Tabelle1b',
};

const SPIELPLAN_HEADER = [
  'datum', 'uhrzeit', 'heim', 'gast', 'liga', 'runde', 'ort',
  'ergebnis_heim', 'ergebnis_gast',
];

const TABELLE_HEADER = [
  'rang', 'mannschaft', 'spiele', 'siege', 'unentschieden',
  'niederlagen', 'tore_plus', 'tore_minus', 'tordifferenz', 'punkte',
];

/** Convert SpielplanRow to sheet row array (matching SPIELPLAN_HEADER order) */
function spielplanToRow(g: SpielplanRow): string[] {
  return [
    g.datum, g.uhrzeit, g.heim, g.gast, g.liga, g.runde, g.ort,
    g.ergebnis_heim, g.ergebnis_gast,
  ];
}

/** Convert TabelleRow to sheet row array (matching TABELLE_HEADER order) */
function tabelleToRow(t: TabelleRow): string[] {
  return [
    t.rang, t.mannschaft, t.spiele, t.siege, t.unentschieden,
    t.niederlagen, t.tore_plus, t.tore_minus, t.tordifferenz, t.punkte,
  ];
}

/** Check if a date string (DD.MM.YYYY) is in the past */
function isInPast(datum: string): boolean {
  if (!datum) return false;
  const parts = datum.split('.');
  if (parts.length !== 3) return false;
  const [day, month, year] = parts;
  const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return d < new Date();
}

/**
 * Update a Spielplan sheet tab:
 * - Add new games that don't exist yet
 * - Update results for past games where ergebnis_heim is empty
 */
async function updateSpielplanSheet(tabName: string, scraped: SpielplanRow[]): Promise<void> {
  console.log(`\nUpdating sheet tab: ${tabName}`);

  // Column indices (0-based)
  const COL = {
    datum: 0, uhrzeit: 1, heim: 2, gast: 3, liga: 4, runde: 5, ort: 6,
    ergebnis_heim: 7, ergebnis_gast: 8,
  };

  let existing: string[][] = [];
  try {
    existing = await readSheet(tabName);
  } catch (e) {
    console.log(`  Could not read sheet (may be empty): ${(e as Error).message}`);
  }

  /** Build a unique key for a game to detect duplicates */
  const gameKey = (datum: string, heim: string, gast: string) =>
    `${datum}|${heim.toLowerCase().trim()}|${gast.toLowerCase().trim()}`;

  // Map existing games: key → { rowIndex (2-based), row data }
  const existingMap = new Map<string, { rowIndex: number; row: string[] }>();
  existing.forEach((row, i) => {
    const key = gameKey(row[COL.datum] || '', row[COL.heim] || '', row[COL.gast] || '');
    existingMap.set(key, { rowIndex: i + 2, row }); // +2: header is row 1
  });

  let newCount = 0;
  let updatedCount = 0;
  const rowsToAppend: string[][] = [];

  for (const game of scraped) {
    const key = gameKey(game.datum, game.heim, game.gast);
    const found = existingMap.get(key);

    if (!found) {
      // New game — add it
      rowsToAppend.push(spielplanToRow(game));
      newCount++;
    } else {
      // Existing game — update result if it's missing and date is in the past
      const existingResultHeim = found.row[COL.ergebnis_heim] || '';
      const hasResult = existingResultHeim !== '';
      const pastGame = isInPast(game.datum);

      if (!hasResult && pastGame && game.ergebnis_heim !== '') {
        const updatedRow = [...found.row];
        updatedRow[COL.ergebnis_heim] = game.ergebnis_heim;
        updatedRow[COL.ergebnis_gast] = game.ergebnis_gast;
        await updateRow(tabName, found.rowIndex, updatedRow);
        updatedCount++;
        console.log(`  Updated result for ${game.datum} ${game.heim} vs ${game.gast}: ${game.ergebnis_heim}:${game.ergebnis_gast}`);
      }
    }
  }

  if (rowsToAppend.length > 0) {
    // Sort by date before appending
    rowsToAppend.sort((a, b) => {
      const dateA = a[COL.datum].split('.').reverse().join('');
      const dateB = b[COL.datum].split('.').reverse().join('');
      return dateA.localeCompare(dateB);
    });
    await appendRows(tabName, rowsToAppend);
    console.log(`  Added ${newCount} new game(s)`);
  }

  console.log(`  Summary: ${newCount} new, ${updatedCount} updated`);
}

/** Update a Tabelle sheet tab: completely overwrite */
async function updateTabelleSheet(tabName: string, scraped: TabelleRow[]): Promise<void> {
  console.log(`\nUpdating sheet tab: ${tabName} (overwrite, ${scraped.length} teams)`);
  await overwriteSheet(tabName, TABELLE_HEADER, scraped.map(tabelleToRow));
}

async function main() {
  console.log('=== FC Schwarzach Scraper ===');
  console.log(`Started at: ${new Date().toISOString()}\n`);

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    // --- KM: 3. Landesklasse ---
    console.log('\n--- KM: 3. Landesklasse ---');

    console.log('\nScraping Spielplan KM...');
    const spielplanKM = await scrapeSpielplan(page, URLS.spielplanKM);

    console.log('\nScraping Tabelle KM...');
    const tabelleKM = await scrapeTabelle(page, URLS.tabelleKM);

    // --- 1b: 5. Landesklasse Unterland ---
    console.log('\n--- 1b: 5. Landesklasse Unterland ---');

    console.log('\nScraping Spielplan 1b...');
    const spielplan1b = await scrapeSpielplan(page, URLS.spielplan1b);

    console.log('\nScraping Tabelle 1b...');
    const tabelle1b = await scrapeTabelle(page, URLS.tabelle1b);

    // --- Write to Google Sheets ---
    console.log('\n\n=== Writing to Google Sheets ===');

    await updateSpielplanSheet(SHEET_TABS.spielplanKM, spielplanKM);
    await updateTabelleSheet(SHEET_TABS.tabelleKM, tabelleKM);
    await updateSpielplanSheet(SHEET_TABS.spielplan1b, spielplan1b);
    await updateTabelleSheet(SHEET_TABS.tabelle1b, tabelle1b);

    console.log('\n=== Done! ===');
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Scraper failed:', err);
  process.exit(1);
});
