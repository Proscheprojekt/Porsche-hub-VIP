# Testprotokoll – Porsche Experience Release 3.1

Stand: 11. Juli 2026

## Gesamtergebnis

Die Release-Version 2.8 wurde statisch, responsiv und anhand gezielter Interaktionsabläufe geprüft. HTML, CSS und JavaScript wurden gemeinsam betrachtet, damit nicht nur einzelne Dateien, sondern das tatsächliche Zusammenspiel der Seiten bewertet wird.

| Prüfbereich | Ergebnis |
|---|---:|
| HTML-Seiten | 13 |
| CSS-Dateien | 11 |
| JavaScript-Dateien | 11 |
| Desktop- und Mobilansichten | 26 |
| fehlende lokale Verweise | 0 |
| doppelte HTML-IDs | 0 |
| JavaScript-Syntaxfehler | 0 |
| CSS-Syntaxfehler | 0 |
| horizontaler Überlauf | 0 |
| Hauptüberschriften | genau eine `h1` pro Seite |
| Footer | auf jeder Inhaltsseite vorhanden |

## 1. Gemeinsame Struktur

- vorhandene Ordner- und Dateistruktur beibehalten
- jede Inhaltsseite besitzt `data-page`, Skip-Link und fokussierbaren Hauptinhalt
- aktive Seitenzustände sind mit `aria-current="page"` ausgezeichnet
- mobile Menübuttons besitzen explizit `type="button"`
- Suchfelder sind als Combobox mit Ergebnisliste beschrieben
- Logoabmessungen und Ladeattribute sind auf allen Seiten vereinheitlicht
- Überschriftenhierarchie ohne Sprünge und mit genau einer Hauptüberschrift

## 2. CSS-Harmonisierung

- gemeinsame Fokus-, Touch-, Anker-, Druck- und Bewegungsregeln zentral abgestimmt
- responsive Zwischenstufe für 1261 bis 1460 Pixel ergänzt
- Suchfeld bleibt bei 1365 Pixel Breite mit 280 Pixel nutzbar
- Hauptnavigation erhält bei mittleren Desktopbreiten eine eigene zweite Zeile
- Tabellen auf kleinen Bildschirmen horizontal sicher scrollbar
- Informationskarten werden nicht mehr künstlich als interaktive Elemente behandelt
- mobile Sprachsteuerung wird in das geöffnete Menü integriert und überdeckt keine Inhalte
- `prefers-reduced-motion` reduziert Animationen, Autoplay und glattes Scrollen

## 3. Responsive Prüfung

Geprüfte Viewports:

- Desktop: 1365 × 900 Pixel
- Mobil: 390 × 844 Pixel

Auf allen 13 Seiten wurden kontrolliert:

- kein horizontaler Überlauf
- keine JavaScript-Laufzeitfehler
- vollständiger Footer
- lesbare Textausrichtung und sinnvolle Inhaltsbreiten
- erreichbare Navigation und Schnellzugriffe
- responsive Karten, Tabellen, Formulare und Medien

## 4. Interaktionsprüfungen

| Bereich | geprüfter Ablauf | Ergebnis |
|---|---|---|
| Navigation | mobiles Menü öffnen, Zustand und Beschriftung | bestanden |
| Startseite | Karussell zum nächsten Slide | bestanden |
| Technik | Engineering Lab auf Rennstreckenmodus umschalten | bestanden |
| Newsletter | Fehlerfokus, Zustimmung und Erfolgsansicht | bestanden |
| Q&A | eigene Frage eingeben und Antwort erzeugen | bestanden |
| Shop | sechs Produktkarten rendern und Produkt hinzufügen | bestanden |
| Warenkorb | zwei Positionen laden, Menge erhöhen und Summe neu berechnen | bestanden |
| Checkout | zwei Positionen anzeigen und gültige Demo-Bestellung in `sessionStorage` speichern | bestanden |
| Bestellung | Name, Bestellnummer und Gesamtpreis aus Sitzungsspeicher darstellen | bestanden |

Beim isolierten Checkout-Test wurde die relative Seitennavigation des Testdokuments nicht ausgeführt, weil der Test ohne öffentlichen Server in einer eingebetteten Browserumgebung lief. Die für den Übergang entscheidenden Daten wurden jedoch vor der Navigation korrekt gespeichert; die Bestellseite wurde mit demselben Datenformat separat erfolgreich geprüft.

## 5. Barrierefreiheit und Ergonomie

- sichtbare Fokuszustände für Tastaturbedienung
- Mindestgröße von 44 Pixeln für zentrale Bedienelemente
- Escape schließt das mobile Menü
- Skip-Link überträgt den Fokus in den Hauptinhalt
- Newsletter fokussiert das erste fehlerhafte Feld
- Statusmeldungen über `aria-live`
- Technik-Tabs mit Tastatursteuerung und korrekten ARIA-Rollen
- keine unnötigen `tabindex`-Werte auf reinen Informationskarten

## 6. Datenschutz und Transparenz

- keine echte Zahlung und keine Serverübertragung
- Warenkorb lokal über `localStorage`
- Bestelldaten temporär über `sessionStorage`
- keine Namen, Adressen oder E-Mail-Adressen in der Bestätigungs-URL
- Demo-Charakter von Newsletter, Shop und Checkout sichtbar erklärt

## 7. Veröffentlichungshinweis

Die technische Demo ist für Unterricht, Präsentation und ein privates Bewerbungsportfolio vorbereitet. Vor einer frei zugänglichen Veröffentlichung müssen die Nutzungsrechte an Bildern, Videos, Logos und Markenbestandteilen vollständig dokumentiert und bestätigt werden.

## Zusatzprüfung Release 3.1

- Mobile Headerstruktur bei 320, 360, 369 und 390 Pixel Breite geprüft.
- Markenblock bleibt links; Menübutton steht rechts in derselben Zeile.
- Geöffnete Navigation bleibt darunter und erzeugt keinen horizontalen Überlauf.
- aria-expanded und Burger-zu-X-Zustand synchron geprüft.
- Alle fünf Teamnamen in HTML-Metadaten, JSON-LD, Projektseite und README abgeglichen.
