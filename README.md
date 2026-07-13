# Porsche Experience - First-Class Release 3.1

## Projektstatus

Mehrseitiges, inoffizielles Schul- und Portfolio-Projekt ueber Geschichte, Modelle und Technik des Porsche 911. Die vorhandene Ordner- und Codestruktur wurde bewusst beibehalten, damit alle Gruppenmitglieder die Dateien weiterhin erklaeren und praesentieren koennen.

## Start

1. ZIP-Datei entpacken.
2. `START_HIER.html` oder `index.html` im Browser oeffnen.
3. Fuer die Praesentation die Seiten in dieser Reihenfolge zeigen: Home, Geschichte, Modelle, Technik, Projekt, Newsletter, Shop.

## First-Class-Verbesserungen

- Navigation zentral vereinheitlicht: aktive Inhaltsseiten eindeutig rot, Home nur aktiv gold, Projekt als dezenter Gold-CTA und Newsletter mit kontrolliertem Goldpuls.
- Seitenlokale Navigationsregeln entfernt und im bestehenden globalen Stylesheet zentral zusammengefuehrt.
- Vollstaendige und zentrierte Fahrzeugbilder ohne verdeckte Raeder oder ueberlappende Textkarten.
- Ruhigeres Premium-Farbsystem: dunkle Neutraltoene, Gold fuer Heritage und wichtige Aktionen, Rot fuer aktiven Status und Warenkorb.
- Einheitliche Footer, Abstaende, Karten, Fokuszustaende und mobile Touch-Ziele.
- Neue Inhalte: Design-DNA, Engineering-Prinzipien, Qualitaetsgates, Newsletter-Vorschau und interaktiver 911-Modellvergleich.
- Progressive Enhancement: Inhalte bleiben ohne JavaScript und beim Druck sichtbar.
- Lokale externe Library: Underscore.js 1.13.4 unter MIT-Lizenz.
- Keine echte Bestellung, keine echte Zahlung und kein Tracking.
- 26 responsive Seitenprüfungen und gezielte Interaktionstests ohne Website-Laufzeitfehler.

## Technik

- HTML5
- CSS3
- Vanilla JavaScript
- Underscore.js 1.13.4 fuer debounced Resize-Logik
- localStorage fuer den Demo-Warenkorb
- sessionStorage fuer die temporaere Demo-Bestellbestaetigung

## Team

- Daniel Wroblewski
- Julian Krauß
- Ibraham Nadeem
- Falco Kneffel
- David Hahn

Julian Krauß uebernahm in der Abschlussphase insbesondere Qualitaetspruefung, Fehlerbereinigung, Performance, Barrierefreiheit, Release-Dokumentation und die First-Class-Ueberarbeitung.

## Rechtlicher Hinweis

Das Projekt ist nicht mit der Porsche AG verbunden. Vor einer oeffentlichen kommerziellen Nutzung muessen Marken-, Bild-, Video- und sonstige Medienrechte vollstaendig geklaert werden.


## Harmonisierung Release 3.1
- gemeinsame Typografie- und Footer-Ebene in `global/site-harmony.css`
- genau eine Hauptüberschrift pro Inhaltsseite
- konsistente Zentrierung von Abschnittsköpfen und responsiven Footer-Inhalten
- defensive gemeinsame Bedienlogik in `global/site-harmony.js`
- nicht vorhandenen Stylesheet-Verweis in `START_HIER.html` entfernt


## Inhaltliche Vertiefung Release 3.1

- interaktives 911 Engineering Lab mit vier Fahrsituationen
- aktueller Technikbereich zu T-Hybrid, eTurbo, PDK und aktiver Aerodynamik
- ausgeglichener Informationsumfang auf allen Haupt- und Funktionsseiten
- gemeinsame Depth-Cards und Prozessdarstellungen im globalen Harmonisierungssystem
- neue Suchziele und englische Übersetzungen für die ergänzten Inhalte
- erweiterte Quellenübersicht mit offiziellen Porsche-Fachquellen


## Inhaltsarchitektur Release 3.1

Die Seiten wurden nicht auf dieselbe Wortzahl gebracht, sondern nach ihrer Aufgabe gewichtet. Dadurch bleiben redaktionelle Seiten tief, während Funktionsseiten kompakt und bedienbar bleiben.

| Seite | Hauptbereiche | Schwerpunkt |
|---|---:|---|
| Home | 5 | Einstieg, Highlights, Medien und Weiterleitung |
| Geschichte | 6 | Entwicklung, Generationen, Wendepunkte und Fazit |
| Modelle | 7 | Varianten, Slider, Vergleich und Entscheidungshilfe |
| Technik | 8 | Motor, Getriebe, Fahrwerk, Bremsen, Aerodynamik, Daten und Engineering Lab |
| Newsletter | 4 | Inhalte, Vorschau, Formular und Demo-Hinweis |
| Projekt | 5 | Idee, Seitenstruktur, Technik, Team und Qualität |
| Shop | 6 | Produktsuche, Filter, Warenkorb und kurze Erklärbereiche |
| Warenkorb, Checkout, Bestellung | je 4 | Funktionsablauf ohne störende Textmengen |
| Q&A | 6 | Kategorien, Fragen, eigene Eingabe und Funktionshinweis |
| Rechtliches | 4 | Marken, Datenschutz, Quellen und Demo-Status |


## Release 3.1 - Harmonisierung

- responsive Zwischenstufe für eine nutzbare Suche bei mittleren Desktopbreiten
- semantisch korrekte Überschriftenstruktur und aktive Navigation mit `aria-current`
- keine künstlich fokussierbaren Informationskarten mehr
- vollständige Bewegungsreduktion für globale Animationen und Scrollfunktionen
- robustere Formularrückmeldungen und Fokusführung im Newsletter
- horizontal sichere Technikdatentabelle
- optimierte Logo-Dateien bei unveränderter Ordnerstruktur
- gemeinsame Fokus-, Druck- und Ankerregeln für alle Seiten


## Abschlussprüfung Release 3.1

- 13 HTML-Seiten in Desktop- und Mobilansicht geprüft
- 0 defekte lokale Verweise, doppelte IDs oder horizontale Überläufe
- 11 CSS- und 11 JavaScript-Dateien syntaktisch geprüft
- mobile Navigation, Karussell, Suche, Technik-Lab, Newsletter und Q&A getestet
- Shop mit sechs Produkten, Warenkorb, Mengensteuerung und Preisberechnung getestet
- Checkout-Speicherung und Bestellbestätigung getrennt verifiziert
- mittlere Desktopbreiten mit nutzbarer 280-Pixel-Suche geprüft

## Mobile Header und Team - Release 3.1

- Markenblock und Menübutton stehen auf Smartphones in einer gemeinsamen Zeile.
- Der Menübutton ist rechts ausgerichtet und bleibt bei geöffnetem Menü an derselben Position.
- HTML-Reihenfolge, CSS-Grid und bestehende JavaScript-Menülogik wurden gemeinsam geprüft.
- Projektteam: Daniel Wroblewski, David Hahn, Julian Krauß, Ibraham Nadeem und Falco Kneffel.
