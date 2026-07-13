/* =============================================================
   CODE-KOMMENTARE: script.js
   Zweck: JavaScript-Datei für Interaktivität, Navigation, Suche, Übersetzung oder Shop-Logik.
   Die Kommentare erklären die Logik für Schule/Präsentation.
   Sie verändern die Funktion der Website nicht.
============================================================= */

// Produktdaten: Diese Liste erzeugt die Shop-Produkte dynamisch.
const PRODUCTS = [
  {
    id: 'poster-evolution',
    name: '911 Evolution Poster',
    category: 'poster',
    price: 14.99,
    image: 'main web/images/1.webp',
    tag: 'Poster',
    description: 'Hochwertig gestaltetes Demo-Poster mit 911-Motiv für Präsentation, Projektwand oder Mappe.',
    stock: 'Sofort verfügbar'
  },
  {
    id: 'karte-992',
    name: 'Modellkarte 992',
    category: 'karten',
    price: 6.99,
    image: 'modelle/image/gt3.webp',
    tag: 'Karte',
    description: 'Kompakte Modellkarte mit Eckdaten, Designmerkmalen und kurzer Einordnung zur 992-Generation.',
    stock: 'Sofort verfügbar'
  },
  {
    id: 'technik-guide',
    name: 'Technik-Guide',
    category: 'digital',
    price: 9.99,
    image: 'main web/images/22.webp',
    tag: 'Digital',
    description: 'Digitaler Kurzguide, der Motor, PDK, Fahrwerk, Bremsen und Aerodynamik verständlich erklärt.',
    stock: 'Download-Demo'
  },
  {
    id: 'generationen-set',
    name: 'Generationen-Kartenset',
    category: 'karten',
    price: 18.99,
    image: 'geschichte/assets/images/911-930.webp',
    tag: 'Karten',
    description: 'Kartenset mit ausgewählten Generationen von 930 bis 992 für Vergleich und Präsentation.',
    stock: 'Sofort verfügbar'
  },
  {
    id: 'praesentation-pack',
    name: 'Präsentationspaket',
    category: 'digital',
    price: 12.49,
    image: 'main web/images/2.webp',
    tag: 'Digital',
    description: 'Digitales Präsentationspaket mit Gliederung, Stichpunkten und professionellen Formulierungen.',
    stock: 'Download-Demo'
  },
  {
    id: 'garage-print',
    name: 'Garage Print',
    category: 'poster',
    price: 11.99,
    image: 'main web/images/slide1.jpg',
    tag: 'Poster',
    description: 'Stimmungsvolles Printmotiv als Ergänzung für Deckblatt, Projektmappe oder Ausstellungstisch.',
    stock: 'Sofort verfügbar'
  }
];

// Suchindex: Hier stehen die Seiten und Begriffe für die interne Suche.
const SEARCH_INDEX = [
  { title: 'Home', url: 'index.html', desc: 'Startseite mit Medienkarussell und Projektüberblick.', keywords: 'home startseite willkommen porsche experience karussell übersicht' },
  { title: 'Geschichte', url: 'geschichte.html', desc: 'Ausgewählte Baureihen im Slider plus Übersicht der acht Hauptgenerationen.', keywords: 'geschichte historie generationen evolution timeline 930 964 991 992 993 996 997' },
  { title: 'Modelle', url: 'modelle.html', desc: 'Der Porsche 911 der Baureihe 992 im direkten Vergleich.', keywords: 'modelle 992 generationen vergleich sportwagen boxermotor scheinwerfer silhouette' },
  { title: 'Technik', url: 'Technik.html', desc: 'Motor, Fahrwerk, Aerodynamik und Assistenzsysteme des 911.', keywords: 'technik motor boxermotor sechszylinder turbo pdk getriebe fahrwerk bremsen pasm pccb aerodynamik heckspoiler assistenzsysteme cockpit sport chrono' },
  { title: 'Shop', url: 'shop.html', desc: 'Produktübersicht mit Projektartikeln und Preisen.', keywords: 'shop produkte artikel poster karten digital kaufen' },
  { title: 'Warenkorb', url: 'warenkorb.html', desc: 'Ausgewählte Artikel mit Menge, Einzelpreis und Gesamtpreis.', keywords: 'warenkorb preis summe menge checkout bestellung' },
  { title: 'Checkout', url: 'checkout.html', desc: 'Demo-Checkout für eine fiktive Bestellung.', keywords: 'checkout formular bestellen adresse zahlung demo' },
  { title: 'Newsletter', url: 'Newsletter.html', desc: 'Newsletter abonnieren und keine Neuigkeiten mehr verpassen.', keywords: 'newsletter anmelden abonnieren abo email neuigkeiten updates' },
  { title: 'Projekt', url: 'Projekt.html', desc: 'Über das Schulprojekt Porsche Experience.', keywords: 'projekt über schulprojekt sitemap technischer rahmen html css js aufbau' },
  { title: 'Fragen und Antworten', url: 'qa.html', desc: 'Antworten zur Website und zum Shop.', keywords: 'faq fragen antworten hilfe qa' },
  { title: 'Rechtliches', url: 'rechtliches.html', desc: 'Hinweise zum inoffiziellen Schulprojekt.', keywords: 'rechtliches disclaimer marke logo schulprojekt' }
];

