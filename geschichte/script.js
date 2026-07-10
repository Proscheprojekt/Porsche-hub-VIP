/* =============================================================
   CODE-KOMMENTARE: script.js
   Zweck: JavaScript-Datei für Interaktivität, Navigation, Suche, Übersetzung oder Shop-Logik.
   Die Kommentare erklären die Logik für Schule/Präsentation.
   Sie verändern die Funktion der Website nicht.
============================================================= */

// Slider-Daten: Diese Inhalte werden im Karussell angezeigt.
const slides = [
  {
    code: "930",
    model: "911 Turbo 930",
    period: "G-Serie / ca. 1975 bis 1989",
    image: "geschichte/assets/images/911-930.png",
    alt: "Porsche 911 Turbo 930",
    description: "Der 930 gehört zur G-Serie und steht für den klassischen Turbo-Auftritt: breite Kotflügel, markanter Heckspoiler und ein sehr analoges Fahrerlebnis."
  },
  {
    code: "964",
    model: "Porsche 911 964",
    period: "ca. 1988 bis 1994",
    image: "geschichte/assets/images/911-964.png",
    alt: "Porsche 911 Generation 964",
    description: "Der 964 modernisierte den 911 deutlich. Er brachte mehr Technik, ein moderneres Fahrverhalten und blieb gleichzeitig nah an der klassischen Silhouette."
  },
  {
    code: "993",
    model: "Porsche 911 993",
    period: "ca. 1993 bis 1998",
    image: "geschichte/assets/images/911-993.png",
    alt: "Porsche 911 Generation 993",
    description: "Der 993 gilt als letzte luftgekühlte 911-Generation. Deshalb hat er für viele Fans einen besonders klassischen und emotionalen Stellenwert."
  },
  {
    code: "996",
    model: "Porsche 911 996",
    period: "ca. 1997 bis 2005",
    image: "geschichte/assets/images/911-996.png",
    alt: "Porsche 911 Generation 996",
    description: "Der 996 markierte den größten technischen Umbruch: neues Design, neuer Aufbau und der Wechsel von Luft- zu Wasserkühlung."
  },
  {
    code: "997",
    model: "Porsche 911 997",
    period: "ca. 2004 bis 2012",
    image: "geschichte/assets/images/911-997.png",
    alt: "Porsche 911 Generation 997",
    description: "Der 997 griff wieder stärker klassische 911-Merkmale auf und kombinierte sie mit moderner Performance und breiter Modellvielfalt."
  },
  {
    code: "991",
    model: "Porsche 911 991",
    period: "ca. 2011 bis 2019",
    image: "geschichte/assets/images/911-991.png",
    alt: "Porsche 911 Generation 991",
    description: "Der 991 wurde größer, moderner und technisch komplexer. Radstand, Fahrwerk und Aerodynamik wurden deutlich weiterentwickelt."
  },
  {
    code: "992",
    model: "Porsche 911 992",
    period: "seit ca. 2018",
    image: "geschichte/assets/images/911-992.png",
    alt: "Porsche 911 Generation 992",
    description: "Der 992 steht für die aktuelle 911-Linie: breiter Auftritt, moderne Lichtsignatur, digitale Bedienung und hohe Alltagstauglichkeit."
  }
];

