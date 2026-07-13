/* =============================================================
   992 MODEL GALLERY CAROUSELS
   Independent two-image sliders for the supplied front/rear graphics.
   Includes an accessible full-screen image enlargement (lightbox).
============================================================= */
(function initModelGalleryCarousels() {
  const carousels = document.querySelectorAll('[data-model-carousel]');
  if (!carousels.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function createLightbox() {
    const element = document.createElement('div');
    element.className = 'model-gallery-lightbox';
    element.setAttribute('role', 'dialog');
    element.setAttribute('aria-modal', 'true');
    element.setAttribute('aria-hidden', 'true');
    element.setAttribute('aria-labelledby', 'modelGalleryLightboxTitle');
    element.innerHTML = `
      <div class="model-gallery-lightbox-backdrop" data-lightbox-close></div>
      <div class="model-gallery-lightbox-panel">
        <button class="model-gallery-lightbox-close" type="button" aria-label="Vergrößerte Ansicht schließen" title="Schließen">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6.7 5.3a1 1 0 0 0-1.4 1.4L10.6 12l-5.3 5.3a1 1 0 1 0 1.4 1.4l5.3-5.3 5.3 5.3a1 1 0 0 0 1.4-1.4L13.4 12l5.3-5.3a1 1 0 1 0-1.4-1.4L12 10.6 6.7 5.3Z"/></svg>
        </button>
        <button class="model-gallery-lightbox-arrow model-gallery-lightbox-prev" type="button" aria-label="Vorherige Ansicht">
          <span aria-hidden="true">‹</span>
        </button>
        <div class="model-gallery-lightbox-image-wrap">
          <img class="model-gallery-lightbox-image" alt="" decoding="async" />
        </div>
        <button class="model-gallery-lightbox-arrow model-gallery-lightbox-next" type="button" aria-label="Nächste Ansicht">
          <span aria-hidden="true">›</span>
        </button>
        <div class="model-gallery-lightbox-meta">
          <div>
            <span class="model-gallery-lightbox-view">Frontansicht</span>
            <h2 id="modelGalleryLightboxTitle">Porsche 911</h2>
          </div>
          <span class="model-gallery-lightbox-count">1 / 2</span>
        </div>
      </div>`;

    document.body.appendChild(element);

    const panel = element.querySelector('.model-gallery-lightbox-panel');
    const closeButton = element.querySelector('.model-gallery-lightbox-close');
    const previousButton = element.querySelector('.model-gallery-lightbox-prev');
    const nextButton = element.querySelector('.model-gallery-lightbox-next');
    const image = element.querySelector('.model-gallery-lightbox-image');
    const title = element.querySelector('#modelGalleryLightboxTitle');
    const view = element.querySelector('.model-gallery-lightbox-view');
    const count = element.querySelector('.model-gallery-lightbox-count');

    let activeApi = null;
    let previouslyFocused = null;

    function sync() {
      if (!activeApi) return;
      const currentIndex = activeApi.getIndex();
      const slide = activeApi.slides[currentIndex];
      const sourceImage = slide?.querySelector('img');
      if (!sourceImage) return;

      panel.classList.add('is-loading');
      image.onload = () => panel.classList.remove('is-loading');
      image.onerror = () => panel.classList.remove('is-loading');
      image.src = sourceImage.currentSrc || sourceImage.src;
      image.alt = sourceImage.alt || `${activeApi.modelName} in vergrößerter Ansicht`;
      title.textContent = activeApi.modelName;
      view.textContent = slide.dataset.viewLabel || `Ansicht ${currentIndex + 1}`;
      count.textContent = `${currentIndex + 1} / ${activeApi.slides.length}`;
    }

    function open(api, trigger) {
      activeApi = api;
      previouslyFocused = trigger || document.activeElement;
      activeApi.stopAutoplay();
      sync();
      element.classList.add('is-open');
      element.setAttribute('aria-hidden', 'false');
      document.body.classList.add('model-gallery-lightbox-open');
      window.setTimeout(() => closeButton.focus({ preventScroll: true }), reducedMotion ? 0 : 80);
    }

    function close() {
      if (!activeApi) return;
      const apiToResume = activeApi;
      activeApi = null;
      element.classList.remove('is-open');
      element.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('model-gallery-lightbox-open');
      panel.classList.remove('is-loading');
      image.onload = null;
      image.onerror = null;
      window.setTimeout(() => {
        if (!element.classList.contains('is-open')) image.removeAttribute('src');
      }, reducedMotion ? 0 : 220);
      apiToResume.startAutoplay();
      previouslyFocused?.focus?.({ preventScroll: true });
      previouslyFocused = null;
    }

    function move(delta) {
      if (!activeApi) return;
      activeApi.render(activeApi.getIndex() + delta, true);
      sync();
    }

    closeButton.addEventListener('click', close);
    element.querySelector('[data-lightbox-close]').addEventListener('click', close);
    previousButton.addEventListener('click', () => move(-1));
    nextButton.addEventListener('click', () => move(1));

    document.addEventListener('keydown', (event) => {
      if (!activeApi) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        move(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        move(1);
      } else if (event.key === 'Tab') {
        const focusable = [closeButton, previousButton, nextButton];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    return {
      open,
      close,
      sync,
      isOpenFor(api) {
        return activeApi === api;
      }
    };
  }

  const lightbox = createLightbox();

  carousels.forEach((carousel, carouselIndex) => {
    const viewport = carousel.querySelector('.model-gallery-viewport');
    const track = carousel.querySelector('.model-gallery-track');
    const slides = Array.from(carousel.querySelectorAll('.model-gallery-slide'));
    const dots = Array.from(carousel.querySelectorAll('.model-gallery-dot'));
    const previousButton = carousel.querySelector('.model-gallery-prev');
    const nextButton = carousel.querySelector('.model-gallery-next');
    const viewLabel = carousel.querySelector('.model-gallery-view');
    const counter = carousel.querySelector('.model-gallery-count');
    const modelName = carousel.querySelector('.model-gallery-caption h3')?.textContent?.trim() || 'Porsche 911';

    if (!viewport || !track || slides.length < 2) return;

    let index = 0;
    let intervalId = null;
    let isVisible = false;
    let pointerStartX = 0;
    let pointerDeltaX = 0;
    let didSwipe = false;
    let api = null;

    function render(nextIndex, announce = false) {
      index = (nextIndex + slides.length) % slides.length;
      track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;

      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-pressed', String(active));
      });

      const activeSlide = slides[index];
      const label = activeSlide.dataset.viewLabel || `Ansicht ${index + 1}`;
      if (viewLabel) viewLabel.textContent = label;
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
      if (announce) viewport.setAttribute('aria-label', `${modelName}: ${label}`);
      if (api && lightbox.isOpenFor(api)) lightbox.sync();
    }

    function stopAutoplay() {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      if (reducedMotion || !isVisible || document.hidden || lightbox.isOpenFor(api)) return;
      intervalId = window.setInterval(() => render(index + 1), 5200);
    }

    function restartAutoplay() {
      stopAutoplay();
      window.setTimeout(startAutoplay, 1800);
    }

    api = {
      slides,
      modelName,
      render,
      stopAutoplay,
      startAutoplay,
      getIndex: () => index
    };

    const expandButton = document.createElement('button');
    expandButton.className = 'model-gallery-expand';
    expandButton.type = 'button';
    expandButton.setAttribute('aria-label', `${modelName} vergrößern`);
    expandButton.setAttribute('title', 'Bild vergrößern');
    expandButton.setAttribute('data-tooltip', 'Vergrößern');
    expandButton.innerHTML = `
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M8.5 3H4a1 1 0 0 0-1 1v4.5a1 1 0 1 0 2 0V5h3.5a1 1 0 1 0 0-2Zm7 0a1 1 0 1 0 0 2H19v3.5a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-4.5ZM4 14.5a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h4.5a1 1 0 1 0 0-2H5v-3.5a1 1 0 0 0-1-1Zm16 0a1 1 0 0 0-1 1V19h-3.5a1 1 0 1 0 0 2H20a1 1 0 0 0 1-1v-4.5a1 1 0 0 0-1-1Z"/>
      </svg>`;
    viewport.appendChild(expandButton);

    expandButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    expandButton.addEventListener('click', (event) => {
      event.stopPropagation();
      lightbox.open(api, expandButton);
    });

    previousButton?.addEventListener('click', () => {
      render(index - 1, true);
      restartAutoplay();
    });

    nextButton?.addEventListener('click', () => {
      render(index + 1, true);
      restartAutoplay();
    });

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        render(dotIndex, true);
        restartAutoplay();
      });
    });

    viewport.addEventListener('keydown', (event) => {
      if (event.target.closest('button')) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        render(index - 1, true);
        restartAutoplay();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        render(index + 1, true);
        restartAutoplay();
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        lightbox.open(api, viewport);
      }
    });

    viewport.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerStartX = event.clientX;
      pointerDeltaX = 0;
      didSwipe = false;
      stopAutoplay();
      viewport.setPointerCapture?.(event.pointerId);
    });

    viewport.addEventListener('pointermove', (event) => {
      if (!pointerStartX) return;
      pointerDeltaX = event.clientX - pointerStartX;
    });

    function finishSwipe() {
      if (!pointerStartX) return;
      if (Math.abs(pointerDeltaX) > 48) {
        didSwipe = true;
        render(index + (pointerDeltaX < 0 ? 1 : -1), true);
      }
      pointerStartX = 0;
      pointerDeltaX = 0;
      restartAutoplay();
    }

    viewport.addEventListener('pointerup', finishSwipe);
    viewport.addEventListener('pointercancel', finishSwipe);

    viewport.addEventListener('click', (event) => {
      if (event.target.closest('button')) return;
      if (didSwipe) {
        didSwipe = false;
        return;
      }
      render(index + 1, true);
      restartAutoplay();
    });

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? false;
      if (isVisible) startAutoplay();
      else stopAutoplay();
    }, { threshold: 0.35 });
    observer.observe(carousel);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    viewport.tabIndex = 0;
    render(0);
  });
})();
