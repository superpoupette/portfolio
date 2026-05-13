document.addEventListener("DOMContentLoaded", () => {

    const image = document.getElementById("loupImage");

    const symbolesContainer =
        document.getElementById("symbolesContainer");

    const personnages = [

	    {
	        nom: "Chaperon",
	        fichier: "Chaperon.png",
	        symbole: "🌹"
	    },
	
	    {
	        nom: "Chasseur",
	        fichier: "Chasseur.jpg",
	        symbole: "🏹"
	    },
	
	    {
	        nom: "Corbeau",
	        fichier: "Corbeau.jpg",
	        symbole: "🐦"
	    },
	
	    {
	        nom: "Cupidon",
	        fichier: "Cupidon.jpg",
	        symbole: "❤"
	    },
	
	    {
	        nom: "Dictateur",
	        fichier: "Dictateur.png",
	        symbole: "👑"
	    },
	
	    {
	        nom: "Enfant loup",
	        fichier: "Enfant loup.jpg",
	        symbole: "🐺"
	    },
	
	    {
	        nom: "Garde",
	        fichier: "Garde.png",
	        symbole: "🛡"
	    },
	
	    {
	        nom: "Loup blanc",
	        fichier: "Loup blanc.png",
	        symbole: "🌕"
	    },
	
	    {
	        nom: "Loup noir",
	        fichier: "Loup noir.png",
	        symbole: "🌑"
	    },
	
	    {
	        nom: "Loup1",
	        fichier: "Loup1.jpg",
	        symbole: "⏾"
	    },
	
	    {
	        nom: "Loup2",
	        fichier: "Loup2.jpg",
	        icone: "icone_loup.png"
	    },
	
	    {
	        nom: "Loup3",
	        fichier: "Loup3.jpg",
	        symbole: "🐺"
	    },
	
	    {
	        nom: "Loup4",
	        fichier: "Loup4.jpg",
	        symbole: "🐺"
	    },
	
	    {
	        nom: "Maire",
	        fichier: "Maire.png",
	        symbole: "🎖"
	    },
	
	    {
	        nom: "Ours",
	        fichier: "Ours.png",
	        symbole: "🐻"
	    },
	
	    {
	        nom: "Petite fille",
	        fichier: "Petite fille.jpg",
	        icone : "icone_fille.png"
	    },
	
	    {
	        nom: "Pyro",
	        fichier: "Pyro.png",
	        symbole: "🔥"
	    },
	
	    {
	        nom: "Servante",
	        fichier: "Servante.png",
	        symbole: "🕯"
	    },
	
	    {
	        nom: "Soeur1",
	        fichier: "Soeur1.png",
	        symbole: "✿"
	    },
	
	    {
	        nom: "Soeur2",
	        fichier: "Soeur2.png",
	        symbole: "❀"
	    },
	
	    {
	        nom: "Sorciere",
	        fichier: "Sorciere.jpg",
	        symbole: "☀︎"
	    },
	
	    {
	        nom: "Villageois",
	        fichier: "Villageois.jpg",
	        symbole: "🏠"
	    },
	
	    {
	        nom: "Villageois2",
	        fichier: "Villageois2.png",
	        symbole: "🏡"
	    },
	
	    {
	        nom: "Voyante",
	        fichier: "Voyante.jpg",
	        symbole: "🔮"
	    }
	];
	
	/* image aléatoire */
    const randomIndex =
        Math.floor(Math.random() * personnages.length);

    image.src =
        `Images/Jeux/Loup/${personnages[randomIndex].fichier}`;

    /* création des symboles */
    const largeur = 450;
    const hauteur = 450;

    const perimetre =
        2 * (largeur + hauteur);

    personnages.forEach((perso, index) => {

        const bouton =
            document.createElement("button");

        bouton.className = "symbole";

        const icone = document.createElement("img");

		icone.src = `Images/Jeux/icones/${perso.icone}`;
		icone.alt = perso.nom;
		icone.className = "icone-loup";
		
		bouton.appendChild(icone);

        bouton.title = perso.nom;

        const position =
            (index / personnages.length)
            * perimetre;

        let x = 0;
        let y = 0;

        if (position < largeur) {

            x = position;
            y = 0;

        }

        else if (position < largeur + hauteur) {

            x = largeur;
            y = position - largeur;

        }

        else if (position < largeur * 2 + hauteur) {

            x =
                largeur -
                (position - largeur - hauteur);

            y = hauteur;

        }

        else {

            x = 0;

            y =
                hauteur -
                (position - largeur * 2 - hauteur);

        }

        bouton.style.left =
            `calc(50% - ${largeur/2}px + ${x}px - 18px)`;

        bouton.style.top =
            `calc(50% - ${hauteur/2}px + ${y}px - 18px)`;

        bouton.addEventListener("click", () => {

            image.src =
                `Images/Jeux/Loup/${perso.fichier}`;

        });

        symbolesContainer.appendChild(bouton);

    });

});
