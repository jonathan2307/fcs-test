export type NewsCategory = "Vereinsnews" | "Spielbericht" | "Transfer";

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  date: string;
  imageAlt: string;
};

export const news: NewsArticle[] = [
  {
    id: "1",
    slug: "sieg-gegen-admira-dornbirn",
    title: "Starker Heimsieg gegen SC Admira Dornbirn",
    excerpt:
      "Die Kampfmannschaft des FC Schwarzach feierte am Freitagabend einen verdienten 3:1-Heimsieg gegen den SC Admira Dornbirn und festigt damit Platz zwei in der 3. Landesklasse.",
    content: `Die Kampfmannschaft des FC Schwarzach lieferte am Freitagabend vor heimischem Publikum eine überzeugende Leistung ab und bezwang den SC Admira Dornbirn mit 3:1.

Bereits in der 12. Minute eröffnete ein präziser Abschluss nach einer mustergültigen Kombination das Skore. Admira Dornbirn antwortete kurz vor der Pause mit dem Ausgleich, doch die Schwarzacher ließen sich nicht beirren.

Im zweiten Durchgang übernahm der FC Schwarzach das Kommando vollständig. Ein Doppelschlag in der 67. und 73. Minute sorgte für klare Verhältnisse. Trainer Hannes Gasser zeigte sich nach dem Schlusspfiff hochzufrieden: „Die Mannschaft hat heute gezeigt, was in ihr steckt. Wir sind in allen Belangen geschlossen aufgetreten."

Mit diesem Sieg festigt Schwarz-Rot Platz zwei in der 3. Landesklasse und bleibt weiterhin auf Kurs Richtung Aufstiegsrunde.`,
    category: "Spielbericht",
    date: "2025-03-22",
    imageAlt: "FC Schwarzach Spieler jubeln nach dem Tor gegen SC Admira Dornbirn",
  },
  {
    id: "2",
    slug: "auswärtssieg-wolfurt",
    title: "FC Schwarzach siegt auch in Wolfurt",
    excerpt:
      "Mit einem knappen, aber verdienten 2:1-Auswärtssieg beim FC Wolfurt 1b bewies die Kampfmannschaft ihre Auswärtsstärke und bleibt in der Spitzengruppe.",
    content: `Auch beim FC Wolfurt 1b blieb der FC Schwarzach auf der Siegerstraße. Durch einen hart erkämpften 2:1-Erfolg beim Auswärtsspiel in Wolfurt bewies die Mannschaft von Trainer Christoph Adler ihre Qualitäten auch abseits des heimischen Rasens.

Das frühe Rückstandstor der Gastgeber in der 8. Minute brachte Schwarzach kurz aus dem Konzept, doch die Mannschaft fand rasch zurück in die Spur. Ein wuchtiger Kopfball zum 1:1 sowie ein sehenswerter Weitschuss kurz nach der Pause brachten die Wende.

In der Schlussphase verteidigten die Schwarzacher den knappen Vorsprung mit großem Einsatz und brachten die drei Punkte sicher nach Hause. „Solche Siege schweißen die Gruppe zusammen", betonte Sportlicher Leiter Hannes Gasser nach dem Abpfiff.`,
    category: "Spielbericht",
    date: "2025-03-15",
    imageAlt: "FC Schwarzach Spieler beim Auswärtsspiel in Wolfurt",
  },
  {
    id: "3",
    slug: "neuer-nachwuchstrainer",
    title: "FC Schwarzach verstärkt Nachwuchsbereich",
    excerpt:
      "Mit der Verpflichtung eines erfahrenen Nachwuchstrainers setzt der FC Schwarzach ein klares Zeichen für die Jugendarbeit. Nachwuchsleiter Erkan Özcan freut sich auf die Zusammenarbeit.",
    content: `Der FC Schwarzach investiert weiter in die Zukunft: Mit einem erfahrenen Nachwuchstrainer aus der Region wird die Jugendabteilung des Vereins ab sofort verstärkt.

„Wir wollen den Kindern und Jugendlichen aus Schwarzach und Umgebung die bestmögliche fußballerische Ausbildung bieten", sagt Nachwuchsleiter Erkan Özcan. „Mit diesem Schritt unterstreichen wir unseren Anspruch, eine ernsthafte Ausbildungsstätte im Vorarlberger Fußball zu sein."

Die Zusammenarbeit im Rahmen der SG Hofsteig, der der FC Schwarzach gemeinsam mit mehreren Nachbarvereinen angehört, ermöglicht es, attraktive Trainings- und Spielmöglichkeiten für alle Altersklassen von U10 bis U16 anzubieten.

Interessierte Eltern und Kinder sind herzlich eingeladen, beim nächsten Training vorbeizuschauen. Alle Informationen zur Anmeldung gibt es direkt beim Verein.`,
    category: "Vereinsnews",
    date: "2025-03-10",
    imageAlt: "Jugendliche beim Training des FC Schwarzach",
  },
  {
    id: "4",
    slug: "generalversammlung-2025",
    title: "Generalversammlung 2025 – Rückblick und Ausblick",
    excerpt:
      "Bei der diesjährigen Generalversammlung des FC Schwarzach wurden wichtige Weichen für die Zukunft gestellt. Obmann Roman Eder präsentierte eine erfreuliche Jahresbilanz.",
    content: `Die diesjährige Generalversammlung des FC Schwarzach stand ganz im Zeichen von Aufbruchsstimmung und Zusammenhalt. Obmann Roman Eder präsentierte vor den anwesenden Mitgliedern eine erfreuliche Jahresbilanz.

Sportlich verlief die vergangene Saison über weite Strecken erfolgreich. Die Kampfmannschaft etablierte sich in der 3. Landesklasse, die 1b Mannschaft spielte eine solide Rolle in der 5. Landesklasse Unterland, und der Nachwuchs entwickelt sich unter der Führung von Erkan Özcan erfreulich.

Finanziell steht der Verein auf soliden Beinen. Vizeobmann und Kassier Jürgen Hämmerle präsentierte eine ausgeglichene Bilanz, die auch dank der treuen Unterstützung der Sponsoren zustande kam.

Für die kommende Saison wurden als Ziele der sportliche Angriff auf die Aufstiegsplätze sowie der weitere Ausbau der Jugendabteilung definiert.`,
    category: "Vereinsnews",
    date: "2025-02-28",
    imageAlt: "Generalversammlung des FC Schwarzach 2025",
  },
  {
    id: "5",
    slug: "transfer-winter-2025",
    title: "Winterzugänge komplett – FC Schwarzach startet durch",
    excerpt:
      "Der FC Schwarzach hat die Winterpause genutzt und seinen Kader gezielt verstärkt. Drei Neuzugänge sollen die Kampfmannschaft auf dem Weg in die Aufstiegsrunde unterstützen.",
    content: `Der FC Schwarzach geht gestärkt in die Rückrunde. Sportlicher Leiter Hannes Gasser und Christoph Adler haben die Transferperiode genutzt und drei erfahrene Spieler verpflichtet, die den Kader der Kampfmannschaft gezielt verstärken.

„Wir haben uns in der Hinrunde gut geschlagen, wussten aber, wo wir uns noch verbessern können. Die Neuzugänge passen charakterlich und spielerisch perfekt zu uns", sagt Gasser.

Alle drei Neuzugänge kommen aus der näheren Region und kennen den Vorarlberger Fußball aus eigener Erfahrung. Die Integration in die Mannschaft verlief laut Trainerteam reibungslos.

Die Rückrunde startet am 7. März, wenn der FC Schwarzach zuhause auf den FC Lauterach 1b trifft. Auf geht's, Schwarz-Rot!`,
    category: "Transfer",
    date: "2025-02-15",
    imageAlt: "Neue Spieler stellen sich beim FC Schwarzach vor",
  },
  {
    id: "6",
    slug: "sponsorentreffen-2025",
    title: "Herzlicher Dank an unsere Sponsoren",
    excerpt:
      "Beim jährlichen Sponsorentreffen bedankte sich der FC Schwarzach bei seinen treuen Partnern. Marketing-Verantwortlicher Florian Hämmerle präsentierte neue Kooperationsmöglichkeiten.",
    content: `Der FC Schwarzach lud seine Sponsoren und Partner zum traditionellen Jahrestreffen ein. In einer herzlichen Atmosphäre bedankte sich der Verein bei allen Partnern, die den Verein im vergangenen Jahr tatkräftig unterstützt haben.

Marketing-Verantwortlicher Florian Hämmerle präsentierte dabei die Reichweite und Aktivitäten des Vereins sowie neue Kooperationsmöglichkeiten für die kommende Saison. „Ohne unsere Sponsoren wäre all das nicht möglich. Wir sind sehr dankbar für das Vertrauen, das uns entgegengebracht wird", betonte Hämmerle.

Besonderer Dank gilt den langjährigen Hauptsponsoren ATW, Spar Albrecht und Mohrenbräu, die den Verein bereits seit vielen Jahren begleiten.

Interessierte Unternehmen, die den FC Schwarzach als Partner unterstützen möchten, können sich direkt an Florian Hämmerle wenden.`,
    category: "Vereinsnews",
    date: "2025-02-01",
    imageAlt: "Sponsorentreffen beim FC Schwarzach",
  },
];
