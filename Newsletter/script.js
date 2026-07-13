/* =============================================================
   CODE-KOMMENTARE: script.js
   Zweck: JavaScript-Datei für Interaktivität, Navigation, Suche, Übersetzung oder Shop-Logik.
   Die Kommentare erklären die Logik für Schule/Präsentation.
   Sie verändern die Funktion der Website nicht.
============================================================= */

const mobileMenuButton = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');


const form = document.getElementById('newsletterForm');
const formNote = document.getElementById('formNote');
const success = document.getElementById('newsletterSuccess');
const successName = document.getElementById('successName');
const successEmail = document.getElementById('successEmail');
const emailInput = document.getElementById('nlEmail');
const nameInput = document.getElementById('nlName');
const consentInput = document.getElementById('nlConsent');

const mailTo = document.getElementById('mailTo');
const mailSubject = document.getElementById('mailSubject');
const mailGreeting = document.getElementById('mailGreeting');
const mailName = document.getElementById('mailName');
const mailEmail = document.getElementById('mailEmail');
const mailDate = document.getElementById('mailDate');
const mailInterestSummary = document.getElementById('mailInterestSummary');
const mailInterests = document.getElementById('mailInterests');
const openMailLink = document.getElementById('openMailLink');
const copyMailButton = document.getElementById('copyMailButton');
const resetNewsletterForm = document.getElementById('resetNewsletterForm');

let preparedMailText = '';

const interestTexts = {
  geschichte: {
    title: 'Geschichte',
    text: 'spannende Rückblicke auf wichtige 911-Generationen und ihre Entwicklung'
  },
  modelle: {
    title: 'Modelle',
    text: 'übersichtliche Modellvergleiche mit Design-, Leistungs- und Ausstattungsdetails'
  },
  technik: {
    title: 'Technik',
    text: 'verständliche Technik-Erklärungen zu Motor, Fahrwerk, Aerodynamik und Assistenzsystemen'
  }
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getSelectedInterests() {
  return Array.from(document.querySelectorAll('input[name="interest"]:checked'))
    .map((input) => interestTexts[input.value])
    .filter(Boolean);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function createMailText(name, email, dateText, selectedInterests) {
  const interestSummary = selectedInterests.length
    ? selectedInterests.map((interest) => interest.title).join(', ')
    : 'Allgemeine Porsche-Experience Updates';

  const interestList = selectedInterests.length
    ? selectedInterests.map((interest) => `- ${interest.title}: ${interest.text}`).join('\n')
    : '- Allgemeine Updates: neue Inhalte, Projektänderungen und ausgewählte Highlights der Website';

  return `Hallo ${name},

vielen Dank für deine Anmeldung zum Newsletter von Porsche Experience.

Wir haben deine Anmeldung erfolgreich vorgemerkt. Ab sofort erhältst du ausgewählte Projekt-Updates rund um die Geschichte, Technik und Modelle des Porsche 911.

Deine Anmeldung im Überblick:
Name: ${name}
E-Mail: ${email}
Anmeldedatum: ${dateText}
Interessen: ${interestSummary}

Das erwartet dich im Newsletter:
${interestList}

Wir achten darauf, dir nur passende Inhalte zu senden: kurze Erklärungen, übersichtliche Modellvergleiche, verständliche Technik-Einblicke und Hinweise zu neuen Projektfunktionen.\n\nWarum du diese E-Mail bekommst:\nDu hast dich auf der Newsletter-Seite von Porsche Experience eingetragen und der Demo-Anmeldung zugestimmt.

Hinweis: Diese Website ist ein inoffizielles Schulprojekt und steht nicht in Verbindung mit der Porsche AG. Es werden keine echten Newsletter-Daten versendet oder verkauft.

Sportliche Grüße
Deine Porsche Experience Redaktion`;
}

function showProfessionalMail(name, email) {
  const selectedInterests = getSelectedInterests();
  const dateText = formatDate(new Date());
  const subject = 'Deine Newsletter-Anmeldung bei Porsche Experience';
  const interestSummary = selectedInterests.length
    ? selectedInterests.map((interest) => interest.title).join(', ')
    : 'Allgemeine Updates';

  preparedMailText = createMailText(name, email, dateText, selectedInterests);

  successName.textContent = name;
  successEmail.textContent = email;
  mailTo.textContent = email;
  mailSubject.textContent = subject;
  mailGreeting.textContent = `Hallo ${name},`;
  mailName.textContent = name;
  mailEmail.textContent = email;
  mailDate.textContent = dateText;
  mailInterestSummary.textContent = interestSummary;

  mailInterests.innerHTML = '';

  const entries = selectedInterests.length
    ? selectedInterests
    : [{
        title: 'Allgemeine Updates',
        text: 'neue Inhalte, Projektänderungen und ausgewählte Highlights der Website'
      }];

  entries.forEach((interest) => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${interest.title}:</strong> ${interest.text}`;
    mailInterests.appendChild(item);
  });

  openMailLink.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedMailText)}`;
  form.style.display = 'none';
  success.classList.add('is-visible');
}

function copyPreparedMail() {
  if (!preparedMailText) {
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(preparedMailText).then(() => {
      copyMailButton.textContent = 'E-Mail-Text kopiert';
    }).catch(() => fallbackCopy());
  } else {
    fallbackCopy();
  }
}

function fallbackCopy() {
  const helper = document.createElement('textarea');
  helper.value = preparedMailText;
  helper.setAttribute('readonly', '');
  helper.style.position = 'fixed';
  helper.style.left = '-9999px';
  document.body.appendChild(helper);
  helper.select();
  document.execCommand('copy');
  document.body.removeChild(helper);
  copyMailButton.textContent = 'E-Mail-Text kopiert';
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let message = '';
    let invalidControl = null;
    [nameInput, emailInput, consentInput].forEach((el) => {
      el.classList.remove('is-invalid');
      el.setAttribute('aria-invalid', 'false');
    });

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name) {
      invalidControl = nameInput;
      message = 'Bitte gib deinen Namen ein.';
    } else if (!isValidEmail(email)) {
      invalidControl = emailInput;
      message = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    } else if (!consentInput.checked) {
      invalidControl = consentInput;
      message = 'Bitte bestätige, dass du den Newsletter erhalten möchtest.';
    }

    if (message) {
      invalidControl.classList.add('is-invalid');
      invalidControl.setAttribute('aria-invalid', 'true');
      formNote.textContent = message;
      invalidControl.focus();
      return;
    }

    formNote.textContent = '';
    showProfessionalMail(name, email);
    success.focus({ preventScroll: true });
  });
}

if (copyMailButton) {
  copyMailButton.addEventListener('click', copyPreparedMail);
}

if (resetNewsletterForm) {
  resetNewsletterForm.addEventListener('click', () => {
    form.reset();
    form.style.display = 'flex';
    success.classList.remove('is-visible');
    preparedMailText = '';
    copyMailButton.textContent = 'E-Mail-Text kopieren';
    formNote.textContent = '';
    nameInput.focus();
  });
}

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

  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', 'siteSearchResults');
})();
