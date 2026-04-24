document.addEventListener("DOMContentLoaded", () => {

    const galerie = document.querySelector(".galerie");
    const images = Array.from(galerie.querySelectorAll("img"));

    const selectAnnee = document.getElementById("filtre-annee");
    const selectPerso = document.getElementById("filtre-perso");
    const selectTag = document.getElementById("filtre-tag");

    // ===== TRI =====
    images.sort((a, b) =>
        new Date(b.dataset.date) - new Date(a.dataset.date)
    );

    images.forEach(img => galerie.appendChild(img));

    // ===== ANNÉES =====
    const annees = [...new Set(
        images.map(img => new Date(img.dataset.date).getFullYear())
    )].sort((a, b) => b - a);

    annees.forEach(annee => {
        const opt = document.createElement("option");
        opt.value = annee;
        opt.textContent = annee;
        selectAnnee.appendChild(opt);
    });

    // ===== PERSOS =====
    const persos = [...new Set(
        images.flatMap(img =>
            img.dataset.perso
                ? img.dataset.perso.split(",").map(p => p.trim())
                : []
        )
    )];

    persos.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        selectPerso.appendChild(opt);
    });

    // ===== TAGS =====
    const tags = [...new Set(
        images.flatMap(img =>
            img.dataset.tags
                ? img.dataset.tags.split(",").map(t => t.trim())
                : []
        )
    )];

    tags.forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        selectTag.appendChild(opt);
    });

    // ===== FILTRE =====
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

            const matchAnnee = anneeValue === "all" || annee == anneeValue;
            const matchTag = tagValue === "all" || imgTags.includes(tagValue);
            const matchPerso = persoValue === "all" || imgPersos.includes(persoValue);

            img.style.display =
                (matchAnnee && matchTag && matchPerso)
                    ? "block"
                    : "none";
        });
    }

    selectAnnee.addEventListener("change", filtrer);
    selectTag.addEventListener("change", filtrer);
    selectPerso.addEventListener("change", filtrer);

});
