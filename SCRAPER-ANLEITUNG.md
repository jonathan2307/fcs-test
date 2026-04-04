# Scraper manuell auslösen

Der Scraper läuft automatisch täglich um 23:00 Uhr. Falls du ihn früher
auslösen möchtest (z.B. nach einem Spieltag), geht das in wenigen Klicks.

---

## Schritt-für-Schritt

**1.** Gehe auf GitHub zu deinem Repository

**2.** Klicke oben auf den Tab **"Actions"**

![Actions Tab](https://i.imgur.com/placeholder.png)

**3.** Klicke links in der Liste auf **"Ligaportal Scraper"**

**4.** Klicke rechts auf den Button **"Run workflow"**

**5.** Im Dropdown das erscheint: nochmals auf den grünen Button **"Run workflow"** klicken

**6.** Die Seite neu laden — der Scraper erscheint nun oben in der Liste mit einem gelben Kreis (= läuft)

**7.** Nach ca. 3–5 Minuten wird der Kreis grün (= erfolgreich). Die Website ist dann automatisch aktuell.

---

## Was passiert im Hintergrund?

```
Du klickst "Run workflow"
  └─ GitHub startet einen virtuellen Server
       └─ Scraper läuft (~3 Min.)
            └─ JSON-Dateien werden updated
                 └─ Commit wird gepusht
                      └─ Vercel deployt automatisch (~2 Min.)

Gesamtdauer: ca. 5 Minuten
```

---

## Fehlgeschlagen? (roter Kreis)

Klicke auf den fehlgeschlagenen Lauf → dann auf **"scrape"** → dann auf den
fehlgeschlagenen Schritt um die Fehlermeldung zu sehen.

Häufigste Ursachen:
- ligaportal.at war kurz nicht erreichbar → einfach nochmal auslösen
- ligaportal.at hat die HTML-Struktur geändert → Scraper muss angepasst werden
