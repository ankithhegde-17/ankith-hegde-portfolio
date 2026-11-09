# Beyond the Code and HR Signal AI

## Implemented

- New `#beyond-the-code` section with three distinct groups, local group links,
  responsive layouts, hard borders/shadows and restrained badge accents.
- Three hackathon entries: first place in the **college-level internal** SIH
  event (Team Code for India), Build Bengaluru final-round selection, and
  HackMITTEN 3.0 participation (October 28–29, 2026, Team PsyNex).
- Two chronological community entries: October 4 entrepreneurship activities at
  Sapthagiri NPS College and October 19–20 Mysuru Dasara science/aerospace
  volunteering. The uncertain organization/person name is omitted.
- Two completed Coursera courses. Institution, date, certificate image/PDF,
  credential ID and verification URL remain null. The renderer only creates
  credential actions or media when corresponding real data is supplied.
- HR Signal AI added third in the explicit project sequence, after Campus Unify
  and ResumeLens, before DiscoverBuddy and EcoSort. Existing entries and source
  links are retained. Memoir and TeamForge remain inactive.
- Header navigation and the sitemap include the additions. Existing achievements,
  seven certificate dialogs, journey timeline and personal galleries are retained.

## HR Signal AI inspection

The supplied live URL returned HTTP 200 and rendered a public page titled
“Sign in · HR Signal AI”. It requires an invited account. No sign-in, account
creation, private dashboard access or state-changing action was attempted.

The cover is a real screenshot of that public interface, captured at 1440×1000.
Its caption identifies it as the public sign-in page. The original PNG and a WebP
derivative are retained. No stock or generated screenshot was used.

The portfolio description and hackathon context use the supplied facts. No
framework, backend, AI capability, dashboard feature, analytics or automation
claim is inferred from the deployment host or public marketing text. Technology
badges and an empty technology heading are omitted for this project.

## Files added

- `src/data/beyondTheCode.ts`: factual hackathon/community data and extensible
  completed-course interface.
- `src/components/sections/BeyondTheCode.tsx` and `.module.css`: new section.
- `public/assets/hr-signal-cover.png` and
  `public/assets/optimized/hr-signal-cover.webp`: real public-interface screenshot.
- `scripts/verify-beyond-the-code.mjs`: focused content, layout and navigation checks.
- This implementation report.

## Files updated

- `src/App.tsx`: mounts the new section while preserving existing sections.
- `src/data/site.ts`: Beyond code navigation link.
- `src/data/projects.ts`: HR Signal AI entry and explicit five-project order.
- `src/types/index.ts`: optional project overview/context fields.
- `src/components/ProjectPage.tsx`: supplied overview/context and conditional
  technology section for projects without verified stack information.
- `src/components/sections/ProjectCard.tsx`: omit empty technology badge container.
- `public/sitemap.xml`: HR Signal AI route.
- `scripts/verify-portfolio.mjs`: new order and authorized navigation addition,
  while still checking preservation of existing content.
- `scripts/audit-preview.mjs`: HR Signal AI route included.

## Verification

- Production build and strict TypeScript compilation pass.
- Full browser regression passes: five project routes, original content, skills,
  navigation, theme, reduced motion, seven certificate dialogs, four galleries,
  journey and mocked contact states.
- Focused section checks pass at 360, 390, 768, 1024, 1101 and 1440px. Three
  groups, three hackathons, two events and two completed courses are present;
  no card/page overflow or fake course credential controls.
- Desktop/mobile screenshots reviewed; both hackathon project links and the
  desktop/mobile Beyond code navigation work. Unknown dates are not displayed.
- Homepage and all five project routes return 200 with no runtime errors,
  console warnings/errors, failed requests or missing images.
- All seven existing/new outbound project destinations returned HTTP 200.
- No standalone lint or unit-test script exists in this portfolio.

The two original Coursera certificates remain to be supplied. HR Signal AI's
private functionality and implementation stack remain unverified. No push or
deployment was performed.
