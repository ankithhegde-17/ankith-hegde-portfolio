# Active project order and link corrections

The active list is now explicitly ordered by `projectOrder`:

1. Campus Unify — https://met.prayogmanch.in
2. ResumeLens — https://resumelens.prayogmanch.in
3. DiscoverBuddy — existing live/source URLs preserved
4. EcoSort — existing source URL preserved

`projectCatalog` contains only these four entries. Cards, numbered labels and
detail-page navigation all consume the mapped sequence, rather than relying on
object insertion order. Campus Unify keeps its name and existing source link;
there was no separate active Campus Pulse project. ResumeLens already had the
requested live URL and retains it.

Memoir and TeamForge were removed from active project data, visible cards and
detail navigation. Their case-study source, inactive components/data and assets
remain in the repository. Direct old detail URLs resolve to the existing
project-not-found view. The sitemap now lists only the four active project paths.

The lead Campus Unify card retains the featured layout. A targeted desktop grid
rule spans the last card across the final row, avoiding an empty half-row after
the removals; mobile remains a single column. Descriptions, tags, screenshots,
status and source links of retained projects were checked against the snapshot
in `project-corrections-baseline.json`, allowing only requested numbering and
live-link changes.

## Modified files for this correction

- `src/data/projects.ts`: explicit order, active catalog, numbering and live URL.
- `src/components/sections/FeaturedProjects.module.css`: close the final grid row.
- `public/sitemap.xml`: remove inactive project path and add Campus Unify.
- `scripts/verify-portfolio.mjs`: exact order at all widths; content preservation,
  inactive-route and navigation checks adjusted to the authorized removals.
- `scripts/verify-campus-unify.mjs`: corrected live URL assertion.
- `scripts/audit-preview.mjs`: audit only the four retained project routes.
- `scripts/verify-links.mjs`: check only active project destinations.
- `docs/CAMPUS-UNIFY.md`: current live URL.
- New: this report and `docs/project-corrections-baseline.json`.

## Verification

- `npm run build` passed, including TypeScript.
- Full browser regression suite passed at 360, 390, 768, 1024 and 1440px.
  The rendered titles match the exact four-item sequence at every width.
- No duplicates, horizontal page overflow, missing screenshots or broken imports.
- All four project routes return 200 and render; no console warnings/errors,
  uncaught runtime exceptions, failed asset requests or unexpected HTTP errors.
- Contact, certificates, galleries, keyboard behavior, theme and reduced motion
  remain covered by the passing regression suite.
- All six retained live/source destinations returned HTTP 200 in the HTTP check.
  Details: `output/playwright/outbound-links.json`.
- The portfolio has no separate lint or unit-test command configured.

No remaining issues were found in these checks. No push or deployment performed.
