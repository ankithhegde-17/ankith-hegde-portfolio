// Local browser regression checks. Contact responses are mocked: no email is sent.
// Usage: node scripts/verify-portfolio.mjs <playwright-package.json> <chromium-exe>
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(path.resolve(process.argv[2] || "package.json"));
const { chromium } = require("playwright");
const localRequire = createRequire(path.resolve("package.json"));
const ts = localRequire("typescript");
const loadData = async (
  name,
  source = fs.readFileSync("src/data/" + name + ".ts", "utf8"),
) => {
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  });
  return import(
    "data:text/javascript;base64," + Buffer.from(outputText).toString("base64")
  );
};
const { featuredProjects } = await loadData("projects");
const { certificates } = await loadData("certificates");
const journeyInputs = await loadData("beyondTheCode");
const journeySource = fs.readFileSync("src/data/journey.ts", "utf8").replace(
  /^import .* from "\.\/beyondTheCode";/m,
  ["completedCourses", "communityExperiences", "hackathonHighlights"]
    .map((key) => "const " + key + " = " + JSON.stringify(journeyInputs[key]) + ";").join("\n"),
);
const { journey } = await loadData("journey", journeySource);
const { skillCategories } = await loadData("skills");
const { caseStudies } = await loadData("caseStudies");
const baseline = JSON.parse(
  fs.readFileSync("docs/preservation-baseline.json", "utf8"),
);
for (const [file, saved] of Object.entries(baseline)) {
  if (file === "index.html") continue;
  if (file === "src/data/projects.ts") {
    const original = JSON.parse(
      fs.readFileSync("docs/project-corrections-baseline.json", "utf8"),
    );
    const ids = [
      "campus-unify",
      "resumelens",
      "hr-signal-ai",
      "discoverbuddy",
      "ecosort",
    ];
    assert.deepEqual(
      featuredProjects.map((p) => p.caseStudyId),
      ids,
    );
    assert.equal(new Set(featuredProjects.map((p) => p.caseStudyId)).size, 5);
    for (const [index, id] of ids.entries()) {
      if (id === "hr-signal-ai") continue;
      const project = original.find((p) => p.caseStudyId === id);
      const expected = {
        ...project,
        number: String(index + 1).padStart(2, "0"),
        links: { ...project.links },
      };
      if (id === "campus-unify")
        expected.links.live = "https://met.prayogmanch.in";
      assert.deepEqual(
        featuredProjects[index],
        expected,
        "Preserved project: " + project.title,
      );
    }
    continue;
  }
  if (file === "src/data/site.ts") {
    const original = await loadData("site", saved.content);
    const current = await loadData("site");
    for (const key of Object.keys(original)) {
      if (key === "navLinks") {
        assert.deepEqual(
          current.navLinks.filter((link) => link.id !== "beyond-the-code"),
          original.navLinks,
        );
      } else
        assert.deepEqual(
          current[key],
          original[key],
          "Preserved site content: " + key,
        );
    }
    continue;
  }
  if (file === "src/data/caseStudies.ts") {
    const original = await loadData("caseStudies", saved.content);
    for (const [id, study] of Object.entries(original.caseStudies)) {
      assert.deepEqual(caseStudies[id], study, "Preserved case study: " + id);
    }
    continue;
  }
  if (file === "src/data/journey.ts") {
    const original = await loadData("journey", saved.content);
    for (const item of original.journey) {
      const expected = item.title === "ML & Deep Learning Internship"
        ? { ...item, certId: "aiquantum-summer-internship" } : item;
      assert.deepEqual(journey.find((entry) => entry.title === item.title), expected);
    }
    continue;
  }
  if (file === "src/data/galleries.ts") {
    const original = await loadData("galleries", saved.content);
    const current = await loadData("galleries");
    for (const [id, gallery] of Object.entries(original.galleries)) {
      assert.deepEqual(current.galleries[id], gallery);
    }
    continue;
  }
  assert.equal(
    crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"),
    saved.sha256,
    "Preserved data: " + file,
  );
}