const CART_KEY = 'porscheProjectCart';
const ORDER_KEY = 'porscheProjectLastOrder';
let memoryCart = null;

const mobileMenuButton = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');


// Formatiert Zahlen als Euro-Preis.
function formatPrice(value) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);
}

function sanitizeCart(cart) {
  const cleanCart = {};
  if (!cart || typeof cart !== 'object') return cleanCart;

  Object.entries(cart).forEach(([id, quantity]) => {
    const productExists = PRODUCTS.some((product) => product.id === id);
    const cleanQuantity = Math.max(0, Math.min(99, Number(quantity) || 0));

    if (productExists && cleanQuantity > 0) {
      cleanCart[id] = cleanQuantity;
    }
  });

  return cleanCart;
}

function encodeCart(cart) {
  const cleanCart = sanitizeCart(cart);
  const json = JSON.stringify(cleanCart);
  return encodeURIComponent(json);
}

function decodeCart(value) {
  if (!value) return null;

  try {
    return sanitizeCart(JSON.parse(decodeURIComponent(value)));
  } catch (error) {
    return null;
  }
}

function getCartFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return decodeCart(params.get('cart'));
}

function storageAvailable() {
  try {
    const testKey = '__porsche_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

// Personenbezogene Demo-Bestelldaten bleiben nur fuer die aktuelle Browser-Sitzung erhalten.
function sessionStorageAvailable() {
  try {
    const testKey = '__porsche_session_test__';
    window.sessionStorage.setItem(testKey, '1');
    window.sessionStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

function getCartFromStorage() {
  if (!storageAvailable()) return {};

  try {
    return sanitizeCart(JSON.parse(window.localStorage.getItem(CART_KEY) || '{}'));
  } catch (error) {
    return {};
  }
}

function saveCartToStorage(cart) {
  if (!storageAvailable()) return;

  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(sanitizeCart(cart)));
  } catch (error) {
    /* localStorage kann bei file:// oder Browser-Einstellungen blockiert sein. */
  }
}

function getCart() {
  const urlCart = getCartFromUrl();

  if (urlCart && Object.keys(urlCart).length > 0) {
    memoryCart = urlCart;
    saveCartToStorage(urlCart);
    return { ...urlCart };
  }

  if (memoryCart) {
    return { ...memoryCart };
  }

  memoryCart = getCartFromStorage();
  return { ...memoryCart };
}

// Speichert den Warenkorb im Browser.
function saveCart(cart) {
  memoryCart = sanitizeCart(cart);
  saveCartToStorage(memoryCart);
  updateCartCount();
  updateStateLinks();
}

function getCartItems() {
  const cart = getCart();

  return Object.entries(cart)
    .map(([id, quantity]) => {
      const product = PRODUCTS.find((item) => item.id === id);
      if (!product) return null;
      return { ...product, quantity: Number(quantity) || 0 };
    })
    .filter((item) => item && item.quantity > 0);
}

function calculateTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length ? 4.90 : 0;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
}

function updateCartCount() {
  const count = Object.values(getCart()).reduce((sum, quantity) => sum + Number(quantity || 0), 0);

  document.querySelectorAll('[data-cart-count]').forEach((element) => {
    element.textContent = String(count);
  });
}

function updateStateLinks() {
  const cart = getCart();
  const state = encodeCart(cart);

  document.querySelectorAll('[data-cart-link], a[href="warenkorb.html"]').forEach((link) => {
    link.setAttribute('href', Object.keys(cart).length ? `warenkorb.html?cart=${state}` : 'warenkorb.html');
  });

  document.querySelectorAll('[data-checkout-link], a[href="checkout.html"]').forEach((link) => {
    link.setAttribute('href', Object.keys(cart).length ? `checkout.html?cart=${state}` : 'checkout.html');
  });

  document.querySelectorAll('[data-shop-link], a[href="shop.html"]').forEach((link) => {
    link.setAttribute('href', Object.keys(cart).length ? `shop.html?cart=${state}` : 'shop.html');
  });
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function showToast(message) {
  const toast = document.getElementById('shopToast');
  if (!toast) return;

  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  toast.classList.add('is-visible');

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2400);
}

// Fügt ein Produkt in den Warenkorb ein oder erhöht die Menge.
function addToCart(productId) {
  const product = PRODUCTS.find((item) => item.id === productId);
  if (!product) return;

  const cart = getCart();
  cart[product.id] = (Number(cart[product.id]) || 0) + 1;
  saveCart(cart);

  showToast(`${product.name} wurde in den Warenkorb gelegt.`);
}

// Erzeugt die Produktkarten im Shop aus den Produktdaten.
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const searchInput = document.getElementById('productSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let activeFilter = 'alle';

  function drawProducts() {
    const query = (searchInput?.value || '').trim().toLowerCase();

    const items = PRODUCTS.filter((product) => {
      const matchesFilter = activeFilter === 'alle' || product.category === activeFilter;
      const searchableText = `${product.name} ${product.tag} ${product.description} ${product.category}`.toLowerCase();
      return matchesFilter && searchableText.includes(query);
    });

    if (!items.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>Kein Produkt gefunden.</h3>
          <p>Ändere den Suchbegriff oder wähle eine andere Kategorie.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map((product) => `
      <article class="product-card">
        <div class="product-media">
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy" decoding="async">
        </div>
        <div class="product-body">
          <div class="product-meta">
            <span class="product-tag">${escapeHTML(product.tag)}</span>
            <strong>${formatPrice(product.price)}</strong>
          </div>
          <h3>${escapeHTML(product.name)}</h3>
          <p>${escapeHTML(product.description)}</p>
          <div class="price">${formatPrice(product.price)}</div>
          <div class="stock">${escapeHTML(product.stock)}</div>
          <button class="primary-btn" type="button" data-add-to-cart="${escapeHTML(product.id)}">
            In den Warenkorb
          </button>
        </div>
      </article>
    `).join('');
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'alle';

      filterButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      drawProducts();
    });
  });

  searchInput?.addEventListener('input', drawProducts);

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add-to-cart]');
    if (!button) return;

    addToCart(button.dataset.addToCart);
  });

  drawProducts();
}

