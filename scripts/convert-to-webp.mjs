import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SUPPORTED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".tif",
  ".tiff",
  ".bmp",
]);

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error(
    "Usage: npm run to:webp -- <inputPath> [outputPath] [--quality=80] [--recursive] [--delete-source]",
  );
  process.exit(1);
}

const inputPath = path.resolve(args[0]);
const outputPathArg = args[1] && !args[1].startsWith("--") ? args[1] : null;
const outputPath = outputPathArg ? path.resolve(outputPathArg) : null;

const qualityArg = args.find((arg) => arg.startsWith("--quality="));
const quality = qualityArg ? Number(qualityArg.split("=")[1]) : 82;
const recursive = args.includes("--recursive");
const deleteSource = args.includes("--delete-source");

if (Number.isNaN(quality) || quality < 1 || quality > 100) {
  console.error("Invalid quality. Use a number between 1 and 100.");
  process.exit(1);
}

const toWebpPath = (sourceFile, sourceBase, targetBase) => {
  const relativePath = path.relative(sourceBase, sourceFile);
  const parsed = path.parse(relativePath);
  return path.join(targetBase, parsed.dir, `${parsed.name}.webp`);
};

const ensureDir = async (filePath) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
};

const convertImage = async (sourceFile, sourceBase, targetBase) => {
  const targetFile = toWebpPath(sourceFile, sourceBase, targetBase);
  await ensureDir(targetFile);

  await sharp(sourceFile).webp({ quality }).toFile(targetFile);

  if (deleteSource) {
    await fs.unlink(sourceFile);
  }

  console.log(`Converted: ${sourceFile} -> ${targetFile}`);
};

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (recursive) {
        files.push(...(await walk(fullPath)));
      }
      continue;
    }

    if (SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
};

const run = async () => {
  try {
    const inputStats = await fs.stat(inputPath);

    if (inputStats.isFile()) {
      const ext = path.extname(inputPath).toLowerCase();
      if (!SUPPORTED_EXTENSIONS.has(ext)) {
        console.error(`Unsupported file type: ${ext}`);
        process.exit(1);
      }

      const sourceBase = path.dirname(inputPath);
      const targetBase = outputPath || sourceBase;
      await convertImage(inputPath, sourceBase, targetBase);
      return;
    }

    if (inputStats.isDirectory()) {
      const sourceBase = inputPath;
      const targetBase = outputPath || inputPath;
      const imageFiles = await walk(inputPath);

      if (imageFiles.length === 0) {
        console.log("No supported images found to convert.");
        return;
      }

      for (const imageFile of imageFiles) {
        await convertImage(imageFile, sourceBase, targetBase);
      }

      console.log(`Done. Converted ${imageFiles.length} file(s).`);
      return;
    }

    console.error("Input path is neither a file nor directory.");
    process.exit(1);
  } catch (error) {
    console.error("Conversion failed:", error.message);
    process.exit(1);
  }
};

run();
