const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

// Папка з твоїми оригінальними PNG
const inputDir = "./public/server-sequence";
// Папка, куди збережуться легкі WebP
const outputDir = "./public/server-sequence-webp";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach((file) => {
  if (file.endsWith(".png")) {
    sharp(path.join(inputDir, file))
      .resize(1920) // Опціонально: можна зменшити роздільну здатність для ще меншої ваги
      .webp({ quality: 80, effort: 6 }) // 80 - ідеальний баланс якості та розміру
      .toFile(path.join(outputDir, file.replace(".png", ".webp")))
      .then(() => console.log(`✅ Оптимізовано: ${file}`))
      .catch((err) => console.error(err));
  }
});
