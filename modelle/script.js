/* =============================================================
   CODE-KOMMENTARE: script.js
   Zweck: JavaScript-Datei für Interaktivität, Navigation, Suche, Übersetzung oder Shop-Logik.
   Die Kommentare erklären die Logik für Schule/Präsentation.
   Sie verändern die Funktion der Website nicht.
============================================================= */

// Slider-Daten: Diese Inhalte werden im Karussell angezeigt.
const slides = [
  {
    code: "992",
    model: "911 Carrera Coupé",
    period: "Sportlicher Einstieg",
    image: "modelle/image/carrera-coupe.webp",
    alt: "Porsche 911 Carrera Coupé",
    description: "Der Carrera ist die klassische 911-Basis: sportlich, präzise und trotzdem alltagstauglich. Er erklärt die Grundidee des 911 am klarsten."
  },
  {
    code: "992",
    model: "911 Carrera Cabriolet",
    period: "Offenes Fahrerlebnis",
    image: "modelle/image/carrera-cabriolet.webp",
    alt: "Porsche 911 Carrera Cabriolet",
    description: "Das Cabriolet verbindet die 911-Form mit offenem Fahren. Es wirkt emotionaler, bleibt aber weiterhin ein vollwertiger Sportwagen."
  },
  {
    code: "GTS",
    model: "911 Carrera GTS",
    period: "Mehr Performance",
    image: "modelle/image/carrera-gts.webp",
    alt: "Porsche 911 Carrera GTS",
    description: "Der GTS steht zwischen Carrera und den extremen Topmodellen. Er ist sportlicher abgestimmt und richtet sich an Fahrer, die mehr Dynamik wollen."
  },
  {
    code: "Targa",
    model: "911 Targa",
    period: "Eigenständiges Dachkonzept",
    image: "modelle/image/targa.webp",
    alt: "Porsche 911 Targa",
    description: "Der Targa ist weder klassisches Coupé noch normales Cabriolet. Sein Targa-Bügel und das Glasheck machen ihn besonders wiedererkennbar."
  },
  {
    code: "Turbo",
    model: "911 Turbo",
    period: "Leistung und Komfort",
    image: "modelle/image/turbo.webp",
    alt: "Porsche 911 Turbo",
    description: "Der Turbo verbindet sehr hohe Leistung mit Komfort und Alltagstauglichkeit. Typisch sind ein besonders kräftiger Auftritt und souveräne Beschleunigung."
  },
  {
    code: "Turbo",
    model: "911 Turbo Cabriolet",
    period: "Offen und sehr leistungsstark",
    image: "modelle/image/turbo-cabriolet.webp",
    alt: "Porsche 911 Turbo Cabriolet",
    description: "Das Turbo Cabriolet kombiniert die Kraft des Turbo mit offenem Fahren. Es ist stärker auf Luxus, Sound und Erlebnis ausgelegt."
  },
  {
    code: "GT3",
    model: "911 GT3",
    period: "Motorsportnähe",
    image: "modelle/image/gt3.webp",
    alt: "Porsche 911 GT3",
    description: "Der GT3 ist deutlich näher am Motorsport. Er steht für Präzision, direkte Rückmeldung und ein besonders fahraktives Konzept."
  },
  {
    code: "GT3 RS",
    model: "911 GT3 RS",
    period: "Rennstreckenfokus",
    image: "modelle/image/gt3-rs.webp",
    alt: "Porsche 911 GT3 RS",
    description: "Der GT3 RS ist die kompromissloseste Variante in dieser Übersicht. Aerodynamik, Leichtbau und Rennstrecken-Performance stehen im Vordergrund."
  }
];

const carImage = document.getElementById("carImage");
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

function nextSlide() {
  showSlide(activeIndex + 1);
}

function prevSlide() {
  showSlide(activeIndex - 1);
}

function restartAutoplay() {
  clearInterval(timer);
  timer = setInterval(nextSlide, slideDuration);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  restartAutoplay();
});

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

buildTabs();
buildProgress();
showSlide(0);
restartAutoplay();

