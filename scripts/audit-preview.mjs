// Audit the real served app without submitting contact data.
// Usage: node scripts/audit-preview.mjs <playwright-package.json> <chromium-exe> [base-url]
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(path.resolve(process.argv[2] || "package.json"));
const { chromium } = require("playwright");
const base = process.argv[4] || "http://127.0.0.1:5173";
const report = {
  base,
  pages: [],
  runtimeErrors: [],
  consoleWarnings: [],
  consoleErrors: [],
  failedRequests: [],
  httpErrors: [],
};
const browser = await chromium.launch({
  headless: true,
  executablePath: process.argv[3],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  page.on("pageerror", (error) => report.runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") report.consoleErrors.push(message.text());
    if (message.type() === "warning")
      report.consoleWarnings.push(message.text());
  });
  page.on("requestfailed", (request) =>
    report.failedRequests.push({
      url: request.url(),
      error: request.failure()?.errorText,
    }),
  );
  page.on("response", (response) => {
    if (response.status() >= 400)
      report.httpErrors.push({
        url: response.url(),
        status: response.status(),
      });
  });
  for (const route of [
    "/",
    "/projects/resumelens",
    "/projects/hr-signal-ai",
    "/projects/discoverbuddy",
    "/projects/ecosort",
    "/projects/campus-unify",
  ]) {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    await page.locator("h1").waitFor();
    await page.evaluate(async () => {
      for (const image of document.images) image.loading = "eager";
      await Promise.all([...document.images].map((image) => image.decode()));
    });
    assert.equal(response.status(), 200);
    const result = await page.evaluate(() => ({
      title: document.title,
      heading: document.querySelector("h1").innerText,
      scrollWidth: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    assert.ok(result.scrollWidth <= result.viewport);
    report.pages.push({ route, status: response.status(), ...result });
    if (route === "/")
      await page.screenshot({ path: "output/playwright/restored-preview.png" });
    if (route === "/projects/ecosort")
      await page.screenshot({
        path: "output/playwright/ecosort-case-study.png",
        fullPage: true,
      });
  }
  assert.deepEqual(report.runtimeErrors, []);
  assert.deepEqual(report.httpErrors, []);
  assert.deepEqual(report.consoleErrors, []);
  console.log(JSON.stringify(report, null, 2));
} finally {
  fs.mkdirSync("output/playwright", { recursive: true });
  fs.writeFileSync(
    "output/playwright/" +
      (new URL(base).port === "5173" ? "preview-audit" : "production-audit") +
      ".json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
