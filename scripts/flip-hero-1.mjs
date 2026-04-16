import sharp from "sharp";
import fs from "node:fs/promises";

async function flipImage() {
  const path = "d:/CREINX/New folder/santhi-jewelleries/public/images/showcase/hero-section1.webp";
  const buffer = await fs.readFile(path);
  await sharp(buffer)
    .flop()
    .toFile(path + ".new");
  await fs.rename(path + ".new", path);
  console.log("Flipped hero-section1.webp successfully.");
}

flipImage();