// Zeigt alle Artikel im Warenkorb und berechnet die Preise.
function renderCart() {
  const cartList = document.getElementById('cartList');
  if (!cartList) return;

  const checkoutLink = document.getElementById('checkoutLink');
  const emptyTemplate = document.getElementById('emptyCartTemplate');
  const items = getCartItems();

  if (!items.length) {
    cartList.innerHTML = emptyTemplate ? emptyTemplate.innerHTML : '<p>Der Warenkorb ist leer.</p>';
    updateCartTotals(items);

    if (checkoutLink) {
      checkoutLink.classList.add('is-disabled');
      checkoutLink.setAttribute('aria-disabled', 'true');
      checkoutLink.addEventListener('click', (event) => event.preventDefault());
    }

    return;
  }

  if (checkoutLink) {
    checkoutLink.classList.remove('is-disabled');
    checkoutLink.removeAttribute('aria-disabled');
  }

  cartList.innerHTML = items.map((item) => `
    <article class="cart-item">
      <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy" decoding="async">
      <div>
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.description)}</p>
        <p><strong>Einzelpreis:</strong> ${formatPrice(item.price)}</p>
        <div class="cart-actions">
          <button class="qty-btn" type="button" data-change-qty="${escapeHTML(item.id)}" data-direction="-1" aria-label="Menge von ${escapeHTML(item.name)} verringern">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" type="button" data-change-qty="${escapeHTML(item.id)}" data-direction="1" aria-label="Menge von ${escapeHTML(item.name)} erhöhen">+</button>
          <button class="danger-btn" type="button" data-remove-item="${escapeHTML(item.id)}">Entfernen</button>
        </div>
      </div>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </article>
  `).join('');

  updateCartTotals(items);
}

