# FC Schwarzach Website — Technischer Überblick

## 1. Projektübersicht

Die Website des FC Schwarzach ist der offizielle digitale Auftritt des Fußballvereins aus Schwarzach, Vorarlberg. Sie zeigt aktuelle Spielpläne, Ergebnisse, Tabellen, Mannschaftskader, Vereinsinfos, News und Sponsoren — und aktualisiert die Sportdaten täglich vollautomatisch.

**Zielgruppe:** Vereinsmitglieder, Fans, Gegner, Interessierte  
**Sprache:** Deutsch (Österreich)  
**Status:** Produktionsbereit

---

## 2. Technologie-Stack

| Bereich | Technologie | Warum |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG/ISR, TypeScript-nativ, optimale Performance |
| Styling | Tailwind CSS | Utility-first, konsistentes Design-System |
| Animationen | Framer Motion | Dezente Einblend-Animationen |
| UI-Primitives | Radix UI | Zugängliche Tabs, Buttons |
| Scraping | Playwright (Chromium) | Ligaportal.at ist JS-gerendert, braucht echten Browser |
| Deployment | Vercel (empfohlen) | Native Next.js-Integration, Auto-Deploy bei Git-Push |
| Daten-CMS | Google Sheets | Kader, Trainer, Sponsoren — editierbar ohne Code |
| Automation | GitHub Actions | Täglicher Scraper-Cron um 23:00 Uhr |

---

## 3. Design-System

**Farben**
- Primärfarbe: `#8B0000` (Dunkelrot — Vereinsfarbe)
- Hintergrund: `#FAFAFA` (Off-White)
- Text: `#111111` / `#555555` (muted)
- Oberflächen: `#FFFFFF` / `#F2F2F2`

**Schriften** (Google Fonts, via `next/font` — kein externes Request beim User)
- **Oswald** (Headings) — kompakt, sportlich, alle Caps
- **Inter** (Body) — gut lesbar, neutral

**Radius:** einheitlich 5px — leicht abgerundet, nicht zu weich

---

## 4. Seitenstruktur

```
/                   → Homepage
/spielplan          → Spielplan & Tabelle
/mannschaften       → Mannschaftsübersicht
/mannschaften/[id]  → Einzelne Mannschaft (Kader + Trainer)
/news               → Instagram-Feed
/verein             → Vereinsgeschichte & Vorstand
/sponsoren          → Sponsorenliste
/kontakt            → Kontaktdaten & Formular
/impressum          → Impressum
```

Alle Seiten sind statisch (`○ Static`) außer `/verein` (dynamisch wegen Google Sheets Live-Daten). Das bedeutet: sehr schnelle Ladezeiten, da HTML beim Build vorgerendert wird.

---

## 5. Datenschichten — Woher kommen welche Daten?

Die Website hat drei verschiedene Datenquellen, je nach Datentyp.

### 5a. Automatisch gescrapte Daten → JSON-Dateien im Repo

**Was:** Spielpläne und Tabellen beider Mannschaften  
**Quelle:** ligaportal.at  
**Dateien:**
```
src/data/spielplan-km.json   → KM: alle Spiele der Saison
src/data/spielplan-1b.json   → 1b: alle Spiele der Saison
src/data/tabelle-km.json     → KM: aktuelle Tabelle
src/data/tabelle-1b.json     → 1b: aktuelle Tabelle
```

Warum JSON statt Datenbank: Keine Infrastruktur nötig, Daten sind im Git-Repository versioniert, Next.js importiert sie statisch beim Build → extrem schnell.

### 5b. Manuell verwaltete Daten → Google Sheets

**Was:** Kader, Trainer, Sponsoren, Vereinsvorstand, Mannschaftsfotos  
**Warum Sheets:** Diese Daten ändern sich selten und sollen von Nicht-Technikern gepflegt werden können — ohne Code-Kenntnisse oder Deployment.

Tabs die aktiv genutzt werden:

| Tab | Inhalt | Pflichtfelder |
|---|---|---|
| `KaderKM` | Spieler Kampfmannschaft | `nummer`, `name`, `position`, `foto`* |
| `Kader1b` | Spieler 1b | `nummer`, `name`, `position`, `foto`* |
| `Trainer` | Trainerteam | `name`, `funktion`, `email`, `tel`, `mannschaft`, `foto`* |
| `Sponsoren` | Sponsoren & Logos | `name`, `bild`* |
| `Mitglieder` | Vorstandsmitglieder | `name`, `funktion`, `email`, `bild`* |
| `Mannschaftsfotos` | Teamfotos | `mannschaft`, `bild`* |

\* `foto` / `bild` = Google Drive File-ID (optional)

**Zugriff:** Read-Only via Google Sheets API (öffentlicher API-Key). Schreib-Zugriff ist nicht nötig.

### 5c. Instagram-Feed → rss.app

