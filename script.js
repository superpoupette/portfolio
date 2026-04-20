document.addEventListener("DOMContentLoaded", () => {
    const galerie = document.querySelector(".galerie");
    const images = Array.from(galerie.querySelectorAll("img"));

    images.sort((a, b) => {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
    });

    images.forEach(img => galerie.appendChild(img));
});

const images = document.querySelectorAll(".galerie img");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDate = document.getElementById("popup-date");

// ouvrir le popup
images.forEach(img => {
    img.addEventListener("click", () => {
        popup.classList.remove("hidden");

        popupImg.src = img.src;
        popupTitle.textContent = img.dataset.title;
        popupDate.textContent = img.dataset.date;
    });
});

// fermer en cliquant à côté
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.classList.add("hidden");
    }
});
