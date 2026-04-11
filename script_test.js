const track = document.querySelector(".track");
const slides = Array.from(document.querySelectorAll(".slide"));

let index = 0;
const len = slides.length;

/**
 * Permet une boucle infinie propre
 */
function mod(i) {
  return (i + len) % len;
}

/**
 * Met à jour l'affichage du carousel
 */
function update() {

  slides.forEach(s => s.classList.remove("active", "near"));

  const prev2 = slides[mod(index - 2)];
  const prev1 = slides[mod(index - 1)];
  const current = slides[mod(index)];
  const next1 = slides[mod(index + 1)];
  const next2 = slides[mod(index + 2)];

  current.classList.add("active");
  prev1.classList.add("near");
  next1.classList.add("near");
  prev2.classList.add("near");
  next2.classList.add("near");

  const slideWidth = slides[0].offsetWidth + 20;
  const containerWidth = 900;

  const centerOffset = (containerWidth / 2) - (slideWidth / 2);
  const offset = index * slideWidth;

  track.style.transform = `translateX(${centerOffset - offset}px)`;
}

/**
 * Navigation
 */
function next() {
  index = mod(index + 1);
  update();
}

function prev() {
  index = mod(index - 1);
  update();
}

/**
 * Events
 */
document.querySelector(".next").addEventListener("click", next);
document.querySelector(".prev").addEventListener("click", prev);

/**
 * init
 */
window.addEventListener("load", update);