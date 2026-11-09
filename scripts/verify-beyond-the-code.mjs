// Targeted checks for factual content, course states, links and responsive layout.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(path.resolve(process.argv[2] || "package.json"));
const { chromium } = require("playwright");
const browser = await chromium.launch({
  headless: true,
  executablePath: process.argv[3],
});
const report = { layouts: [], errors: [], checks: [] };
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  page.on("pageerror", (e) => report.errors.push(e.message));
  for (const width of [360, 390, 768, 1024, 1101, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("http://127.0.0.1:5173/#beyond-the-code");
    await page
      .getByRole("heading", { name: "BEYOND THE CODE.", exact: true })
      .waitFor();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("#hackathons article").count(), 3);
    assert.equal(await page.locator("#community article").count(), 2);
    assert.equal(await page.locator("#coursework article:visible").count(), 2);
    assert.equal(
      await page
        .locator("#coursework img")
        .count(),
      0,
    );
    assert.equal(
      await page.locator("#coursework").getByRole("button", { name: /View certificate:/ }).count(),
      2,
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "No page overflow at " + width,
    );
    await page.locator("#coursework summary").click();
    assert.equal(await page.locator("#coursework details article:visible").count(), 9);
    const overflow = await page
      .locator("#beyond-the-code article:visible")
      .evaluateAll(
        (cards) =>
          cards.filter((c) => c.scrollWidth > c.clientWidth + 2).length,
      );
    assert.equal(overflow, 0, "No card text overflow at " + width);
    await page.locator("#coursework summary").click();
    await page
      .locator("#beyond-the-code")
      .screenshot({
        path: "output/playwright/beyond-the-code-" + width + ".png",
      });
    assert.deepEqual(await page.locator("#projects h3").allTextContents(), [
      "Campus Unify",
      "ResumeLens",
      "HR Signal AI",
      "DiscoverBuddy",
      "EcoSort",
    ]);
    report.layouts.push({
      width,
      groups: 3,
      hackathons: 3,
      events: 2,
      pinnedCertificates: 2,
      overflow: false,
    });
  }
  const first = page.locator("#hackathons article").first();
  await page.locator("#coursework summary").click();
  const triggers = page.locator("#coursework").getByRole("button", { name: /View certificate:/ });
  assert.equal(await triggers.count(), 11);
  assert.equal(await page.locator("#coursework details article:visible").count(), 9);
  assert.equal(await page.locator("#achievements button").count(), 0);
  for (const trigger of await triggers.all()) {
    const title = (await trigger.getAttribute("aria-label")).slice("View certificate: ".length);
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: title, exact: true });
    await dialog.locator('img[alt$=" certificate"], canvas[aria-busy="false"]').waitFor({ state: "visible" });
    const pdf = await dialog.getByRole("link", { name: "Open PDF", exact: true }).getAttribute("href");
    assert.equal(await dialog.getByRole("link", { name: "Download Certificate", exact: true }).getAttribute("href"), pdf);
    const downloadPromise = page.waitForEvent("download");
    await dialog.getByRole("link", { name: "Download Certificate", exact: true }).click();
    const download = await downloadPromise;
    assert.deepEqual(fs.readFileSync(await download.path()), fs.readFileSync("public" + pdf));
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    assert.ok(await trigger.evaluate((button) => button === document.activeElement));
  }
  report.checks.push("All eleven certificate previews render, original PDFs download, and Escape restores focus");
  assert.ok((await first.innerText()).includes("1ST PLACE"));
  assert.ok(
    (await first.innerText()).includes("College-level internal hackathon"),
  );
  assert.ok((await first.innerText()).includes("Code for India"));
  assert.equal(
    await first.locator("dt").filter({ hasText: "When" }).count(),
    0,
  );
  assert.equal(
    await page
      .locator("#coursework")
      .getByText("Pinned", { exact: true })
      .count(),
    2,
  );
  assert.ok(
    (await page.locator("#community").innerText()).includes(
      "October 19–20, 2026",
    ),
  );
  assert.ok(!(await page.locator("body").innerText()).includes("DIO XDIO"));
  await page
    .locator("#hackathons")
    .getByRole("link", { name: "Explore HR Signal AI", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Hackathon context", exact: true })
    .waitFor();
  assert.equal(
    await page
      .getByRole("heading", { name: "Technology & focus", exact: true })
      .count(),
    0,
  );
  assert.equal(
    await page
      .getByRole("link", { name: "Live project", exact: false })
      .getAttribute("href"),
    "https://6b02442f8d6b47bd8a5c24bdb79e69ef.prod.enter.pro",
  );
  await page.locator("article img").evaluate((image) => image.decode());
  await page.screenshot({
    path: "output/playwright/hr-signal-case-study.png",
    fullPage: true,
  });
  await page.goto("http://127.0.0.1:5173/#beyond-the-code");
  await page
    .locator("#hackathons")
    .getByRole("link", { name: "Explore Campus Unify", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Team & hackathon context", exact: true })
    .waitFor();
  await page.goto("http://127.0.0.1:5173/");
  await page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "Beyond code", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  assert.ok(page.url().endsWith("#beyond-the-code"));
  report.checks.push(
    "Internal-college SIH qualification; no invented date; correct team; two pinned credentials and a complete certificate list; both case-study links; keyboard navigation",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Mobile", exact: true })
    .getByRole("link", { name: "Beyond code", exact: true })
    .click();
  assert.equal(
    await page.getByRole("navigation", { name: "Mobile", exact: true }).count(),
    0,
  );
  report.checks.push(
    "Mobile Beyond code menu link closes menu and reaches section",
  );
  assert.deepEqual(report.errors, []);
  console.log(JSON.stringify(report, null, 2));
} finally {
  fs.writeFileSync(
    "output/playwright/beyond-the-code-report.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