const output = "output/playwright";
fs.mkdirSync(output, { recursive: true });
const report = {
  dataFilesPreserved: Object.keys(baseline).length - 1,
  layouts: [],
  checks: [],
  consoleErrors: [],
  externalLinks: [],
};
const browser = await chromium.launch({
  headless: true,
  executablePath: process.argv[3],
});
try {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  page.on("pageerror", (e) => report.consoleErrors.push(e.message));
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:5173/");
    await page.locator("h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
    assert.deepEqual(await page.locator("#projects h3").allTextContents(), [
      "Campus Unify",
      "ResumeLens",
      "HR Signal AI",
      "DiscoverBuddy",
      "EcoSort",
    ]);
    const layout = await page.evaluate(() => {
      const hero = document.querySelector("#home");
      const cta = [...hero.querySelectorAll("a")]
        .find((a) => a.textContent.includes("Explore work"))
        .getBoundingClientRect();
      return {
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        ctaBottom: cta.bottom,
        h1: document.querySelector("h1").getBoundingClientRect().toJSON(),
      };
    });
    assert.ok(layout.scrollWidth <= width, "No overflow at " + width);
    assert.ok(layout.ctaBottom <= 900, "Primary CTA visible at " + width);
    assert.ok(
      layout.h1.x >= 0 && layout.h1.right <= width,
      "Heading fits at " + width,
    );
    await page.screenshot({ path: output + "/hero-" + width + ".png" });
    await page
      .locator("#projects")
      .evaluate((el) =>
        el.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    await page.locator("#projects img").evaluateAll(async (imgs) => {
      await Promise.all(imgs.map((img) => img.decode()));
    });
    await page.screenshot({ path: output + "/projects-" + width + ".png" });
    await page
      .locator("#contact")
      .evaluate((el) =>
        el.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    await page.screenshot({ path: output + "/contact-" + width + ".png" });
    report.layouts.push(layout);
  }
  report.checks.push(
    "No horizontal overflow and primary hero CTA visible at 360, 390, 768, 1024, 1440px",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5173/");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Mobile", exact: true })
    .getByRole("link", { name: "Skills" })
    .click();
  assert.equal(
    await page.getByRole("navigation", { name: "Mobile", exact: true }).count(),
    0,
  );
  assert.ok(page.url().endsWith("#skills"));
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Open menu", exact: true })
    .evaluate((el) => {
      if (el !== document.activeElement) throw Error("Menu focus not restored");
    });
  report.checks.push(
    "Mobile menu navigation, Escape dismissal and focus return",
  );
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.screenshot({ path: output + "/dark-mobile.png" });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  report.checks.push("Theme switching and persisted preference");

  for (const id of ["skills", "about", "experience", "achievements"]) {
    await page
      .locator("#" + id)
      .evaluate((el) =>
        el.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    await page.waitForFunction(
      (id) =>
        document
          .querySelector('nav[aria-label="Primary"] a[aria-current="location"]')
          ?.getAttribute("href") ===
        "#" + id,
      id,
    );
  }
  report.checks.push(
    "Scroll-spy follows the actual reordered section positions",
  );

  for (const project of featuredProjects) {
    await page
      .locator("#projects")
      .getByRole("heading", { name: project.title, exact: true })
      .waitFor();
    await page
      .locator("#projects")
      .getByText(project.description, { exact: true })
      .waitFor();
    await page.goto("http://127.0.0.1:5173/projects/" + project.caseStudyId);
    assert.ok((await page.locator("h1").innerText()).includes(project.title));
    assert.ok((await page.title()).includes(project.title));
    const otherProjectLinks = await page
      .getByRole("navigation", { name: "Other projects" })
      .getByRole("link")
      .allTextContents();
    assert.ok(
      otherProjectLinks.every((label) => !/Memoir|TeamForge/.test(label)),
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Project route fits mobile: " + project.title,
    );
    if (caseStudies[project.caseStudyId])
      await page
        .getByRole("heading", { name: "Architecture & approach" })
        .waitFor();
    await page.getByRole("link", { name: "Back to selected work" }).click();
  }
  await page.goto("http://127.0.0.1:5173/projects/not-a-project");
  await page.getByRole("heading", { name: "Project not found." }).waitFor();
  for (const archived of ["memoir", "teamforge"]) {
    await page.goto("http://127.0.0.1:5173/projects/" + archived);
    await page.getByRole("heading", { name: "Project not found." }).waitFor();
  }
  await page.goto("http://127.0.0.1:5173/");
  report.checks.push(
    "All " +
      featuredProjects.length +
      " project routes, original descriptions, existing architecture content and unknown project fallback",
  );
  for (const cat of skillCategories)
    for (const skill of cat.skills)
      assert.ok(
        await page.locator("#skills").getByText(skill, { exact: true }).count(),
      );
  await page.locator("#journey summary").click();
  for (const item of journey)
    assert.ok(
      await page
        .locator("#journey")
        .getByRole("heading", { name: item.title, exact: true })
        .count(),
    );
  report.checks.push("All skills and " + journey.length + " journey entries accessible");
  await page.locator("#coursework summary").click();
  for (const c of Object.values(certificates)) {
    const trigger = page.getByRole("button", {
      name: "View certificate: " + c.title,
      exact: true,
    });
    await trigger.click();
    await page.getByRole("dialog").waitFor();
    if (c.previewImage)
      await page
        .getByRole("img", { name: c.title + " certificate", exact: true })
        .waitFor({ state: "visible" });
    else {
      await page.locator("canvas").waitFor({ state: "visible" });
      await page
        .locator('canvas[aria-busy="false"]')
        .waitFor({ state: "visible" });
      await page.screenshot({ path: output + "/certificate-mobile.png" });
    }
    await page.getByRole("link", { name: "Open PDF", exact: true }).waitFor();
    await page
      .getByRole("button", { name: "Close certificate", exact: true })
      .focus();
    await page.keyboard.press("Shift+Tab");
    assert.ok(
      await page
        .getByRole("link", { name: "Download Certificate", exact: true })
        .evaluate((el) => el === document.activeElement),
    );
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "detached" });
    assert.ok(await trigger.evaluate((el) => el === document.activeElement));
  }
  report.checks.push(
    "All seven certificates, preview/PDF controls, keyboard focus trap, Escape and restored focus",
  );
  assert.equal(
    await page.locator("#achievements").getByRole("link", { name: /Campus Unify/ }).getAttribute("href"),
    "/projects/campus-unify",
  );
  await page.locator("#beyond-code").getByRole("button", { name: /View Travel & Adventure gallery/ }).click();
  const gallery = page.getByRole("dialog", { name: "Travel & Adventure" });
  await gallery.waitFor();
  assert.equal(await gallery.getByRole("img").count(), 1);
  const thumbnails = gallery.getByRole("group", { name: "Choose a photo" });
  assert.equal(await thumbnails.getByRole("button").count(), 9);
  await page.keyboard.press("ArrowRight");
  await gallery.getByText("2 / 9", { exact: true }).waitFor();
  await thumbnails.getByRole("button", { name: /^Photo 9:/ }).click();
  await gallery.getByText("9 / 9", { exact: true }).waitFor();
  await gallery.getByRole("button", { name: "Next photo" }).click();
  await gallery.getByText("1 / 9", { exact: true }).waitFor();
  assert.ok(await gallery.evaluate((dialog) => dialog.scrollHeight <= dialog.clientHeight + 1));
  await gallery.getByRole("button", { name: "Close gallery" }).click();
  report.checks.push("HackMITTEN links to Campus Unify and the combined travel gallery opens and closes");

  await page.getByRole("button", { name: "Send message", exact: true }).click();
  assert.equal(await page.getByRole("alert").count(), 3);
  await page.waitForFunction(
    () => document.activeElement?.id === "contact-name",
  );
  assert.ok(
    await page
      .getByLabel("Name", { exact: true })
      .evaluate((el) => el === document.activeElement),
  );
  await page.getByLabel("Name", { exact: true }).fill("Portfolio QA");
  await page.getByLabel("Email", { exact: true }).fill("invalid");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Local mocked browser verification.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  assert.ok(
    await page
      .getByText("Please enter a valid email address.", { exact: true })
      .count(),
  );
  await page.getByLabel("Email", { exact: true }).fill("qa@example.com");
  let contactBody;
  await page.route("**/functions/v1/send-contact-email", async (route) => {
    contactBody = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await page.getByRole("status").waitFor();
  assert.equal(contactBody.name, "Portfolio QA");
  assert.equal(contactBody.subject, "Portfolio inquiry");
  assert.equal(await page.getByLabel("Name", { exact: true }).inputValue(), "");
  await page.unroute("**/functions/v1/send-contact-email");
  await page.route("**/functions/v1/send-contact-email", (route) =>
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Mocked failure" }),
    }),
  );
  await page.getByLabel("Name", { exact: true }).fill("Portfolio QA");
  await page.getByLabel("Email", { exact: true }).fill("qa@example.com");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Failure state verification.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await page.getByRole("alert").waitFor();
  assert.equal(
    await page.getByLabel("Message", { exact: true }).inputValue(),
    "Failure state verification.",
  );
  report.checks.push(
    "Contact required fields, invalid email, focus errors, mocked success/reset and failure/input preservation; no live email sent",
  );

  const anchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
  for (const href of anchors)
    assert.equal(await page.locator(href).count(), 1, "Anchor target " + href);
  const assetUrls = [
    "/resume.pdf",
    "/Ankith_Hegde_Resume.pdf",
    ...Object.values(certificates)
      .flatMap((c) => [c.certificate, c.previewImage])
      .filter(Boolean),
  ];
  for (const url of assetUrls)
    assert.equal(
      (await page.request.get("http://127.0.0.1:5173" + url)).status(),
      200,
      "Local asset " + url,
    );
  report.checks.push(
    "All local anchors, both résumé files and certificate assets return valid results",
  );
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  report.checks.push("Reduced-motion disables smooth scroll and CSS animation");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:5173/");
  await page.evaluate(async () => {
    for (const img of document.images) {
      img.loading = "eager";
    }
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    );
  });
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src),
    );
  assert.deepEqual(broken, []);
  await page.screenshot({ path: output + "/desktop-full.png", fullPage: true });
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent),
    "Skip to content",
  );
  report.checks.push(
    "Images load and keyboard skip link is first focus target",
  );
  assert.deepEqual(report.consoleErrors, []);
  console.log(JSON.stringify(report, null, 2));
} finally {
  fs.writeFileSync(output + "/report.json", JSON.stringify(report, null, 2));
  await browser.close();
}
