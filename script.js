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

    // EXTRAIRE LES ANNÉES
    const annees = [...new Set(
        images.map(img => new Date(img.dataset.date).getFullYear())
    )].sort((a, b) => b - a);

    annees.forEach(annee => {
        const option = document.createElement("option");
        option.value = annee;
        option.textContent = annee;
        selectAnnee.appendChild(option);
    });

    // EXTRAIRE LES TAGS (SAFE)
    const tags = [...new Set(
        images.flatMap(img => {
            if (!img.dataset.tags) return [];
            return img.dataset.tags.split(",").map(t => t.trim());
        })
    )];

    tags.forEach(tag => {
        if (tag === "") return;

        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        selectTag.appendChild(option);
    });

    // FILTRE COMBINÉ
    function filtrer() {
        const anneeValue = selectAnnee.value;
        const tagValue = selectTag.value;

        images.forEach(img => {
            const annee = new Date(img.dataset.date).getFullYear();

            const tags = img.dataset.tags
                ? img.dataset.tags.split(",").map(t => t.trim())
                : [];

            const matchAnnee = (anneeValue === "all" || annee == anneeValue);
            const matchTag = (tagValue === "all" || tags.includes(tagValue));

            img.style.display = (matchAnnee && matchTag) ? "block" : "none";
        });
    }

    selectAnnee.addEventListener("change", filtrer);
    selectTag.addEventListener("change", filtrer);

    // POPUP
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDate = document.getElementById("popup-date");

    // ⚠️ IMPORTANT → créer popup-tags s'il n'existe pas
    let popupTags = document.getElementById("popup-tags");

    if (!popupTags) {
        popupTags = document.createElement("div");
        popupTags.id = "popup-tags";
        document.querySelector(".popup-info").appendChild(popupTags);
    }

    images.forEach(img => {
        img.addEventListener("click", () => {
            popup.classList.remove("hidden");

            popupImg.src = img.src;
            popupTitle.textContent = img.dataset.title;
            popupDate.textContent = img.dataset.date;

            // TAGS
            popupTags.innerHTML = "";

            if (img.dataset.tags) {
                img.dataset.tags.split(",").forEach(tag => {
                    const span = document.createElement("span");
                    span.textContent = tag.trim();
                    popupTags.appendChild(span);
                });
            }
        });
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.add("hidden");
        }
    });
});
