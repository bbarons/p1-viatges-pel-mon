const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "../assets/images/originals/";
const outputFolder = "../assets/images/";

const sizes = [335, 670, 1000]; //amplades responsive

//Crea output si no existeix
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdirSync(inputFolder).forEach(file => {

  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);

  //Ignorar fitxers que no siguin imatges
  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    console.log("No és imatge):", file);
    return;
  }

  sizes.forEach(size => {
    const outputPath = `${outputFolder}${base}-${size}.webp`;

    sharp(`${inputFolder}${file}`)
      .resize({ width: size })
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => console.log("GENERAT:", outputPath))
      .catch(err => console.error("ERROR:", err));
  });

});
