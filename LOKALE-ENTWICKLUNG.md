# Website lokal starten

## Voraussetzungen

- [Node.js](https://nodejs.org) installiert (Version 18 oder höher)
- [Git](https://git-scm.com) installiert

---

## Einmalige Einrichtung

**1.** Repository klonen (einmalig)
```bash
git clone https://github.com/[dein-username]/[repo-name].git
cd [repo-name]/fc-schwarzach
```

**2.** Abhängigkeiten installieren (einmalig)
```bash
npm install
```

**3.** Umgebungsvariablen anlegen (einmalig)

Erstelle eine Datei `.env.local` im Ordner `fc-schwarzach/` mit folgendem Inhalt:
```
NEXT_PUBLIC_GOOGLE_SHEETS_ID=deine-sheet-id
GOOGLE_SHEETS_API_KEY=dein-api-key
```

Die Werte findest du in deinem Google Cloud Projekt bzw. im Google Sheet.

---

## Website starten

```bash
npm run dev
```

Die Seite ist dann unter **http://localhost:3000** erreichbar.

> Änderungen am Code werden sofort im Browser sichtbar — kein Neustart nötig.

---

## Scraper lokal ausführen

Falls du die Spielplan-/Tabellendaten manuell aktualisieren willst:

```bash
npm run scraper
```

Der Scraper läuft ca. 3 Minuten und überschreibt danach die JSON-Dateien
in `src/data/`. Die Website zeigt sofort die neuen Daten.

---

## Produktions-Build testen

Um zu prüfen ob die Seite fehlerfrei baut (so wie auf Vercel):

```bash
npm run build
npm run start
```

Die Seite ist dann unter **http://localhost:3000** erreichbar —
diesmal als optimierter Produktions-Build.

---

## Häufige Probleme

**Seite startet nicht**
→ Prüfe ob Node.js installiert ist: `node --version`
→ Prüfe ob `npm install` ausgeführt wurde

**Kader / Trainer / Sponsoren werden nicht angezeigt**
→ `.env.local` fehlt oder die Werte sind falsch eingetragen

**Spielplan zeigt alte Daten**
→ `npm run scraper` ausführen um die JSON-Dateien zu aktualisieren
