const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "Images", "Galerie", "Tocut");
const outputDir = path.join(__dirname, "Images", "Galerie", "Thumbs");

// créer le dossier thumbs s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// extensions d’images acceptées
const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();

  if (!allowedExt.includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  sharp(inputPath)
    .resize(400, 400, {
      fit: "cover",        // recadre pour remplir 400x400
      position: "centre"   
      //position:"bottom"
      //position: "top"
      //position: "left"
      //position: "right"
    })
    .toFile(outputPath)
    .then(() => {
      console.log(`✔ Thumbnail créée : ${file}`);
    })
    .catch(err => {
      console.error(`❌ Erreur avec ${file}`, err);
    });
});

//node generate-thumbnails.js