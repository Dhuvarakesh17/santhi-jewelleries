import sharp from "sharp";
async function getColor() {
  const { channels } = await sharp("C:/Users/Sowmika H/.gemini/antigravity/brain/e02d4aeb-afac-4291-9359-ce086a31bf61/media__1776337960496.png").stats();
  const r = Math.round(channels[0].mean);
  const g = Math.round(channels[1].mean);
  const b = Math.round(channels[2].mean);
  const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  console.log(hex);
}
getColor();
