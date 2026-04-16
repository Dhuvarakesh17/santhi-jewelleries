import sharp from "sharp";
async function makeFavicon() {
  await sharp("./public/images/logo.png")
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile("./public/favicon.png");
  console.log("Created public/favicon.png successfully.");
}
makeFavicon();
