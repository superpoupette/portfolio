// ===== TABS PRINCIPALES =====

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

// ===== INFOS =====

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

// ===== GALERIE =====

document.addEventListener("DOMContentLoaded", async () => {

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

        img.src = item.thumbnail || item.src;
        img.alt = item.title || "";

        img.dataset.full = item.src;
        img.dataset.title = item.title || "";
        img.dataset.date = item.date || "";
        img.dataset.tags = JSON.stringify(item.tags || []);

        if (item.pos) {
            img.dataset.pos = item.pos;
        }

        container.appendChild(img);

    });

    // ===== POPUP =====

    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDate = document.getElementById("popup-date");
    const popupTags = document.getElementById("popup-tags");

    container.addEventListener("click", e => {
        console.log("clic détecté");

        if (e.target.tagName !== "IMG") return;
        console.log("image détectée");

        popupImg.src = e.target.dataset.full;

        popupTitle.textContent =
            e.target.dataset.title;

        popupDate.textContent =
            e.target.dataset.date;

        popupTags.innerHTML = "";

        const tags = JSON.parse(
            e.target.dataset.tags
        );

        tags.forEach(tag => {

            const span = document.createElement("span");

            span.textContent = tag;

            popupTags.appendChild(span);

        });

        popup.classList.remove("hidden");

    });

    popup.addEventListener("click", e => {

        if (
            e.target === popup
        ) {
            popup.classList.add("hidden");
        }

    });

});
