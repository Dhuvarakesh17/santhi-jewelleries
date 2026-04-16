import sharp from "sharp";
async function getMeta() {
  const meta = await sharp("./public/images/logo.png").metadata();
  console.log(JSON.stringify(meta));
}
getMeta();
