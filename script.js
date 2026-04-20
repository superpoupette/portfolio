document.addEventListener("DOMContentLoaded", () => {
    const galerie = document.querySelector(".galerie");
    const images = Array.from(galerie.querySelectorAll("img"));
    const selectAnnee = document.getElementById("filtre-annee");
    const selectTag = document.getElementById("filtre-tag");

    // TRI PAR DATE
    images.sort((a, b) => {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
    });
    images.forEach(img => galerie.appendChild(img));

    // EXTRAIRE LES ANNÉES UNIQUES
    const annees = [...new Set(
        images.map(img => new Date(img.dataset.date).getFullYear())
    )].sort((a, b) => b - a);

    // REMPLIR LE SELECT ANNÉE
    annees.forEach(annee => {
        const option = document.createElement("option");
        option.value = annee;
        option.textContent = annee;
        selectAnnee.appendChild(option);
    });

    // EXTRAIRE LES TAGS UNIQUES
    const tags = [...new Set(
        images.flatMap(img => img.dataset.tags.split(","))
    )].map(tag => tag.trim());

    // REMPLIR LE SELECT TAG
    tags.forEach(tag => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        selectTag.appendChild(option);
    });

    // FONCTION FILTRE COMBINÉ
    function filtrer() {
        const anneeValue = selectAnnee.value;
        const tagValue = selectTag.value;

        images.forEach(img => {
            const annee = new Date(img.dataset.date).getFullYear();
            const tags = img.dataset.tags.split(",").map(t => t.trim());

            const matchAnnee = (anneeValue === "all" || annee == anneeValue);
            const matchTag = (tagValue === "all" || tags.includes(tagValue));

            if (matchAnnee && matchTag) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
        });
    }

    selectAnnee.addEventListener("change", filtrer);
    selectTag.addEventListener("change", filtrer);

    // POPUP
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDate = document.getElementById("popup-date");
    const popupTags = document.getElementById("popup-tags");

    images.forEach(img => {
        img.addEventListener("click", () => {
            popup.classList.remove("hidden");

            popupImg.src = img.src;
            popupTitle.textContent = img.dataset.title;
            popupDate.textContent = img.dataset.date;

            // AFFICHAGE DES TAGS EN "CHIPS"
            popupTags.innerHTML = "";

            img.dataset.tags.split(",").forEach(tag => {
                const span = document.createElement("span");
                span.textContent = tag.trim();
                popupTags.appendChild(span);
            });
        });
    });

    // FERMETURE POPUP
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.add("hidden");
        }
    });
});