function updateCartTotals(items) {
  const totals = calculateTotals(items);

  const subtotal = document.getElementById('cartSubtotal');
  const shipping = document.getElementById('cartShipping');
  const total = document.getElementById('cartTotal');

  if (subtotal) subtotal.textContent = formatPrice(totals.subtotal);
  if (shipping) shipping.textContent = formatPrice(totals.shipping);
  if (total) total.textContent = formatPrice(totals.total);
}

function handleCartActions() {
  const cartList = document.getElementById('cartList');
  if (!cartList) return;

  cartList.addEventListener('click', (event) => {
    const changeButton = event.target.closest('[data-change-qty]');
    const removeButton = event.target.closest('[data-remove-item]');
    const cart = getCart();

    if (changeButton) {
      const id = changeButton.dataset.changeQty;
      const direction = Number(changeButton.dataset.direction) || 0;
      cart[id] = Math.max(0, (Number(cart[id]) || 0) + direction);

      if (cart[id] === 0) {
        delete cart[id];
      }

      saveCart(cart);
      renderCart();
      return;
    }

    if (removeButton) {
      delete cart[removeButton.dataset.removeItem];
      saveCart(cart);
      renderCart();
    }
  });
}

function renderCheckout() {
  const checkoutItems = document.getElementById('checkoutItems');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutShipping = document.getElementById('checkoutShipping');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const form = document.getElementById('checkoutForm');
  const message = document.getElementById('checkoutMessage');

  if (!checkoutItems || !checkoutTotal || !form) return;

  const items = getCartItems();
  const totals = calculateTotals(items);
  const submitButton = form.querySelector('button[type="submit"]');

  if (!items.length) {
    checkoutItems.innerHTML = '<p class="small-note">Dein Warenkorb ist leer.</p>';
    if (checkoutSubtotal) checkoutSubtotal.textContent = formatPrice(0);
    if (checkoutShipping) checkoutShipping.textContent = formatPrice(0);
    checkoutTotal.textContent = formatPrice(0);

    if (submitButton) submitButton.disabled = true;
    if (message) message.textContent = 'Lege zuerst Produkte in den Warenkorb.';

    return;
  }

  checkoutItems.innerHTML = items.map((item) => `
    <div class="checkout-item">
      <span>${item.quantity} × ${escapeHTML(item.name)}</span>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </div>
  `).join('');

  if (checkoutSubtotal) checkoutSubtotal.textContent = formatPrice(totals.subtotal);
  if (checkoutShipping) checkoutShipping.textContent = formatPrice(totals.shipping);
  checkoutTotal.textContent = formatPrice(totals.total);

  if (submitButton) submitButton.disabled = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const order = {
      number: `PX-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString('de-DE'),
      customer: {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        street: data.get('street'),
        zip: data.get('zip'),
        city: data.get('city'),
        payment: data.get('payment')
      },
      items,
      totals
    };

    if (sessionStorageAvailable()) {
      try {
        window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
      } catch (error) {
        if (message) message.textContent = 'Die lokale Bestätigung konnte nicht vorbereitet werden.';
        return;
      }
    } else {
      if (message) message.textContent = 'Der Browser blockiert die lokale Sitzungsspeicherung. Bitte erlaube Session Storage.';
      return;
    }

    if (storageAvailable()) {
      try {
        window.localStorage.removeItem(CART_KEY);
      } catch (error) {
        /* Der Warenkorb wird zusaetzlich im Arbeitsspeicher geleert. */
      }
    }

    memoryCart = {};
    // In der URL steht nur eine unkritische Referenz, niemals Name, Adresse oder E-Mail.
    window.location.href = `bestellung.html?ref=${encodeURIComponent(order.number)}`;
  });
}

// Liest nur die unkritische Bestellreferenz aus der URL.
function getOrderReferenceFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}

// Liest die Demo-Bestellung ausschliesslich aus dem Sitzungsspeicher.
function getOrderFromStorage() {
  if (!sessionStorageAvailable()) return null;

  try {
    return JSON.parse(window.sessionStorage.getItem(ORDER_KEY) || 'null');
  } catch (error) {
    return null;
  }
}

function renderOrderConfirmation() {
  const container = document.getElementById('orderConfirmation');
  if (!container) return;

  const order = getOrderFromStorage();
  const reference = getOrderReferenceFromUrl();

  if (!order || (reference && reference !== order.number)) {
    container.innerHTML = `
      <h3>Keine Demo-Bestellung gefunden.</h3>
      <p>Starte im Shop, lege Produkte in den Warenkorb und gehe dann durch den Checkout.</p>
      <a class="primary-btn" href="shop.html">Zum Shop</a>
    `;
    return;
  }

  const lines = Array.isArray(order.items)
    ? order.items.map((item) => `
        <div class="checkout-item">
          <span>${Number(item.quantity) || 0} × ${escapeHTML(item.name)}</span>
          <strong>${formatPrice((Number(item.price) || 0) * (Number(item.quantity) || 0))}</strong>
        </div>
      `).join('')
    : '';

  const totalValue = order.totals && typeof order.totals.total !== 'undefined'
    ? order.totals.total
    : order.total;

  container.innerHTML = `
    <h3>Vielen Dank, ${escapeHTML(order.customer?.firstName || 'Gast')}!</h3>
    <p>Deine Demo-Bestellnummer lautet <strong>${escapeHTML(order.number || 'PX-DEMO')}</strong>.</p>
    <div class="order-lines">
      <p><strong>Datum:</strong> ${escapeHTML(order.createdAt || '-')}</p>
      <p><strong>Empfänger:</strong> ${escapeHTML(`${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim() || 'Gast')}</p>
      <p><strong>Zahlungsart:</strong> ${escapeHTML(order.customer?.payment || '-')}</p>
      ${lines}
      <p><strong>Gesamt:</strong> ${formatPrice(totalValue)}</p>
    </div>
    <a class="primary-btn" href="shop.html">Weiter einkaufen</a>
  `;
}

function initSearch() {
  const form = document.getElementById('siteSearchForm');
  const input = document.getElementById('siteSearchInput');
  const results = document.getElementById('siteSearchResults');

  if (!form || !input || !results) return;

  function normalize(text) {
    return String(text)
      .toLowerCase()
      .replaceAll('ä', 'a')
      .replaceAll('ö', 'o')
      .replaceAll('ü', 'u')
      .replaceAll('ß', 'ss');
  }

  function renderResults(query) {
    const cleanQuery = normalize(query.trim());

    if (!cleanQuery) {
      results.classList.remove('is-open');
      results.innerHTML = '';
      return;
    }

    const matches = SEARCH_INDEX.filter((item) => {
      const searchText = normalize(`${item.title} ${item.desc} ${item.keywords}`);
      return searchText.includes(cleanQuery);
    }).slice(0, 6);

    results.classList.add('is-open');
    results.innerHTML = matches.length
      ? matches.map((item) => `
          <a class="search-result-item" href="${escapeHTML(item.url)}">
            <strong>${escapeHTML(item.title)}</strong>
            <span>${escapeHTML(item.desc)}</span>
          </a>
        `).join('')
      : '<div class="search-empty">Kein Treffer gefunden.</div>';
  }

  input.addEventListener('input', () => renderResults(input.value));

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstResult = results.querySelector('.search-result-item');
    if (firstResult) {
      window.location.href = firstResult.getAttribute('href');
    }
  });

  document.addEventListener('click', (event) => {
    if (!form.contains(event.target)) {
      results.classList.remove('is-open');
    }
  });
}

updateCartCount();
updateStateLinks();
renderProducts();
handleCartActions();
renderCart();
renderCheckout();
renderOrderConfirmation();
initSearch();
