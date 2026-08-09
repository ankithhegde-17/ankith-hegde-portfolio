import type { FeaturedProject } from "@/types";

// Ported verbatim from Portfolio Concept.dc.html's "Featured Projects" section.
export const featuredProjects: FeaturedProject[] = [
  {
    number: "01",
    kicker: "Personal Life Companion · 2026 · In Development",
    title: "Memoir",
    description:
      "An offline-first digital life companion that helps people remember their experiences, reflect on their journey, and grow one day at a time.",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL", "PWA"],
    image: "/assets/memoir-cover.png",
    imageAlt: "Memoir project cover",
    caseStudyId: "memoir",
    links: { github: "https://github.com/ankithhegde-17/Memoir" },
  },
  {
    number: "02",
    kicker: "Platform · 2026 · In Development",
    title: "DiscoverBuddy",
    description:
      "A student-led travel platform connecting travelers with local student guides for more authentic, personalized city experiences.",
    tags: ["React", "Firebase", "Tailwind CSS", "Mapbox", "Framer Motion"],
    image: "/assets/discoverbuddy-cover.png",
    imageAlt: "DiscoverBuddy project cover",
    caseStudyId: "discoverbuddy",
    imageFirst: true,
    links: {
      live: "https://www.discoverbuddy.in/",
      github: "https://github.com/ankithhegde-17/discoverbuddy",
    },
  },
  {
    number: "03",
    kicker: "AI / IoT · 2026 · Prototype",
    title: "EcoSort",
    description:
      "An AI-powered smart waste management ecosystem that uses computer vision, IoT and automation to intelligently segregate waste at source and optimise municipal waste collection.",
    tags: ["TensorFlow Lite", "Raspberry Pi", "ESP32-CAM", "IoT", "GPS"],
    image: "/assets/ecosort-cover.png",
    imageAlt: "EcoSort project cover",
    caseStudyId: "ecosort",
    links: {
      liveDisabled: true,
      github: "https://github.com/ankithhegde-17/quicksort",
    },
  },
];
