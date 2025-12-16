const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = path.join(__dirname, "../assets/images/originals/");
const outputFolder = path.join(__dirname, "../assets/images/");

//Amplades responsive, incloent 200px per mòbil molt petit
const sizes = [200, 335, 670, 1000, 1600]; 
const quality = 80; // qualitat WebP

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdirSync(inputFolder).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext).replace(/\s+/g, '-');

  //Ignorar fitxers que no siguin imatges
  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    console.log("No és imatge:", file);
    return;
  }

  //Genera totes les mides en WebP
  sizes.forEach(size => {
    const outputPath = path.join(outputFolder, `${base}-${size}.webp`);

    sharp(path.join(inputFolder, file))
      .resize({ width: size })
      .webp({ quality })
      .toFile(outputPath)
      .then(() => console.log(`GENERAT: ${outputPath}`))
      .catch(err => console.error("ERROR:", err));
  });
});

console.log("Processament finalitzat.");
