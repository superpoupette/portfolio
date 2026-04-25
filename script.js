document.addEventListener("DOMContentLoaded", async () => {
    const galerie = document.querySelector(".galerie");
    const selectAnnee = document.getElementById("filtre-annee");
    const selectPerso = document.getElementById("filtre-perso");
    const selectTag = document.getElementById("filtre-tag");

    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDate = document.getElementById("popup-date");

    let popupTags = document.getElementById("popup-tags");

    if (!popupTags) {
        popupTags = document.createElement("div");
        popupTags.id = "popup-tags";
        document.querySelector(".popup-info").appendChild(popupTags);
    }

    // =========================
    // 📦 CHARGEMENT JSON
    // =========================
    const response = await fetch("galerie.json");
    const data = await response.json();
    galerie.innerHTML = "";

    // =========================
    // 🖼️ CRÉATION IMAGES
    // =========================
    const images = [];

    data.forEach(item => {
        const img = document.createElement("img");

        img.src = item.src;
        img.dataset.date = item.date;
        img.dataset.title = item.title;
        img.dataset.perso = (item.perso || []).join(",");
        img.dataset.tags = (item.tags || []).join(",");

        galerie.appendChild(img);
        images.push(img);
    });

    // =========================
    // 📅 TRI PAR DATE
    // =========================
    images.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
    images.forEach(img => galerie.appendChild(img));

    // =========================
    // 📅 ANNÉES
    // =========================
    const annees = [...new Set(
        images.map(img => new Date(img.dataset.date).getFullYear())
    )].sort((a, b) => b - a);

    annees.forEach(annee => {
        const option = document.createElement("option");
        option.value = annee;
        option.textContent = annee;
        selectAnnee.appendChild(option);
    });

    // =========================
    // 👤 PERSOS
    // =========================
    const persos = [...new Set(
        images.flatMap(img => {
            if (!img.dataset.perso) return [];
            return img.dataset.perso.split(",").map(p => p.trim());
        })
    )].filter(p => p !== "");

    persos.forEach(perso => {
        const option = document.createElement("option");
        option.value = perso;
        option.textContent = perso;
        selectPerso.appendChild(option);
    });

    // =========================
    // 🏷️ TAGS
    // =========================
    const tags = [...new Set(
        images.flatMap(img => {
            if (!img.dataset.tags) return [];
            return img.dataset.tags.split(",").map(t => t.trim());
        })
    )].filter(t => t !== "");

    tags.forEach(tag => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        selectTag.appendChild(option);
    });

    // =========================
    // 🔎 FILTRES
    // =========================
    function filtrer() {
        const anneeValue = selectAnnee.value;
        const tagValue = selectTag.value;
        const persoValue = selectPerso.value;

        images.forEach(img => {
            const annee = new Date(img.dataset.date).getFullYear();

            const imgTags = img.dataset.tags
                ? img.dataset.tags.split(",").map(t => t.trim())
                : [];

            const imgPersos = img.dataset.perso
                ? img.dataset.perso.split(",").map(p => p.trim())
                : [];

            const matchAnnee = (anneeValue === "all" || annee == anneeValue);
            const matchTag = (tagValue === "all" || imgTags.includes(tagValue));
            const matchPerso = (persoValue === "all" || imgPersos.includes(persoValue));

            img.style.display = (matchAnnee && matchTag && matchPerso)
                ? "block"
                : "none";
        });
    }

    selectAnnee.addEventListener("change", filtrer);
    selectPerso.addEventListener("change", filtrer);
    selectTag.addEventListener("change", filtrer);

    // =========================
    // 🖱️ POPUP
    // =========================
    images.forEach(img => {
        img.addEventListener("click", () => {
            popup.classList.remove("hidden");

            popupImg.src = img.src;
            popupTitle.textContent = img.dataset.title;

            const dateObj = new Date(img.dataset.date);

            popupDate.textContent = dateObj.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });

            // TAGS
            popupTags.innerHTML = "";

            const allTags = [
                ...(img.dataset.tags
                    ? img.dataset.tags.split(",").map(t => t.trim())
                    : []),

                ...(img.dataset.perso
                    ? img.dataset.perso.split(",").map(p => p.trim())
                    : [])
            ];

            const uniqueTags = [...new Set(allTags)];

            uniqueTags.forEach(tag => {
                const span = document.createElement("span");
                span.textContent = tag;

                const color = stringToColor(tag);

                span.style.backgroundColor = lightenColor(color, 70);
                span.style.color = color;

                popupTags.appendChild(span);
            });
        });
    });

    // =========================
    // ❌ FERMETURE POPUP
    // =========================
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.add("hidden");
        }
    });

    // =========================
    // 🎨 COULEURS
    // =========================
    function stringToColor(str) {
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        const h = hash % 360;
        return `hsl(${h}, 60%, 45%)`;
    }

    function lightenColor(hsl, percent) {
        return hsl.replace(/(\d+)%\)$/, (match, lightness) => {
            const newLight = Math.min(95, parseInt(lightness) + percent);
            return `${newLight}%)`;
        });
    }
});
