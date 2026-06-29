const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const nextButton = document.getElementById('nextSlide');
const prevButton = document.getElementById('prevSlide');
const mobileMenuButton = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

let currentSlide = 0;
let autoTimer = null;

function stopVideos() {
  slides.forEach((slide) => {
    const video = slide.querySelector('video');
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  });
}

function setActiveDot(index) {
  dots.forEach((dot) => dot.classList.remove('is-active'));
  if (dots[index]) dots[index].classList.add('is-active');
}

function showSlide(index) {
  clearTimeout(autoTimer);
  stopVideos();

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((slide) => slide.classList.remove('is-active'));
  slides[index].classList.add('is-active');
  setActiveDot(index);
  currentSlide = index;

  const activeSlide = slides[index];
  const duration = Number(activeSlide.dataset.duration) || 3000;
  const video = activeSlide.querySelector('video');

  if (video) {
    video.play().catch(() => {
      console.log('Autoplay wurde vom Browser blockiert. Das Video ist aber korrekt eingebunden.');
    });
  }

  autoTimer = setTimeout(() => {
    showSlide(currentSlide + 1);
  }, duration);
}

nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
prevButton.addEventListener('click', () => showSlide(currentSlide - 1));

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.index));
  });
});

if (mobileMenuButton && mainNav) {
  mobileMenuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
    mobileMenuButton.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  });
}

showSlide(0);
