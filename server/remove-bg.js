import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/Ali Public School-logo.png');
const outputPath = path.join(__dirname, '../public/Ali Public School-logo.png');
const backupPath = path.join(__dirname, '../public/Ali Public School-logo-original.png');

async function removeWhiteBackground() {
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
    console.log('Backed up original logo to:', backupPath);
  }

  const { data, info } = await sharp(backupPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Image info: ${width}x${height}, channels: ${channels}`);

  // Loop through pixels and make white/near-white pixels transparent
  // Also apply subtle alpha feathering around edges for smooth blending
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check if pixel is white or near white
    // In JPEG/PNG artifacts, near white can be > 235
    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);
    const isGrayish = (maxVal - minVal) < 18;

    if (minVal > 240 && isGrayish) {
      // Completely transparent
      data[i + 3] = 0;
    } else if (minVal > 220 && isGrayish) {
      // Smooth alpha transition to avoid jagged edges
      const alpha = Math.round(((240 - minVal) / 20) * 255);
      data[i + 3] = Math.min(data[i + 3], alpha);
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
  .png({ quality: 95, compressionLevel: 8 })
  .toFile(outputPath);

  console.log('Background removed successfully and saved to:', outputPath);
}

removeWhiteBackground().catch(console.error);
