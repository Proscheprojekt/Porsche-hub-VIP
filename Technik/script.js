/* =============================================================
   CODE-KOMMENTARE: script.js
   Zweck: JavaScript-Datei für Interaktivität, Navigation, Suche, Übersetzung oder Shop-Logik.
   Die Kommentare erklären die Logik für Schule/Präsentation.
   Sie verändern die Funktion der Website nicht.
============================================================= */

const techTabs = document.querySelectorAll('.tech-tab');
const techPanels = document.querySelectorAll('.tech-panel');
const mobileMenuButton = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const techTopicImage = document.getElementById('techTopicImage');
const techTopics = {
  motor: { image: 'assets/content/tech-motor.webp', alt: 'Technische Illustration zum Boxermotor und Antrieb des Porsche 911' },
  fahrwerk: { image: 'assets/content/tech-chassis.webp', alt: 'Porsche 911 Infografik zu PASM, Hinterachslenkung und Hochleistungsbremsen' },
  aero: { image: 'assets/content/tech-aero.webp', alt: 'Aerodynamische Luftführung am breiten Heck eines Porsche 911' },
  interieur: { image: 'assets/content/tech-interior.webp', alt: 'Porsche 911 Infografik zu Interieur, Sport Chrono, Fahrassistenzsystemen und digitalem Cockpit' }
};

function activateTechTab(tab, moveFocus = false) {
  const target = tab.dataset.panel;
  const topic = techTopics[target];
  if (techTopicImage && topic) {
    techTopicImage.src = topic.image;
    techTopicImage.alt = topic.alt;
  }

  techTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });

  techPanels.forEach((panel) => {
    const active = panel.dataset.panel === target;
    panel.classList.toggle('is-active', active);
    panel.hidden = !active;
  });

  if (moveFocus) tab.focus();
}

techTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTechTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % techTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + techTabs.length) % techTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = techTabs.length - 1;
    activateTechTab(techTabs[nextIndex], true);
  });
});

if (techTabs.length) {
  activateTechTab(techTabs[0]);
}


