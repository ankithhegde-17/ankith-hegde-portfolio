// One-time migration: src/data/journey.ts  ->  Supabase `journey` table.
//
// Reads the *live* journey/certificates data (imported directly from
// src/data/*.ts, never copy-pasted, so this can't drift from the app).
//
// Modes:
//   node scripts/migrate-journey.mjs            (default) dry run — reports only, writes nothing
//   node scripts/migrate-journey.mjs --apply    performs the insert (requires SUPABASE_SERVICE_ROLE_KEY)
//
// The service-role key is NEVER read from .env / the repo. Export it in your shell
// for this one command only, e.g. (PowerShell):
//   $env:SUPABASE_SERVICE_ROLE_KEY = "..."; node scripts/migrate-journey.mjs --apply
//   Remove-Item Env:\SUPABASE_SERVICE_ROLE_KEY   # afterwards
//
// Dry-run reads with the existing public anon key from .env (VITE_SUPABASE_PUBLISHABLE_KEY).
// That requires the `journey` table to actually GRANT SELECT to the anon role (a separate
// step from an RLS policy — see the error hint below if this fails).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

import { journey } from "../src/data/journey.ts";
import { certificates } from "../src/data/certificates.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");

// ---- minimal .env reader (no new dependency) ----
function loadDotEnv(file) {
  const out = {};
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    return out;
  }
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

// ---- date parsing: only produces a date when the source text spells out a full day ----
const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7,
  august: 8, september: 9, sept: 9, october: 10, november: 11, december: 12,
  jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};
