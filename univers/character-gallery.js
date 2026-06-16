document.addEventListener("DOMContentLoaded", async () => {

    // =========================
    // TABS PRINCIPALES
    // =========================

    const tabs = document.querySelectorAll(".character-card__tab");
    const contents = document.querySelectorAll(".character-card__tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");

            document
                .getElementById(tab.dataset.tab)
                .classList.add("active");
        });
    });

    // =========================
    // TABS INFOS
    // =========================

    const infoTabs = document.querySelectorAll(
        ".character-card__info-tab:not(.spotify-btn)"
    );

    const infoContents = document.querySelectorAll(
        ".character-card__info-content"
    );

    infoTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            infoTabs.forEach(t => t.classList.remove("active"));
            infoContents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");

            document
                .getElementById(tab.dataset.info)
                .classList.add("active");
        });
    });

    // =========================
    // GALERIE
    // =========================

    const container = document.querySelector(".gallery--character");

    if (!container) return;

    const personnage = container.dataset.character;

    const response = await fetch("../galerie.json");
    const data = await response.json();

    const images = data.filter(item =>
        item.perso &&
        item.perso.includes(personnage)
    );

    images.sort(
        (a, b) =>
            new Date(b.date) - new Date(a.date)
    );

    images.forEach(item => {

        const img = document.createElement("img");

        // miniature
        img.src = item.thumbnail || item.src;

        // image HD popup
        img.dataset.full = item.src;

        img.alt = item.title || "";

        img.dataset.title = item.title || "";
        img.dataset.date = item.date || "";

        img.dataset.tags =
            (item.tags || []).join(",");

        img.dataset.perso =
            (item.perso || []).join(",");

        img.loading = "lazy";
        img.decoding = "async";

        if (item.pos) {
            img.dataset.pos = item.pos;
        }

        container.appendChild(img);
    });

    // =========================
    // POPUP
    // =========================

    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDate = document.getElementById("popup-date");

    let popupTags = document.getElementById("popup-tags");

    if (!popupTags) {

        popupTags = document.createElement("div");
        popupTags.id = "popup-tags";

        const popupInfo =
            document.querySelector(".popup-info");

        if (popupInfo) {
            popupInfo.appendChild(popupTags);
        }
    }

    container.addEventListener("click", e => {

        if (e.target.tagName !== "IMG") return;

        popup.classList.remove("hidden");

        popupImg.removeAttribute("src");

        popupImg.src =
            e.target.dataset.full || e.target.src;

        popupTitle.textContent =
            e.target.dataset.title || "";

        // =========================
        // DATE FORMATÉE
        // =========================

        const dateObj =
            new Date(e.target.dataset.date);

        if (!isNaN(dateObj)) {

            popupDate.textContent =
                dateObj.toLocaleDateString(
                    "fr-FR",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );

        } else {

            popupDate.textContent = "";
        }

        // =========================
        // TAGS
        // =========================

        popupTags.innerHTML = "";

        const allTags = [

            ...(e.target.dataset.tags
                ? e.target.dataset.tags
                    .split(",")
                    .map(t => t.trim())
                : []),

            ...(e.target.dataset.perso
                ? e.target.dataset.perso
                    .split(",")
                    .map(p => p.trim())
                : [])
        ];

        const uniqueTags =
            [...new Set(allTags)];

        uniqueTags.forEach(tag => {

            if (!tag) return;

            const span =
                document.createElement("span");

            span.textContent = tag;

            const color =
                stringToColor(tag);

            span.style.backgroundColor =
                lightenColor(color, 70);

            span.style.color = color;

            popupTags.appendChild(span);
        });
    });

    // =========================
    // FERMETURE POPUP
    // =========================

    popup.addEventListener("click", e => {

        if (e.target === popup) {

            popup.classList.add("hidden");

            popupImg.removeAttribute("src");
        }
    });

    // =========================
    // COULEURS TAGS
    // =========================

    function stringToColor(str) {

        let hash = 0;

        for (let i = 0; i < str.length; i++) {

            hash =
                str.charCodeAt(i) +
                ((hash << 5) - hash);
        }

        const h = hash % 360;

        return `hsl(${h}, 60%, 45%)`;
    }

    function lightenColor(hsl, percent) {

        return hsl.replace(
            /(\d+)%\)$/,
            (match, lightness) => {

                const newLight =
                    Math.min(
                        95,
                        parseInt(lightness) + percent
                    );

                return `${newLight}%)`;
            }
        );
    }

});