**Was:** News-Seite  
**Wie:** rss.app wandelt den Instagram-Account in einen JSON-Feed um. Next.js fetcht diesen Feed stündlich gecacht (`revalidate: 3600`). Posts verlinken direkt zu Instagram.

---

## 6. Automatischer Datenscraper

### Architektur

```
GitHub Actions (tägl. 23:00 Uhr)
  └─ Playwright öffnet ligaportal.at im Headless-Browser
       ├─ Navigiert durch alle Runden (ZURÜCK-Button)
       ├─ Extrahiert Spielpläne + Tabellen
       └─ Schreibt src/data/*.json
            └─ git commit + push
                 └─ Vercel deployed automatisch (~2 Min.)
```

### Warum Playwright statt fetch?

ligaportal.at rendert alle Inhalte per JavaScript. Ein einfacher HTTP-Request würde nur leeres HTML zurückgeben. Playwright startet einen echten Chromium-Browser, wartet bis die Inhalte geladen sind, und liest dann das fertige DOM aus.

### Selektoren (ligaportal.at HTML-Struktur)

**Spielplan:**
- Runden-Überschrift: `h3.module-title` → "3. Landesklasse | Runde 15"
- Spielliste: `ul.liveTickerItem li`
- Heimteam: `a.teamHome span.teamName`
- Auswärtsteam: `a.teamAway span.teamName`
- Datum/Uhrzeit: `span.liveTickerTime` → "Fr, 03.04 - 19:15"
- Ergebnis: `a.liveTickerButton` → "2:1" (leer bei Zukunftsspielen)

**Tabelle:**
- Haupttabelle: `table.table-striped tbody tr`
- Teamname: `img[alt]` (vollständiger Name aus Alt-Attribut — CSS kann Text abschneiden)
- Tore: "37:11" wird in `tore_plus` / `tore_minus` aufgeteilt

### Rundennavigation

Die Seite zeigt immer nur eine Runde. Der Scraper klickt sich mit dem ZURÜCK-Button durch alle Runden bis zur Runde 1 und sammelt dabei alle FC Schwarzach-Spiele.

### Scraper-Dateien

```
scripts/scraper/
├── index.ts              → Einstiegspunkt, orchestriert alles
├── scrape-spielplan.ts   → Spielplan-Scraper (Rundennavigation)
└── scrape-tabelle.ts     → Tabellen-Scraper
```

### URLs

| Mannschaft | Spielplan | Tabelle |
|---|---|---|
| KM (3. LK) | `/vbg/3-landesklasse/spielplan` | `/vbg/3-landesklasse/tabelle` |
| 1b (5. LK Unterland) | `/vbg/5-landesklasse/5-landesklasse-unterland/spielplan` | `/vbg/5-landesklasse/5-landesklasse-unterland/tabelle` |

### Datumsformat

Alle Datumswerte werden im Format `YYYY-MM-DD` gespeichert (z.B. `2026-04-05`). ligaportal.at zeigt nur Tag und Monat ("Sa, 05.04"), das Jahr wird aus dem aktuellen Datum erschlossen:
- Monat ≥ 7 (August–Dezember) → Herbstteil der Saison → aktuelles Jahr
- Monat < 7 (Januar–Juni) → Frühjahrsteil der Saison → nächstes Jahr

### Saisonwechsel-Schutz

Wenn der Scraper 0 Spiele findet (Saisonpause, Übergang zur neuen Saison), wird die bestehende JSON-Datei **nicht** überschrieben. Erst wenn wieder echte Spiele gefunden werden, wird die Datei ersetzt. Das verhindert eine leere Website während der Sommerpause.

---

## 7. Google Sheets Bildproxy

Google Drive und Instagram-Bilder können nicht direkt über `<img>` eingebunden werden (CORS, fehlende Referer-Header). Dafür gibt es eine eigene Next.js API Route:

```
/api/image-proxy?url=<encoded-url>
```

Sie prüft die URL gegen eine Whitelist (`cdninstagram.com`, `drive.usercontent.google.com`), fetcht das Bild serverseitig und gibt es mit 24h-Cache-Header weiter. Das verhindert gleichzeitig, dass die Route als offener Proxy missbraucht werden kann.

---

## 8. SEO & Auffindbarkeit

### sitemap.xml (`/sitemap.xml`)
Automatisch generiert durch Next.js. Enthält alle statischen Seiten und alle Mannschaftsseiten mit angepassten Prioritäten und `changeFrequency`-Angaben.

### robots.txt (`/robots.txt`)
Erlaubt alle Crawler, verweist auf die Sitemap.

### Structured Data (Schema.org / JSON-LD)

- **Homepage:** `SportsTeam` — Google kennt den Verein mit Gründungsjahr, Standort, Verband
- **Spielplan:** `SportsEvent` für jedes zukünftige Spiel — Google kann Matches direkt in den Suchergebnissen als Rich Result anzeigen