// DOM-Auswahl: verbindet JavaScript mit einem Element aus der HTML-Datei.
const carImage = document.getElementById("carImage");
// DOM-Auswahl: holt wichtige HTML-Elemente, damit JavaScript sie steuern kann.
const carFrame = document.querySelector(".car-frame");
const yearText = document.getElementById("yearText");
const modelText = document.getElementById("modelText");
const periodText = document.getElementById("periodText");
const descriptionText = document.getElementById("descriptionText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressTrack = document.getElementById("progressTrack");
const timelineTabs = document.getElementById("timelineTabs");
const mobileMenuButton = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

let activeIndex = 0;
let timer = null;
const slideDuration = 3000;

// Funktion: buildTabs bündelt einen Teil der Seitenlogik.
function buildTabs() {
  timelineTabs.innerHTML = "";

  slides.forEach((slide, index) => {
    const button = document.createElement("button");
    button.className = "timeline-tab";
    button.type = "button";
    button.innerHTML = `
      <img src="${slide.image}" alt="${slide.alt}">
      <strong>${slide.code}</strong>
      <span>${slide.period}</span>
    `;

    button.addEventListener("click", () => {
      showSlide(index);
      restartAutoplay();
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    });

    timelineTabs.appendChild(button);
  });
}

// Funktion: updateTabs bündelt einen Teil der Seitenlogik.
function updateTabs() {
  [...document.querySelectorAll(".timeline-tab")].forEach((tab, index) => {
    tab.classList.toggle("is-active", index === activeIndex);
  });
}

// Funktion: buildProgress erstellt für jedes Bild ein eigenes,
// klickbares Segment in der Positionsanzeige unter dem Slider.
function buildProgress() {
  progressTrack.innerHTML = "";
  progressTrack.setAttribute("aria-valuemax", String(slides.length));

  slides.forEach((slide, index) => {
    const seg = document.createElement("button");
    seg.type = "button";
    seg.className = "progress-seg";
    seg.setAttribute("aria-label", `Zu ${slide.model} springen`);

    seg.addEventListener("click", (event) => {
      event.stopPropagation();
      showSlide(index);
      restartAutoplay();
    });

    progressTrack.appendChild(seg);
  });
}

// Funktion: updateProgress markiert das Segment der aktuell sichtbaren
// Position golden ("Barline"), damit sofort erkennbar ist, wo im Slider
// man sich gerade befindet.
function updateProgress() {
  const segs = [...progressTrack.querySelectorAll(".progress-seg")];
  segs.forEach((seg, index) => {
    seg.classList.toggle("is-active", index === activeIndex);
    seg.classList.toggle("is-passed", index < activeIndex);
  });
  progressTrack.setAttribute("aria-valuenow", String(activeIndex + 1));
  progressTrack.setAttribute("aria-valuetext", slides[activeIndex].model);
}

// Wechselt zum gewünschten Slide und startet den automatischen Wechsel neu.
function showSlide(index) {
  activeIndex = (index + slides.length) % slides.length;
  const slide = slides[activeIndex];

  yearText.textContent = slide.code;
  modelText.textContent = slide.model;
  periodText.textContent = slide.period;
  descriptionText.textContent = slide.description;

  carFrame.classList.remove("is-entering");
  carImage.src = slide.image;
  carImage.alt = slide.alt;
  void carFrame.offsetWidth;
  carFrame.classList.add("is-entering");

  updateTabs();
  updateProgress();
}

// Funktion: nextSlide bündelt einen Teil der Seitenlogik.
function nextSlide() {
  showSlide(activeIndex + 1);
}

// Funktion: prevSlide bündelt einen Teil der Seitenlogik.
function prevSlide() {
  showSlide(activeIndex - 1);
}

// Funktion: restartAutoplay bündelt einen Teil der Seitenlogik.
function restartAutoplay() {
  clearInterval(timer);
  timer = setInterval(nextSlide, slideDuration);
}

// Klick-Event: reagiert auf eine Nutzeraktion.
nextBtn.addEventListener("click", () => {
  nextSlide();
  restartAutoplay();
});

// Klick-Event: reagiert auf eine Nutzeraktion.
prevBtn.addEventListener("click", () => {
  prevSlide();
  restartAutoplay();
});

// Tastatursteuerung: Pfeiltasten funktionieren auch, wenn die
// Positionsanzeige selbst fokussiert ist (z. B. per Tab erreicht).
progressTrack.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    event.preventDefault();
    nextSlide();
    restartAutoplay();
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    event.preventDefault();
    prevSlide();
    restartAutoplay();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
    restartAutoplay();
  }

  if (event.key === "ArrowLeft") {
    prevSlide();
    restartAutoplay();
  }
});
if (mobileMenuButton && mainNav) {
  mobileMenuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
    mobileMenuButton.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  });
}

