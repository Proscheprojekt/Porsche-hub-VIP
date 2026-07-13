/* =============================================================
   CODE-KOMMENTARE: translate-interactive.js
   Zweck: JavaScript-Datei für Interaktivität, Navigation, Suche, Übersetzung oder Shop-Logik.
   Die Kommentare erklären die Logik für Schule/Präsentation.
   Sie verändern die Funktion der Website nicht.
============================================================= */

(() => {
  "use strict";
  // Chrome-sichere Übersetzungslogik:
  // Funktioniert mit Live Server, file:// und auch dann, wenn localStorage blockiert ist.

  /* Wörterbuch: ordnet deutsche Texte ihren englischen Übersetzungen zu. */
  const TRANSLATIONS = {
  "Schulprojekt": "School project",
  "Porsche Experience": "Porsche Experience",
  "Home": "Home",
  "Geschichte": "History",
  "Modelle": "Models",
  "Technik": "Technology",
  "Newsletter": "Newsletter",
  "Projekt": "Project",
  "Shop": "Shop",
  "Warenkorb": "Cart",
  "Checkout": "Checkout",
  "Bestellung": "Order",
  "Rechtliches": "Legal notice",
  "Fragen und Antworten": "Questions and answers",
  "FAQ zur Website und zum Shop": "FAQ about the website and shop",
  "© 2026 Schulprojekt – Porsche Experience": "© 2026 school project – Porsche Experience",
  "© 2026 Porsche Experience Schulprojekt · Inoffizielle Demo-Website": "© 2026 Porsche Experience school project · unofficial demo website",
  "Inoffizielles Fan- & Lernprojekt, nicht verbunden mit der Porsche AG": "Unofficial fan and learning project, not affiliated with Porsche AG",
  "Navigation": "Navigation",
  "Über das Projekt": "About the project",
  "Kontakt": "Contact",
  "Folge uns": "Follow us",
  "Mehr erfahren": "Learn more",
  "Jetzt anmelden": "Sign up now",
  "Anmelden": "Sign up",
  "Name": "Name",
  "E-Mail-Adresse": "Email address",
  "E-Mail": "Email",
  "Inhalte": "Content",
  "Warum abonnieren": "Why subscribe?",
  "Regelmäßig": "Regularly",
  "Kein Spam": "No spam",
  "Newsletter abonnieren": "Subscribe to the newsletter",
  "Interessen (optional)": "Interests (optional)",
  "Ich möchte den Newsletter erhalten und kann mich jederzeit wieder abmelden.": "I would like to receive the newsletter and can unsubscribe at any time.",
  "Anmeldung erfolgreich": "Registration successful",
  "Danke,": "Thank you,",
  "Deine professionelle Bestätigungs-Mail wurde für": "Your professional confirmation email has been prepared for",
  "vorbereitet.": "prepared.",
  "Bestätigungs-Mail": "Confirmation email",
  "An:": "To:",
  "Betreff:": "Subject:",
  "vielen Dank für deine Anmeldung zum Newsletter von": "thank you for subscribing to the newsletter of",
  ". Ab sofort erhältst du ausgewählte Projekt-Updates rund um die Geschichte, Technik und Modelle des Porsche 911.": ". From now on, you will receive selected project updates about the history, technology and models of the Porsche 911.",
  "Anmeldedatum": "Registration date",
  "Ausgewählte Interessen": "Selected interests",
  "Das erwartet dich im Newsletter": "What to expect in the newsletter",
  "Wir achten darauf, dir nur passende Inhalte zu senden: kurze Erklärungen, übersichtliche Modellvergleiche und verständliche Technik-Einblicke.": "We make sure to send only relevant content: short explanations, clear model comparisons and understandable technical insights.",
  "Hinweis: Diese Website ist ein inoffizielles Schulprojekt und steht nicht in Verbindung mit der Porsche AG. Es werden keine echten Newsletter-Daten versendet oder verkauft.": "Note: This website is an unofficial school project and is not affiliated with Porsche AG. No real newsletter data is sent or sold.",
  "Sportliche Grüße": "Sporty regards",
  "Deine Porsche Experience Redaktion": "Your Porsche Experience editorial team",
  "E-Mail im Mailprogramm öffnen": "Open email in mail app",
  "E-Mail-Text kopieren": "Copy email text",
  "Neue Anmeldung": "New registration",
  "Hinweis: Da dieses Projekt nur aus HTML, CSS und JavaScript besteht, wird keine echte E-Mail automatisch versendet. Die Mail wird professionell vorbereitet und kann im Mailprogramm geöffnet oder kopiert werden.": "Note: Because this project only uses HTML, CSS and JavaScript, no real email is sent automatically. The email is professionally prepared and can be opened in a mail app or copied.",
  "Frisch aus der Redaktion / wöchentlich neu": "Fresh from the editorial team / updated weekly",
  "Bleib auf dem Laufenden": "Stay up to date",
  "Trag dich ein und verpasse keine Neuigkeiten mehr rund um dieses Schulprojekt – neue Modelle, Technik-Updates und Hintergründe zur Geschichte des Porsche 911.": "Sign up and never miss news about this school project — new models, technology updates and background information on the history of the Porsche 911.",
  "Was im Newsletter sinnvoll enthalten ist": "What the newsletter should include",
  "Der Newsletter ist als professionelle Projektfunktion gedacht. Er fasst neue Inhalte kurz zusammen und erklärt, warum ein Update für Besucher interessant ist.": "The newsletter is designed as a professional project feature. It briefly summarizes new content and explains why each update is relevant for visitors.",
  "Modell-Updates": "Model updates",
  "Neue Generationen, Bildmaterial, Vergleiche und kurze Steckbriefe werden übersichtlich angekündigt.": "New generations, image material, comparisons and short profiles are presented clearly.",
  "Technik kompakt": "Technology in brief",
  "Technische Themen werden nicht überladen, sondern klar erklärt: Begriff, Funktion und Bedeutung.": "Technical topics are not overloaded, but explained clearly: term, function and meaning.",
  "Projektfortschritt": "Project progress",
  "Neue Features wie Suche, Shop-Demo, Warenkorb oder Layout-Verbesserungen werden nachvollziehbar beschrieben.": "New features such as search, shop demo, cart or layout improvements are described in a clear way.",
  "Alles Wichtige, ohne etwas zu verpassen.": "Everything important, without missing anything.",
  "Ein kurzer, gelegentlicher Überblick über neue Inhalte auf dieser Seite – direkt in dein Postfach.": "A short, occasional overview of new content on this website — directly in your inbox.",
  "Neu im Newsletter": "New in the newsletter",
  "Neue Modelle zuerst": "New models first",
  "Technik-Updates": "Technology updates",
  "Das erwartet dich": "What you can expect",
  "Warum sich die Anmeldung lohnt": "Why signing up is worth it",
  "Erfahre direkt, wenn eine neue 911-Generation auf der Seite ergänzt wird.": "Find out immediately when a new 911 generation is added to the site.",
  "Kurze Einblicke in Motor, Fahrwerk und Assistenzsysteme, verständlich erklärt.": "Short insights into the engine, chassis and assistance systems, explained clearly.",
  "Nur gelegentliche Updates zum Projekt. Abmeldung jederzeit mit einem Klick.": "Only occasional project updates. You can unsubscribe at any time with one click.",
  "Projekt | Porsche Experience": "Project | Porsche Experience",
  "Unser Schulprojekt: Porsche Experience": "Our school project: Porsche Experience",
  "„Porsche Experience“ ist eine mehrseitige Website, die im Rahmen eines Schulprojekts entstanden ist. Ziel war es, ein reales, ansprechendes Web-Design umzusetzen und dabei HTML, CSS und JavaScript praktisch anzuwenden – am Beispiel der Modellgeschichte des Porsche 911.": "“Porsche Experience” is a multi-page website created as part of a school project. The goal was to build a realistic and attractive web design while applying HTML, CSS and JavaScript in practice — using the model history of the Porsche 911 as an example.",
  "Worum geht es?": "What is it about?",
  "Die Website führt Besucher:innen durch die Welt des Porsche 911: von seiner über 60-jährigen Geschichte über die einzelnen Modellgenerationen bis hin zur Technik, die das Fahrzeug bis heute prägt. Jede Unterseite behandelt einen eigenen Themenschwerpunkt, ist aber optisch und funktional Teil eines einheitlichen Gesamtauftritts.": "The website guides visitors through the world of the Porsche 911: from more than 60 years of history, through individual model generations, to the technology that still defines the car today. Each subpage has its own focus, but visually and functionally belongs to one unified experience.",
  "Aufbau der Seite.": "Website structure.",
  "Alle Seiten teilen sich denselben Kopfbereich mit Logo, Suche, Schnellzugriff-Icons und Hauptnavigation. Jede Unterseite bringt ihre eigenen CSS- und JavaScript-Dateien in einem eigenen Ordner mit, sodass jeder Themenbereich unabhängig gepflegt und erweitert werden kann.": "All pages share the same header with logo, search, quick-access icons and main navigation. Each subpage has its own CSS and JavaScript files in a separate folder, so each section can be maintained and extended independently.",
  "Technischer Rahmen.": "Technical framework.",
  "Umgesetzt wurde das Projekt mit reinem HTML5, CSS3 und Vanilla-JavaScript – bewusst ohne Frameworks, um die Grundlagen der Webentwicklung zu vertiefen. Dazu gehören unter anderem ein Bild-/Video-Karussell, ein Modell-Slider mit Zeitleiste, ein validiertes Newsletter-Anmeldeformular sowie ein responsives Hamburger-Menü für mobile Geräte.": "The project was built with plain HTML5, CSS3 and vanilla JavaScript — deliberately without frameworks to strengthen the fundamentals of web development. Features include an image/video carousel, a model slider with timeline, a validated newsletter signup form and a responsive hamburger menu for mobile devices.",
  "HTML-Seiten": "HTML pages",
  "911-Generationen": "911 generations",
  "Kernsprachen (HTML/CSS/JS)": "Core languages (HTML/CSS/JS)",
  "gemeinsames Design": "shared design",
  "Seiten im Überblick": "Pages at a glance",
  "So ist die Website aufgebaut – ein kurzer Wegweiser durch alle Bereiche.": "This is how the website is structured — a short guide through all areas.",
  "Startseite": "Home page",
  "Bild- und Video-Karussell als Einstieg mit den stärksten Motiven des Projekts.": "Image and video carousel as an introduction with the strongest visuals of the project.",
  "Zur Seite →": "Go to page →",
  "Historie": "Heritage",
  "Die Entwicklung des 911 von der Baureihe 930 bis zur aktuellen 992-Generation.": "The development of the 911 from the 930 series to the current 992 generation.",
  "Fahrzeuge": "Vehicles",
  "Vergleich der Generationen inklusive Slider, Zeitleiste und Bildergalerie.": "Comparison of generations including slider, timeline and image gallery.",
  "Engineering": "Engineering",
  "Motor, Fahrwerk, Aerodynamik und Assistenzsysteme mit Beispiel-Datenblatt.": "Engine, chassis, aerodynamics and assistance systems with sample data sheet.",
  "Updates": "Updates",
  "Anmeldeformular, um Neuigkeiten zum Projekt per E-Mail zu erhalten.": "Signup form to receive project news by email.",
  "Über uns": "About us",
  "Diese Seite: Ziele, Aufbau und die verwendeten Techniken im Überblick.": "This page: goals, structure and technologies used at a glance.",
  "Du bist hier": "You are here",
  "Demo-Shop": "Demo shop",
  "Produktübersicht, Warenkorb und Checkout als Frontend-Demo ohne echte Zahlung.": "Product overview, cart and checkout as a frontend demo without real payment.",
  "Hilfe": "Help",
  "Fragen & Antworten": "Questions & answers",
  "Kurze Erklärungen zur Website, zum Schulprojekt und zum Demo-Shop.": "Short explanations about the website, the school project and the demo shop.",
  "Transparenz": "Transparency",
  "Hinweise zu Inoffiziellkeit, Marken, Bildern, Datenschutz und Quellen.": "Notes on unofficial status, trademarks, images, privacy and sources.",
  "Eingesetzte Technik": "Technologies used",
  "CSS3 (Custom Properties, Grid, Flexbox)": "CSS3 (custom properties, grid, flexbox)",
  "Vanilla JavaScript": "Vanilla JavaScript",
  "Responsive Design": "Responsive design",
  "Karussell & Slider": "Carousel & slider",
  "Newsletter-Formular": "Newsletter form",
  "Demo-Shop mit Warenkorb": "Demo shop with cart",
  "Rechtliches & FAQ": "Legal notice & FAQ",
  "Unser Schulprojekt": "Our school project",
  "Danke fürs Vorbeischauen! Diese Website wurde mit viel Liebe zum Detail als Schulprojekt entwickelt und wird laufend weiter verbessert.": "Thanks for visiting! This website was developed as a school project with great attention to detail and is continuously improved.",
  "Projektziele": "Project goals",
  "Was die Website leisten soll": "What the website should achieve",
  "Die Seite soll nicht nur gut aussehen, sondern auch einen klaren Zweck erfüllen: Sie informiert, strukturiert Wissen und zeigt, dass HTML, CSS und JavaScript sinnvoll zusammenarbeiten können.": "The site should not only look good, but also serve a clear purpose: it informs, structures knowledge and shows how HTML, CSS and JavaScript can work together effectively.",
  "Informieren": "Inform",
  "Besucher erhalten einen verständlichen Überblick über Geschichte, Modelle und Technik des Porsche 911.": "Visitors receive a clear overview of the history, models and technology of the Porsche 911.",
  "Präsentieren": "Present",
  "Die Inhalte sind so aufgebaut, dass sie sich für eine Schulpräsentation oder Projektbewertung eignen.": "The content is structured so it is suitable for a school presentation or project assessment.",
  "Interagieren": "Interact",
  "Karussell, Suche, Newsletter, Shop-Demo und Warenkorb zeigen praktische JavaScript-Funktionen.": "Carousel, search, newsletter, shop demo and cart demonstrate practical JavaScript features.",
  "Qualität": "Quality",
  "Warum das Projekt professioneller wirkt": "Why the project feels more professional",
  "Klare Seitenlogik": "Clear page logic",
  "Jede Seite hat eine Aufgabe: Home führt ein, Geschichte erklärt die Entwicklung, Modelle vergleichen Generationen, Technik macht die Funktionsweise verständlich, der Newsletter zeigt Formularlogik und der Shop demonstriert Warenkorb-Abläufe.": "Each page has a clear task: Home introduces the project, History explains the development, Models compare generations, Technology explains how things work, the Newsletter demonstrates form logic and the Shop demonstrates cart workflows.",
  "Saubere Abgrenzung": "Clear separation",
  "Weil es sich um ein inoffizielles Schulprojekt handelt, sind Shop, Newsletter und rechtliche Hinweise deutlich als Demo gekennzeichnet. Dadurch wirkt die Website glaubwürdiger und sauberer.": "Because this is an unofficial school project, the shop, newsletter and legal notes are clearly marked as demos. This makes the website more credible and cleaner.",
  "Quellenhinweis": "Source note",
  "Fakten sauber einordnen": "Classifying facts properly",
  "Technische Daten und historische Einordnungen wurden vorsichtig formuliert und an offiziellen Porsche-/Porsche-Newsroom-Informationen orientiert. Die Texte sind für ein Schulprojekt zusammengefasst und nicht als offizieller Porsche-Auftritt gedacht.": "Technical data and historical context were worded carefully and oriented toward official Porsche/Porsche Newsroom information. The texts are summarized for a school project and are not intended as an official Porsche presence.",
  "Technik | Porsche Experience": "Technology | Porsche Experience",
  "Ingenieurskunst": "Engineering",
  "Die Technik hinter dem Mythos": "The technology behind the myth",
  "Der Porsche 911 steht seit Jahrzehnten für eine ganz eigene Philosophie: der Motor sitzt hinten, angetrieben werden die Hinterräder (oder alle vier), und jede Generation verfeinert dieses Grundkonzept mit neuer Technik, ohne die ursprüngliche Idee zu verraten. Diese Seite zeigt die wichtigsten technischen Bausteine, die den 911 zu dem machen, was er ist.": "For decades, the Porsche 911 has stood for a very distinct philosophy: the engine is at the rear, the rear wheels (or all four wheels) are driven, and each generation refines this basic concept with new technology without losing the original idea. This page shows the key technical elements that make the 911 what it is.",
  "Technikbereiche": "Technology areas",
  "Vier Bereiche, die zusammen das Fahrerlebnis eines 911 ausmachen.": "Four areas that together shape the driving experience of a 911.",
  "Motor & Antrieb": "Engine & drivetrain",
  "Fahrwerk & Bremsen": "Chassis & brakes",
  "Aerodynamik": "Aerodynamics",
  "Interieur & Assistenz": "Interior & assistance",
  "Boxermotor im Heck": "Rear-mounted flat-six engine",
  "Kennzeichnend für den 911 ist der Boxermotor, der hinter der Hinterachse sitzt. Die gegenüberliegend angeordneten Zylinder sorgen für einen niedrigen Schwerpunkt und einen unverwechselbaren Klang.": "A defining feature of the 911 is the flat-six engine located behind the rear axle. The horizontally opposed cylinders help create a low center of gravity and a distinctive sound.",
  "Bauart:": "Engine type:",
  "Sechszylinder-Boxer, meist mit Turboaufladung": "Flat-six engine, usually turbocharged",
  "Getriebe:": "Transmission:",
  "Doppelkupplungsgetriebe (PDK) oder Handschaltung": "Dual-clutch transmission (PDK) or manual transmission",
  "Antrieb:": "Drivetrain:",
  "Heckantrieb (Carrera) oder Allradantrieb (Carrera 4)": "Rear-wheel drive (Carrera) or all-wheel drive (Carrera 4)",
  "Adaptive Dämpfersysteme passen die Fahrwerksabstimmung in Echtzeit an Fahrbahn und Fahrstil an. Große, innenbelüftete Bremsscheiben sorgen für verlässliche Verzögerung auch bei hohem Tempo.": "Adaptive damper systems adjust the chassis setup in real time to the road and driving style. Large internally ventilated brake discs provide reliable deceleration even at high speeds.",
  "PASM:": "PASM:",
  "adaptive Dämpferregelung, wählbar zwischen Komfort und Sport": "adaptive damping control, selectable between comfort and sport",
  "Hinterachslenkung:": "Rear-axle steering:",
  "mehr Agilität in der Stadt, mehr Stabilität bei Tempo": "more agility in the city, more stability at speed",
  "Bremsen:": "Brakes:",
  "optional keramische Hochleistungsbremsanlage (PCCB)": "optional high-performance ceramic brake system (PCCB)",
  "Ein ausfahrbarer Heckspoiler erzeugt bei hohem Tempo zusätzlichen Anpressdruck, während er im Alltag flach anliegt und den Luftwiderstand gering hält. Aktive Kühlluftklappen regeln zudem, wie viel Luft zur Kühlung geführt wird.": "An extendable rear spoiler creates additional downforce at high speed, while remaining flat in everyday driving to reduce drag. Active cooling air flaps also regulate how much air is directed for cooling.",
  "Heckspoiler:": "Rear spoiler:",
  "geschwindigkeitsabhängig ausfahrbar": "extends depending on speed",
  "Luftklappen:": "Air flaps:",
  "aktiv geregelt für Kühlung und Effizienz": "actively controlled for cooling and efficiency",
  "Unterboden:": "Underbody:",
  "weitgehend verkleidet für einen sauberen Luftstrom": "largely covered for cleaner airflow",
  "Interieur & Assistenzsysteme": "Interior & assistance systems",
  "Ein digitales Kombiinstrument, ein zentrales Touch-Display und eine wachsende Zahl an Assistenzsystemen verbinden klassisches Fahrgefühl mit moderner Alltagstauglichkeit.": "A digital instrument cluster, a central touch display and a growing number of assistance systems combine classic driving feel with modern everyday usability.",
  "Sport Chrono Paket:": "Sport Chrono package:",
  "zusätzliche Fahrmodi und Rundenzeitmessung": "additional driving modes and lap timing",
  "Fahrassistenten:": "Driver assistance:",
  "Abstandsregeltempostat, Spurhalte- und Notbremsassistent": "adaptive cruise control, lane keeping and emergency braking assist",
  "Cockpit:": "Cockpit:",
  "digitale Anzeigen kombiniert mit klassisch mittigem Drehzahlmesser": "digital displays combined with a classic central tachometer",
  "Technische Daten": "Technical data",
  "Beispielhafte offizielle Orientierungswerte aktueller 911-Carrera-Modelle. Die Werte dienen im Schulprojekt zur Einordnung und können je nach Markt, Ausstattung und Modelljahr abweichen.": "Example official reference values for current 911 Carrera models. The values are used in the school project for orientation and may vary depending on market, equipment and model year.",
  "290 kW / 394 PS, 0–100 km/h in ca. 3,9 s mit Sport Chrono, ca. 294 km/h Höchstgeschwindigkeit": "290 kW / 394 PS, 0–100 km/h in approx. 3.9 s with Sport Chrono, approx. 294 km/h top speed",
  "353 kW / 480 PS, 0–100 km/h in ca. 3,3 s mit Sport Chrono, ca. 308 km/h Höchstgeschwindigkeit": "353 kW / 480 PS, 0–100 km/h in approx. 3.3 s with Sport Chrono, approx. 308 km/h top speed",
  "Motorprinzip": "Engine principle",
  "Sechszylinder-Boxermotor im Heckbereich, je nach Modell mit Turboaufladung oder besonderer Sportauslegung": "Rear-mounted flat-six engine, depending on model with turbocharging or a specific sport configuration",
  "Getriebe": "Transmission",
  "PDK-Doppelkupplungsgetriebe oder modellabhängig Handschaltung": "PDK dual-clutch transmission or, depending on the model, manual transmission",
  "Antrieb": "Drivetrain",
  "Heckantrieb oder Allradantrieb je nach Modellvariante": "Rear-wheel drive or all-wheel drive depending on the model variant",
  "Hinweis": "Note",
  "Keine Kaufberatung, sondern eine technische Erklärung für ein inoffizielles Schulprojekt.": "Not purchase advice, but a technical explanation for an unofficial school project.",
  "Einfach erklärt": "Simply explained",
  "Warum diese Technik zusammenarbeitet": "Why this technology works together",
  "Ein Sportwagen besteht nicht nur aus Motorleistung. Entscheidend ist, wie Motor, Getriebe, Fahrwerk, Bremsen und Aerodynamik zusammenspielen.": "A sports car is not just engine power. What matters is how the engine, transmission, chassis, brakes and aerodynamics work together.",
  "Leistung": "Power",
  "Der Motor liefert Kraft und Beschleunigung. Beim 911 ist der Boxermotor ein wichtiges Erkennungsmerkmal.": "The engine delivers power and acceleration. In the 911, the flat-six engine is an important identifying feature.",
  "Übertragung": "Power transfer",
  "Getriebe und Antrieb bringen die Leistung kontrolliert auf die Straße.": "Transmission and drivetrain bring the power to the road in a controlled way.",
  "Kontrolle": "Control",
  "Fahrwerk, Bremsen und Assistenzsysteme helfen, das Auto präzise und sicher zu bewegen.": "Chassis, brakes and assistance systems help move the car precisely and safely.",
  "Stabilität": "Stability",
  "Aerodynamik und Karosserieform unterstützen Fahrverhalten, Kühlung und hohe Geschwindigkeiten.": "Aerodynamics and body shape support handling, cooling and high speeds.",
  "Bestellung | Porsche Experience": "Order | Porsche Experience",
  "Demo-Bestellung abgeschlossen": "Demo order completed",
  "Die Daten wurden nur lokal verarbeitet. Es wurde keine echte Bestellung gesendet.": "The data was processed locally only. No real order was sent.",
  "Vielen Dank!": "Thank you!",
  "Deine Demo-Bestellung wurde gespeichert.": "Your demo order has been saved.",
  "Abschluss": "Completion",
  "Was diese Seite demonstriert": "What this page demonstrates",
  "Die Bestellbestätigung zeigt, wie ein Webshop nach einem abgeschlossenen Checkout reagieren könnte: mit klarer Rückmeldung, Zusammenfassung und transparenter Information zum Demo-Charakter.": "The order confirmation shows how an online shop could respond after checkout: with clear feedback, a summary and transparent information about its demo character.",
  "Checkout | Porsche Experience": "Checkout | Porsche Experience",
  "Bestellung abschließen": "Complete order",
  "Das Formular ist eine Demo. Es wird nichts echt bestellt und keine Zahlung ausgelöst.": "The form is a demo. Nothing is actually ordered and no payment is triggered.",
  "Kontaktdaten": "Contact details",
  "Vorname": "First name",
  "Nachname": "Last name",
  "Telefon optional": "Phone optional",
  "Lieferadresse": "Shipping address",
  "Straße und Hausnummer": "Street and house number",
  "PLZ": "Postal code",
  "Ort": "City",
  "Zahlungsart": "Payment method",
  "Demo-Rechnung": "Demo invoice",
  "Demo-Kreditkarte": "Demo credit card",
  "Demo-PayPal": "Demo PayPal",
  "Ich verstehe, dass dies nur eine Schulprojekt-Demo ohne echte Bestellung ist.": "I understand that this is only a school project demo without a real order.",
  "Demo-Bestellung abschicken": "Submit demo order",
  "Bestellübersicht": "Order overview",
  "Zwischensumme": "Subtotal",
  "Versand": "Shipping",
  "Gesamt": "Total",
  "Warenkorb bearbeiten": "Edit cart",
  "Datenschutz": "Privacy",
  "Keine echte Bestellung, keine echte Zahlung": "No real order, no real payment",
  "Die eingegebenen Daten dienen nur zur Demonstration der Formularlogik. Sie werden nicht an einen Server gesendet und nicht für echte Bestellungen verwendet.": "The entered data is used only to demonstrate the form logic. It is not sent to a server and is not used for real orders.",
  "Porsche 911 Geschichte | Porsche Experience": "Porsche 911 History | Porsche Experience",
  "Die Entwicklung einer Sportwagen-Ikone": "The development of a sports car icon",
  "Der Porsche 911 wurde 1963 vorgestellt und entwickelte sich über mehrere Generationen weiter. Besonders stark ist die Mischung aus Wiedererkennung und Fortschritt: Die Form bleibt typisch 911, während Motoren, Fahrwerk, Sicherheit, Bedienung und Aerodynamik immer moderner wurden.": "The Porsche 911 was introduced in 1963 and continued to evolve across several generations. Its special strength is the combination of recognizability and progress: the shape remains unmistakably 911, while engines, chassis, safety, controls and aerodynamics have become increasingly modern.",
  "Diese Seite erklärt die Entwicklung verständlich und trennt sie klar vom Modelle-Bereich. Hier geht es nicht um aktuelle Varianten, sondern um die historische Linie vom klassischen 911 bis zur modernen 992-Generation.": "This page explains the development clearly and separates it from the models section. It is not about current variants, but about the historical line from the classic 911 to the modern 992 generation.",
  "G-Serie / Turbo-Ära": "G-Series / Turbo era",
  "Der 930 steht für den bekannten Turbo-Auftritt der G-Serie: breite Kotflügel, markanter Heckspoiler und ein sehr analoges Fahrerlebnis.": "The 930 represents the well-known Turbo appearance of the G-Series: wide fenders, a distinctive rear spoiler and a very analog driving experience.",
  "Historische Einordnung": "Historical context",
  "Was die 911-Geschichte besonders macht": "What makes 911 history special",
  "Porsche hat den 911 über Jahrzehnte nicht komplett neu erfunden, sondern schrittweise weiterentwickelt. Genau dadurch bleibt der Wagen sofort erkennbar, obwohl Technik, Leistung, Sicherheit und Bedienung stark moderner wurden.": "For decades, Porsche did not completely reinvent the 911, but developed it step by step. This is exactly why the car remains immediately recognizable, even though technology, performance, safety and controls became much more modern.",
  "Wiedererkennung": "Recognizability",
  "Die flache Front, die runden Scheinwerfer, die abfallende Dachlinie und das kräftige Heck gehören zu den wichtigsten Designmerkmalen des 911.": "The flat front, round headlights, sloping roofline and powerful rear end are among the most important design features of the 911.",
  "Technischer Wandel": "Technical change",
  "Wichtige Schritte waren unter anderem Turbo-Technik, Allradantrieb, Wasserkühlung, digitale Bedienung und moderne Assistenzsysteme.": "Important steps included turbo technology, all-wheel drive, water cooling, digital controls and modern assistance systems.",
  "Klare Trennung": "Clear separation",
  "Diese Seite behandelt die Geschichte. Aktuelle Varianten wie Carrera, Targa, Turbo oder GT3 werden sauber im Bereich „Modelle“ erklärt.": "This page covers history. Current variants such as Carrera, Targa, Turbo or GT3 are clearly explained in the “Models” section.",
  "Bildauswahl": "Image selection",
  "Generationen im vorhandenen Bildmaterial": "Generations in the available image material",
  "Der Slider zeigt die Generationen, für die im Projekt Bilder vorhanden sind. Die vollständige historische Übersicht folgt direkt darunter.": "The slider shows the generations for which images are available in the project. The complete historical overview follows directly below.",
  "Galerie": "Gallery",
  "Historische 911-Generationen": "Historic 911 generations",
  "Die Galerie zeigt die wichtigsten Entwicklungsschritte vom 930 bis zum 992. Sie ergänzt die Timeline und macht den Wandel der Form besser sichtbar.": "The gallery shows the most important development steps from the 930 to the 992. It complements the timeline and makes the change in form more visible.",
  "Vollständiger Überblick": "Complete overview",
  "Die acht Hauptgenerationen des Porsche 911": "The eight main generations of the Porsche 911",
  "Für die fachliche Vollständigkeit zeigt diese Übersicht die Hauptgenerationen des 911 von 1963 bis heute. So ist die Geschichte nicht nur optisch, sondern auch inhaltlich vollständig eingeordnet.": "For factual completeness, this overview shows the main generations of the 911 from 1963 to today. This means the history is not only visually but also content-wise clearly classified.",
  "Generation": "Generation",
  "Zeitraum": "Period",
  "Bedeutung": "Significance",
  "Original 911": "Original 911",
  "1963 bis 1973": "1963 to 1973",
  "Start der 911-Idee mit ikonischer Grundform und Sechszylinder-Boxermotor.": "Start of the 911 idea with iconic basic shape and flat-six engine.",
  "G-Serie": "G-Series",
  "1974 bis 1989": "1974 to 1989",
  "Lange Bauzeit, Sicherheitsstoßfänger und prägende Turbo-Ära mit dem 930.": "Long production period, impact bumpers and the defining Turbo era with the 930.",
  "1988 bis 1994": "1988 to 1994",
  "Deutliche Modernisierung mit neuer Technik und modernerem Fahrverhalten.": "Significant modernization with new technology and more modern driving behavior.",
  "1993 bis 1998": "1993 to 1998",
  "Letzte luftgekühlte Generation und für viele ein besonders klassischer 911.": "The last air-cooled generation and, for many, a particularly classic 911.",
  "1997 bis 2005": "1997 to 2005",
  "Großer technischer Umbruch mit Wasserkühlung und neuem Gesamtkonzept.": "Major technical shift with water cooling and a new overall concept.",
  "2004 bis 2012": "2004 to 2012",
  "Rückkehr zu klassischeren Designmerkmalen und breite Modellvielfalt.": "Return to more classic design features and a wide model range.",
  "2011 bis 2019": "2011 to 2019",
  "Größerer Radstand, moderne Plattform und weiterentwickelte Aerodynamik.": "Longer wheelbase, modern platform and improved aerodynamics.",
  "seit 2018": "since 2018",
  "Aktuelle Linie mit breiterem Auftritt, digitalerer Bedienung und moderner Technik.": "Current line with a wider appearance, more digital controls and modern technology.",
  "Wendepunkte": "Turning points",
  "Fünf Entwicklungen, die den 911 geprägt haben": "Five developments that shaped the 911",
  "Diese Punkte erklären, warum der 911 trotz ähnlicher Grundform technisch immer wieder große Sprünge gemacht hat.": "These points explain why the 911 made major technical leaps again and again despite its similar basic shape.",
  "Turbo": "Turbo",
  "Der Turbo brachte mehr Leistung und machte den 911 optisch deutlich breiter und aggressiver.": "The Turbo brought more power and made the 911 visually much wider and more aggressive.",
  "Allrad": "All-wheel drive",
  "Moderne Allradtechnik verbesserte Traktion und machte hohe Leistung besser kontrollierbar.": "Modern all-wheel-drive technology improved traction and made high power easier to control.",
  "Wasserkühlung": "Water cooling",
  "Mit dem 996 änderte sich die Motortechnik grundlegend und wurde zukunftsfähiger.": "With the 996, engine technology changed fundamentally and became more future-proof.",
  "Digitalisierung": "Digitalization",
  "Aktuelle Generationen verbinden klassische 911-Form mit digitaler Bedienung und Assistenzsystemen.": "Current generations combine the classic 911 shape with digital controls and assistance systems.",
  "Hinweis zur Darstellung": "Note on presentation",
  "Die Website ist ein inoffizielles Schulprojekt. Die Texte sind eigenständig formuliert und dienen der verständlichen Einordnung. Marken, Modellnamen und Bilder werden nur zur projektbezogenen Darstellung genutzt.": "The website is an unofficial school project. The texts are independently written and are intended to provide understandable context. Trademarks, model names and images are used only for project-related presentation.",
  "Fazit": "Conclusion",
  "Tradition und Fortschritt in einer Linie": "Tradition and progress in one line",
  "Die Besonderheit des 911 liegt darin, dass er sich stark weiterentwickelt, ohne seine Identität zu verlieren. Genau das macht die Geschichte dieser Modellreihe so interessant für ein Webprojekt.": "The special quality of the 911 is that it continues to develop strongly without losing its identity. That is exactly what makes the history of this model line so interesting for a web project.",
  "Tradition": "Tradition",
  "Viele Gestaltungsmerkmale bleiben über Generationen erkennbar und schaffen eine starke Identität.": "Many design features remain recognizable across generations and create a strong identity.",
  "Fortschritt": "Progress",
  "Motoren, Fahrwerk, Bremsen, Aerodynamik und Innenraum wurden immer wieder modernisiert.": "Engines, chassis, brakes, aerodynamics and interior have been modernized again and again.",
  "Verständlichkeit": "Clarity",
  "Durch die klare Trennung von Geschichte und Modellen ist die Website jetzt fachlich sauberer aufgebaut.": "By clearly separating history and models, the website is now structured more correctly from a subject perspective.",
  "Porsche Experience | Schulprojekt": "Porsche Experience | School project",
  "Willkommen": "Welcome",
  "Porsche Experience als professionelles Schulprojekt": "Porsche Experience as a professional school project",
  "Diese Website präsentiert den Porsche 911 nicht nur mit Bildern und Videos, sondern erklärt auch seine Entwicklung, seine Modellgenerationen und die wichtigsten technischen Ideen dahinter. Ziel ist ein Webprojekt, das informativ, modern und visuell stark wirkt.": "This website presents the Porsche 911 not only with images and videos, but also explains its development, model generations and the most important technical ideas behind it. The goal is a web project that feels informative, modern and visually strong.",
  "Geschichte verstehen": "Understand history",
  "Die Geschichte-Seite ordnet den 911 historisch ein: vom klassischen Turbo-Auftritt über die letzte luftgekühlte Ära bis zur modernen 992-Generation.": "The history page places the 911 in context: from the classic Turbo appearance through the last air-cooled era to the modern 992 generation.",
  "Modelle vergleichen": "Compare models",
  "Die Modellseite zeigt, wie sich Form, Technik und Charakter des 911 verändert haben, ohne dass die typische Silhouette verloren gegangen ist.": "The model page shows how the shape, technology and character of the 911 have changed without losing the typical silhouette.",
  "Technik erklären": "Explain technology",
  "Die Technik-Seite beschreibt Boxermotor, Getriebe, Fahrwerk, Aerodynamik und digitale Systeme so, dass sie auch ohne Vorwissen verständlich sind.": "The technology page explains the flat-six engine, transmission, chassis, aerodynamics and digital systems in a way that is understandable even without prior knowledge.",
  "Einordnung": "Context",
  "Warum der 911 im Mittelpunkt steht": "Why the 911 is the focus",
  "Der Porsche 911 ist seit 1963 eine der bekanntesten Sportwagen-Baureihen. Besonders spannend ist, dass viele Grundideen erhalten blieben: flache Front, markante Kotflügel, fließende Dachlinie, Heckmotor und ein klarer Fokus auf Fahrgefühl.": "Since 1963, the Porsche 911 has been one of the best-known sports car model lines. What makes it especially interesting is that many basic ideas remained: flat front, distinctive fenders, flowing roofline, rear engine and a clear focus on driving feel.",
  "Design mit Wiedererkennungswert": "Design with recognizability",
  "Ein gutes Fahrzeugdesign erkennt man daran, dass es sich weiterentwickelt, ohne seine Identität zu verlieren. Genau das macht den 911 für ein Webseitenprojekt interessant.": "Good vehicle design can be recognized by the fact that it evolves without losing its identity. That is exactly what makes the 911 interesting for a website project.",
  "Gute Struktur für Besucher": "Good structure for visitors",
  "Die Website ist bewusst mehrseitig aufgebaut. Besucher sollen schnell entscheiden können, ob sie Geschichte, Modelle, Technik, Newsletter, Projektinformationen oder den Demo-Shop ansehen möchten.": "The website is deliberately structured across several pages. Visitors should quickly be able to choose whether they want to view history, models, technology, newsletter, project information or the demo shop.",
  "Porsche 911 Modelle | Porsche Experience": "Porsche 911 Models | Porsche Experience",
  "Modelle & Varianten": "Models & variants",
  "Der 911 als vielseitige Modellfamilie": "The 911 as a versatile model family",
  "Der Bereich": "The section",
  "zeigt nicht die gesamte Geschichte des 911, sondern die wichtigsten": "does not show the entire history of the 911, but the most important",
  "aktuellen 911-Charaktere": "current 911 characters",
  "in einer verständlichen Übersicht. So wird klar, warum ein Carrera, ein Targa, ein Turbo und ein GT-Modell zwar alle zur 911-Familie gehören, aber unterschiedliche Aufgaben erfüllen.": "in an understandable overview. This makes it clear why a Carrera, a Targa, a Turbo and a GT model all belong to the 911 family but serve different purposes.",
  "Die Grundidee bleibt immer gleich: flache Silhouette, starke Heckpartie, sportliche Sitzposition und ein Boxer-Motor im Heckbereich. Die Varianten unterscheiden sich vor allem bei": "The basic idea always remains the same: a flat silhouette, powerful rear section, sporty seating position and a flat-six engine in the rear. The variants differ mainly in",
  "Alltagstauglichkeit": "everyday usability",
  "Offenfahren": "open-top driving",
  "Luxus": "luxury",
  "und": "and",
  "Motorsportnähe": "Motorsport orientation",
  "Sportlicher Einstieg": "Sporty entry point",
  "911 Carrera Coupé": "911 Carrera Coupé",
  "Der Carrera ist der klassische Einstieg in die 911-Welt: sportlich, präzise und trotzdem alltagstauglich.": "The Carrera is the classic entry into the 911 world: sporty, precise and still suitable for everyday use.",
  "Welche 911-Variante steht wofür?": "Which 911 variant stands for what?",
  "Der 911 ist keine einzelne starre Version, sondern eine Modellfamilie. Die Varianten bauen auf derselben Grundidee auf, setzen aber unterschiedliche Schwerpunkte: Alltag, Offenfahren, maximale Leistung oder Rennstrecken-Nähe.": "The 911 is not one fixed version, but a model family. The variants are based on the same basic idea, but focus on different areas: everyday use, open-top driving, maximum performance or track orientation.",
  "Carrera": "Carrera",
  "Der Carrera steht für den klassischen 911: sportlich, relativ vielseitig und nah an der ursprünglichen Idee eines schnellen, aber nutzbaren Sportwagens.": "The Carrera represents the classic 911: sporty, relatively versatile and close to the original idea of a fast but usable sports car.",
  "Targa": "Targa",
  "Der Targa verbindet Coupé-Gefühl mit offenem Fahren. Auffällig ist der charakteristische Targa-Bügel, der ihn optisch sofort von anderen Varianten abhebt.": "The Targa combines coupe feeling with open-top driving. Its characteristic Targa bar immediately sets it apart visually from other variants.",
  "Turbo & GT": "Turbo & GT",
  "Turbo-Modelle stehen für sehr hohe Leistung mit Komfort. GT-Modelle wirken kompromissloser und sind stärker an Motorsport und Rennstrecke orientiert.": "Turbo models stand for very high performance with comfort. GT models feel more uncompromising and are more strongly oriented toward motorsport and the racetrack.",
  "Auswahl": "Selection",
  "Modellvarianten im Slider": "Model variants in the slider",
  "Klicke auf eine Karte, um die jeweilige Variante im großen Bildbereich zu sehen. Die Einordnung ist bewusst kurz gehalten, damit der Unterschied zwischen den Varianten schnell verständlich wird.": "Click a card to view the corresponding variant in the large image area. The description is intentionally short so the difference between variants becomes clear quickly.",
  "911-Varianten auf einen Blick": "911 variants at a glance",
  "Die Galerie zeigt die ausgewählten 992-Varianten als visuelle Übersicht. Dadurch wirkt der Modelle-Bereich klarer und passt besser zum Namen der Seite.": "The gallery shows selected 992 variants as a visual overview. This makes the Models section clearer and better aligned with the page name.",
  "Carrera Coupé": "Carrera Coupé",
  "Carrera Cabriolet": "Carrera Cabriolet",
  "Carrera GTS": "Carrera GTS",
  "Turbo Cabriolet": "Turbo Cabriolet",
  "GT3": "GT3",
  "GT3 RS": "GT3 RS",
  "Vergleich": "Comparison",
  "Die wichtigsten Unterschiede verständlich erklärt": "The most important differences explained clearly",
  "Diese Übersicht hilft, die Varianten nicht nur optisch, sondern auch inhaltlich zu unterscheiden. Sie ist für ein Schulprojekt bewusst verständlich formuliert.": "This overview helps distinguish the variants not only visually but also in terms of content. It is deliberately worded clearly for a school project.",
  "Variante": "Variant",
  "Charakter": "Character",
  "Besonders passend für": "Best suited for",
  "klassisch, sportlich, ausgewogen": "classic, sporty, balanced",
  "Alltag, Einstieg in die 911-Welt, klare Linienführung": "everyday use, entry into the 911 world, clean lines",
  "Cabriolet": "Cabriolet",
  "offen, emotional, elegant": "open, emotional, elegant",
  "Fahren mit offenem Dach und stärkerem Erlebnisgefühl": "driving with an open roof and a stronger sense of experience",
  "GTS": "GTS",
  "dynamischer, stärker, sportlicher abgestimmt": "more dynamic, more powerful, sportier setup",
  "Fahrer, die mehr Performance wollen, aber Alltag behalten möchten": "drivers who want more performance while keeping everyday usability",
  "eigenständig, offen, designbetont": "distinctive, open, design-focused",
  "Besonderes Design mit Targa-Bügel und Glasheck": "special design with Targa bar and glass rear section",
  "sehr stark, komfortabel, souverän": "very powerful, comfortable, confident",
  "hohe Leistung mit Luxus und Alltagstauglichkeit": "high performance with luxury and everyday usability",
  "GT3 / GT3 RS": "GT3 / GT3 RS",
  "puristisch, präzise, motorsportnah": "puristic, precise, motorsport-oriented",
  "Rennstrecke, Leichtbau, direkte Rückmeldung": "racetrack, lightweight construction, direct feedback",
  "Warum der Modelle-Bereich jetzt klarer ist": "Why the Models section is clearer now",
  "Vorher wurden Modellvarianten und historische Generationen vermischt. Jetzt hat jede Seite eine klare Aufgabe:": "Previously, model variants and historical generations were mixed. Now each page has a clear task:",
  "erklärt die Varianten des 911, während": "explains the variants of the 911, while",
  "die Entwicklung über die Generationen zeigt.": "shows the development across generations.",
  "Für Besucher": "For visitors",
  "Besucher verstehen schneller, was die einzelnen 911-Versionen unterscheidet. Dadurch wirkt die Seite professioneller, logischer und leichter bedienbar.": "Visitors understand more quickly what distinguishes the individual 911 versions. This makes the page feel more professional, logical and easier to use.",
  "Für die Bewertung": "For assessment",
  "Die Inhalte sind sauber getrennt, verständlich formuliert und fachlich besser einzuordnen. Das verbessert sowohl Struktur als auch inhaltliche Qualität.": "The content is clearly separated, worded understandably and easier to evaluate from a subject perspective. This improves both structure and content quality.",
  "Hier werden die wichtigsten Fragen zum Schulprojekt und zur Demo-Shop-Funktion beantwortet.": "The most important questions about the school project and the demo shop function are answered here.",
  "Ist das ein echter Porsche-Shop?": "Is this a real Porsche shop?",
  "Nein. Der Shop ist eine Frontend-Demo für ein Schulprojekt. Es gibt keine echte Zahlung, keinen echten Versand und keine echte Bestellabwicklung.": "No. The shop is a frontend demo for a school project. There is no real payment, no real shipping and no real order processing.",
  "Warum gibt es trotzdem Preise und Produkte?": "Why are there prices and products anyway?",
  "Preise und Produkte machen die Shop-Funktion realistischer. So kann gezeigt werden, wie ein Warenkorb Mengen, Einzelpreise, Versand und Gesamtsumme berechnet.": "Prices and products make the shop function more realistic. This shows how a cart calculates quantities, unit prices, shipping and total sum.",
  "Werden Daten gespeichert oder verschickt?": "Is data stored or sent?",
  "Nein. Die Website arbeitet lokal im Browser. Formular- und Warenkorb-Daten werden nicht an einen Server übertragen.": "No. The website works locally in the browser. Form and cart data is not transferred to a server.",
  "Warum wird localStorage verwendet?": "Why is localStorage used?",
  "localStorage speichert den Warenkorb lokal im Browser, damit die Auswahl beim Wechsel zwischen Shop, Warenkorb und Checkout erhalten bleibt.": "localStorage saves the cart locally in the browser so the selection remains available when switching between shop, cart and checkout.",
  "Warum gibt es Newsletter und Checkout, wenn nichts echt verschickt wird?": "Why are there newsletter and checkout sections if nothing is really sent?",
  "Beide Bereiche zeigen professionelle Webfunktionen: Formularprüfung, Bestätigung, strukturierte Ausgabe und nutzerfreundliche Rückmeldung.": "Both areas demonstrate professional web functions: form validation, confirmation, structured output and user-friendly feedback.",
  "Ist die Website offiziell von Porsche?": "Is the website official from Porsche?",
  "Nein. Die Website ist ein inoffizielles Schulprojekt und steht nicht in Verbindung mit der Porsche AG.": "No. The website is an unofficial school project and is not affiliated with Porsche AG.",
  "Was ist das Ziel des Projekts?": "What is the goal of the project?",
  "Das Projekt soll zeigen, wie man eine moderne, mehrseitige Website mit HTML, CSS und JavaScript gestaltet, strukturiert und interaktiv macht.": "The project shows how to design, structure and make interactive a modern multi-page website using HTML, CSS and JavaScript.",
  "Rechtliches | Porsche Experience": "Legal notice | Porsche Experience",
  "Hinweise zum Schulprojekt": "Notes about the school project",
  "Diese Seite erklärt transparent, dass es sich um eine private, inoffizielle Demo handelt.": "This page transparently explains that this is a private, unofficial demo.",
  "Inoffizielle Projektseite": "Unofficial project page",
  "Diese Website ist kein offizieller Auftritt der Porsche AG. Sie wurde als privates Schulprojekt erstellt und dient ausschließlich zu Lern-, Präsentations- und Demonstrationszwecken.": "This website is not an official presence of Porsche AG. It was created as a private school project and is used exclusively for learning, presentation and demonstration purposes.",
  "Marken und Fahrzeugnamen": "Trademarks and vehicle names",
  "Namen, Logos, Modellbezeichnungen und Marken gehören den jeweiligen Rechteinhabern. Die Verwendung erfolgt nur im Rahmen einer inoffiziellen schulischen Darstellung.": "Names, logos, model designations and trademarks belong to their respective rights holders. They are used only within the context of an unofficial school presentation.",
  "Bilder und Medien": "Images and media",
  "Verwendete Bilder und Videos werden im Projektkontext genutzt. Für eine echte Veröffentlichung müssten Bildrechte, Lizenzen und Quellen vollständig geprüft werden.": "Images and videos are used in the project context. For a real publication, image rights, licenses and sources would need to be fully checked.",
  "Der Shop löst keine echte Bestellung aus. Preise, Produkte, Versand, Zahlung und Bestellbestätigung sind fiktiv und dienen nur der technischen Demonstration.": "The shop does not trigger a real order. Prices, products, shipping, payment and order confirmation are fictional and serve only as a technical demonstration.",
  "Newsletter-Demo": "Newsletter demo",
  "Das Newsletter-Formular erzeugt eine professionelle Bestätigungsansicht, versendet aber ohne Backend keine echte automatische E-Mail.": "The newsletter form creates a professional confirmation view, but without a backend it does not send a real automatic email.",
  "Es gibt keine Serverübertragung. Demo-Daten werden nur lokal im Browser verarbeitet, zum Beispiel für Warenkorb, Checkout und Bestellübersicht.": "There is no server transfer. Demo data is processed only locally in the browser, for example for cart, checkout and order overview.",
  "Quellen & Einordnung": "Sources & context",
  "Worauf sich die fachlichen Inhalte stützen": "What the subject content is based on",
  "Die Website fasst historische und technische Informationen stark vereinfacht für ein Schulprojekt zusammen. Für verbindliche Daten gelten immer die offiziellen Herstellerinformationen.": "The website summarizes historical and technical information in a simplified way for a school project. Official manufacturer information always applies for binding data.",
  "Porsche Stories: A brief history of the Porsche 911": "Porsche Stories: A brief history of the Porsche 911",
  "Einordnung zur 911-Geschichte, Designkontinuität und Generationen.": "Context on 911 history, design continuity and generations.",
  "Porsche Newsroom: 60 Years of Porsche 911": "Porsche Newsroom: 60 Years of Porsche 911",
  "Überblick über die wichtigsten 911-Generationen und technische Entwicklungsschritte.": "Overview of the most important 911 generations and technical development steps.",
  "Porsche: 911 Carrera Modelle": "Porsche: 911 Carrera models",
  "Orientierung zu aktuellen offiziellen Leistungs- und Modelldaten.": "Reference for current official performance and model data.",
  "Shop | Porsche Experience": "Shop | Porsche Experience",
  "Projekt-Shop": "Project shop",
  "Der Shop ist eine professionelle Frontend-Demo: Produkte ansehen, filtern, in den Warenkorb legen, Mengen anpassen und den Checkout durchlaufen. Es handelt sich nicht um einen echten Verkauf, sondern um eine realistische Umsetzung für das Schulprojekt.": "The shop is a professional frontend demo: view products, filter them, add them to the cart, adjust quantities and go through checkout. It is not a real sale, but a realistic implementation for the school project.",
  "Zum Warenkorb": "Go to cart",
  "Fragen zum Shop": "Shop questions",
  "Artikel gespeichert": "items saved",
  "Produkte suchen": "Search products",
  "Alle": "All",
  "Poster": "Posters",
  "Karten": "Cards",
  "Digital": "Digital",
  "Produkte": "Products",
  "Artikelübersicht": "Product overview",
  "Alle Preise sind fiktiv und nur für die technische Shop-Demo gedacht.": "All prices are fictional and intended only for the technical shop demo.",
  "Shop-Funktion": "Shop function",
  "So funktioniert die Demo": "How the demo works",
  "Der Shop zeigt typische Abläufe eines Online-Shops, bleibt aber vollständig lokal im Browser. Dadurch ist er sicher für ein Schulprojekt und trotzdem technisch nachvollziehbar.": "The shop demonstrates typical workflows of an online shop, but remains completely local in the browser. This makes it safe for a school project and still technically understandable.",
  "Produkt wählen": "Choose product",
  "Über Suche und Kategorien findest du passende Projektartikel.": "Use search and categories to find suitable project items.",
  "Artikel, Mengen, Einzelpreise und Gesamtbeträge werden berechnet.": "Items, quantities, unit prices and totals are calculated.",
  "Das Formular prüft Pflichtfelder und erstellt eine Demo-Bestellung.": "The form checks required fields and creates a demo order.",
  "Bestätigung": "Confirmation",
  "Am Ende erscheint eine Übersicht, ohne dass echte Daten versendet werden.": "At the end, an overview appears without sending real data.",
  "Warenkorb | Porsche Experience": "Cart | Porsche Experience",
  "Deine ausgewählten Artikel": "Your selected items",
  "Hier werden die Produkte, Mengen, Einzelpreise und Gesamtpreise angezeigt.": "Products, quantities, unit prices and total prices are displayed here.",
  "Zusammenfassung": "Summary",
  "Die Bestellung bleibt eine Schulprojekt-Demo ohne echte Zahlung.": "The order remains a school project demo without real payment.",
  "Weiter zum Checkout": "Continue to checkout",
  "Weiter einkaufen": "Continue shopping",
  "Dein Warenkorb ist leer.": "Your cart is empty.",
  "Gehe zurück zum Shop und lege ein Produkt in den Warenkorb.": "Go back to the shop and add a product to the cart.",
  "Zum Shop": "Go to shop",
  "Transparente Warenkorb-Berechnung": "Transparent cart calculation",
  "Der Warenkorb berechnet die Zwischensumme aus Preis und Menge jedes Artikels. Versandkosten werden nur angezeigt, wenn mindestens ein Produkt im Warenkorb liegt.": "The cart calculates the subtotal from the price and quantity of each item. Shipping costs are shown only when at least one product is in the cart.",
  "Der Carrera ist die klassische 911-Basis: sportlich, präzise und trotzdem alltagstauglich. Er erklärt die Grundidee des 911 am klarsten.": "The Carrera is the classic 911 base: sporty, precise and still suitable for everyday use. It explains the basic 911 idea most clearly.",
  "Offenes Fahrerlebnis": "Open-top driving experience",
  "Das Cabriolet verbindet die 911-Form mit offenem Fahren. Es wirkt emotionaler, bleibt aber weiterhin ein vollwertiger Sportwagen.": "The Cabriolet combines the 911 shape with open-top driving. It feels more emotional while still remaining a fully usable sports car.",
  "Mehr Performance": "More performance",
  "Der GTS steht zwischen Carrera und den extremen Topmodellen. Er ist sportlicher abgestimmt und richtet sich an Fahrer, die mehr Dynamik wollen.": "The GTS sits between the Carrera and the extreme top models. It is tuned more sportily and aimed at drivers who want more dynamics.",
  "Eigenständiges Dachkonzept": "Distinctive roof concept",
  "Der Targa ist weder klassisches Coupé noch normales Cabriolet. Sein Targa-Bügel und das Glasheck machen ihn besonders wiedererkennbar.": "The Targa is neither a classic coupe nor a regular cabriolet. Its Targa bar and glass rear section make it especially recognizable.",
  "Leistung und Komfort": "Performance and comfort",
  "Der Turbo verbindet sehr hohe Leistung mit Komfort und Alltagstauglichkeit. Typisch sind ein besonders kräftiger Auftritt und souveräne Beschleunigung.": "The Turbo combines very high performance with comfort and everyday usability. A particularly powerful appearance and confident acceleration are typical.",
  "Offen und sehr leistungsstark": "Open and very powerful",
  "Das Turbo Cabriolet kombiniert die Kraft des Turbo mit offenem Fahren. Es ist stärker auf Luxus, Sound und Erlebnis ausgelegt.": "The Turbo Cabriolet combines the power of the Turbo with open-top driving. It focuses more strongly on luxury, sound and experience.",
  "Der GT3 ist deutlich näher am Motorsport. Er steht für Präzision, direkte Rückmeldung und ein besonders fahraktives Konzept.": "The GT3 is much closer to motorsport. It stands for precision, direct feedback and a particularly active driving concept.",
  "Rennstreckenfokus": "Track focus",
  "Der GT3 RS ist die kompromissloseste Variante in dieser Übersicht. Aerodynamik, Leichtbau und Rennstrecken-Performance stehen im Vordergrund.": "The GT3 RS is the most uncompromising variant in this overview. Aerodynamics, lightweight construction and racetrack performance are the focus.",
  "G-Serie / ca. 1975 bis 1989": "G-Series / approx. 1975 to 1989",
  "Der 930 gehört zur G-Serie und steht für den klassischen Turbo-Auftritt: breite Kotflügel, markanter Heckspoiler und ein sehr analoges Fahrerlebnis.": "The 930 belongs to the G-Series and represents the classic Turbo appearance: wide fenders, a distinctive rear spoiler and a very analog driving experience.",
  "ca. 1988 bis 1994": "approx. 1988 to 1994",
  "Der 964 modernisierte den 911 deutlich. Er brachte mehr Technik, ein moderneres Fahrverhalten und blieb gleichzeitig nah an der klassischen Silhouette.": "The 964 modernized the 911 significantly. It brought more technology, more modern handling and still stayed close to the classic silhouette.",
  "ca. 1993 bis 1998": "approx. 1993 to 1998",
  "Der 993 gilt als letzte luftgekühlte 911-Generation. Deshalb hat er für viele Fans einen besonders klassischen und emotionalen Stellenwert.": "The 993 is considered the last air-cooled 911 generation. For many fans, that gives it a particularly classic and emotional status.",
  "ca. 1997 bis 2005": "approx. 1997 to 2005",
  "Der 996 markierte den größten technischen Umbruch: neues Design, neuer Aufbau und der Wechsel von Luft- zu Wasserkühlung.": "The 996 marked the biggest technical shift: new design, new structure and the change from air to water cooling.",
  "ca. 2004 bis 2012": "approx. 2004 to 2012",
  "Der 997 griff wieder stärker klassische 911-Merkmale auf und kombinierte sie mit moderner Performance und breiter Modellvielfalt.": "The 997 returned more strongly to classic 911 features and combined them with modern performance and a broad model range.",
  "ca. 2011 bis 2019": "approx. 2011 to 2019",
  "Der 991 wurde größer, moderner und technisch komplexer. Radstand, Fahrwerk und Aerodynamik wurden deutlich weiterentwickelt.": "The 991 became larger, more modern and technically more complex. Wheelbase, chassis and aerodynamics were significantly developed.",
  "seit ca. 2018": "since approx. 2018",
  "Der 992 steht für die aktuelle 911-Linie: breiter Auftritt, moderne Lichtsignatur, digitale Bedienung und hohe Alltagstauglichkeit.": "The 992 represents the current 911 line: wider appearance, modern light signature, digital controls and high everyday usability.",
  "911 Evolution Poster": "911 Evolution Poster",
  "Hochwertig gestaltetes Demo-Poster mit 911-Motiv für Präsentation, Projektwand oder Mappe.": "High-quality demo poster with a 911 motif for presentation, project wall or folder.",
  "Modellkarte 992": "992 model card",
  "Kompakte Modellkarte mit Eckdaten, Designmerkmalen und kurzer Einordnung zur 992-Generation.": "Compact model card with key data, design features and a short context for the 992 generation.",
  "Technik-Guide": "Technology guide",
  "Digitaler Kurzguide, der Motor, PDK, Fahrwerk, Bremsen und Aerodynamik verständlich erklärt.": "Digital short guide that clearly explains engine, PDK, chassis, brakes and aerodynamics.",
  "Generationen-Kartenset": "Generation card set",
  "Kartenset mit ausgewählten Generationen von 930 bis 992 für Vergleich und Präsentation.": "Card set with selected generations from 930 to 992 for comparison and presentation.",
  "Präsentationspaket": "Presentation package",
  "Digitales Präsentationspaket mit Gliederung, Stichpunkten und professionellen Formulierungen.": "Digital presentation package with structure, bullet points and professional wording.",
  "Garage Print": "Garage print",
  "Stimmungsvolles Printmotiv als Ergänzung für Deckblatt, Projektmappe oder Ausstellungstisch.": "Atmospheric print motif as an addition for a cover page, project folder or exhibition table.",
  "Sofort verfügbar": "Available now",
  "Download-Demo": "Download demo",
  "In den Warenkorb": "Add to cart",
  "Ansehen": "View",
  "Entfernen": "Remove",
  "Menge": "Quantity",
  "Einzelpreis": "Unit price",
  "Gesamtpreis": "Total price",
  "Lege zuerst Produkte in den Warenkorb.": "Add products to the cart first.",
  "Keine Produkte gefunden.": "No products found.",
  "Alle Kategorien": "All categories",
  "E-Mail-Text kopiert": "Email text copied",
  "Menü schließen": "Close menu",
  "Menü öffnen": "Open menu",
  "Video pausieren": "Pause video",
  "Video abspielen": "Play video",
  "Keine Treffer für": "No results for",
  "Dein Name": "Your name",
  "du@beispiel.de": "you@example.com",
  "Suchen...": "Search...",
  "Suche": "Search",
  "Schnellzugriff": "Quick access",
  "Hauptnavigation": "Main navigation",
  "Einkaufswagen": "Shopping cart",
  "Paragraf und Rechtliches": "Legal notice",
  "Porsche Experience Karussell": "Porsche Experience carousel",
  "Karussell Auswahl": "Carousel selection",
  "Nächstes Motiv": "Next visual",
  "Vorheriges Motiv": "Previous visual",
  "Nächstes Modell": "Next model",
  "Vorheriges Modell": "Previous model",
  "Nächstes Fahrzeug": "Next vehicle",
  "Vorheriges Fahrzeug": "Previous vehicle",
  "Shop-Filter": "Shop filter",
  "Kategorie auswählen": "Select category",
  "Vorschau der Bestätigungs-E-Mail": "Preview of the confirmation email",
  "Zusammenfassung der Anmeldung": "Registration summary",
  "z. B. Poster, Technik, Modell ...": "e.g. poster, technology, model ...",
  "Logo Porsche Experience": "Porsche Experience logo",
  "Porsche Motiv als Bild": "Porsche motif as image",
  "Acht Hauptgenerationen des Porsche 911": "Eight main generations of the Porsche 911",
  "Historische 911 Generationen": "Historic 911 generations",
  "Historische 911-Bildauswahl": "Historic 911 image selection",
  "Porsche 911 Modelle und Varianten": "Porsche 911 models and variants",
  "Geschichte des Porsche 911": "History of the Porsche 911",
  "Vergleich der 911 Varianten": "Comparison of 911 variants",
  "Motiv 1": "Visual 1",
  "Motiv 2": "Visual 2",
  "Motiv 3": "Visual 3",
  "Newsletter | Porsche Experience": "Newsletter | Porsche Experience",
  "Fragen und Antworten | Porsche Experience": "Questions and answers | Porsche Experience",
  "Diese Website präsentiert den Porsche 911 nicht nur mit Bildern und Videos, sondern erklärt auch seine Entwicklung, seine Modellgenerationen und die wichtigsten technischen Ideen dahinter. Ziel ist eine Seite, die optisch hochwertig wirkt und gleichzeitig inhaltlich verständlich bleibt.": "This website presents the Porsche 911 not only with images and videos, but also explains its development, model generations and the most important technical ideas behind it. The goal is a page that looks visually high-quality while remaining easy to understand.",
  "Der Porsche 911 ist seit 1963 eine der bekanntesten Sportwagen-Baureihen. Besonders spannend ist, dass viele Grundideen erhalten blieben: flache Front, markante Kotflügel, fließende Dachlinie, Heckmotor-Konzept und eine Form, die über Generationen wiedererkennbar bleibt.": "Since 1963, the Porsche 911 has been one of the best-known sports car model lines. What makes it especially interesting is that many basic ideas remained: flat front, distinctive fenders, flowing roofline, rear-engine concept and a shape that stays recognizable across generations.",
  "Ein ausfahrbarer Heckspoiler erzeugt bei hohem Tempo zusätzlichen Anpressdruck, während er im Alltag flach anliegt und den Luftwiderstand gering hält. Aktive Kühlluftklappen regeln zudem, wie viel Luft für die Kühlung benötigt wird.": "An extendable rear spoiler creates additional downforce at high speed, while staying flat in everyday driving to keep drag low. Active cooling air flaps also regulate how much air is needed for cooling.",
  "Die Website ist ein inoffizielles Schulprojekt. Die Texte sind eigenständig formuliert und dienen der verständlichen Einordnung. Marken, Modellnamen und Bilder werden nur zur projektbezogenen Darstellung verwendet.": "The website is an unofficial school project. The texts are independently written and are used for understandable context. Trademarks, model names and images are used only for project-related presentation.",
  "!": "!",
  "‹": "‹",
  "›": "›",
  "✓": "✓",
  "kraussj387@gmail.com": "kraussj387@gmail.com",
  'Nutzerführung': 'User journey',
  'Eine Website, drei klare Ebenen': 'One website, three clear levels',
  'Die Inhalte sind so aufgebaut, dass Besucher zuerst entdecken, anschließend verstehen und danach selbst ausprobieren können. Dadurch wirkt das Projekt nicht wie eine Sammlung einzelner Seiten, sondern wie eine zusammenhängende Experience.': 'The content is structured so visitors first discover, then understand and finally try things themselves. This makes the project feel like one connected experience rather than a collection of separate pages.',
  'Entdecken': 'Discover',
  'Geschichte, Modelle und starke Medien geben einen schnellen Einstieg in die Welt des 911. Jede Seite beantwortet dabei eine eigene Leitfrage.': 'History, models and strong media offer a quick entry into the world of the 911. Each page answers its own guiding question.',
  'Historie öffnen': 'Open history',
  'Verstehen': 'Understand',
  'Vergleichsmodule, Technik-Erklärungen und Q&A zerlegen komplexe Themen in nachvollziehbare Zusammenhänge statt nur Daten aufzulisten.': 'Comparison modules, technology explanations and Q&A break complex topics into understandable relationships instead of merely listing data.',
  'Engineering Lab starten': 'Start Engineering Lab',
  'Ausprobieren': 'Try it',
  'Newsletter, Demo-Shop und Projektbereich zeigen, wie eine echte Website Besucher führt, Eingaben verarbeitet und Ergebnisse transparent zurückmeldet.': 'Newsletter, demo shop and project section show how a real website guides visitors, processes input and provides transparent feedback.',
  'Projektlogik ansehen': 'View project logic',
  'Entwicklungslogik': 'Development logic',
  'Was jede Generation neu lösen musste': 'What every generation had to solve anew',
  'Der Fortschritt des 911 lässt sich nicht nur über Leistung erklären. Jede Generation musste Charakter, Sicherheit, Alltagstauglichkeit und technische Möglichkeiten neu ausbalancieren.': 'The progress of the 911 cannot be explained by performance alone. Every generation had to rebalance character, safety, everyday usability and technical possibilities.',
  'Identität bewahren': 'Preserve identity',
  'Silhouette, Rundscheinwerfer und Heckmotor-Prinzip schaffen Wiedererkennung. Änderungen mussten modernisieren, ohne die Grundidee unkenntlich zu machen.': 'Silhouette, round headlights and the rear-engine principle create recognition. Changes had to modernize without obscuring the core idea.',
  'Grenzen verschieben': 'Push boundaries',
  'Mehr Leistung verlangt bessere Bremsen, präzisere Fahrwerke, wirkungsvollere Aerodynamik und elektronische Regelsysteme, die zusammenarbeiten.': 'More power requires better brakes, more precise chassis systems, more effective aerodynamics and electronic control systems that work together.',
  'Bedienung verbessern': 'Improve usability',
  'Komfort, Assistenz, Konnektivität und digitale Anzeigen wurden wichtiger. Trotzdem bleibt der Fahrer und nicht das Display der Mittelpunkt des Konzepts.': 'Comfort, assistance, connectivity and digital displays became more important. Yet the driver, not the display, remains at the center of the concept.',
  'Modellarchitektur': 'Model architecture',
  'Eine Baureihe, vier klar erkennbare Charaktere': 'One model line, four clearly recognizable characters',
  'Die Modellnamen sind kein zufälliges Sortiment. Sie bilden unterschiedliche Nutzungsprofile ab und helfen Besuchern, technische Unterschiede in eine verständliche Rolle zu übersetzen.': 'The model names are not a random assortment. They represent different usage profiles and help visitors translate technical differences into understandable roles.',
  'Der Ausgangspunkt': 'The starting point',
  'Der klassische Allrounder verbindet Alltag, Langstrecke und sportliches Fahren. Er bildet die verständliche Basis der Modellfamilie.': 'The classic all-rounder combines everyday use, long-distance travel and sporty driving. It forms the accessible basis of the model family.',
  'Offen mit Struktur': 'Open with structure',
  'Der markante Überrollbügel und das besondere Dachkonzept verbinden Offenfahren mit einer eigenständigen visuellen Identität.': 'The distinctive roll-over bar and special roof concept combine open-top driving with an independent visual identity.',
  'Souveräne Leistung': 'Confident performance',
  'Allradantrieb, hohe Leistungsreserven und aktive Systeme stehen für kontrollierte Geschwindigkeit und starke Alltagstauglichkeit.': 'All-wheel drive, substantial performance reserves and active systems stand for controlled speed and strong everyday usability.',
  'Fokus Fahrdynamik': 'Focus on dynamics',
  'Gewicht, Aerodynamik, Fahrwerk und Rückmeldung werden stärker auf präzises Fahren und den Einsatz auf der Rundstrecke ausgerichtet.': 'Weight, aerodynamics, chassis and feedback are more strongly focused on precise driving and track use.',
  'Interaktives Systemverständnis': 'Interactive system understanding',
  '911 Engineering Lab': '911 Engineering Lab',
  'Wähle eine Fahrsituation und beobachte, wie Antrieb, Fahrwerk, Aerodynamik, Bremsen und Rückmeldung gemeinsam reagieren. Das Modul zeigt bewusst Zusammenhänge statt isolierter Einzelwerte.': 'Choose a driving situation and observe how drivetrain, chassis, aerodynamics, brakes and feedback react together. The module deliberately shows relationships instead of isolated values.',
  'Fahrsituation wählen': 'Choose driving situation',
  'Alltag': 'Everyday',
  'Nässe': 'Wet',
  'Dynamische Kurve': 'Dynamic corner',
  'Rennstrecke': 'Track',
  'Ausgewogene Abstimmung': 'Balanced setup',
  'Entspannt und direkt im Alltag': 'Relaxed and direct in everyday driving',
  'Im normalen Straßenbetrieb arbeiten die Systeme zurückhaltend. Der Antrieb reagiert weich, das Fahrwerk filtert Unebenheiten und die Aerodynamik priorisiert Effizienz.': 'In normal road use, the systems operate discreetly. The drivetrain responds smoothly, the chassis filters bumps and aerodynamics prioritize efficiency.',
  'Systemziel': 'System objective',
  'Komfort, Effizienz und klare Rückmeldung': 'Comfort, efficiency and clear feedback',
  'harmonisch': 'harmonious',
  'Sanfte Gasannahme und frühe, komfortorientierte Gangwechsel.': 'Smooth throttle response and early, comfort-oriented gear changes.',
  'komfortabel': 'comfortable',
  'Adaptive Dämpfung hält die Karosserie ruhig und lässt Restkomfort zu.': 'Adaptive damping keeps the body calm while preserving comfort.',
  'effizient': 'efficient',
  'Luftführung und Kühlung arbeiten bedarfsgerecht mit geringerem Widerstand.': 'Airflow and cooling work on demand with lower drag.',
  'Bremsen & Stabilität': 'Brakes & stability',
  'vorausschauend': 'anticipatory',
  'Regelsysteme bleiben im Hintergrund und greifen erst bei Bedarf ein.': 'Control systems remain in the background and intervene only when needed.',
  'Fahrerwunsch': 'Driver request',
  'Sensorik': 'Sensors',
  'Regelung': 'Control',
  'Aktoren': 'Actuators',
  'Rückmeldung': 'Feedback',
  'Aktuelle Entwicklungsrichtung': 'Current development direction',
  'Elektrifizierung als Performance-Werkzeug': 'Electrification as a performance tool',
  'Beim aktuellen 911 Carrera GTS T-Hybrid verbindet Porsche einen neu entwickelten 3,6-Liter-Boxermotor mit einem elektrisch unterstützten Turbolader, einer Hochvoltbatterie und einem Elektromotor im verstärkten PDK. Ziel ist nicht elektrisches Fahren als Selbstzweck, sondern ein schnelleres Ansprechen und zusätzliche Systemleistung.': 'In the current 911 Carrera GTS T-Hybrid, Porsche combines a newly developed 3.6-litre flat-six engine with an electrically assisted turbocharger, a high-voltage battery and an electric motor in the reinforced PDK. The goal is not electric driving for its own sake, but faster response and additional system performance.',
  'Schneller Ladedruck': 'Faster boost response',
  'Ein Elektromotor im Abgasturbolader kann das Verdichterrad unabhängig vom Abgasstrom beschleunigen. Dadurch steht Ladedruck schneller zur Verfügung.': 'An electric motor in the exhaust turbocharger can accelerate the compressor wheel independently of exhaust flow. This makes boost available more quickly.',
  'Elektrischer Zusatzschub': 'Electric assistance',
  'Der im Getriebe integrierte Elektromotor unterstützt den Antrieb direkt und kann Energie zurückgewinnen. Mechanik und Elektronik arbeiten als ein System.': 'The electric motor integrated in the transmission directly supports the drivetrain and can recover energy. Mechanics and electronics work as one system.',
  'Bedarfsgerechte Luftführung': 'Demand-based airflow',
  'Aktive Kühlluftklappen und adaptive Elemente steuern Luftwiderstand, Kühlung und Stabilität situationsabhängig statt mit einer starren Einstellung.': 'Active cooling air flaps and adaptive elements control drag, cooling and stability according to the situation instead of using a fixed setting.',
  'Fachliche Grundlage: offizielle Porsche-Presseinformationen zum 911 Carrera GTS T-Hybrid und zur aktiven Aerodynamik. Werte und Ausstattung können je nach Modell und Markt abweichen.': 'Technical basis: official Porsche press information on the 911 Carrera GTS T-Hybrid and active aerodynamics. Values and equipment may vary by model and market.',
  'Redaktionssystem': 'Editorial system',
  'Wie aus Updates ein guter Newsletter wird': 'How updates become a good newsletter',
  'Ein professioneller Newsletter sendet nicht einfach alles, was neu ist. Er priorisiert, verdichtet und führt Leser mit einer klaren Reihenfolge durch das wichtigste Thema.': 'A professional newsletter does not simply send everything that is new. It prioritizes, condenses and guides readers through the most important topic in a clear order.',
  'Ein Hauptthema': 'One main topic',
  'Jede Ausgabe bekommt einen klaren Schwerpunkt, zum Beispiel eine Generation, ein Techniksystem oder einen neuen Projektstand.': 'Each issue gets a clear focus, such as a generation, a technology system or a new project milestone.',
  'Drei kurze Ebenen': 'Three concise levels',
  'Eine verständliche Einordnung, ein kompakter Faktenblock und ein Link zur ausführlichen Seite verhindern unnötig lange E-Mails.': 'A clear context, a compact fact block and a link to the full page prevent unnecessarily long emails.',
  'Transparenter Rhythmus': 'Transparent rhythm',
  'Die Demo verspricht keine tägliche Werbung. Updates erscheinen nur, wenn neue Inhalte tatsächlich einen nachvollziehbaren Grund bieten.': 'The demo does not promise daily advertising. Updates appear only when new content provides a genuine reason.',
  'Wissensarchitektur': 'Knowledge architecture',
  'Welche Fragen die Q&A-Funktion abdeckt': 'Which questions the Q&A feature covers',
  'Die Antworten sind nicht zufällig gesammelt. Sie folgen denselben Themenbereichen wie die Website und führen bei tieferen Fragen direkt zur passenden Unterseite.': 'The answers are not collected at random. They follow the same subject areas as the website and lead directly to the appropriate subpage for deeper questions.',
  'Geschichte, Modelle und Technik': 'History, models and technology',
  'Fragen zu Generationen, Varianten, Motor, Fahrwerk und Aerodynamik werden kurz beantwortet und anschließend in den Fachseiten vertieft.': 'Questions about generations, variants, engine, chassis and aerodynamics are answered briefly and then expanded in the specialist pages.',
  'Aufbau und Umsetzung': 'Structure and implementation',
  'Besucher erhalten Erklärungen zu HTML, CSS, JavaScript, Ordnerstruktur, Teamarbeit, Tests und den Grenzen einer lokalen Demo.': 'Visitors receive explanations about HTML, CSS, JavaScript, folder structure, teamwork, testing and the limits of a local demo.',
  'Warenkorb und Datenschutz': 'Cart and privacy',
  'Die Funktion erklärt Preise, Mengen, Checkout und die rein lokale Verarbeitung, ohne einen echten Kauf oder eine Zahlung vorzutäuschen.': 'The feature explains prices, quantities, checkout and purely local processing without pretending to make a real purchase or payment.',
  'Frage erkennen': 'Recognize question',
  'Thema zuordnen': 'Assign topic',
  'Antwort liefern': 'Provide answer',
  'Vertiefung verlinken': 'Link deeper content',
  'Produktlogik': 'Product logic',
  'Was einen glaubwürdigen Demo-Shop ausmacht': 'What makes a credible demo shop',
  'Auch ohne echtes Bezahlsystem muss ein Shop verständlich, konsistent und transparent funktionieren. Deshalb trennt diese Demo klar zwischen Produktdarstellung, Warenkorb, Checkout und Bestätigung.': 'Even without a real payment system, a shop must work clearly, consistently and transparently. This demo therefore clearly separates product presentation, cart, checkout and confirmation.',
  'Klare Entscheidung': 'Clear decision',
  'Bild, Titel, Kategorie, Preis und kurze Beschreibung stehen in einer festen Reihenfolge. So können Artikel schnell verglichen werden.': 'Image, title, category, price and short description appear in a fixed order so items can be compared quickly.',
  'Nachvollziehbare Berechnung': 'Traceable calculation',
  'Menge, Einzelpreis, Zwischensumme und Gesamtpreis werden sichtbar getrennt. Änderungen wirken sich sofort und verständlich aus.': 'Quantity, unit price, subtotal and total are visibly separated. Changes take effect immediately and clearly.',
  'Ehrliche Demo-Grenze': 'Honest demo boundary',
  'Formularvalidierung und Bestätigung werden realistisch gezeigt, aber es wird weder eine Zahlung ausgelöst noch ein echter Auftrag übertragen.': 'Form validation and confirmation are shown realistically, but no payment is triggered and no real order is transmitted.',
  'Transparenz': 'Transparency',
  'Was auf dieser Website echt ist und was Demo bleibt': 'What is real on this website and what remains a demo',
  'Professionelle Darstellung bedeutet auch, Grenzen offen zu erklären. Besucher sollen jederzeit erkennen, welche Funktionen tatsächlich im Browser arbeiten und welche nur einen realen Ablauf simulieren.': 'Professional presentation also means explaining boundaries openly. Visitors should always be able to see which functions actually work in the browser and which only simulate a real process.',
  'Frontend-Funktionen': 'Frontend functions',
  'Navigation, Suche, Slider, Filter, Q&A, Formulare, Warenkorb und Sprachumschaltung funktionieren lokal mit HTML, CSS und JavaScript.': 'Navigation, search, sliders, filters, Q&A, forms, cart and language switching work locally with HTML, CSS and JavaScript.',
  'Geschäftsprozesse': 'Business processes',
  'Newsletter-Versand, Zahlung, Lagerbestand, Versand und echte Bestellungen werden nicht ausgeführt. Sie werden ausschließlich als Benutzerablauf dargestellt.': 'Newsletter delivery, payment, inventory, shipping and real orders are not executed. They are presented only as a user flow.',
  'Lokale Verarbeitung': 'Local processing',
  'Eingaben werden nicht an einen Projektserver gesendet. Checkout-Daten bleiben nur in der aktuellen Browsersitzung und dienen der Bestätigungsansicht.': 'Input is not sent to a project server. Checkout data remains only in the current browser session and is used for the confirmation view.',
  'Prozessschritt 2 von 4': 'Process step 2 of 4',
  'Vom Artikel zur kontrollierten Bestellung': 'From item to controlled order',
  'Der Warenkorb ist die Prüfstation vor dem Checkout: Mengen lassen sich korrigieren, Positionen entfernen und Kosten vollständig nachvollziehen.': 'The cart is the checkpoint before checkout: quantities can be corrected, items removed and costs fully traced.',
  'Prozessschritt 3 von 4': 'Process step 3 of 4',
  'Validierung vor der Bestätigung': 'Validation before confirmation',
  'Pflichtfelder, E-Mail-Format, Adresse und Demo-Hinweis werden geprüft, bevor die Bestellung ausschließlich lokal für die Bestätigungsseite vorbereitet wird.': 'Required fields, email format, address and demo notice are checked before the order is prepared locally for the confirmation page.',
  'Prozessschritt 4 von 4': 'Process step 4 of 4',
  'Klare Rückmeldung statt ungewisser Abschluss': 'Clear feedback instead of an uncertain finish',
  'Die Bestätigung fasst den lokalen Demo-Vorgang zusammen, zeigt eine Referenz und erklärt transparent, dass keine echte Bestellung übertragen wurde.': 'The confirmation summarizes the local demo process, shows a reference and transparently explains that no real order was transmitted.',
  'Produkt': 'Product',
  'Bestätigung': 'Confirmation',
  'Eine interaktive Hommage an Technik, Geschichte und Design.': 'An interactive tribute to technology, history and design.',
  'Das Projekt verbindet die Entwicklung des Porsche 911 mit einer klaren Nutzerführung, verständlichen Technik-Erklärungen und sichtbar funktionierenden Web-Komponenten. Gestaltung und Bedienung sollen dabei wie ein zusammenhängendes System wirken.': 'The project combines the development of the Porsche 911 with clear user guidance, understandable technology explanations and visibly functioning web components. Design and usability are intended to work as one coherent system.',
  'Hinweis zur Darstellung': 'Note on presentation',
  'Diese Website ist ein inoffizielles Schulprojekt. Die Inhalte dienen der verständlichen Darstellung von Geschichte, Modellen und Technik. Marken- und Modellnamen werden ausschließlich im Rahmen des Projekts verwendet; eine offizielle Verbindung zum Fahrzeughersteller besteht nicht.': 'This website is an unofficial school project. Its content is used to present history, models and technology in an understandable way. Brand and model names are used solely within the project; there is no official connection to the vehicle manufacturer.',
  'Sechs Merkmale, die Generationen verbinden': 'Six features that connect generations',
  'Gemeinsam entwickelt': 'Developed together',
  'Hinter Porsche Experience steht ein Projektteam, das Inhalte, Gestaltung und technische Funktionen gemeinsam entwickelt. Die Webseite wird nicht als einmalig fertiges Ergebnis betrachtet, sondern regelmäßig geprüft, abgestimmt und verbessert. Unser Schwerpunkt liegt auf einer professionellen, nachvollziehbaren und sorgfältigen Umsetzung. Ähnlich wie der Porsche 911 über Generationen weiterentwickelt wurde, ohne seine grundlegende Identität zu verlieren, wird auch dieses Projekt Schritt für Schritt optimiert, ohne sein ursprüngliches Konzept aus den Augen zu verlieren.': 'Porsche Experience is created by a project team that develops content, design and technical features together. The website is not treated as a one-off finished result, but is regularly reviewed, coordinated and improved. The focus is on professional, transparent and careful implementation. Much like the Porsche 911 has evolved over generations without losing its core identity, this project is improved step by step without losing sight of its original concept.',
  'So ist eine kompakte Ausgabe aufgebaut': 'This is how a compact issue is structured',
  'Die Generation 993 markiert das Ende der luftgekühlten 911-Ära. Ihre weichere Form modernisierte die klassische Silhouette, ohne die typischen Proportionen und den eigenständigen Charakter aufzugeben.': 'The 993 generation marks the end of the air-cooled 911 era. Its smoother shape modernised the classic silhouette without abandoning the typical proportions and distinctive character.',
  'Beim Boxermotor bewegen sich die gegenüberliegenden Kolben flach und gegeneinander. Dadurch bleibt der Motor niedrig. Im 911 sitzt er im Heck und prägt Gewichtsverteilung, Traktion und Fahrgefühl.': 'In a flat engine, opposing pistons move horizontally against each other. This keeps the engine low. In the 911 it sits at the rear and shapes weight distribution, traction and driving feel.',
  'Der Desktop-Schnellzugriff wurde neu geordnet, der Statistikblock der Startseite entfernt und der Modellvergleich um synchron wechselnde Fahrzeugbilder ergänzt. Als nächster Schritt folgt die gemeinsame Inhaltsprüfung vor der Abgabe.': 'The desktop quick access was reordered, the statistics block was removed from the home page and the model comparison was expanded with synchronised vehicle images. The next step is a joint content review before submission.',
  'Dokumentierte Beiträge': 'Documented contributions',
  'Aufgaben von Daniel und Falco': 'Tasks by Daniel and Falco',
  'Die Beschreibungen nennen ausschließlich Beiträge, die für die Gruppenarbeit bereits dokumentiert wurden. Unbestätigte Programmier- oder Inhaltsaufgaben werden bewusst nicht ergänzt.': 'The descriptions only name contributions that have already been documented for the group work. Unconfirmed programming or content tasks are deliberately not added.',
  'Aufgabenverteilung und Abstimmung': 'Task allocation and coordination',
  'Daniel übernahm in der Gruppe die Verteilung der Aufgaben und half dabei, die Arbeitsschritte zwischen den Teammitgliedern zu koordinieren. Sein Beitrag liegt damit vor allem in der organisatorischen Abstimmung, damit Inhalte, Gestaltung und technische Teilaufgaben nicht doppelt oder widersprüchlich bearbeitet werden.': 'Daniel took responsibility for allocating tasks within the group and helped coordinate the work steps between team members. His contribution therefore focuses on organisational coordination so that content, design and technical tasks are not handled twice or in conflicting ways.',
  'Gestaltung der Projektpräsentation': 'Design of the project presentation',
  'Falco gestaltete die Präsentation des Gruppenprojekts. Sein Beitrag besteht darin, die Ergebnisse der Webseite für den Vortrag klar zu strukturieren und visuell nachvollziehbar aufzubereiten. Dafür werden echte Projektansichten und konkrete Funktionsbereiche statt allgemeiner Platzhalter verwendet.': 'Falco designed the presentation for the group project. His contribution is to structure the website results clearly for the presentation and prepare them in a visually understandable way. Real project views and concrete functional areas are used instead of generic placeholders.'
};

  const reverseTranslations = Object.fromEntries(
    Object.entries(TRANSLATIONS)
      .filter(([de, en]) => de !== en)
      .map(([de, en]) => [en, de])
  );

  const STORAGE_KEY = "porscheExperienceLanguage";
  const SKIP_SELECTOR = "script, style, svg, path, text, textarea, code, pre, .language-widget, .pe-toast";
  let memoryLanguage = "de";

  function getUrlLanguage() {
    try {
      const params = new URLSearchParams(window.location.search);
      const value = params.get("lang");
      return value === "en" || value === "de" ? value : null;
    } catch (_) {
      return null;
    }
  }

  function getStoredLanguage() {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return value === "en" || value === "de" ? value : null;
    } catch (_) {
      return memoryLanguage;
    }
  }

  function saveStoredLanguage(lang) {
    memoryLanguage = lang === "en" ? "en" : "de";
    try {
      window.localStorage.setItem(STORAGE_KEY, memoryLanguage);
    } catch (_) {
      /* Chrome kann localStorage bei lokalen Dateien, ZIP-Start oder strengen Einstellungen blockieren.
         Die Sprache funktioniert trotzdem über memoryLanguage und ?lang=. */
    }
  }

  const urlLanguage = getUrlLanguage();
  let currentLanguage = urlLanguage || getStoredLanguage() || "de";
  let isApplying = false;
  let mutationTimer = null;

  function normalize(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function keepOuterWhitespace(original, replacement) {
    const start = original.match(/^\s*/)[0];
    const end = original.match(/\s*$/)[0];
    return `${start}${replacement}${end}`;
  }

  function dictionaryFor(lang) {
    return lang === "en" ? TRANSLATIONS : reverseTranslations;
  }

  function translateTextNode(node, lang) {
    if (!node || !node.nodeValue) return;
    const parent = node.parentElement;
    if (!parent || parent.closest(SKIP_SELECTOR)) return;

    const clean = normalize(node.nodeValue);
    if (!clean) return;

    const dict = dictionaryFor(lang);
    const translated = dict[clean];

    if (translated && translated !== clean) {
      node.nodeValue = keepOuterWhitespace(node.nodeValue, translated);
    }
  }

  function translateAttributes(element, lang) {
    if (!element || element.closest(SKIP_SELECTOR)) return;
    const dict = dictionaryFor(lang);
    ["placeholder", "aria-label", "title", "alt", "value"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const clean = normalize(element.getAttribute(attribute));
      const translated = dict[clean];
      if (translated && translated !== clean) {
        element.setAttribute(attribute, translated);
      }
    });
  }

  function walkAndTranslate(root, lang) {
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || parent.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
          if (!normalize(node.nodeValue)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => translateTextNode(node, lang));

    root.querySelectorAll?.("*").forEach((element) => translateAttributes(element, lang));
  }

  function applyLanguage(lang, silent = false) {
    currentLanguage = lang === "en" ? "en" : "de";
    saveStoredLanguage(currentLanguage);
    document.documentElement.lang = currentLanguage;
    document.documentElement.dataset.language = currentLanguage;

    isApplying = true;
    walkAndTranslate(document.documentElement, currentLanguage);

    const cleanTitle = normalize(document.title);
    const titleDict = dictionaryFor(currentLanguage);
    if (titleDict[cleanTitle]) document.title = titleDict[cleanTitle];

    updateLanguageWidget();
    syncLanguageLinks();
    setTimeout(() => {
      isApplying = false;
      if (!silent) showToast(currentLanguage === "en" ? "Language switched to English." : "Sprache auf Deutsch gestellt.");
    }, 0);
  }

  function createLanguageWidget() {
    if (document.querySelector(".language-widget")) return;

    const widget = document.createElement("div");
    widget.className = "language-widget";
    widget.setAttribute("aria-label", "Sprache wechseln");
    widget.innerHTML = `
      <span class="language-widget__label">Sprache</span>
      <div class="language-widget__buttons" role="group" aria-label="Sprachauswahl">
        <button type="button" data-set-language="de">DE</button>
        <button type="button" data-set-language="en">EN</button>
      </div>
    `;
    const placeWidget = () => {
      const menu = document.getElementById("mainNav");
      const collapsedNavigation = window.matchMedia("(max-width: 1199px)").matches;
      if (collapsedNavigation && menu) {
        widget.classList.add("is-in-menu");
        menu.appendChild(widget);
      } else {
        widget.classList.remove("is-in-menu");
        document.body.appendChild(widget);
      }
    };

    placeWidget();
    window.addEventListener("resize", placeWidget, { passive: true });

    widget.addEventListener("click", (event) => {
      const button = event.target.closest("[data-set-language]");
      if (!button) return;
      applyLanguage(button.dataset.setLanguage);
    });
  }

  function updateLanguageWidget() {
    document.querySelectorAll("[data-set-language]").forEach((button) => {
      const active = button.dataset.setLanguage === currentLanguage;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const label = document.querySelector(".language-widget__label");
    if (label) label.textContent = currentLanguage === "en" ? "Language" : "Sprache";
  }


  function syncLanguageLinks() {
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("javascript:")
      ) return;

      try {
        const url = new URL(href, window.location.href);
        if (!url.pathname.toLowerCase().endsWith(".html")) return;
        url.searchParams.set("lang", currentLanguage);
        link.setAttribute("href", `${url.pathname.split("/").pop()}${url.search}${url.hash}`);
      } catch (_) {}
    });
  }

  function showToast(message) {
    let toast = document.querySelector(".pe-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "pe-toast";
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function addReadingProgress() {
    if (document.querySelector(".pe-read-progress")) return;
    const bar = document.createElement("div");
    bar.className = "pe-read-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    const update = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
      bar.style.width = `${progress}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function addBackToTop() {
    if (document.querySelector(".pe-back-top")) return;
    const button = document.createElement("button");
    button.className = "pe-back-top";
    button.type = "button";
    button.setAttribute("aria-label", "Nach oben");
    button.textContent = "↑";
    document.body.appendChild(button);

    const update = () => button.classList.toggle("is-visible", window.scrollY > 480);
    button.addEventListener("click", () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function enhanceDetails() {
    document.querySelectorAll("details").forEach((detail) => {
      if (detail.dataset.peAccordion === "true") return;
      detail.dataset.peAccordion = "true";
      detail.addEventListener("toggle", () => {
        if (!detail.open) return;
        const parent = detail.parentElement;
        parent?.querySelectorAll("details[open]").forEach((other) => {
          if (other !== detail) other.open = false;
        });
      });
    });
  }

  function addRevealAnimation() {
    const elements = document.querySelectorAll("main section, .info-card, .gallery-card, .site-card, .topic-card, .product-card, .process-steps article, details");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("pe-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("pe-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => {
      if (element.classList.contains("pe-visible")) return;
      element.classList.add("pe-reveal");
      observer.observe(element);
    });
  }

  function enhancePage(root = document) {
    enhanceDetails();
    addRevealAnimation();
  }

  function initMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      if (isApplying) return;
      const shouldReact = mutations.some((mutation) => mutation.type === "childList" && mutation.addedNodes.length);
      if (!shouldReact) return;

      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(() => {
        enhancePage(document);
        if (currentLanguage === "en") applyLanguage("en", true);
      }, 80);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }


  // Navigation:
  // Die Leuchteffekte bleiben bewusst in HTML/CSS so wie in der ersten ZIP.
  // Dieses globale Script verändert keine nav-active-Klassen mehr,
  // damit die originale Navigationsbar nicht überschrieben wird.

  function initTranslationFeatures() {
    createLanguageWidget();
    addReadingProgress();
    addBackToTop();
    enhancePage(document);
    applyLanguage(currentLanguage, true);
    initMutationObserver();

    window.PorscheExperienceTranslate = {
      setLanguage: applyLanguage,
      refresh: () => applyLanguage(currentLanguage, true),
      get language() { return currentLanguage; }
    };
  }

  if (document.readyState === "loading") {
    /* Startpunkt: läuft erst, wenn die HTML-Seite vollständig geladen ist. */
  document.addEventListener("DOMContentLoaded", initTranslationFeatures);
  } else {
    initTranslationFeatures();
  }
})();