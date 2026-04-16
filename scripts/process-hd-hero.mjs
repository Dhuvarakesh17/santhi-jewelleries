import sharp from "sharp";
import path from "node:path";

const images = [
  { in: "hero-section1.jpg", out: "hero-hd-1.webp" },
  { in: "hero-section2.jpeg", out: "hero-hd-2.webp" },
  { in: "hero-section3.jpeg", out: "hero-hd-3.webp" },
  { in: "hero-section4.jpg", out: "hero-hd-4.webp" },
  { in: "hero-section5.jpeg", out: "hero-hd-5.webp" },
];

const dir = "./public/images/showcase";

async function processImages() {
  for (const item of images) {
    const inputPath = path.join(dir, item.in);
    const outputPath = path.join(dir, item.out);
    
    try {
      console.log(`Processing ${item.in} -> ${item.out}...`);
      await sharp(inputPath)
        .flop() // Flip horizontally to move subject to the right
        .webp({ 
          quality: 98,
          lossless: false,
          smartSubsample: true
        }) 
        .toFile(outputPath);
      console.log(`Success: ${item.out}`);
    } catch (err) {
      console.error(`Failed ${item.in}:`, err.message);
    }
  }
}

processImages();
