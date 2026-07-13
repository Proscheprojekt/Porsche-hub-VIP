# Änderungsprotokoll – Porsche Experience Release 3.18

Stand: 12. Juli 2026

## 1. Ergebnis

Die vorhandene Projektstruktur wurde beibehalten und gezielt erweitert. HTML, CSS und JavaScript wurden gemeinsam angepasst, sodass neue Inhalte, Bilder und dynamische Funktionen dieselben Klassen, IDs und Zustände verwenden. Es wurde keine zweite Navigation, keine zweite Suchleiste und kein zusätzlicher Warenkorb eingebaut.

## 2. Geänderte und neue Dateien

### Inhalt und Seitenstruktur

- `index.html`
- `geschichte.html`
- `modelle.html`
- `Technik.html`
- `Newsletter.html`
- `Projekt.html`
- `qa.html`
- `shop.html`
- `warenkorb.html`
- `checkout.html`
- `bestellung.html`
- `rechtliches.html`

Die sechs zuletzt genannten Seiten erhielten ausschließlich die einheitliche Desktop-Reihenfolge der Header-Schnellzugriffe. Ihre Seiteninhalte wurden nicht unnötig umgebaut.

### Stylesheets

- `global/navigation-exact.css`
- `global/content-media.css` – neu
- `main web/style.css`

### JavaScript

- `modelle/script.js`
- `Technik/script.js`
- `global/translate-interactive.js`

### Dokumentation und Prüfung

- `QUELLEN_UND_LIZENZEN.md`
- `AENDERUNGSPROTOKOLL_RELEASE_3_18.md` – neu
- `FINAL_STATIC_TEST_REPORT_3_18.json` – neu
- `FINAL_BROWSER_TEST_REPORT_3_18.json` – neu

### Neue Medien

- Ordner `assets/content/` mit 35 WebP-Dateien

## 3. Entfernte Elemente

### Startseite

- vollständiger Statistikblock mit `60+`, `8`, `13` und `100 %`
- gemeinsamer Statistik-Wrapper einschließlich der dadurch unnötigen Abstände
- sichtbare kleine Bezeichnung `Willkommen`
- sichtbare Überschrift `Porsche Experience als professionelles Schulprojekt`
- kleine Unterschrift `Leitgedanke der Abschlussüberarbeitung`

Für die semantische Dokumentstruktur bleibt eine rein visuell verborgene H1 `Porsche Experience` bestehen. Sie erzeugt keine sichtbare Ersatzüberschrift.

### Geschichtsseite

- Abschnitt `Hinweis zur Darstellung` an seiner bisherigen Position
- kein leerer Wrapper oder Restabstand zurückgelassen

### Technikseite

- allgemeines Augen-/Platzhaltersymbol in den Technikbereichen
- vier separate Symbolwrapper, die nicht mehr zum dynamischen Bildkonzept gehören

### Bereinigter Code

- nicht mehr benötigte CSS-Regeln des entfernten Statistikblocks
- keine JavaScript-Abfragen auf die entfernten Überschriften, Statistikboxen oder Technik-Symbole

## 4. Verschobene Inhalte

### Hinweis zur Darstellung

Der vollständige Hinweis wurde von `geschichte.html` nach `index.html` verschoben. Er befindet sich nun direkt beim allgemeinen Projekt-Erklärungstext und kommt nur einmal vor.

### Desktop-Schnellzugriffe

Die tatsächliche HTML-Reihenfolge wurde auf allen betroffenen Desktop-Seiten geändert zu:

1. Warenkorb
2. E-Mail
3. § / Rechtliches
4. Q&A
5. Suchfeld

Es wurde keine rein optische Desktop-Sortierung verwendet. Dadurch stimmen DOM-Reihenfolge, Tastaturreihenfolge und Funktionszuordnung überein.

Die vorhandene mobile Darstellung wurde nicht neu aufgebaut. Innerhalb des bestehenden mobilen Menüs stellt CSS die bisherige sichtbare Reihenfolge wieder her. Es bleiben genau eine Suchleiste und ein Warenkorb vorhanden.

## 5. Ergänzte Bilder

Alle neuen Bilder liegen lokal unter `assets/content/`. Sie wurden aus bereits vorhandenen Projektmedien, einem lokalen Videoframe oder eigens gesetzten Projekt-/Codegrafiken erstellt. Es wurden keine zusätzlichen externen Bilddateien eingebunden.

### Startseite

- `home-project-overview.webp` – Projektvorstellung rechts neben dem Text
- `home-history-path.webp` – Karte zur Form- und Generationsentwicklung
- `home-model-path.webp` – Karte zu Carrera, Targa, Turbo und GT
- `home-tech-path.webp` – Karte zum technischen Fahrerlebnis

### Geschichte

- `history-light-signature.webp` – runde Lichtsignatur
- `history-roofline.webp` – abfallende Dachlinie
- `history-rear-engine.webp` – Motor im Heck
- `history-compact-front.webp` – kompakte Front
- `history-evolution.webp` – Evolution statt Neustart
- `history-wide-rear.webp` – breites Heck
- `history-tradition.webp` – Tradition
- `history-progress.webp` – Fortschritt
- `history-clarity.webp` – Verständlichkeit

