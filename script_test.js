const track = document.querySelector(".track");
const slides = Array.from(document.querySelectorAll(".slide"));

let index = 2; 
// on démarre sur la 3e carte

const len = slides.length;

/* boucle infinie */
function mod(i) {
    return (i + len) % len;
}

/* update carousel */
function update() {

    slides.forEach(slide => {
        slide.classList.remove("active", "near");
    });

    const current = slides[mod(index)];

    const prev1 = slides[mod(index - 1)];
    const prev2 = slides[mod(index - 2)];

    const next1 = slides[mod(index + 1)];
    const next2 = slides[mod(index + 2)];

    current.classList.add("active");

    prev1.classList.add("near");
    prev2.classList.add("near");

    next1.classList.add("near");
    next2.classList.add("near");

    /* dimensions */
    const slideWidth = 180;
    // 160px + 20px de marges

    const containerWidth = 900;

    /* centre exact */
    const offset =
        index * slideWidth;

    const center =
        (containerWidth / 2) -
        (slideWidth / 2);

    track.style.transform =
        `translateX(${center - offset}px)`;
}

/* navigation */
function next() {
    index = mod(index + 1);
    update();
}

function prev() {
    index = mod(index - 1);
    update();
}

/* boutons */
document
    .querySelector(".next")
    .addEventListener("click", next);

document
    .querySelector(".prev")
    .addEventListener("click", prev);

/* init */
window.addEventListener("load", update);
