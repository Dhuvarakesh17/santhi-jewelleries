import sharp from "sharp";
import path from "node:path";

const images = [
  "hero-section1.webp",
  "hero-section2.webp",
  "hero-section3.webp",
  "hero-section4.webp",
  "hero-section5.webp"
];

const dir = "./public/images/showcase";

async function processImages() {
  for (const img of images) {
    const inputPath = path.join(dir, img);
    const tempPath = path.join(dir, `temp-${img}`);
    
    try {
      console.log(`Processing ${img}...`);
      // Flop() flips horizontally (left-to-right)
      await sharp(inputPath)
        .flop() 
        .webp({ quality: 98 }) 
        .toFile(tempPath);
      
      // Move temp back to original
      import("node:fs/promises").then(fs => fs.rename(tempPath, inputPath));
      console.log(`Flipped and upgraded quality for ${img}`);
    } catch (err) {
      console.error(`Failed to process ${img}:`, err.message);
    }
  }
}

processImages();