### Modelle

- `model-carrera.webp` – Carrera
- `model-targa.webp` – Targa
- `model-turbo-gt.webp` – Turbo & GT
- `decision-allrounder.webp` – klassischer Allrounder
- `decision-open.webp` – offenes Erlebnis
- `decision-performance.webp` – souveräne Leistung
- `decision-precision.webp` – maximale Präzision

Der dynamische Modellvergleich verwendet zusätzlich die acht bereits vorhandenen lokalen Modellbilder aus `modelle/image/`.

### Technik

- `tech-motor.webp` – Motor & Antrieb
- `tech-chassis.webp` – Fahrwerk & Bremsen
- `tech-aero.webp` – Aerodynamik
- `tech-interior.webp` – Interieur & Assistenz

### Newsletter

- `newsletter-models.webp` – Modell-Updates
- `newsletter-tech.webp` – Technik kompakt
- `newsletter-project.webp` – Projektfortschritt
- `newsletter-history-edition.webp` – historische Beispielausgabe
- `newsletter-tech-edition.webp` – technische Beispielausgabe
- `newsletter-project-edition.webp` – Projekt-Update
- `newsletter-main-topic.webp` – ein Hauptthema
- `newsletter-three-levels.webp` – drei kurze Ebenen
- `newsletter-rhythm.webp` – transparenter Rhythmus

### Projekt und Expertise

- `project-newsletter-code.webp` – projektbezogene Codeansicht für Daniels dokumentierten Beitrag
- `project-navigation-code.webp` – projektbezogene Codeansicht für Falcos Präsentationsarbeit

## 6. Überarbeitete und neue Texte

### Startseite

- neuer Projektvorstellungsblock `Eine interaktive Hommage an Technik, Geschichte und Design.`
- überarbeiteter und verschobener Hinweis zum inoffiziellen Schulprojekt
- vorhandener Erklärungstext bleibt erhalten
- keine neue sichtbare Ersatzüberschrift für die entfernten Überschriften

### Geschichte

- Überschrift korrigiert zu `Sechs Merkmale, die Generationen verbinden`
- neuer Abschnitt `Gemeinsam entwickelt`
- Teamtext erklärt die schrittweise gemeinsame Weiterentwicklung und zieht einen sachlichen Vergleich zur Evolution des Porsche 911

### Newsletter

- Überschrift geändert zu `So ist eine kompakte Ausgabe aufgebaut`
- `Historischer Fokus`: konkrete Einordnung der Generation 993 und der luftgekühlten Ära
- `Technik erklärt`: verständliche Erklärung des Boxer-Motors
- `Projekt-Update`: konkrete Nennung der neu sortierten Schnellzugriffe, entfernten Statistikboxen und dynamischen Vergleichsbilder
- keine sichtbaren internen Prüfhinweise auf der Webseite

### Expertise

- Daniel Wroblewski: ausschließlich dokumentierte Aufgabe `Aufgabenverteilung und Abstimmung`
- Falco Kneffel: ausschließlich dokumentierte Aufgabe `Gestaltung der Projektpräsentation`
- keine unbelegten Programmier-, Design- oder Inhaltsaufgaben ergänzt

### Sprachumschaltung

Die Übersetzungsdaten in `global/translate-interactive.js` wurden für zentrale neue Überschriften und Texte ergänzt, damit die neuen Bereiche nicht aus dem bestehenden Sprachsystem herausfallen.

## 7. Dynamischer Modellvergleich

Die vorhandene Datenstruktur in `modelle/script.js` wurde erweitert. Jedes auswählbare Modell besitzt nun zusätzlich:

- einen lokalen Bildpfad
- einen modellspezifischen Alt-Text

Die bestehende Funktion `updateCard()` aktualisiert beim Auswahlwechsel gemeinsam:

- Modellfamilie und Kategorie
- Modellname
- Dachkonzept
- Charakter
- vier Vergleichswerte und Balken
- Fahrzeugbild
- Alt-Text

Im HTML existieren dafür zwei gleich aufgebaute Vergleichskarten mit eindeutigen IDs. Es wurde keine zweite Vergleichslogik und kein zusätzlicher Event-Listener-Satz angelegt.

## 8. Dynamische Technikbilder

Die bestehende Tab-Logik in `Technik/script.js` wurde um eine zentrale `techTopics`-Zuordnung erweitert. Für jedes Thema sind Bildpfad und Alt-Text definiert.

Beim Tabwechsel werden gemeinsam aktualisiert:

- aktive Schaltfläche
- `aria-selected` und Tastaturzustand
- sichtbares Technikpanel
- Überschrift, Beschreibung und Aufzählung des zugehörigen Panels
- Technikbild
- Alt-Text

Es bleibt genau ein gemeinsamer Bildcontainer im HTML vorhanden. Verdeckte Panels erhalten den korrekten `hidden`-Zustand.

