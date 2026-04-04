import { Page } from 'playwright';

export interface TabelleRow {
  rang: string;
  mannschaft: string;
  spiele: string;
  siege: string;
  unentschieden: string;
  niederlagen: string;
  tore_plus: string;
  tore_minus: string;
  tordifferenz: string;
  punkte: string;
}

export async function scrapeTabelle(page: Page, url: string): Promise<TabelleRow[]> {
  console.log(`  Loading Tabelle: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const rows = await page.evaluate(() => {
    const results: any[] = [];
    const table = document.querySelector('table.table-striped');
    if (!table) return results;

    const trs = table.querySelectorAll('tbody tr');
    trs.forEach(tr => {
      const tds = tr.querySelectorAll('td');
      if (tds.length < 8) return;

      const rang = tds[0].textContent?.trim().replace('.', '') || '';
      // Use image alt attribute for full team name (textContent can be CSS-truncated)
      const img = tds[1].querySelector('img');
      const mannschaft = img?.getAttribute('alt')
        || tds[1].querySelector('a')?.textContent?.trim()
        || tds[1].textContent?.trim() || '';
      const spiele = tds[2].textContent?.trim() || '';
      const siege = tds[3].textContent?.trim() || '';
      const unentschieden = tds[4].textContent?.trim() || '';
      const niederlagen = tds[5].textContent?.trim() || '';
      const toreFull = tds[6].textContent?.trim() || ''; // "37:11"
      const [torePlus, toreMinus] = toreFull.split(':');
      const tordifferenz = tds[7].textContent?.trim() || '';
      const punkte = tds[8].textContent?.trim() || '';

      results.push({
        rang,
        mannschaft: mannschaft.replace(/\s+/g, ' ').trim(),
        spiele,
        siege,
        unentschieden,
        niederlagen,
        tore_plus: (torePlus || '').trim(),
        tore_minus: (toreMinus || '').trim(),
        tordifferenz,
        punkte,
      });
    });

    return results;
  });

  console.log(`  Found ${rows.length} teams in table`);
  return rows;
}
