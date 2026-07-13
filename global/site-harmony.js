/* Gemeinsame defensive Bedienlogik für alle Seiten - Release 3.1. */
(() => {
  "use strict";
  if (document.documentElement.dataset.harmonyReady === "true") return;
  document.documentElement.dataset.harmonyReady = "true";

  const menuButton = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mainNav");
  const main = document.getElementById("main-content");

  const closeMenu = (returnFocus = false) => {
    if (!menu || !menuButton) return;
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Menü öffnen");
    if (returnFocus) menuButton.focus();
  };

  if (menuButton) menuButton.type = "button";

  if (menu && menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu(true);
      }
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 1199px)").matches) closeMenu();
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1199) closeMenu();
    }, { passive: true });
  }

  document.querySelectorAll(".main-nav .nav-active").forEach(link => {
    link.setAttribute("aria-current", "page");
  });

  document.querySelectorAll('a[href="#top"]').forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  });

  const skipLink = document.querySelector('.skip-link[href="#main-content"]');
  if (skipLink && main) {
    skipLink.addEventListener("click", () => {
      window.setTimeout(() => main.focus({ preventScroll: true }), 0);
    });
  }

  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", [...rel].join(" "));
  });

  /* Newsletter-Button: ausschließlich der Hintergrund leuchtet alle 2 Sekunden gold.
     Schrift, Rahmen und äußerer Schatten bleiben unverändert. */
  const newsletterButton = document.querySelector(
    '.site-header .main-nav a[href^="Newsletter.html"]'
  );

  if (newsletterButton) {
    const glowClass = "newsletter-glow-active";
    let glowTimer = null;
    let removeTimer = null;

    const showNewsletterGlow = () => {
      newsletterButton.classList.add(glowClass);
      window.clearTimeout(removeTimer);
      removeTimer = window.setTimeout(() => {
        newsletterButton.classList.remove(glowClass);
      }, 850);
    };

    /* Direkt nach dem Laden einmal sichtbar aufleuchten. */
    window.setTimeout(showNewsletterGlow, 250);

    /* Danach beginnt alle zwei Sekunden ein neuer Puls. */
    glowTimer = window.setInterval(showNewsletterGlow, 2000);

    window.addEventListener("pagehide", () => {
      window.clearInterval(glowTimer);
      window.clearTimeout(removeTimer);
    }, { once: true });
  }
})();