## 9. CSS- und Layoutanpassungen

`global/content-media.css` bündelt die neuen Medienkomponenten. Dazu gehören:

- einheitliche 16:9-Bildflächen
- kompakte Bildvarianten für Fazitkarten
- gemeinsame Innenabstände für Karteninhalte
- responsive Text-Bild-Aufteilung der Projektvorstellung
- gemeinsame Gestaltung der Modellvergleichsbilder
- gemeinsame Technikbildfläche
- Expertise-Raster
- stabile Kartenraster mit drei Spalten, vier Spalten für vier gleichwertige Erwartungskarten, zwei Spalten auf Tablets und einer Spalte auf Mobilgeräten

Die Header-Symbole besitzen feste 48 × 48 Pixel große Klickflächen. SVGs bleiben 22 × 22 Pixel groß und dauerhaft weiß. Hover und Fokus verändern keine Position, Größe, Rahmenbreite oder Innenabstände.

## 10. Getestete Seiten und Bildschirmgrößen

Automatisierte Browser-Prüfung mit Chromium:

- `index.html`
- `geschichte.html`
- `modelle.html`
- `Technik.html`
- `Newsletter.html`
- `Projekt.html`
- `qa.html`

Geprüfte Viewports:

- Desktop: 1440 × 900 Pixel
- Mobil: 390 × 844 Pixel

Ergebnis aus 14 Seiten-/Viewport-Läufen:

- 0 JavaScript- oder Konsolenfehler
- 0 horizontale Überläufe
- 0 fehlgeschlagene Testbilder
- 0 doppelte IDs
- auf jeder geprüften Seite genau eine H1

Zusätzliche Interaktionstests:

- Desktop-Header: korrekte Reihenfolge, dauerhaft weiße Icons, unveränderte Positionen nach Hover
- Modellvergleich: Bild, Name, Alt-Text und Werte wechseln gemeinsam
- Technik-Tabs: vier unterschiedliche Bilder, korrekter aktiver Tab und genau ein sichtbares Panel
- Q&A: 33 vorbereitete Fragen geladen, eigene Frage beantwortet, vorbereitete Frage auswählbar
- mobiles Menü: bestehendes Öffnen/Schließen funktioniert, eine Suchleiste, ein Warenkorb, kein horizontaler Überlauf

Statische Gesamtprüfung des vollständigen Projekts:

- 13 HTML-Seiten
- 0 defekte lokale Bild-, CSS-, Script- oder Source-Pfade
- 0 doppelte IDs
- 11 JavaScript-Dateien ohne Syntaxfehler
- 12 CSS-Dateien mit ausgeglichener Klammerstruktur

Detaillierte maschinenlesbare Ergebnisse:

- `FINAL_STATIC_TEST_REPORT_3_18.json`
- `FINAL_BROWSER_TEST_REPORT_3_18.json`

## 11. Bekannte verbleibende Einschränkungen

- Der Browser-Test wurde wegen der eingeschränkten lokalen Navigation der Testumgebung als selbstenthaltende Testkopie ausgeführt. Die originalen relativen Dateipfade wurden zusätzlich vollständig statisch geprüft.
- Videoquellen wurden im automatisierten Test nicht abgespielt. Poster, HTML-Struktur und lokale Videopfade blieben unverändert.
- `mailto:`-Links und echte externe Navigation können in einer lokalen Testumgebung nicht vollständig end-to-end verifiziert werden.
- Q&A, Newsletter, Shop, Warenkorb und Checkout bleiben bewusst lokale Demonstrationsfunktionen ohne externe API, Datenbank, echten Versand, Zahlung oder Bestellung.
- Die ursprünglichen Rechte- und Quellenangaben der Fahrzeugbilder müssen vor einer öffentlichen Veröffentlichung weiterhin vom Projektteam abschließend geprüft werden.
- Die persönlichen Tätigkeitsbeschreibungen von Daniel und Falco basieren ausschließlich auf den bisher dokumentierten Angaben. Ihre persönliche Bestätigung bleibt erforderlich.

## 12. Interne Prüfpunkte vor der Abgabe

- Daniels Expertise durch Daniel prüfen
- Newsletter-Beispielausgabe durch Daniel prüfen
- Falcos Expertise durch Falco prüfen

Diese drei Hinweise sind ausschließlich in diesem Änderungsprotokoll enthalten und nicht sichtbar auf der Webseite.

## Nachkorrektur: Startseitenkarte „Wie entsteht das Fahrerlebnis?“

- Das unpassende Bild mit geometrischer Zielmarkierung und rotem Rechteck wurde ersetzt.
- Die neue Bildfläche zeigt stattdessen einen dunklen technischen Porsche-911-Aufbau mit Fahrwerk, Bremsanlage, Antrieb, Aerodynamik und Cockpitbezug.
- Der Bildpfad `assets/content/home-tech-path.webp` blieb erhalten, damit keine CSS- oder JavaScript-Anpassung erforderlich ist.
- Der Alt-Text in `index.html` wurde präzisiert.
