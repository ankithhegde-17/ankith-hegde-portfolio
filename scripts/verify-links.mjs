// Read-only checks of existing outbound links. No destinations are rewritten.
import fs from "node:fs";

const sources = fs.readFileSync("src/data/projects.ts", "utf8");
const urls = [...new Set(sources.match(/https:\/\/[^"\s]+/g))];
const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(12000),
        redirect: "follow",
      });
      await response.body?.cancel();
      return { url, status: response.status, finalUrl: response.url };
    } catch (error) {
      return {
        url,
        status: "unverified",
        error: error.cause?.code || error.message,
      };
    }
  }),
);
fs.mkdirSync("output/playwright", { recursive: true });
fs.writeFileSync(
  "output/playwright/outbound-links.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
