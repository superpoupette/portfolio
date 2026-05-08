const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// DOSSIERS
const inputDir = path.join(__dirname, "Images", "Galerie", "Full");
const outputDir = path.join(__dirname, "Images", "Galerie", "Thumbs");

// JSON
const jsonPath = path.join(__dirname, "galerie.json");

// créer le dossier thumbs s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// extensions acceptées
const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];

// =============================
// GENERATION DES THUMBNAILS
// =============================

const files = fs.readdirSync(inputDir);

files.forEach((file) => {
  const ext = path.extname(file).toLowerCase();

  if (!allowedExt.includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  sharp(inputPath)
    .resize(400, 400, {
      fit: "cover",
      position: "center"
    })
    .toFile(outputPath)
    .then(() => {
      console.log(`✔ Thumbnail créée : ${file}`);
    })
    .catch((err) => {
      console.error(`❌ Erreur avec ${file}`, err);
    });
});

// =============================
// MISE A JOUR DU JSON
// =============================

try {
  const rawData = fs.readFileSync(jsonPath, "utf8");
  const jsonData = JSON.parse(rawData);

  const updatedData = jsonData.map((item) => {
    const fileName = path.basename(item.src);

    return {
      ...item,
      thumbnail: `/portfolio/Images/Galerie/Thumbs/${fileName}`
    };
  });

  fs.writeFileSync(
    jsonPath,
    JSON.stringify(updatedData, null, 2),
    "utf8"
  );

  console.log("✔ JSON mis à jour");

} catch (err) {
  console.error("❌ Erreur JSON :", err);
}