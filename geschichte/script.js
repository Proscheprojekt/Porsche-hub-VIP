const slides = [
  {
    code: "930",
    model: "Porsche 911 930",
    period: "ca. 1975 bis 1989",
    image: "geschichte/assets/images/911-930.png",
    alt: "Porsche 911 Generation 930",
    description: "Klassische Turbo-Form, breite Kotflügel und der typische große Heckspoiler."
  },
  {
    code: "964",
    model: "Porsche 911 964",
    period: "ca. 1989 bis 1994",
    image: "geschichte/assets/images/911-964.png",
    alt: "Porsche 911 Generation 964",
    description: "Deutlich moderner, aber noch sehr nah an der klassischen 911-Silhouette."
  },
  {
    code: "993",
    model: "Porsche 911 993",
    period: "ca. 1994 bis 1998",
    image: "geschichte/assets/images/911-993.png",
    alt: "Porsche 911 Generation 993",
    description: "Rundere Linien, kräftiger Auftritt und für viele eine der schönsten 911-Formen."
  },
  {
    code: "996",
    model: "Porsche 911 996",
    period: "ca. 1997 bis 2006",
    image: "geschichte/assets/images/911-996.png",
    alt: "Porsche 911 Generation 996",
    description: "Größerer Stilwechsel: glattere Karosserie, neue Front und deutlich moderneres Design."
  },
  {
    code: "997",
    model: "Porsche 911 997",
    period: "ca. 2004 bis 2012",
    image: "geschichte/assets/images/911-997.png",
    alt: "Porsche 911 Generation 997",
    description: "Wieder näher am klassischen 911-Look, aber mit stärkerer, sportlicherer Wirkung."
  },
  {
    code: "991",
    model: "Porsche 911 991",
    period: "ca. 2011 bis 2019",
    image: "geschichte/assets/images/911-991.png",
    alt: "Porsche 911 Generation 991",
    description: "Länger, breiter und ruhiger. Sehr sauberer Übergang Richtung moderner 911."
  },
  {
    code: "992",
    model: "Porsche 911 992",
    period: "ab ca. 2019",
    image: "geschichte/assets/images/911-992.png",
    alt: "Porsche 911 Generation 992",
    description: "Aktuelle Designsprache mit breiter Lichtsignatur, klaren Flächen und sehr modernem Auftritt."
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
const progressBar = document.getElementById("progressBar");
const timelineTabs = document.getElementById("timelineTabs");
const mobileMenuButton = document.getElementById('mobileMenuBtn');

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

function runProgress() {
  progressBar.classList.remove("run");
  void progressBar.offsetWidth;
  progressBar.classList.add("run");
}

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
  runProgress();
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
showSlide(0);
restartAutoplay();
