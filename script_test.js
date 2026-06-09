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

    const container = document.querySelector(".carousel");

    const currentRect = current.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const currentCenter =
        currentRect.left + currentRect.width / 2;
    
    const containerCenter =
        containerRect.left + containerRect.width / 2;
    
    const delta =
        containerCenter - currentCenter;
    
    track.style.transform = `translateX(${delta}px)`;
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