buildTabs();
buildProgress();
showSlide(0);
restartAutoplay();

/* ===== Website-Suche ===== */
/* Abgeschlossener Bereich: schützt Variablen vor dem globalen Scope. */
(function () {
  const searchIndex = [
    { title: 'Home', url: 'index.html', desc: 'Startseite mit Karussell durch alle 911-Generationen.', keywords: 'home startseite willkommen porsche experience karussell übersicht' },
    { title: 'Geschichte', url: 'geschichte.html', desc: 'Historische Entwicklung des Porsche 911 von den Anfängen bis zur aktuellen 992-Linie.', keywords: 'geschichte historie generationen evolution timeline original g-serie 930 964 993 996 997 991 992' },
    { title: 'Modelle', url: 'modelle.html', desc: '911 Varianten wie Carrera, Cabriolet, Targa, Turbo, GT3 und GT3 RS verständlich erklärt.', keywords: 'modelle varianten carrera cabriolet targa turbo gt3 gt3 rs gts 992 sportwagen' },
    { title: 'Modelle – Variantenvergleich', url: 'modelle.html#modell-vergleich', desc: 'Vergleich von Carrera, Cabriolet, GTS, Targa, Turbo und GT-Modellen.', keywords: 'vergleich modelle varianten carrera targa turbo gt3 gts unterschiede' },
    { title: 'Geschichte – Generationenüberblick', url: 'geschichte.html#generationen-ueberblick', desc: 'Die acht Hauptgenerationen des Porsche 911 von 1963 bis heute.', keywords: 'generationen ueberblick original g-serie 964 993 996 997 991 992' },
    { title: 'Technik', url: 'Technik.html', desc: 'Motor, Fahrwerk, Aerodynamik und Assistenzsysteme des 911.', keywords: 'technik motor boxermotor sechszylinder turbo pdk getriebe fahrwerk bremsen pasm pccb aerodynamik heckspoiler assistenzsysteme cockpit sport chrono' },
    { title: 'Shop', url: 'shop.html', desc: 'Produktübersicht mit Projektartikeln und Preisen.', keywords: 'shop produkte artikel poster karten digital kaufen' },
    { title: 'Warenkorb', url: 'warenkorb.html', desc: 'Ausgewählte Artikel mit Menge, Einzelpreis und Gesamtpreis.', keywords: 'warenkorb preis summe menge checkout bestellung' },
    { title: 'Checkout', url: 'checkout.html', desc: 'Demo-Checkout für eine fiktive Bestellung.', keywords: 'checkout formular bestellen adresse zahlung demo' },
    { title: 'Fragen und Antworten', url: 'qa.html', desc: 'Antworten zur Website und zum Shop.', keywords: 'faq fragen antworten hilfe qa' },
    { title: 'Rechtliches', url: 'rechtliches.html', desc: 'Hinweise zum inoffiziellen Schulprojekt.', keywords: 'rechtliches disclaimer marke logo schulprojekt' },
    { title: 'Newsletter', url: 'Newsletter.html', desc: 'Newsletter abonnieren und keine Neuigkeiten mehr verpassen.', keywords: 'newsletter anmelden abonnieren abo email neuigkeiten updates' },
    { title: 'Projekt', url: 'Projekt.html', desc: 'Über das Schulprojekt Porsche Experience.', keywords: 'projekt über schulprojekt sitemap technischer rahmen html css js aufbau' },
    { title: 'Newsletter – Anmeldung', url: 'Newsletter.html#newsletter-signup', desc: 'Direkt zum Anmeldeformular für den Newsletter.', keywords: 'anmelden formular abo signup newsletter eintragen' },
    { title: 'Technik – Motor & Fahrwerk', url: 'Technik.html#technik-bereiche', desc: 'Boxermotor, Getriebe, Fahrwerk und Bremsen im Detail.', keywords: 'motor boxermotor fahrwerk bremsen pasm hinterachslenkung' },
    { title: 'Technik – Technische Daten', url: 'Technik.html#technische-daten', desc: 'Alle technischen Daten des 911 992 auf einen Blick.', keywords: 'technische daten specs leistung werte' },
    { title: 'Projekt – Sitemap', url: 'Projekt.html#projekt-sitemap', desc: 'Übersicht aller Unterseiten dieser Website.', keywords: 'sitemap seiten übersicht unterseiten navigation' },
  ];

  const form = document.getElementById('siteSearchForm');
  const input = document.getElementById('siteSearchInput');
  const results = document.getElementById('siteSearchResults');
  if (!form || !input || !results) return;

  let activeIndex = -1;
  let currentMatches = [];

  function normalize(str) {
    return str
      .toLowerCase()
      .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');
  }

  function search(query) {
    const q = normalize(query.trim());
    if (!q) return [];
    return searchIndex
      .map((entry) => {
        const haystack = normalize(entry.title + ' ' + entry.desc + ' ' + entry.keywords);
        let score = 0;
        if (normalize(entry.title).includes(q)) score += 3;
        if (haystack.includes(q)) score += 1;
        q.split(/\s+/).forEach((word) => {
          if (word.length > 1 && haystack.includes(word)) score += 1;
        });
        return { entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((r) => r.entry);
  }

  function closeResults() {
    results.classList.remove('is-open');
    results.innerHTML = '';
    activeIndex = -1;
    currentMatches = [];
    input.setAttribute('aria-expanded', 'false');
  }

  function renderResults(matches, query) {
    currentMatches = matches;
    activeIndex = -1;
    results.innerHTML = '';

    if (!matches.length) {
      const empty = document.createElement('div');
      empty.className = 'search-result-empty';
      empty.textContent = `Keine Treffer für „${query}“.`;
      results.appendChild(empty);
      results.classList.add('is-open');
      input.setAttribute('aria-expanded', 'true');
      return;
    }

    matches.forEach((entry, i) => {
      const item = document.createElement('a');
      item.className = 'search-result-item';
      item.href = entry.url;
      item.setAttribute('role', 'option');
      item.id = `searchResult-${i}`;
      item.innerHTML = `<span class="search-result-title">${entry.title}</span><span class="search-result-desc">${entry.desc}</span>`;
      results.appendChild(item);
    });

    results.classList.add('is-open');
    input.setAttribute('aria-expanded', 'true');
  }

  function updateActive() {
    const items = results.querySelectorAll('.search-result-item');
    items.forEach((item, i) => {
      item.classList.toggle('is-active', i === activeIndex);
    });
    if (activeIndex >= 0 && items[activeIndex]) {
      input.setAttribute('aria-activedescendant', items[activeIndex].id);
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  }

  input.addEventListener('input', () => {
    const matches = search(input.value);
    renderResults(matches, input.value.trim());
  });

  input.addEventListener('keydown', (event) => {
    const items = results.querySelectorAll('.search-result-item');
    if (event.key === 'ArrowDown') {
      if (!items.length) return;
      event.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActive();
    } else if (event.key === 'ArrowUp') {
      if (!items.length) return;
      event.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActive();
    } else if (event.key === 'Escape') {
      closeResults();
      input.blur();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeIndex >= 0 && currentMatches[activeIndex]) {
        window.location.href = currentMatches[activeIndex].url;
      } else if (currentMatches.length) {
        window.location.href = currentMatches[0].url;
      }
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (currentMatches.length) {
      window.location.href = currentMatches[0].url;
    }
  });

  results.addEventListener('mousedown', (event) => {
    const item = event.target.closest('.search-result-item');
    if (item) {
      event.preventDefault();
      window.location.href = item.getAttribute('href');
    }
  });

  document.addEventListener('click', (event) => {
    if (!form.contains(event.target) && !results.contains(event.target)) {
      closeResults();
    }
  });

  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', 'siteSearchResults');
})();
