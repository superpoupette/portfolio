document.addEventListener("DOMContentLoaded", () => {
    const galerie = document.querySelector(".galerie");
    const images = Array.from(galerie.querySelectorAll("img"));
    const select = document.getElementById("filtre-annee");

    // TRI PAR DATE
    images.sort((a, b) => {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
    });
    images.forEach(img => galerie.appendChild(img));

    // EXTRAIRE LES ANNÉES UNIQUES
    const annees = [...new Set(
        images.map(img => new Date(img.dataset.date).getFullYear())
    )].sort((a, b) => b - a);

    // REMPLIR LE SELECT
    annees.forEach(annee => {
        const option = document.createElement("option");
        option.value = annee;
        option.textContent = annee;
        select.appendChild(option);
    });

    // FILTRE
    select.addEventListener("change", () => {
        const valeur = select.value;

        images.forEach(img => {
            const annee = new Date(img.dataset.date).getFullYear();

            if (valeur === "all" || annee == valeur) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
        });
    });

    // POPUP (ton code existant)
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDate = document.getElementById("popup-date");

    images.forEach(img => {
        img.addEventListener("click", () => {
            popup.classList.remove("hidden");

            popupImg.src = img.src;
            popupTitle.textContent = img.dataset.title;
            popupDate.textContent = img.dataset.date;
        });
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.add("hidden");
        }
    });
});
