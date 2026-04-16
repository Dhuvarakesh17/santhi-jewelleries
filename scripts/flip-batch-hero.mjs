import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const dir = "d:/CREINX/New folder/santhi-jewelleries/public/images/showcase";
const images = ["hero-section11.webp", "hero-section10.webp", "hero-section8.webp", "hero-section7.webp"];

async function flipImages() {
  for (const imgName of images) {
    const fullPath = path.join(dir, imgName);
    try {
      await fs.access(fullPath);
      const buffer = await fs.readFile(fullPath);
      await sharp(buffer)
        .flop()
        .toFile(fullPath + ".new");
      await fs.rename(fullPath + ".new", fullPath);
      console.log(`Flipped ${imgName} successfully.`);
    } catch (err) {
      console.error(`Skipping ${imgName}: ${err.message}`);
    }
  }
}

flipImages();
