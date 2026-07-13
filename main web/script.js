/* =============================================================
   CODE-KOMMENTARE: script.js
   Zweck: JavaScript-Datei für Interaktivität, Navigation, Suche, Übersetzung oder Shop-Logik.
   Die Kommentare erklären die Logik für Schule/Präsentation.
   Sie verändern die Funktion der Website nicht.
============================================================= */

// Slider-Daten: Diese Inhalte werden im Karussell angezeigt.
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const nextButton = document.getElementById('nextSlide');
const prevButton = document.getElementById('prevSlide');
const playToggleButton = document.getElementById('carouselPlayToggle');
const mobileMenuButton = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let currentSlide = 0;
let autoTimer = null;
let isPaused = false;

// Stoppt Videos im Slider, damit beim Folienwechsel nichts im Hintergrund weiterläuft.
function stopVideos() {
  slides.forEach((slide) => {
    const video = slide.querySelector('video');
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  });
}

// Aktualisiert Punkte und ARIA-Zustaende fuer Maus, Tastatur und Screenreader.
function setActiveDot(index) {
  dots.forEach((dot, dotIndex) => {
    const active = dotIndex === index;
    dot.classList.toggle('is-active', active);
    dot.setAttribute('aria-pressed', String(active));
  });
}

function updatePlayToggle() {
  if (!playToggleButton) return;
  playToggleButton.textContent = isPaused ? '▶' : 'Ⅱ';
  playToggleButton.setAttribute('aria-pressed', String(isPaused));
  playToggleButton.setAttribute(
    'aria-label',
    isPaused ? 'Automatischen Wechsel fortsetzen' : 'Automatischen Wechsel pausieren'
  );
}

function scheduleNext(duration) {
  window.clearTimeout(autoTimer);
  if (isPaused || document.hidden || slides.length < 2) return;
  autoTimer = window.setTimeout(() => showSlide(currentSlide + 1), duration);
}

// Wechselt zum gewuenschten Slide und startet den automatischen Wechsel bei Bedarf neu.
function showSlide(index, { userInitiated = false } = {}) {
  window.clearTimeout(autoTimer);
  stopVideos();

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === index;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });

  setActiveDot(index);
  currentSlide = index;

  const activeSlide = slides[index];
  if (!activeSlide) return;

  const duration = Number(activeSlide.dataset.duration) || 5000;
  const video = activeSlide.querySelector('video');

  if (video && !isPaused) {
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener('canplay', tryPlay, { once: true });
  }

  // Ein manueller Wechsel bleibt automatisch, solange der Nutzer nicht pausiert hat.
  scheduleNext(duration);

  if (userInitiated) {
    activeSlide.focus?.({ preventScroll: true });
  }
}

nextButton?.addEventListener('click', () => showSlide(currentSlide + 1));
prevButton?.addEventListener('click', () => showSlide(currentSlide - 1));

dots.forEach((dot) => {
  dot.addEventListener('click', () => showSlide(Number(dot.dataset.index)));
});

playToggleButton?.addEventListener('click', () => {
  isPaused = !isPaused;
  updatePlayToggle();
  if (isPaused) {
    window.clearTimeout(autoTimer);
    stopVideos();
  } else {
    showSlide(currentSlide);
  }
});

const carousel = document.querySelector('.hero-carousel');
carousel?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    showSlide(currentSlide + 1);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showSlide(currentSlide - 1);
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    window.clearTimeout(autoTimer);
    stopVideos();
  } else if (!isPaused) {
    showSlide(currentSlide);
  }
});


updatePlayToggle();
showSlide(0);

/* ===== Website-Suche ===== */
(function () {
  const searchIndex = [
    { title: 'Technik – Engineering Lab', url: 'Technik.html#engineering-lab', desc: 'Interaktive Fahrsituationen zeigen das Zusammenspiel der 911-Systeme.', keywords: 'engineering lab fahrsituation antrieb fahrwerk aero bremsen systeme interaktiv' },
    { title: 'Home', url: 'index.html', desc: 'Startseite mit Medienkarussell und Projektüberblick.', keywords: 'home startseite willkommen porsche experience karussell übersicht' },
    { title: 'Geschichte', url: 'geschichte.html', desc: 'Ausgewählte Baureihen im Slider plus Übersicht der acht Hauptgenerationen.', keywords: 'geschichte historie generationen evolution timeline 930 964 991 992 993 996 997' },
    { title: 'Modelle', url: 'modelle.html', desc: 'Der Porsche 911 der Baureihe 992 im direkten Vergleich.', keywords: 'modelle 992 generationen vergleich sportwagen boxermotor scheinwerfer silhouette' },
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

  const clearBtn = document.getElementById('siteSearchClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      closeResults();
      input.focus();
    });
  }

  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', 'siteSearchResults');
})();

// Zeigt die Warenkorb-Anzahl im Header (gemeinsamer Speicher mit dem Shop).
(function initHeaderCartBadge() {
  const CART_KEY = 'porscheProjectCart';
  const badge = document.querySelector('[data-cart-count]');
  if (!badge) return;

  function readCount() {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (!raw) return 0;
      const cart = JSON.parse(raw) || {};
      return Object.values(cart).reduce((sum, quantity) => sum + (Number(quantity) || 0), 0);
    } catch (error) {
      return 0;
    }
  }

  function render() {
    const count = readCount();
    badge.textContent = String(count);
    badge.setAttribute('data-count', String(count));
  }

  render();
  window.addEventListener('storage', (event) => {
    if (event.key === CART_KEY) render();
  });
})();