### Meta-Tags
- Titel-Template: `"Spielplan | FC Schwarzach"` — konsistent auf allen Seiten
- `og:locale: de_AT`, `og:type: website`, `og:siteName`
- `lang="de"` im HTML-Tag

---

## 9. Umgebungsvariablen

### Lokal (`.env.local`)

```
NEXT_PUBLIC_GOOGLE_SHEETS_ID   → Sheet-ID (öffentlich, da im Browser verwendet)
GOOGLE_SHEETS_API_KEY          → Read-Only API-Key für Google Sheets
```

### Vercel Environment Variables

```
NEXT_PUBLIC_GOOGLE_SHEETS_ID   → gleich wie .env.local
GOOGLE_SHEETS_API_KEY          → gleich wie .env.local
```

### GitHub Secrets (für Scraper in Actions)

Der Scraper benötigt keine Secrets mehr — er schreibt nur lokale JSON-Dateien und pusht via `GITHUB_TOKEN`, das automatisch in jeder GitHub Actions-Umgebung verfügbar ist.

---

## 10. Lokale Entwicklung

```bash
npm run dev        # Entwicklungsserver auf localhost:3000
npm run build      # Produktions-Build (prüft TypeScript + Build)
npm run scraper    # Scraper manuell ausführen (schreibt JSON-Dateien)
```

---

## 11. Deployment-Flow

```
Entwickler pusht Code
  └─ Vercel erkennt Push → baut Next.js → deployt (~1-2 Min.)

GitHub Actions (tägl. 23:00 Uhr)
  └─ Scraper läuft → updated JSON-Dateien → pusht Commit
       └─ Vercel erkennt Push → deployt mit neuen Daten (~2 Min.)
```

Daten sind täglich um ca. 23:02 Uhr aktuell auf der Live-Website.

---

## 12. Was nicht automatisiert ist

| Bereich | Warum manuell | Wie ändern |
|---|---|---|
| Kader / Trainer | Saisonal, braucht Kontrolle | Google Sheet bearbeiten |
| Sponsoren | Ändern sich selten | Google Sheet bearbeiten |
| Vereinsvorstand | Ändern sich selten | Google Sheet bearbeiten |
| Mannschaftsfotos | Braucht Bildupload | Google Drive + Sheet-ID eintragen |
| Vereinsinfos (`/verein`) | Statischer Text, selten ändernd | Code-Änderung in `verein/page.tsx` |

---

## 13. Projektstruktur (Übersicht)

```
fc-schwarzach/
├── .github/
│   └── workflows/
│       └── scraper.yml          → GitHub Actions Cron-Job
├── scripts/
│   └── scraper/
│       ├── index.ts             → Scraper Einstiegspunkt
│       ├── scrape-spielplan.ts  → Spielplan-Scraper
│       └── scrape-tabelle.ts    → Tabellen-Scraper
└── src/
    ├── app/
    │   ├── api/image-proxy/     → Bildproxy API Route
    │   ├── impressum/           → Impressum
    │   ├── kontakt/             → Kontakt
    │   ├── mannschaften/        → Mannschaftsübersicht + [team]
    │   ├── news/                → Instagram-Feed
    │   ├── spielplan/           → Spielplan & Tabelle
    │   ├── sponsoren/           → Sponsoren
    │   ├── verein/              → Vereinsseite
    │   ├── layout.tsx           → Root Layout (Navbar, Footer, Fonts)
    │   ├── page.tsx             → Homepage
    │   ├── robots.ts            → /robots.txt
    │   └── sitemap.ts           → /sitemap.xml
    ├── components/
    │   ├── home/                → Hero, NextMatchCard, NewsTeaser, StatsBar, SponsorsStrip
    │   ├── layout/              → Navbar, Footer
    │   ├── mannschaften/        → PlayerCard, TeamCard
    │   ├── spielplan/           → SpielplanClient, SheetMatchRow, LeagueTable
    │   ├── sponsoren/           → SponsorCard
    │   ├── verein/              → BoardCard, Timeline
    │   ├── ui/                  → Button, Card, Badge, Tabs (Radix UI)
    │   └── JsonLd.tsx           → Structured Data Helper
    ├── data/
    │   ├── players.ts           → Mannschaftsdefinitionen, statische Spielerdaten
    │   ├── sponsors.ts          → Statische Sponsorendaten (Fallback)
    │   ├── spielplan-km.json    → Scraper-Output KM
    │   ├── spielplan-1b.json    → Scraper-Output 1b
    │   ├── tabelle-km.json      → Scraper-Output KM
    │   └── tabelle-1b.json      → Scraper-Output 1b
    └── lib/
        ├── sheets.ts            → Google Sheets API (Kader, Trainer, Sponsoren etc.)
        ├── instagram-feed.ts    → rss.app JSON-Feed Parser
        └── utils.ts             → Hilfsfunktionen (cn, formatDateLong)
```