/* ===== Website-Suche ===== */
(function () {
  const searchIndex = [
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

  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', 'siteSearchResults');
})();


/* ===== Engineering Lab Release 3.1 ===== */
(() => {
  "use strict";
  const lab = document.querySelector("[data-engineering-lab]");
  if (!lab) return;

  const modes = {
    alltag: {
      kicker: "Ausgewogene Abstimmung",
      title: "Entspannt und direkt im Alltag",
      description: "Im normalen Straßenbetrieb arbeiten die Systeme zurückhaltend. Der Antrieb reagiert weich, das Fahrwerk filtert Unebenheiten und die Aerodynamik priorisiert Effizienz.",
      goal: "Komfort, Effizienz und klare Rückmeldung",
      core: "ROAD",
      systems: [
        ["harmonisch", 42, "Sanfte Gasannahme und frühe, komfortorientierte Gangwechsel."],
        ["komfortabel", 38, "Adaptive Dämpfung hält die Karosserie ruhig und lässt Restkomfort zu."],
        ["effizient", 30, "Luftführung und Kühlung arbeiten bedarfsgerecht mit geringerem Widerstand."],
        ["vorausschauend", 36, "Regelsysteme bleiben im Hintergrund und greifen erst bei Bedarf ein."]
      ]
    },
    nass: {
      kicker: "Traktion vor Maximalleistung",
      title: "Stabilität auf nasser Fahrbahn",
      description: "Bei geringerem Grip werden Leistung, Momentenaufbau und Fahrwerksreaktionen kontrollierter. Stabilitätssysteme überwachen Abweichungen früher und unterstützen einen ruhigen Fahrzeugzustand.",
      goal: "Berechenbarer Grip und sanfte Lastwechsel",
      core: "WET",
      systems: [
        ["dosiert", 55, "Der Momentenaufbau wird gleichmäßiger, damit die Reifen nicht abrupt überfordert werden."],
        ["stabil", 58, "Dämpfung und optionale Allradsysteme unterstützen Traktion und Spurtreue."],
        ["neutral", 35, "Aerodynamik bleibt effizient, während Kühlung und Sichtbedingungen Priorität behalten."],
        ["wachsam", 74, "Stabilitäts- und Bremsregelsysteme erkennen Schlupf und Abweichungen früher."]
      ]
    },
    kurve: {
      kicker: "Präzision im Übergang",
      title: "Schnelle Reaktion in der dynamischen Kurve",
      description: "Lenkwinkel, Querbeschleunigung, Lastwechsel und Fahrzeugbewegung werden als zusammenhängender Zustand betrachtet. Ziel ist ein präziser Aufbau von Seitenführung ohne nervöse Reaktionen.",
      goal: "Agilität, Balance und belastbare Rückmeldung",
      core: "SPORT",
      systems: [
        ["direkt", 76, "Antrieb und Getriebe halten passende Drehzahl und reagieren schneller auf Lastanforderungen."],
        ["präzise", 84, "Dämpfung und Hinterachslenkung unterstützen Einlenken, Stabilität und Kurvenausgang."],
        ["stützend", 62, "Aerodynamische Balance und Luftführung stabilisieren das Fahrzeug bei höherem Tempo."],
        ["kontrolliert", 72, "Bremsdruck und Stabilitätssysteme bleiben dosierbar und vermeiden unnötige Eingriffe."]
      ]
    },
    track: {
      kicker: "Maximale Systemperformance",
      title: "Konsequente Abstimmung für die Rennstrecke",
      description: "Auf der Rundstrecke priorisiert das Gesamtsystem spontane Leistung, Karosseriekontrolle, Kühlung und wiederholbare Verzögerung. Die einzelnen Komponenten arbeiten näher an ihrer Leistungsgrenze.",
      goal: "Konstanz, Präzision und thermische Stabilität",
      core: "TRACK",
      systems: [
        ["maximal", 94, "Schnelle Gangwechsel, hohe Lastbereitschaft und unmittelbare Leistungsanforderung."],
        ["straff", 92, "Karosseriebewegungen werden reduziert, damit Reifen und Lenkung präzise arbeiten."],
        ["aktiv", 88, "Kühlung und Anpressdruck erhalten Vorrang vor minimalem Luftwiderstand."],
        ["standfest", 96, "Bremsen und Regelsysteme sind auf wiederholbare Verzögerung und hohe Temperaturen ausgelegt."]
      ]
    }
  };

  const englishModes = {
    alltag: { kicker: "Balanced setup", title: "Relaxed and direct in everyday driving", description: "In normal road use, the systems operate discreetly. The drivetrain responds smoothly, the chassis filters bumps and aerodynamics prioritize efficiency.", goal: "Comfort, efficiency and clear feedback", core: "ROAD", systems: [["harmonious",42,"Smooth throttle response and early, comfort-oriented gear changes."],["comfortable",38,"Adaptive damping keeps the body calm while preserving comfort."],["efficient",30,"Airflow and cooling work on demand with lower drag."],["anticipatory",36,"Control systems remain in the background and intervene only when needed."]] },
    nass: { kicker: "Traction before maximum power", title: "Stability on wet roads", description: "With less grip, power delivery, torque build-up and chassis reactions become more controlled. Stability systems monitor deviations earlier and support a calm vehicle state.", goal: "Predictable grip and smooth load changes", core: "WET", systems: [["measured",55,"Torque builds more evenly so the tyres are not overloaded abruptly."],["stable",58,"Damping and optional all-wheel-drive systems support traction and directional stability."],["neutral",35,"Aerodynamics remain efficient while cooling and visibility conditions take priority."],["alert",74,"Stability and brake control systems detect slip and deviations earlier."]] },
    kurve: { kicker: "Precision in transition", title: "Fast response in a dynamic corner", description: "Steering angle, lateral acceleration, load transfer and vehicle movement are treated as one connected state. The goal is precise lateral force build-up without nervous reactions.", goal: "Agility, balance and dependable feedback", core: "SPORT", systems: [["direct",76,"Drivetrain and transmission hold a suitable engine speed and react more quickly to load requests."],["precise",84,"Damping and rear-axle steering support turn-in, stability and corner exit."],["supportive",62,"Aerodynamic balance and airflow stabilize the vehicle at higher speeds."],["controlled",72,"Brake pressure and stability systems remain progressive and avoid unnecessary intervention."]] },
    track: { kicker: "Maximum system performance", title: "Consistent setup for the track", description: "On track, the complete system prioritizes immediate performance, body control, cooling and repeatable braking. The individual components operate closer to their performance limits.", goal: "Consistency, precision and thermal stability", core: "TRACK", systems: [["maximum",94,"Fast shifts, high load readiness and immediate power demand."],["firm",92,"Body movements are reduced so tyres and steering can work precisely."],["active",88,"Cooling and downforce take priority over minimum drag."],["resilient",96,"Brakes and control systems are designed for repeatable deceleration and high temperatures."]] }
  };

  let currentMode = "alltag";

  const buttons = [...lab.querySelectorAll(".lab-mode")];
  const fields = {
    kicker: document.getElementById("labKicker"), title: document.getElementById("labTitle"),
    description: document.getElementById("labDescription"), goal: document.getElementById("labGoal"),
    core: document.getElementById("labCoreMode")
  };
  const systemFields = [
    ["labDriveLabel","labDriveMeter","labDriveText"],
    ["labChassisLabel","labChassisMeter","labChassisText"],
    ["labAeroLabel","labAeroMeter","labAeroText"],
    ["labBrakeLabel","labBrakeMeter","labBrakeText"]
  ].map(ids => ids.map(id => document.getElementById(id)));

  function activate(modeName, focus = false) {
    currentMode = modeName;
    const language = document.documentElement.lang === "en" ? "en" : "de";
    const mode = language === "en" ? englishModes[modeName] : modes[modeName];
    if (!mode) return;
    buttons.forEach(button => {
      const active = button.dataset.mode === modeName;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focus) button.focus();
    });
    Object.keys(fields).forEach(key => { if (fields[key]) fields[key].textContent = mode[key]; });
    mode.systems.forEach((values, index) => {
      const [label, meter, text] = systemFields[index];
      if (label) label.textContent = values[0];
      if (meter) meter.style.width = `${values[1]}%`;
      if (text) text.textContent = values[2];
    });
  }

  const languageObserver = new MutationObserver(() => activate(currentMode));
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => activate(button.dataset.mode));
    button.addEventListener("keydown", event => {
      if (!["ArrowLeft","ArrowRight","Home","End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
      if (event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = buttons.length - 1;
      activate(buttons[next].dataset.mode, true);
    });
  });
})();