/* ===== Website-Suche ===== */
(function () {
  const searchIndex = [
    { title: 'Technik – Engineering Lab', url: 'Technik.html#engineering-lab', desc: 'Interaktive Fahrsituationen zeigen das Zusammenspiel der 911-Systeme.', keywords: 'engineering lab fahrsituation antrieb fahrwerk aero bremsen systeme interaktiv' },
    { title: 'Home', url: 'index.html', desc: 'Startseite mit Medienkarussell und Projektüberblick.', keywords: 'home startseite willkommen porsche experience karussell übersicht' },
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


/* 911 Match: qualitativer Vergleich mit synchron aktualisierten Bildern und Daten. */
(function setupModelComparison() {
  const selectA = document.getElementById('compareModelA');
  const selectB = document.getElementById('compareModelB');
  const output = document.getElementById('comparisonResults');
  if (!selectA || !selectB || !output) return;

  const profiles = [
    { name:'911 Carrera Coupé', family:'Carrera', roof:'Coupé', focus:'Ausgewogener Allrounder', everyday:5, emotion:4, track:3, comfort:4, image:'modelle/image/carrera-coupe.webp', alt:'Porsche 911 Carrera Coupé in seitlicher Ansicht' },
    { name:'911 Carrera Cabriolet', family:'Carrera', roof:'Cabriolet', focus:'Offenes Fahrerlebnis', everyday:4, emotion:5, track:2, comfort:4, image:'modelle/image/carrera-cabriolet.webp', alt:'Porsche 911 Carrera Cabriolet in schräger Frontansicht' },
    { name:'911 Carrera GTS', family:'GTS', roof:'Coupé', focus:'Sportliche Mitte', everyday:4, emotion:4, track:4, comfort:3, image:'modelle/image/carrera-gts.webp', alt:'Porsche 911 Carrera GTS in Frontansicht' },
    { name:'911 Targa', family:'Targa', roof:'Targa-Dach', focus:'Design und Offenheit', everyday:4, emotion:5, track:2, comfort:4, image:'modelle/image/targa.webp', alt:'Porsche 911 Targa in schräger Seitenansicht' },
    { name:'911 Turbo', family:'Turbo', roof:'Coupé', focus:'Leistung und Souveränität', everyday:4, emotion:5, track:4, comfort:5, image:'modelle/image/turbo.webp', alt:'Porsche 911 Turbo in Seitenansicht' },
    { name:'911 Turbo Cabriolet', family:'Turbo', roof:'Cabriolet', focus:'Offene Hochleistung', everyday:3, emotion:5, track:3, comfort:5, image:'modelle/image/turbo-cabriolet.webp', alt:'Porsche 911 Turbo Cabriolet in Heck-Seitenansicht' },
    { name:'911 GT3', family:'GT', roof:'Coupé', focus:'Direkte Motorsportnähe', everyday:2, emotion:5, track:5, comfort:2, image:'modelle/image/gt3.webp', alt:'Porsche 911 GT3 in breiter Heckansicht' },
    { name:'911 GT3 RS', family:'GT', roof:'Coupé', focus:'Konsequenter Rennstreckenfokus', everyday:1, emotion:5, track:5, comfort:1, image:'modelle/image/gt3-rs.webp', alt:'Porsche 911 GT3 RS in dynamischer Seitenansicht' }
  ];

  profiles.forEach((profile, index) => {
    [selectA, selectB].forEach((select) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = profile.name;
      select.appendChild(option);
    });
  });
  selectA.value = '0';
  selectB.value = '7';

  function scoreMarkup(label, value) {
    return `<div class="score-row"><span>${label}</span><div class="score-track"><i style="width:${value * 20}%"></i></div><b>${value}/5</b></div>`;
  }

  function updateCard(suffix, profile) {
    const image = document.getElementById(`compareImage${suffix}`);
    const family = document.getElementById(`compareFamily${suffix}`);
    const name = document.getElementById(`compareName${suffix}`);
    const roof = document.getElementById(`compareRoof${suffix}`);
    const focus = document.getElementById(`compareFocus${suffix}`);
    const scores = document.getElementById(`compareScores${suffix}`);
    if (!image || !family || !name || !roof || !focus || !scores) return;

    image.src = profile.image;
    image.alt = profile.alt;
    family.textContent = profile.family;
    name.textContent = profile.name;
    roof.textContent = profile.roof;
    focus.textContent = profile.focus;
    scores.innerHTML = scoreMarkup('Alltag', profile.everyday)
      + scoreMarkup('Emotion', profile.emotion)
      + scoreMarkup('Track', profile.track)
      + scoreMarkup('Komfort', profile.comfort);
  }

  function render() {
    const profileA = profiles[Number(selectA.value)] || profiles[0];
    const profileB = profiles[Number(selectB.value)] || profiles[1];
    updateCard('A', profileA);
    updateCard('B', profileB);
  }

  selectA.addEventListener('change', render);
  selectB.addEventListener('change', render);
  render();
})();


/* ===== Gemeinsame Lightbox fuer die drei Modell-Bildkarten ===== */
(function initModelInfoImageLightbox() {
  const triggers = Array.from(document.querySelectorAll('[data-model-info-zoom]'));
  if (!triggers.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'model-info-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="model-info-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Vergrößerte Modell-Bildansicht">
      <button class="model-info-lightbox__close" type="button" aria-label="Vergrößerte Ansicht schließen">×</button>
      <img class="model-info-lightbox__image" alt="">
    </div>`;
  document.body.appendChild(lightbox);

  const dialog = lightbox.querySelector('.model-info-lightbox__dialog');
  const closeButton = lightbox.querySelector('.model-info-lightbox__close');
  const image = lightbox.querySelector('.model-info-lightbox__image');
  let previousFocus = null;

  function openLightbox(trigger) {
    const sourceImage = trigger.querySelector('img');
    if (!sourceImage) return;

    previousFocus = document.activeElement;
    image.src = sourceImage.currentSrc || sourceImage.src;
    image.alt = sourceImage.alt;
    dialog.setAttribute('aria-label', `${sourceImage.alt} – vergrößerte Ansicht`);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('model-info-lightbox-open');
    window.setTimeout(() => closeButton.focus({ preventScroll: true }), 40);
  }

  function closeLightbox() {
    if (!lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('model-info-lightbox-open');
    window.setTimeout(() => image.removeAttribute('src'), 220);
    previousFocus?.focus?.({ preventScroll: true });
    previousFocus = null;
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openLightbox(trigger));
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  dialog.addEventListener('click', (event) => event.stopPropagation());

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      closeButton.focus();
    }
  });
})();
