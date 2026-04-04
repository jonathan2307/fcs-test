import { Page } from 'playwright';

export interface SpielplanRow {
  datum: string;      // DD.MM.YYYY
  uhrzeit: string;   // HH:MM
  heim: string;
  gast: string;
  liga: string;
  runde: string;
  ort: string;
  ergebnis_heim: string;
  ergebnis_gast: string;
}

/**
 * Parse ligaportal date string "Fr, 03.04 - 19:15" into datum and uhrzeit.
 * Year is inferred: months 7-12 → current or previous year, months 1-6 → current or next year.
 */
function parseDateTime(raw: string): { datum: string; uhrzeit: string } {
  // raw example: "Fr, 03.04 - 19:15 • "
  const match = raw.match(/(\d{2})\.(\d{2})\s*-\s*(\d{2}:\d{2})/);
  if (!match) return { datum: '', uhrzeit: '' };

  const day = match[1];
  const month = parseInt(match[2], 10);
  const uhrzeit = match[3];

  // Football season 2025/2026: Aug–Dec 2025, Jan–Jun 2026
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  let year: number;
  if (month >= 7) {
    // Second half of calendar year → autumn part of season
    year = currentMonth >= 7 ? currentYear : currentYear - 1;
  } else {
    // First half → spring part of season
    year = currentMonth >= 7 ? currentYear + 1 : currentYear;
  }

  return {
    datum: `${day}.${match[2]}.${year}`,
    uhrzeit,
  };
}

/**
 * Parse the result button text into ergebnis_heim and ergebnis_gast.
 * Returns empty strings for unplayed/cancelled games.
 */
function parseResult(raw: string): { heim: string; gast: string } {
  const cleaned = raw.replace(/\s+/g, ' ').trim();
  // Match score like "2:2" or "2 : 2"
  const match = cleaned.match(/^(\d+)\s*:\s*(\d+)/);
  if (match) {
    return { heim: match[1], gast: match[2] };
  }
  return { heim: '', gast: '' };
}

/**
 * Scrape all rounds of a Spielplan, filtering to FC Schwarzach games only.
 * Navigates backward through all rounds using the ZURÜCK button.
 */
export async function scrapeSpielplan(
  page: Page,
  url: string,
  vereinName: string = 'FC Schwarzach'
): Promise<SpielplanRow[]> {
  console.log(`  Loading Spielplan: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const allGames: SpielplanRow[] = [];
  let roundsScraped = 0;
  const maxRounds = 30; // safety limit

  while (roundsScraped < maxRounds) {
    // Extract current round info
    const roundInfo = await page.evaluate(() => {
      const h3 = document.querySelector('h3.module-title');
      return h3?.textContent?.trim() || '';
    });

    // Parse: "3. Landesklasse | Runde 15"
    const ligaMatch = roundInfo.match(/^(.+?)\s*\|\s*Runde\s*(\d+)/i);
    const liga = ligaMatch ? ligaMatch[1].trim() : roundInfo;
    const runde = ligaMatch ? ligaMatch[2] : String(roundsScraped + 1);

    console.log(`  Scraping round: ${roundInfo}`);

    // Extract all games for this round
    const games = await page.evaluate((vereinName: string) => {
      const items = document.querySelectorAll('ul.liveTickerItem li');
      const results: any[] = [];

      items.forEach(li => {
        const heimEl = li.querySelector('a.teamHome span.teamName');
        const gastEl = li.querySelector('a.teamAway span.teamName');
        const timeEl = li.querySelector('span.liveTickerTime');
        const resultEl = li.querySelector('a.liveTickerButton');

        const heim = heimEl?.textContent?.trim() || '';
        const gast = gastEl?.textContent?.trim() || '';
        const timeRaw = timeEl?.textContent?.trim() || '';
        const resultRaw = resultEl?.textContent?.trim() || '';

        // Only include games involving the target club
        if (!heim.includes(vereinName) && !gast.includes(vereinName)) return;

        results.push({ heim, gast, timeRaw, resultRaw });
      });

      return results;
    }, vereinName);

    for (const g of games) {
      const { datum, uhrzeit } = parseDateTime(g.timeRaw);
      const { heim: ergebnisHeim, gast: ergebnisGast } = parseResult(g.resultRaw);

      allGames.push({
        datum,
        uhrzeit,
        heim: g.heim,
        gast: g.gast,
        liga,
        runde,
        ort: '',
        ergebnis_heim: ergebnisHeim,
        ergebnis_gast: ergebnisGast,
      });
    }

    roundsScraped++;

    // Try to click ZURÜCK to go to previous round
    const backBtn = page.locator('text=ZURÜCK').first();
    const backCount = await backBtn.count();
    if (backCount === 0) break;

    // Check if the button is a disabled element (round 1 reached)
    const isDisabled = await backBtn.evaluate(el => {
      return el.hasAttribute('disabled')
        || el.classList.contains('disabled')
        || (el as HTMLAnchorElement).href === ''
        || (el as HTMLAnchorElement).href?.endsWith('#');
    });
    if (isDisabled) break;

    await backBtn.click();
    await page.waitForTimeout(2000);

    // Check if the round actually changed
    const newRoundInfo = await page.evaluate(() => {
      return document.querySelector('h3.module-title')?.textContent?.trim() || '';
    });
    if (newRoundInfo === roundInfo) break; // didn't change, stop
  }

  console.log(`  Total ${vereinName} games found: ${allGames.length} across ${roundsScraped} rounds`);
  return allGames;
}
