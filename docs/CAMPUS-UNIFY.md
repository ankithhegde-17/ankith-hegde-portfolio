# Campus Unify integration

Added to the existing Portfolio V2 selected-work section and project-detail route,
without changing the routing system or dependencies. All five existing project
objects and existing case-study entries are preserved, checked semantically
against the redesign baseline.

## Verified sources

The original `Tushar-pavan/campus-unify` URL returned 404 through GitHub access.
The user supplied the corrected repository:
[ankithhegde-17/campus-unify](https://github.com/ankithhegde-17/campus-unify).
Its contents were inspected directly through the connected GitHub tools.

- [Client manifest](https://github.com/ankithhegde-17/campus-unify/blob/main/client/package.json): React, Vite, Supabase SDK.
- [Server manifest](https://github.com/ankithhegde-17/campus-unify/blob/main/server/package.json): Node.js, Express, Supabase SDK.
- [Architecture](https://github.com/ankithhegde-17/campus-unify/blob/main/docs/ARCHITECTURE.md),
  [store implementation](https://github.com/ankithhegde-17/campus-unify/blob/main/server/src/store.js):
  atomic local JSON in demo mode; protected Supabase PostgreSQL JSONB workspace,
  Auth, private Storage and revision-checked writes in the separate Supabase mode.
- [Server payment integration](https://github.com/ankithhegde-17/campus-unify/blob/main/server/src/razorpay.js)
  and [checkout client](https://github.com/ankithhegde-17/campus-unify/blob/main/client/src/lib/razorpay.js):
  checkout, server order creation, HMAC signature checks and gateway verification
  code are present. The brief specifies test mode. No payment was initiated and
  no live payment, reconciliation or production deployment claim is made.
- [API implementation](https://github.com/ankithhegde-17/campus-unify/blob/main/server/src/app.js):
  authenticated Express endpoints and server-side role/scope/field filtering.
- [Feature status](https://github.com/ankithhegde-17/campus-unify/blob/main/docs/FEATURE_STATUS.md):
  the system remains an operational prototype; no enterprise scale or performance
  outcomes are used as portfolio metrics.
- [Existing repository screenshot](https://github.com/ankithhegde-17/campus-unify/blob/main/docs/previews/desktop.png):
  authentic trust-management dashboard, explicitly labeled fictional demo data
  and local persistence. Original downloaded unchanged; WebP derivative added.
- [Live application](https://met.prayogmanch.in) returned HTTP 200 and
  rendered its public sign-in interface. No sign-in or private dashboard access
  was attempted. Repository preview is distinguished from the live interface.

Team PsyNex, HackMITTEN 2026, the 24-hour national-level event and institution
context come from the user brief. Personal implementation responsibilities have
not been invented. The project is categorized as full-stack / enterprise ERP.

## Files

- `src/data/projects.ts`: sixth project, verified badges, corrected repository URL,
  live link, subtitle, featured presentation and screenshot caption.
- `src/data/caseStudies.ts`: overview, problem, solution, features, team/event,
  engineering challenge, architecture, prototype limits and technology stack.
- `src/types/index.ts`: optional presentation fields; existing data remains valid.
- `src/components/sections/ProjectCard.tsx` and `FeaturedProjects.module.css`:
  reusable featured layout, subtitle, source/demo actions and image provenance.
- `src/components/ProjectPage.tsx` and its CSS: overview, optional team heading,
  subtitle and full screenshot with caption.
- `public/assets/campus-unify-cover.png` and
  `public/assets/optimized/campus-unify-cover.webp`: authentic screenshot assets.
- `scripts/verify-portfolio.mjs`: preserve original entries while permitting the
  requested addition; check all six project routes.
- `scripts/audit-preview.mjs`: include Campus Unify in page/network auditing.
- `scripts/verify-campus-unify.mjs`: focused screenshots, link destinations,
  team attribution and overflow checks at all five requested widths.

## Validation

- `npm run build` passed, including strict TypeScript compilation.
- Full portfolio regression passed: all six project routes, semantic preservation
  of the five original project objects and four original case studies, all skills,
  certificates, galleries, navigation, theme, reduced motion and mocked contact
  success/error behavior.
- Focused Campus Unify checks passed at 360, 390, 768, 1024 and 1440px. Card and
  case-study screenshots were captured, links have the intended destinations,
  team context is visible and no page-level horizontal overflow occurs.
- Desktop and mobile card screenshots and the full detail page were reviewed.
- Live site HTTP 200 and rendered public sign-in were verified; corrected GitHub
  repository and raw screenshot were successfully fetched.
- No live sign-in, financial transaction, or Supabase deployment was tested.
  There are no separate lint or unit-test commands configured in the portfolio.

No deployment or push.
