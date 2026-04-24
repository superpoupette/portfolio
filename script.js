document.addEventListener("DOMContentLoaded", () => {
    const galerie = document.querySelector(".galerie");
    fetch("galeri.json")
          .then(res => res.json())
          .then(data => {
              const galerie = document.querySelector(".galerie");
              data.forEach(imgData => {
                  const img = document.createElement("img");
                  img.src = imgData.src;
                  img.dataset.date = imgData.date;
                  img.dataset.title = imgData.title;
                  img.dataset.perso = imgData.perso || "";
                  img.dataset.tags = imgData.tags || "";
                  galerie.appendChild(img);
              });
              initGalerie(); // on met le reste de ton code dedans
          });
    const selectAnnee = document.getElementById("filtre-annee");
    const selectPerso = document.getElementById("filtre-perso");
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

    // EXTRAIRE LES PERSOS
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

    // EXTRAIRE LES TAGS (SAFE + espaces gérés)
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

    // FILTRE COMBINÉ
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
    

    // POPUP
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

    // IMAGE CLICK
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

            // TAGS AVEC COULEURS PASTEL AUTOMATIQUES
            popupTags.innerHTML = [];

                // récupérer tags + persos
                const allTags = [
                    ...(img.dataset.tags
                        ? img.dataset.tags.split(",").map(t => t.trim())
                        : []),
                
                    ...(img.dataset.perso
                        ? img.dataset.perso.split(",").map(p => p.trim())
                        : [])
                ];
                
                // supprimer doublons éventuels
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

    // FERMETURE POPUP
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.add("hidden");
        }
    });

    // =========================
    // 🎨 COULEURS AUTOMATIQUES
    // =========================

    function stringToColor(str) {
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        const h = hash % 360;

        // couleur de base (vive mais contrôlée)
        return `hsl(${h}, 60%, 45%)`;
    }

    function lightenColor(hsl, percent) {
        return hsl.replace(/(\d+)%\)$/, (match, lightness) => {
            const newLight = Math.min(95, parseInt(lightness) + percent);
            return `${newLight}%)`;
        });
    }
});
