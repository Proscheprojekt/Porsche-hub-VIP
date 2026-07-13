/* =============================================================
   Porsche Experience – kommentierte JavaScript-Datei
   Zweck: Interaktivität, Menüs, Suche, Slider, Formulare, Übersetzung oder Shop.
   Kommentare erklären die Logik, ohne die Funktion sichtbar zu verändern.
============================================================= */

/* =============================================================
   Interaktives Q&A für qa.html
   Zweck:
   - Vorgefertigte Fragen anzeigen
   - Eigene Fragen auswerten
   - Passende Antworten aus einer lokalen Wissensbasis anzeigen
   - Ohne Backend, Datenbank oder externe KI funktionieren
============================================================= */

(() => {
  "use strict";

  const QA_DATA = [
    {
      category: "Projekt",
      question: "Was ist das Ziel eures Projekts?",
      keywords: ["ziel", "projekt", "worum", "warum", "aufgabe", "kt"],
      answer: "Das Ziel des Projekts ist eine moderne Porsche-Experience-Website als Schulprojekt. Die Website soll nicht nur Informationen zeigen, sondern ein digitales Erlebnis schaffen: Geschichte, Modelle, Technik, Newsletter, Shop-Demo und Präsentationsinhalte werden zu einer zusammenhängenden Marken-Experience verbunden."
    },
    {
      category: "Projekt",
      question: "Warum habt ihr Porsche als Thema gewählt?",
      keywords: ["porsche", "gewählt", "warum porsche", "thema", "marke"],
      answer: "Porsche wurde gewählt, weil die Marke Technik, Emotion, Design, Geschichte und Premium-Wirkung verbindet. Genau diese Mischung passt gut zu einem KT-Projekt, weil man daran Webdesign, Nutzerführung, Interaktivität und technische Umsetzung anschaulich zeigen kann."
    },
    {
      category: "Projekt",
      question: "Ist die Website offiziell von Porsche?",
      keywords: ["offiziell", "porsche ag", "echte website", "fanprojekt"],
      answer: "Nein. Die Website ist ein inoffizielles Schulprojekt und steht nicht in Verbindung mit der Porsche AG. Namen, Bilder und Inhalte dienen ausschließlich der Darstellung, Erklärung und Präsentation im Unterricht."
    },
    {
      category: "Projekt",
      question: "Was macht euer Projekt besonders?",
      keywords: ["besonders", "besser", "einzigartig", "stärke", "premium"],
      answer: "Besonders ist die Kombination aus mehrseitiger Struktur, dunklem Premium-Look, interaktiven Elementen, Shop-Demo, Newsletter-Funktion, Übersetzung und erklärbaren Code-Kommentaren. Dadurch wirkt die Website nicht wie eine einfache Infoseite, sondern wie eine kleine digitale Experience."
    },
    {
      category: "Design",
      question: "Was bedeutet Dark Luxury Classic Cinema?",
      keywords: ["dark", "luxury", "classic", "cinema", "designsprache", "look"],
      answer: "Dark Luxury Classic Cinema beschreibt die Designrichtung der Website: dunkle Bühne, edle Kontraste, Gold- und Rottöne, klare Typografie und filmische Bildwirkung. Dadurch entsteht eine hochwertige Atmosphäre, die zu Sportwagen, Geschichte und Premium-Marke passt."
    },
    {
      category: "Design",
      question: "Warum nutzt ihr dunkle Farben?",
      keywords: ["dunkel", "farben", "schwarz", "graphit", "atmosphäre"],
      answer: "Dunkle Farben wirken hochwertig, konzentriert und modern. Sie lassen Bilder, rote Akzente und goldene Details stärker wirken. Außerdem erinnert der Look an einen Showroom oder eine filmische Präsentation, wodurch die Website emotionaler erscheint."
    },
    {
      category: "Design",
      question: "Warum gibt es rote und goldene Akzente?",
      keywords: ["rot", "gold", "akzent", "farben", "heritage", "racing"],
      answer: "Gold steht im Design für Heritage, Wertigkeit und Geschichte. Rot steht für Sportlichkeit, Geschwindigkeit und Racing-Gefühl. Zusammen unterstützen die Farben die emotionale Wirkung der Website, ohne dass das Layout überladen wirkt."
    },
    {
      category: "Design",
      question: "Wie wurde die Zielgruppe berücksichtigt?",
      keywords: ["zielgruppe", "besucher", "kunden", "autofans", "technikbegeisterte"],
      answer: "Die Website richtet sich an Porsche-Fans, Autofans, junge Technikbegeisterte und Menschen, die Premium-Design mögen. Deshalb verbindet sie emotionale Bilder mit verständlichen Texten, klaren Karten, interaktiven Bereichen und einer einfachen Navigation."
    },
    {
      category: "Technik",
      question: "Welche Technologien wurden verwendet?",
      keywords: ["technologien", "html", "css", "javascript", "technik", "programmiert"],
      answer: "Die Website wurde mit HTML, CSS und JavaScript umgesetzt. HTML bildet die Struktur, CSS gestaltet Layout, Farben und Responsiveness, und JavaScript steuert interaktive Funktionen wie Navigation, Suche, Slider, Warenkorb, Newsletter, Übersetzung und Q&A."
    },
    {
      category: "Technik",
      question: "Was macht JavaScript auf der Website?",
      keywords: ["javascript", "js", "funktion", "interaktiv", "script"],
      answer: "JavaScript macht die Website interaktiv. Es steuert zum Beispiel Slider, Suchfunktion, Warenkorb, Checkout, Newsletter-Bestätigung, Sprachumschalter, mobile Navigation und diesen Q&A-Assistenten. Ohne JavaScript wäre die Seite deutlich statischer."
    },
    {
      category: "Technik",
      question: "Warum ist Responsiveness wichtig?",
      keywords: ["responsive", "handy", "mobil", "tablet", "größe"],
      answer: "Responsiveness ist wichtig, damit die Website auf Desktop, Tablet und Smartphone gut funktioniert. Texte, Karten, Navigation und Bilder müssen sich an kleinere Bildschirme anpassen, sonst wirkt die Seite unprofessionell oder wird schwer bedienbar."
    },
    {
      category: "Technik",
      question: "Warum sollte man die Website mit Live Server öffnen?",
      keywords: ["live server", "chrome", "lokal", "öffnen", "file", "browser"],
      answer: "Live Server startet die Website wie eine kleine lokale Webseite. Dadurch laden Pfade, JavaScript und lokale Dateien zuverlässiger als beim direkten Öffnen aus einer ZIP-Datei. Besonders Chrome kann lokale Datei- und Speicherzugriffe sonst einschränken."
    },
    {
      category: "Modelle",
      question: "Was zeigt die Modelle-Seite?",
      keywords: ["modelle", "modellseite", "carrera", "targa", "turbo", "gt3"],
      answer: "Die Modelle-Seite zeigt verschiedene 911-Varianten wie Carrera, Cabriolet, Targa, Turbo, GT3 und GT3 RS. Sie erklärt, dass diese Varianten unterschiedliche Schwerpunkte haben: Alltag, offenes Fahren, Performance, Luxus oder Rennstrecken-Nähe."
    },
    {
      category: "Modelle",
      question: "Was ist der Unterschied zwischen Carrera und Turbo?",
      keywords: ["carrera", "turbo", "unterschied", "modellvergleich"],
      answer: "Der Carrera steht für die klassische 911-Grundidee: sportlich, präzise und alltagstauglich. Der Turbo ist stärker auf hohe Leistung, Beschleunigung und souveräne Performance ausgelegt. Beide gehören zum 911, sprechen aber unterschiedliche Erwartungen an."
    },
    {
      category: "Modelle",
      question: "Warum gibt es so viele 911-Varianten?",
      keywords: ["varianten", "viele modelle", "warum", "targa", "gt3"],
      answer: "Die vielen Varianten zeigen, wie flexibel das 911-Konzept ist. Manche Modelle sind komfortabler, andere sportlicher oder radikaler. Dadurch kann der 911 unterschiedliche Zielgruppen erreichen, ohne seine Grundform und Identität zu verlieren."
    },
    {
      category: "Geschichte",
      question: "Worum geht es auf der Geschichte-Seite?",
      keywords: ["geschichte", "historie", "generation", "entwicklung"],
      answer: "Die Geschichte-Seite erklärt die Entwicklung des Porsche 911 über mehrere Generationen. Sie zeigt, wie sich Design, Technik, Sicherheit und Performance verändert haben, während die typische 911-Silhouette erhalten geblieben ist."
    },
    {
      category: "Geschichte",
      question: "Warum ist der Porsche 911 so bekannt?",
      keywords: ["bekannt", "legendär", "911", "ikone", "berühmt"],
      answer: "Der Porsche 911 ist so bekannt, weil er über Jahrzehnte eine klare Identität behalten hat: Heckmotor, sportliche Form, hohe Alltagstauglichkeit und starke Motorsport-Nähe. Diese Mischung macht ihn zu einer der bekanntesten Sportwagen-Ikonen."
    },
    {
      category: "Geschichte",
      question: "Welche 911-Generationen werden erklärt?",
      keywords: ["generationen", "930", "964", "993", "996", "997", "991", "992"],
      answer: "Die Website erklärt wichtige 911-Generationen wie G-Serie/930, 964, 993, 996, 997, 991 und 992. Dabei geht es nicht nur um Jahreszahlen, sondern um die wichtigsten technischen und gestalterischen Veränderungen."
    },
    {
      category: "Shop",
      question: "Ist der Shop echt?",
      keywords: ["shop", "echt", "bestellen", "zahlung", "versand"],
      answer: "Nein. Der Shop ist eine Demo für das Schulprojekt. Er zeigt realistische Shop-Funktionen wie Produkte, Preise, Warenkorb, Mengen und Checkout, aber es gibt keine echte Zahlung, keinen Versand und keine echte Bestellung."
    },
    {
      category: "Shop",
      question: "Wie funktioniert der Warenkorb?",
      keywords: ["warenkorb", "preis", "gesamt", "menge", "artikel"],
      answer: "Der Warenkorb speichert ausgewählte Produkte lokal im Browser. Er zeigt Produktname, Einzelpreis, Menge, Zwischensumme, Versand und Gesamtbetrag. Dadurch kann man erklären, wie ein einfacher Frontend-Shop technisch aufgebaut ist."
    },
    {
      category: "Shop",
      question: "Warum nutzt der Shop localStorage?",
      keywords: ["localstorage", "speichern", "browser", "daten", "warenkorb"],
      answer: "localStorage wird verwendet, damit der Warenkorb beim Wechsel zwischen Shop, Warenkorb und Checkout erhalten bleibt. Die Daten bleiben lokal im Browser und werden nicht an einen Server geschickt."
    },
    {
      category: "Shop",
      question: "Warum gibt es einen Checkout, wenn der Shop nur eine Demo ist?",
      keywords: ["checkout", "demo", "formular", "bestellung"],
      answer: "Der Checkout zeigt, wie ein Bestellprozess aufgebaut sein kann: Kundendaten, Zahlungsart, Übersicht und Bestätigung. Für das Schulprojekt ist das sinnvoll, weil dadurch Formularlogik und Nutzerführung demonstriert werden."
    },
    {
      category: "Newsletter",
      question: "Was macht die Newsletter-Seite?",
      keywords: ["newsletter", "mail", "email", "bestätigung", "formular"],
      answer: "Die Newsletter-Seite nimmt Daten über ein Formular auf, prüft die Eingaben und erzeugt danach eine professionelle Bestätigungs-Mail. Da es kein Backend gibt, wird die Mail nicht automatisch verschickt, sondern als fertiger Text angezeigt und kann kopiert oder im Mailprogramm geöffnet werden."
    },
    {
      category: "Newsletter",
      question: "Warum wird keine echte E-Mail automatisch verschickt?",
      keywords: ["email verschicken", "automatisch", "backend", "server", "mail"],
      answer: "Eine echte automatische E-Mail braucht normalerweise ein Backend oder einen Mail-Dienst. Da dieses Schulprojekt nur mit HTML, CSS und JavaScript läuft, wird eine professionelle Mail vorbereitet, aber nicht serverseitig verschickt."
    },
    {
      category: "Newsletter",
      question: "Welche Daten werden beim Newsletter gespeichert?",
      keywords: ["daten", "datenschutz", "newsletter", "speichern"],
      answer: "Die Website speichert Newsletter-Daten nicht dauerhaft auf einem Server. Die Eingaben werden nur im Browser verarbeitet, um die Bestätigung anzuzeigen. Für eine echte Website müsste man Datenschutz, Einwilligung und Double-Opt-In professionell umsetzen."
    },
    {
      category: "Code",
      question: "Warum wurde der Code kommentiert?",
      keywords: ["kommentare", "code kommentiert", "erklären", "schule"],
      answer: "Der Code wurde kommentiert, damit die Funktionen in der Präsentation und Abgabe besser erklärt werden können. Kommentare helfen zu verstehen, welcher Abschnitt für Navigation, Layout, Slider, Shop, Newsletter, Übersetzung oder Q&A zuständig ist."
    },
    {
      category: "Code",
      question: "Was ist der Unterschied zwischen HTML, CSS und JavaScript?",
      keywords: ["html css javascript", "unterschied", "struktur", "design", "logik"],
      answer: "HTML beschreibt die Struktur der Seite, CSS gestaltet Aussehen, Farben, Abstände und Layout, und JavaScript sorgt für Logik und Interaktion. Zusammen bilden sie die Grundlage der Website."
    },
    {
      category: "Code",
      question: "Warum ist semantisches HTML wichtig?",
      keywords: ["semantik", "html", "section", "main", "nav", "header"],
      answer: "Semantisches HTML macht die Seite verständlicher für Browser, Suchmaschinen, Screenreader und Entwickler. Elemente wie header, nav, main, section und footer zeigen klar, welche Aufgabe ein Bereich hat."
    },
    {
      category: "Code",
      question: "Was wurde beim Reparieren der Website verbessert?",
      keywords: ["repariert", "fix", "verbessert", "kaputt", "fehler"],
      answer: "Repariert wurden unter anderem defekte Links, falsche Pfade, kaputte Bereiche, Warenkorb-Anzeige, Übersetzungsprobleme in Chrome, Kommentare im Code sowie die Struktur der Modelle- und Geschichte-Seiten."
    },
    {
      category: "Präsentation",
      question: "Wie kann man das Projekt gut vorstellen?",
      keywords: ["präsentation", "vorstellen", "erklären", "sprechen"],
      answer: "Am besten erklärt man zuerst die Idee, dann die Zielgruppe, danach Design und technische Umsetzung. Anschließend zeigt man die wichtigsten Funktionen live: Navigation, Modelle, Geschichte, Shop, Newsletter, Übersetzung und Q&A."
    },
    {
      category: "Präsentation",
      question: "Was sollte man beim Vorführen der Website zeigen?",
      keywords: ["vorführen", "demo", "zeigen", "live"],
      answer: "Sinnvoll ist eine kurze Live-Demo: Startseite öffnen, Modelle und Geschichte zeigen, ein Produkt in den Warenkorb legen, Newsletter ausfüllen, Sprache wechseln und eine Frage im Q&A stellen. So sieht man sofort, dass die Website interaktiv ist."
    },
    {
      category: "Präsentation",
      question: "Welche Herausforderungen gab es im Projekt?",
      keywords: ["herausforderungen", "probleme", "schwierigkeiten", "team"],
      answer: "Herausforderungen waren vor allem saubere Navigation, funktionierender Warenkorb, passende Texte, Übersetzung in Chrome, Code-Kommentare und eine professionelle Darstellung ohne die ursprüngliche Struktur zu zerstören."
    },
    {
      category: "Präsentation",
      question: "Was ist das Fazit des Projekts?",
      keywords: ["fazit", "schluss", "ergebnis", "gelernt"],
      answer: "Das Fazit ist: Aus einer normalen Auto-Website wurde eine deutlich professionellere digitale Experience. Das Projekt zeigt Design, Technik, Teamarbeit, Problemlösung und eine verständliche Umsetzung mit HTML, CSS und JavaScript."
    }
  ];

  const form = document.getElementById("qaForm");
  const input = document.getElementById("qaInput");
  const questionGrid = document.getElementById("qaQuestionGrid");
  const categoryTabs = document.getElementById("qaCategoryTabs");
  const answerPanel = document.getElementById("qaAnswerPanel");
  const answerTitle = document.getElementById("qaAnswerTitle");
  const answerText = document.getElementById("qaAnswerText");
  const answerCategory = document.getElementById("qaAnswerCategory");
  const answerConfidence = document.getElementById("qaAnswerConfidence");
  const randomButton = document.getElementById("qaRandomQuestion");
  const copyButton = document.getElementById("qaCopyAnswer");
  const resetButton = document.getElementById("qaReset");

  if (!form || !input || !questionGrid || !answerTitle || !answerText) return;

  let currentAnswer = "";
  let activeCategory = "all";

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replaceAll("ä", "ae")
      .replaceAll("ö", "oe")
      .replaceAll("ü", "ue")
      .replaceAll("ß", "ss")
      .replace(/[^\w\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function scoreQuestion(query, item) {
    const cleanQuery = normalize(query);
    if (!cleanQuery) return 0;

    const haystack = normalize(`${item.category} ${item.question} ${item.keywords.join(" ")} ${item.answer}`);
    let score = 0;

    if (normalize(item.question).includes(cleanQuery)) score += 12;
    if (haystack.includes(cleanQuery)) score += 6;

    const words = cleanQuery.split(" ").filter((word) => word.length > 2);
    words.forEach((word) => {
      if (normalize(item.question).includes(word)) score += 4;
      if (item.keywords.some((keyword) => normalize(keyword).includes(word))) score += 5;
      if (haystack.includes(word)) score += 1;
    });

    return score;
  }

  function showAnswer(item, statusText = "Passende Antwort gefunden") {
    if (!item) return;

    answerTitle.textContent = item.question;
    answerText.textContent = item.answer;
    answerCategory.textContent = `Kategorie: ${item.category}`;
    answerConfidence.textContent = `Status: ${statusText}`;
    currentAnswer = `${item.question}\n\n${item.answer}`;

    answerPanel.classList.remove("is-updated");
    requestAnimationFrame(() => {
      answerPanel.classList.add("is-updated");
    });
  }

  function showFallback(query) {
    const suggestions = QA_DATA
      .map((item) => ({ item, score: scoreQuestion(query, item) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((entry) => entry.item.question);

    answerTitle.textContent = "Dazu habe ich keine exakte Antwort gefunden.";
    answerText.textContent = suggestions.length
      ? `Versuche eine dieser Fragen: ${suggestions.join(" · ")}`
      : "Versuche eine kürzere Frage, zum Beispiel: Warum Porsche? Wie funktioniert der Warenkorb? Was macht der Newsletter?";
    answerCategory.textContent = "Kategorie: Vorschläge";
    answerConfidence.textContent = "Status: ähnliche Fragen vorgeschlagen";
    currentAnswer = `${answerTitle.textContent}\n\n${answerText.textContent}`;
  }

  function handleQuestion(query) {
    const cleanQuery = normalize(query);

    if (!cleanQuery) {
      answerTitle.textContent = "Bitte gib zuerst eine Frage ein.";
      answerText.textContent = "Du kannst eine eigene Frage schreiben oder unten eine vorbereitete Frage anklicken.";
      answerCategory.textContent = "Kategorie: Hinweis";
      answerConfidence.textContent = "Status: wartet auf Eingabe";
      currentAnswer = "";
      return;
    }

    const bestMatches = QA_DATA
      .map((item) => ({ item, score: scoreQuestion(cleanQuery, item) }))
      .sort((a, b) => b.score - a.score);

    if (bestMatches[0] && bestMatches[0].score >= 4) {
      const status = bestMatches[0].score >= 10 ? "Sehr passende Antwort" : "Ähnliche Antwort gefunden";
      showAnswer(bestMatches[0].item, status);
    } else {
      showFallback(cleanQuery);
    }
  }

  function renderQuestions() {
    const filtered = QA_DATA.filter((item) => activeCategory === "all" || item.category === activeCategory);

    questionGrid.innerHTML = filtered.map((item, index) => `
      <button type="button" class="qa-question-card" data-question="${escapeAttribute(item.question)}" data-index="${index}">
        <span>${escapeHTML(item.category)}</span>
        <strong>${escapeHTML(item.question)}</strong>
      </button>
    `).join("");
  }

  function escapeHTML(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHTML(value);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleQuestion(input.value);
  });

  questionGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".qa-question-card");
    if (!card) return;

    const question = card.dataset.question;
    const item = QA_DATA.find((entry) => entry.question === question);
    input.value = question;
    showAnswer(item, "Vorgefertigte Frage geöffnet");
    answerPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  if (categoryTabs) {
    categoryTabs.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-category]");
      if (!button) return;

      activeCategory = button.dataset.category;
      categoryTabs.querySelectorAll("button").forEach((tab) => tab.classList.remove("is-active"));
      button.classList.add("is-active");
      renderQuestions();
    });
  }

  if (randomButton) {
    randomButton.addEventListener("click", () => {
      const randomItem = QA_DATA[Math.floor(Math.random() * QA_DATA.length)];
      input.value = randomItem.question;
      showAnswer(randomItem, "Zufällige Frage");
    });
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      if (!currentAnswer) {
        handleQuestion(input.value);
        return;
      }

      try {
        await navigator.clipboard.writeText(currentAnswer);
        answerConfidence.textContent = "Status: Antwort kopiert";
      } catch (error) {
        answerConfidence.textContent = "Status: Kopieren im Browser blockiert";
      }
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      input.value = "";
      currentAnswer = "";
      answerTitle.textContent = "Wähle eine Frage aus oder stelle deine eigene.";
      answerText.textContent = "Sobald du eine Frage anklickst oder eingibst, erscheint hier eine passende, verständliche und professionell formulierte Antwort.";
      answerCategory.textContent = "Kategorie: Allgemein";
      answerConfidence.textContent = "Status: bereit";
      activeCategory = "all";
      if (categoryTabs) {
        categoryTabs.querySelectorAll("button").forEach((tab) => {
          tab.classList.toggle("is-active", tab.dataset.category === "all");
        });
      }
      renderQuestions();
    });
  }

  renderQuestions();
})();
