import { google } from 'googleapis';

function getAuth() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set');

  const credentials = JSON.parse(keyJson);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function getSheetId() {
  const id = process.env.GOOGLE_SHEETS_ID || process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID;
  if (!id) throw new Error('GOOGLE_SHEETS_ID env var is not set');
  return id;
}

/** Read all rows from a sheet tab (returns array of arrays, skips header row) */
export async function readSheet(tabName: string): Promise<string[][]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: getSheetId(),
    range: `${tabName}!A:Z`,
  });
  const rows = (response.data.values as string[][]) || [];
  return rows.slice(1); // skip header row
}

/** Append rows to a sheet tab */
export async function appendRows(tabName: string, rows: string[][]): Promise<void> {
  if (rows.length === 0) return;
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(),
    range: `${tabName}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  });
}

/** Update a single row in a sheet tab (1-based row index, includes header) */
export async function updateRow(tabName: string, rowIndex: number, values: string[]): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSheetId(),
    range: `${tabName}!A${rowIndex}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
}

/** Delete a range of rows from a sheet tab (1-based, inclusive) */
export async function deleteRows(tabName: string, startRow: number, endRow: number): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  // Get the sheetId for the named tab
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: getSheetId(),
    fields: 'sheets.properties(title,sheetId)',
  });
  const sheet = meta.data.sheets?.find(s => s.properties?.title === tabName);
  if (!sheet?.properties) throw new Error(`Tab "${tabName}" not found in sheet`);
  const sheetId = sheet.properties.sheetId!;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: getSheetId(),
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId,
            dimension: 'ROWS',
            startIndex: startRow - 1,  // 0-based, inclusive
            endIndex: endRow,          // 0-based, exclusive
          },
        },
      }],
    },
  });
}

/** Overwrite all data in a sheet tab (keeps header, replaces all data rows) */
export async function overwriteSheet(tabName: string, header: string[], rows: string[][]): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const allRows = [header, ...rows];
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSheetId(),
    range: `${tabName}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: allRows },
  });
  // Clear any leftover rows below the new data
  const endRow = allRows.length + 1;
  await sheets.spreadsheets.values.clear({
    spreadsheetId: getSheetId(),
    range: `${tabName}!A${endRow}:Z1000`,
  });
}
