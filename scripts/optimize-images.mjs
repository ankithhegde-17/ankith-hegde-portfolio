// Generate web-sized derivatives while keeping every original asset intact.
// Usage: node scripts/optimize-images.mjs <playwright-package.json> <chromium-exe>
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(path.resolve(process.argv[2] || "package.json"));
const { chromium } = require("playwright");
const browser = await chromium.launch({
  headless: true,
  executablePath: process.argv[3],
});
try {
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5173/");
  fs.mkdirSync("public/assets/optimized", { recursive: true });
  const results = [];
  for (const name of fs
    .readdirSync("public/assets")
    .filter((n) => /\.(png|jpe?g)$/i.test(n))) {
    const result = await page.evaluate(async (name) => {
      const image = new Image();
      image.src = "/assets/" + name;
      await image.decode();
      const scale = Math.min(1, 1440 / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas
        .getContext("2d")
        .drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/webp", 0.86).split(",")[1];
    }, name);
    const target = "public/assets/optimized/" + path.parse(name).name + ".webp";
    fs.writeFileSync(target, Buffer.from(result, "base64"));
    results.push({
      name,
      original: fs.statSync("public/assets/" + name).size,
      optimized: fs.statSync(target).size,
    });
  }
  fs.writeFileSync(
    "docs/image-optimization.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    JSON.stringify({
      images: results.length,
      originalBytes: results.reduce((s, r) => s + r.original, 0),
      optimizedBytes: results.reduce((s, r) => s + r.optimized, 0),
    }),
  );
} finally {
  await browser.close();
}
