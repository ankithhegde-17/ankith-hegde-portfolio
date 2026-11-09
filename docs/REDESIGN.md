# Portfolio V2 redesign

Subsequent update: Campus Unify was added after this redesign audit. See
[CAMPUS-UNIFY.md](CAMPUS-UNIFY.md) for its source verification and integration.

## Audit and preservation plan

The working tree already contained user changes before this redesign. The current
working files, rather than HEAD or the live site, are the source of truth.
`preservation-baseline.json` records the original content data and HTML metadata.

- Stack: React 18, TypeScript strict mode, Vite 5, CSS Modules; no router library.
- Routes: `/` and `/projects/:slug`; anchor navigation with scroll-spy.
- Sections: hero, five projects, experience, skills, achievements, about,
  education, contact. Existing but disconnected: journey, personal galleries,
  TeamForge case study. Reconnect these without removing current content.
- Preserve all data in `src/data`, all PDFs and images in `public`, both résumé
  paths, social/email links, contact fields and Supabase function invocation.
- Preserve project titles, descriptions, status and outbound destinations.
- Preserve canonical/OG/JSON-LD metadata (currently `.com`, although the request
  names `.in`; do not silently change the site's established canonical domain).
- Existing problems: generic small typography; repeated section layouts; blocking
  intro animation; no dialog focus trap or scroll lock; reveal animations ignore
  reduced motion; case-study pages omit existing detailed case-study content;
  ResumeLens and TeamForge reuse unrelated project covers; availability copy
  contains `[target term]`; certificate counts do not reflect all seven files.
- Existing scripts: dev, build (includes TypeScript), preview. No lint/test scripts.

## Implementation

1. Establish cream/ink/yellow tokens, typography, borders, hard shadows, focus,
   responsive spacing and reduced-motion rules; retain theme switching.
2. Build a custom wordmark and responsive navigation, oversized editorial hero,
   portrait composition, technical stickers and clear work/about actions.
3. Build dark project showcase with original images where relevant; use clearly
   typographic title treatments for projects without a verified cover asset.
4. Redesign toolkit, editorial about, experience, education, recognition,
   full journey, personal galleries and contact. Restore detailed case studies.
5. Verify build, content preservation, local links/assets, all five requested
   widths, mobile navigation, keyboard/dialog behavior, theme, reduced motion,
   project routes, certificate/gallery controls and contact validation.

No deployment, push, environment-variable changes or new runtime dependencies.

## Final implementation and validation

The expressive hero is balanced with restrained project cards, readable technical
case studies, a grouped toolkit, and a scannable experience and education layout.
Software Development and AI & Data Science Engineering lead the professional
identity. No new professional claims or metrics were added.

### Modified files

- `index.html`: font families; all existing SEO values retained.
- `src/styles/{tokens,global}.css`, `src/App.module.css`: palette, typography,
  spacing, borders, shadows, forms, keyboard focus, reduced-motion rules.
- `src/App.tsx`: new section order, restored journey/galleries, immediate hero,
  first-focus skip link, deferred certificate modal.
- `src/components/layout/{Header,Footer}.{tsx,module.css}`: wordmark, navigation,
  mobile menu, theme action, contact CTA, résumé/social links, closing footer.
- `src/components/sections/{Hero,FeaturedProjects,ProjectCard,Skills,About,
Experience,Education,Achievements,Journey,BeyondCode,Contact}.tsx` and their
  CSS Modules: complete section redesign and accessible form feedback.
- `src/components/ProjectPage.{tsx,module.css}`: all five routes, original
  descriptions, full existing case-study features, contribution, challenges,
  architecture, outcomes, and stack; unknown-project fallback.
- `src/components/modals/{Modal,GalleryModal,CertificateModal,CaseStudyModal}.tsx`,
  `Modal.module.css`: dialog labels, focus containment/return, Escape dismissal,
  scroll locking, optimized gallery images, mobile controls.
- `src/hooks/useReveal.ts`: reduced-motion support.
- `src/lib/assets.ts`: optimized image-path helper.

New files: this audit, preservation baseline, image-size report, eighteen WebP
derivatives under `public/assets/optimized`, and the three verification/asset
scripts in `scripts/`. Original assets and all nine `src/data` files are unchanged
from the working-tree baseline. Formatting also touched the unused
CurrentlyBuilding component and its CSS without changing behavior.

### Checks actually run

- `npm run build`: passes, including strict TypeScript compilation.
- `scripts/verify-portfolio.mjs`: passes in Chromium at 360, 390, 768, 1024 and
  1440px. No page-level horizontal overflow; heading and primary hero CTA fit.
- All five project routes, unknown-project route, original descriptions, skills,
  and sixteen journey entries verified.
- All seven certificate dialogs, preview/PDF controls, focus trap, Escape,
  focus return, all four galleries, mobile menu, and persisted theme checked.
- All anchors, résumé paths and certificate files checked locally; displayed
  images decode successfully. No uncaught browser page errors.
- Contact validation, invalid email, field focus, success reset and error/input
  preservation verified with intercepted responses. **No live email sent.**
- Reduced-motion behavior and keyboard-first skip link verified.
- Screenshots reviewed for the desktop page, tablet hero, mobile hero and contact,
  and project/contact layouts. Evidence: `output/playwright/`.
- `scripts/verify-links.mjs`: both existing live demos return HTTP 200.
  LinkedIn returns anti-bot HTTP 999; GitHub requests time out in this environment.
  These existing links were retained and require manual external verification.
- Original image bytes: 77,809,428. Generated derivatives: 2,949,754 bytes
  (about 96% smaller in aggregate). This is an asset-size comparison, not a
  measured page-speed or Lighthouse score.

### Limits and local use

There are no pre-existing lint or unit-test scripts. Lighthouse, real email
delivery, Safari/Firefox, and deployed deep-link rewrites were not verified.
ResumeLens has only a verified summary and tags in the source, so its detail
page avoids fabricated architecture or results. Campus Unify does not exist in
the project data. Original metadata uses `ankithhegde.com`; it remains intact
even though the brief refers to `ankithhegde.in`.

Use `npm install` if needed, then `npm run dev`. The existing local `.env` is
required by the unchanged Supabase client. Production preview:
`npm run build` followed by `npm run preview`.

Browser/optimization scripts accept a Playwright package.json path and Chromium
executable path when those tools are installed outside the repository. The
scripts use the local server at `http://127.0.0.1:5173` and add no dependencies.

## Resumed-session error audit

The previous run stopped at an automatic-approval usage limit, after the core
redesign and an earlier passing regression run. Work was resumed in place.

### Localhost recovery

The original port-5173 Vite process (PID 10136) had been launched inside the
restricted execution environment. A host-side HTTP request to 5173 timed out,
while the host-launched server for the same source at 5174 returned HTTP 200.
The in-app browser independently showed the timeout at 5173 and successfully
rendered the complete portfolio at 5174. This isolates the observed failure to
preview process/network placement rather than missing application source.

Only the identified old portfolio process was stopped. A host-side replacement
was launched on the requested **http://127.0.0.1:5173/** (PID 39796). An HTTP request
returned 200, an accepted TCP connection on 5173 was observed, and the in-app
browser rendered the heading and every main section at that exact URL. The
development preview is intentionally left running for the user.

`package.json` now makes the development interface, port and strict-port setting
explicit. `npm run dev` uses loopback port 5173 and reports a collision instead of
silently moving to another port. Other projects' Node processes were left alone.

### Additional fixes and results

- Corrected scroll-spy to use section positions instead of the old navigation
  array order; removed doubled anchor offsets.
- Moved the hero's Python sticker above its caption at tablet widths.
- Made theme switching tolerate unavailable browser storage.
- Removed the unsupported React 18 `fetchPriority` prop that the expanded console
  audit caught; the hero image retains ordinary eager loading.
- Added a visible PDF loading state and accessible canvas status so a certificate
  is not presented as a blank finished preview while its page is still painting.
  The regression check now waits for actual render completion.
- `scripts/audit-preview.mjs` checks real served documents, console messages,
  decoded images, failed requests and HTTP errors. On the development server,
  the homepage and all five project routes return 200 with no console warnings,
  console errors, runtime errors, failed requests or HTTP errors.
- Production files were also served locally on port 4183 (4173 belongs to an
  unrelated project). The same six documents and their loaded assets passed.
- The complete five-width browser regression suite passed again after recovery,
  including scroll-spy, dialog focus, PDF rendering, links and mocked contact
  states. `git diff --check` passes; Git emits only its configured LF-to-CRLF
  conversion notices. No unexpected 404 could be reproduced in the audited app.

Extra changed files in the recovery pass: `package.json`, `useTheme.ts`,
`useScrollSpy.ts`, `CertificatePdfPage.tsx`, `CertificateModal.module.css`, the
verification scripts and these notes. The new audit script is also included.

`public/_redirects` adds a targeted Netlify SPA rewrite for `/projects/*`, since
the existing hosting documentation names Netlify and no project-route rewrite
was present. This allows direct project URLs to reach React after a future
deployment while keeping missing asset paths eligible for genuine 404 responses.
The previously reported external 404 had no exact path, so its original cause
cannot be conclusively identified. No deployment was performed to test the rule.