const FULL_DATE_RE = /(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/;
const RANGE_RE = /(\d{1,2})\s+([A-Za-z]{3,9})\s*[—-]\s*\d{1,2}\s+[A-Za-z]{3,9}\s+(\d{4})/;

function pad2(n) {
  return String(n).padStart(2, "0");
}

function parseEventDate(detail) {
  if (!detail || !detail.trim()) return { event_date: null, note: "no detail text — left null" };
  const full = detail.match(FULL_DATE_RE);
  if (full) {
    const [, day, monthName, year] = full;
    return { event_date: `${year}-${pad2(MONTHS[monthName.toLowerCase()])}-${pad2(day)}`, note: "exact day parsed from detail" };
  }
  const range = detail.match(RANGE_RE);
  if (range) {
    const [, day1, mon1, year] = range;
    const month = MONTHS[mon1.toLowerCase()];
    if (month) {
      return {
        event_date: `${year}-${pad2(month)}-${pad2(day1)}`,
        note: "detail is a date RANGE — used the start date; flag if you'd prefer the end date or null",
      };
    }
  }
  return { event_date: null, note: "detail only has month/year (or nothing) — left null rather than guessing a day" };
}

function dedupeKey(row) {
  return [row.title.trim(), row.kind.trim(), (row.detail ?? "").trim()].join("|||").toLowerCase();
}

// Manual decision (2026-09-03): keep the existing hand-entered Supabase row (id=1) for
// "Started B.E. in AI & Data Science" untouched — it already has richer prose and a real
// event_date (2024-09-30) that journey.ts can't reproduce. Never insert the local version.
const MANUAL_SKIPS = [{ title: "Started B.E. in AI & Data Science", kind: "Milestone" }];

function isManuallySkipped(row) {
  return MANUAL_SKIPS.some((s) => s.title === row.title && s.kind === row.kind);
}

async function main() {
  const dotEnv = loadDotEnv(path.join(projectRoot, ".env"));
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || dotEnv.VITE_SUPABASE_URL;
  const ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || dotEnv.VITE_SUPABASE_PUBLISHABLE_KEY;
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // shell-only, intentionally not read from .env

  if (!SUPABASE_URL || !ANON_KEY) {
    console.error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY (checked process.env and .env).");
    process.exitCode = 1;
    return;
  }

  if (APPLY && !SERVICE_ROLE_KEY) {
    console.error(
      "--apply requires SUPABASE_SERVICE_ROLE_KEY to be set in the shell environment for this command.\n" +
      "The anon/publishable key cannot be relied on for writes. This script will not fall back to it."
    );
    process.exitCode = 1;
    return;
  }

  // ---- build candidate rows from the live data ----
  const certIds = new Set(Object.keys(certificates));
  const unknownCertRefs = [];

  const candidates = journey.map((item) => {
    const { event_date, note } = parseEventDate(item.detail);
    const cert_id = item.certId ?? null;
    if (cert_id && !certIds.has(cert_id)) unknownCertRefs.push({ title: item.title, cert_id });

    return {
      row: {
        title: item.title,
        detail: item.detail && item.detail.trim() !== "" ? item.detail : null,
        kind: item.kind,
        is_highlight: item.big,
        cert_id,
        event_date,
        // Verbatim copy of journey.ts's `year` label — the display column, decoupled from
        // event_date so no precision has to be inferred or fabricated for month/year-only entries.
        display_date: item.year,
      },
      _source_year: item.year,
      _date_note: note,
    };
  });

  // ---- try to read existing rows for dedup (requires GRANT SELECT + RLS policy for anon) ----
  const readClient = createClient(SUPABASE_URL, ANON_KEY);
  const { data: existingRows, error: fetchError } = await readClient
    .from("journey")
    .select("id, title, detail, kind, event_date, is_highlight, cert_id, display_date");

  const dedupeAvailable = !fetchError;
  const existingKeys = new Set((existingRows ?? []).map(dedupeKey));

  const toInsert = [];
  const skippedAsDuplicate = [];
  const skippedManually = [];
  for (const c of candidates) {
    if (isManuallySkipped(c.row)) {
      skippedManually.push(c);
    } else if (dedupeAvailable && existingKeys.has(dedupeKey(c.row))) {
      skippedAsDuplicate.push(c);
    } else {
      toInsert.push(c);
    }
  }

  // ---- report ----
  console.log(`\nSource: src/data/journey.ts (${journey.length} entries), cross-checked against src/data/certificates.ts (${certIds.size} certs)\n`);

  if (unknownCertRefs.length) {
    console.log("certId values in journey.ts with NO matching entry in certificates.ts:");
    for (const u of unknownCertRefs) console.log(`   - "${u.title}" -> certId "${u.cert_id}"`);
    console.log("");
  } else {
    console.log("All certId values in journey.ts resolve to a known certificate.\n");
  }

  if (!dedupeAvailable) {
    console.log("WARNING: could not read existing `journey` rows, so duplicate-detection did NOT run.");
    console.log(`  Reason: ${fetchError.message}`);
    if (fetchError.hint) console.log(`  Hint from Postgres: ${fetchError.hint}`);
    console.log("  This is a Postgres GRANT, separate from an RLS policy — both are required for anon SELECT.");
    console.log("  The list below is every candidate row computed from local data; NONE of it has been inserted.\n");
  } else {
    console.log(`Existing rows already in Supabase \`journey\`: ${existingRows?.length ?? 0}`);
    console.log(`Already present (skipped, matched on title+kind+detail): ${skippedAsDuplicate.length}`);
  }
  console.log(`Skipped by manual decision (preserving existing hand-entered row): ${skippedManually.length}`);
  console.log(`Candidate rows ${dedupeAvailable ? "to insert" : "(duplicate check unavailable)"}: ${toInsert.length}\n`);

  console.log("--- rows that would be inserted ---");
  for (const c of toInsert) {
    console.log(
      `- ${c.row.title}\n` +
      `    kind=${c.row.kind}  is_highlight=${c.row.is_highlight}  cert_id=${c.row.cert_id ?? "null"}\n` +
      `    detail=${JSON.stringify(c.row.detail)}\n` +
      `    display_date=${JSON.stringify(c.row.display_date)}\n` +
      `    event_date=${c.row.event_date ?? "null"}  (${c._date_note})`
    );
  }

  if (skippedAsDuplicate.length) {
    console.log("\n--- skipped as already present (exact match) ---");
    for (const c of skippedAsDuplicate) {
      console.log(`- ${c.row.title} (${c._source_year})`);
    }
  }

  if (skippedManually.length) {
    console.log("\n--- skipped by manual decision ---");
    for (const c of skippedManually) {
      console.log(`- ${c.row.title} (${c._source_year}) — existing Supabase row id=1 preserved as-is`);
    }
  }

  // ---- schema check: display_date now exists and is populated verbatim from journey.ts's `year` ----
  const missingDisplayDate = toInsert.filter((c) => !c.row.display_date || !c.row.display_date.trim());
  console.log("\n--- schema check: display-label reproducibility ---");
  console.log(`display_date column present in Supabase select: ${existingRows !== null && existingRows !== undefined ? "yes" : "unknown"}`);
  if (missingDisplayDate.length === 0) {
    console.log(`All ${toInsert.length} rows to insert carry a non-empty display_date (verbatim copy of journey.ts's \`year\`).`);
    console.log("event_date behavior is unchanged: still null wherever the source lacks an exact day, never fabricated.");
  } else {
    console.log(`${missingDisplayDate.length} row(s) have no year label to copy:`);
    for (const c of missingDisplayDate) console.log(`  - "${c.row.title}"`);
  }

  if (!dedupeAvailable) {
    console.log("\nFix the SELECT grant/policy above, re-run this dry run, and confirm the report before applying.");
    process.exitCode = 1;
    return;
  }

  if (!APPLY) {
    console.log("\nDry run only — no rows were written. Re-run with --apply (and SUPABASE_SERVICE_ROLE_KEY set) to insert.");
    return;
  }

  // ---- apply ----
  const writeClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const rows = toInsert.map((c) => c.row);

  if (rows.length === 0) {
    console.log("\nNothing to insert.");
    return;
  }

  console.log(`\nInserting ${rows.length} row(s)...`);
  const { data: inserted, error: insertError } = await writeClient.from("journey").insert(rows).select("id, title");

  if (insertError) {
    console.error("Insert failed:", insertError.message);
    process.exitCode = 1;
    return;
  }

  console.log(`Inserted ${inserted?.length ?? 0} row(s):`);
  for (const r of inserted ?? []) console.log(`  - ${r.id}: ${r.title}`);
}

await main();
