document.addEventListener("DOMContentLoaded", () => {
    const galerie = document.querySelector(".galerie");
    const images = Array.from(galerie.querySelectorAll("img"));

    images.sort((a, b) => {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
    });

    images.forEach(img => galerie.appendChild(img));
});
