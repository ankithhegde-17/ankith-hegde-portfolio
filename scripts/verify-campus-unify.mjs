// Targeted layout/link checks for the Campus Unify portfolio addition.
// Usage: node scripts/verify-campus-unify.mjs <playwright-package.json> <chromium-exe>
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(path.resolve(process.argv[2] || "package.json"));
const { chromium } = require("playwright");
const report = { widths: [], runtimeErrors: [] };
const browser = await chromium.launch({
  headless: true,
  executablePath: process.argv[3],
});
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  page.on("pageerror", (error) => report.runtimeErrors.push(error.message));
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("http://127.0.0.1:5173/");
    const card = page
      .locator("#projects article")
      .filter({
        has: page.getByRole("heading", { name: "Campus Unify", exact: true }),
      });
    await card.scrollIntoViewIfNeeded();
    await card.locator("img").evaluate((image) => image.decode());
    await card.screenshot({
      path: "output/playwright/campus-card-" + width + ".png",
    });
    assert.equal(
      await card
        .getByRole("link", { name: "Live project", exact: false })
        .getAttribute("href"),
      "https://met.prayogmanch.in",
    );
    assert.equal(
      await card
        .getByRole("link", { name: "View source", exact: false })
        .getAttribute("href"),
      "https://github.com/ankithhegde-17/campus-unify",
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await card
      .getByRole("link", { name: "Explore project", exact: false })
      .click();
    await page
      .getByRole("heading", { name: "Team & hackathon context" })
      .waitFor();
    await page.locator("article img").evaluate((image) => image.decode());
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    assert.equal(
      await page
        .getByRole("heading", { name: "My contribution", exact: true })
        .count(),
      0,
    );
    await page.screenshot({
      path: "output/playwright/campus-page-" + width + ".png",
      fullPage: true,
    });
    report.widths.push({
      width,
      card: "pass",
      caseStudy: "pass",
      links: "pass",
      overflow: false,
    });
  }
  assert.deepEqual(report.runtimeErrors, []);
  console.log(JSON.stringify(report, null, 2));
} finally {
  fs.writeFileSync(
    "output/playwright/campus-unify-report.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
