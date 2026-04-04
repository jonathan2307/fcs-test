import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { scrapeSpielplan } from './scrape-spielplan';
import { scrapeTabelle } from './scrape-tabelle';

// Load .env.local for local development
import { config } from 'dotenv';
config({ path: '.env.local' });

const URLS = {
  spielplanKM: 'https://www.ligaportal.at/vbg/3-landesklasse/spielplan',
  tabelleKM: 'https://www.ligaportal.at/vbg/3-landesklasse/tabelle',
  spielplan1b: 'https://www.ligaportal.at/vbg/5-landesklasse/5-landesklasse-unterland/spielplan',
  tabelle1b: 'https://www.ligaportal.at/vbg/5-landesklasse/5-landesklasse-unterland/tabelle',
};

const DATA_DIR = join(process.cwd(), 'src', 'data');

function writeJson(filename: string, data: unknown): void {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  Wrote ${filename} (${Array.isArray(data) ? data.length + ' rows' : ''})`);
}

async function main() {
  console.log('=== FC Schwarzach Scraper ===');
  console.log(`Started at: ${new Date().toISOString()}\n`);

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    console.log('\n--- KM: 3. Landesklasse ---');
    const spielplanKM = await scrapeSpielplan(page, URLS.spielplanKM);
    const tabelleKM   = await scrapeTabelle(page, URLS.tabelleKM);

    console.log('\n--- 1b: 5. Landesklasse Unterland ---');
    const spielplan1b = await scrapeSpielplan(page, URLS.spielplan1b);
    const tabelle1b   = await scrapeTabelle(page, URLS.tabelle1b);

    console.log('\n=== Writing JSON files ===');
    writeJson('spielplan-km.json', spielplanKM);
    writeJson('tabelle-km.json',   tabelleKM);
    writeJson('spielplan-1b.json', spielplan1b);
    writeJson('tabelle-1b.json',   tabelle1b);

    console.log('\n=== Done! ===');
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Scraper failed:', err);
  process.exit(1);
});
