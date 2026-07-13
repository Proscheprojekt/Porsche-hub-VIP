# Porsche Experience – Release 3.1

## Überarbeitung

- Navigation auf allen Seiten in einem bestehenden globalen Stylesheet vereinheitlicht
- Desktop-Header kompakter, klarer und besser skaliert
- Mobile Navigation als übersichtliches Raster statt langer Button-Liste
- Schnellzugriffe auf Mobilgeräten mit sichtbaren Bezeichnungen
- Desktop-Schnellzugriffe mit zugänglichen Tooltips
- Newsletter bleibt dunkel und pulsiert ausschließlich über Kontur und Licht
- Referenz-Navigation beibehalten: Home und Projekt gold, aktive Inhaltsseite rot, Newsletter mit Goldpuls
- Suchfeld und Suchergebnisse responsiv und tastaturfreundlich
- Nicht interaktive Informationskarten nicht länger künstlich fokussierbar
- Scroll-Reveal als Progressive Enhancement: Inhalte bleiben ohne JavaScript sichtbar
- Reduzierte Bewegung wird weiterhin respektiert
- Ordner-, Seiten- und JavaScript-Struktur beibehalten

## Prüfung

Siehe `TESTPROTOKOLL.md`.


## Footer- und Navigationsüberarbeitung

- Einheitlicher Premium-Footer auf allen Projektseiten
- Semantisch korrekte Tab-Reihenfolge: Hauptnavigation, Suche, Schnellzugriffe
- Klickbarer Markenbereich als Rückweg zur Startseite
- Responsive Header-Abstände und kompaktere mobile Anordnung
- Aktuelle Seite zusätzlich im Footer kenntlich gemacht
- Start-Hinweisseite mit eigenem kompakten Abschlussbereich


## Harmonisierung Release 3.1
- gemeinsame Typografie- und Footer-Ebene in `global/site-harmony.css`
- genau eine Hauptüberschrift pro Inhaltsseite
- konsistente Zentrierung von Abschnittsköpfen und responsiven Footer-Inhalten
- defensive gemeinsame Bedienlogik in `global/site-harmony.js`
- nicht vorhandenen Stylesheet-Verweis in `START_HIER.html` entfernt

- Technik-Tabs semantisch und per Tastatur vollständig bedienbar gemacht
- gemeinsame Footer- und Textausrichtung auf allen Seiten geprüft


## Release 3.1 - Informationsbalance und Engineering Lab

- Technikseite um ein interaktives Systemlabor erweitert
- Hauptseiten in Umfang und Informationsarchitektur angeglichen
- Shop-, Q&A-, Newsletter- und Rechteseite fachlich vertieft
- Warenkorb, Checkout und Bestätigung als zusammenhängender Prozess erklärt
- gemeinsame CSS-Komponenten in `global/site-harmony.css` ergänzt
- Engineering-Interaktion in `Technik/script.js` defensiv und tastaturbedienbar umgesetzt
- Suchindex und Übersetzungswörterbuch auf neue Inhalte erweitert


## Release 3.1 - ausgewogene Inhaltsverteilung

- Hauptseiten nach ihrer tatsächlichen Aufgabe gegliedert statt künstlich auf dieselbe Textmenge gebracht.
- Geschichte, Modelle, Technik und Projekt besitzen vergleichbare redaktionelle Tiefe.
- Technik bleibt bewusst am umfangreichsten und enthält das interaktive Engineering Lab.
- Newsletter, Shop, Warenkorb, Checkout und Bestellung bleiben funktionsorientiert.
- Zusammengehörige Teilbereiche wurden in größere, klarere Kapitel zusammengeführt.
- HTML-IDs, Suchziele, Übersetzung und JavaScript-Funktionen blieben erhalten.
- Gemeinsame Abstände und Ankerpositionen werden zentral über site-harmony.css gepflegt.


### Zusätzliche Harmonisierung

Navigation bei mittleren Viewports, Fokusführung, Überschriftenhierarchie, reduzierte Bewegung, Formvalidierung und Mediengewicht wurden abschließend korrigiert.

## Release 3.1 - Mobile Kopfzeile und Teamdaten

- Menübutton rechts neben dem Markenblock positioniert.
- Mobile Kopfzeile als zweispaltiges CSS-Grid umgesetzt.
- Geöffnete Navigation belegt eine eigene vollständige Zeile.
- Burger-zu-X-Animation an aria-expanded gekoppelt.
- Teamnamen in Meta-Daten, strukturierten Daten, Projektseite und Dokumentation vereinheitlicht.


## Release 3.1 – Karussell-Punkte auf allen Geräten

- Dot-Leiste auf Desktop, Tablet und Mobilgeräten sichtbar schlanker gestaltet.
- Kleine visuelle Punkte bei weiterhin ausreichend großen, anklickbaren Button-Flächen.
- Aktiver Punkt als schmale rote Kapsel mit zurückhaltendem Leuchteffekt.
- Fokuszustand für Tastaturbedienung ergänzt.
- HTML- und JavaScript-Struktur unverändert; die vorhandene `is-active`-Logik arbeitet weiterhin mit den CSS-Zuständen zusammen.
