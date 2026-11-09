import type { FeaturedProject } from "@/types";

// The same explicit sequence drives cards, detail navigation, and numbering.
export const projectOrder = [
  "campus-unify",
  "resumelens",
  "hr-signal-ai",
  "discoverbuddy",
  "ecosort",
] as const;
type ProjectId = (typeof projectOrder)[number];

const projectCatalog: Record<ProjectId, Omit<FeaturedProject, "number">> = {
  "campus-unify": {
    title: "Campus Unify",
    subtitle: "ONE PLATFORM. MULTIPLE CAMPUSES.",
    kicker: "Full-stack / Enterprise ERP · HackMITTEN 2026",
    description:
      "A multi-campus ERP platform that unifies institutional administration, role-based access, student management, and fee workflows into one digital workspace.",
    tags: ["React", "Node.js", "Express", "Supabase", "Razorpay · Test mode"],
    image: "/assets/campus-unify-cover.png",
    imageAlt:
      "Campus Unify trust-management dashboard showing campus operations, fees, students and reports using fictional demo data",
    imageCaption:
      "Repository demo dashboard · fictional records · local persistence",
    caseStudyId: "campus-unify",
    status: "Prototype",
    featured: true,
    caseStudy: true,
    links: {
      live: "https://met.prayogmanch.in",
      github: "https://github.com/ankithhegde-17/campus-unify",
    },
  },
  resumelens: {
    kicker: "Career guidance platform · Live",
    title: "ResumeLens",
    description:
      "An explainable AI resume analyzer and career-guidance platform.",
    tags: ["AI", "Career guidance"],
    image: "/assets/resumelens-dashboard.png",
    imageAlt: "ResumeLens dashboard showing the navy workspace sidebar, Hello, explorer heading, and résumé analysis options",
    caseStudyId: "resumelens",
    status: "Live",
    caseStudy: true,
    links: {
      live: "https://resumelens.prayogmanch.in/",
    },
  },
  "hr-signal-ai": {
    title: "HR Signal AI",
    kicker: "HR Management / Web Application · Build Bengaluru Hackathon",
    description:
      "HR Signal AI is a web application developed during the Build Bengaluru Hackathon to explore centralized human resource management and simplify administrative HR workflows.",
    overview:
      "Developed as part of the Build Bengaluru Hackathon, HR Signal AI focuses on helping HR teams organize and manage workforce-related activities through a centralized digital interface.",
    context:
      "The project was presented during the final rounds at the Microsoft office in Bengaluru. The team was selected for the final rounds of the Build Bengaluru Hackathon.",
    tags: [],
    image: "/assets/hr-signal-cover.png",
    imageAlt:
      "HR Signal AI public sign-in interface with invitation-only account access",
    imageCaption:
      "Actual public sign-in interface · account access requires an invitation",
    caseStudyId: "hr-signal-ai",
    status: "Prototype",
    caseStudy: true,
    links: { live: "https://6b02442f8d6b47bd8a5c24bdb79e69ef.prod.enter.pro" },
  },
  discoverbuddy: {
    kicker: "Platform · 2026 · In Development",
    title: "DiscoverBuddy",
    description:
      "A student-led travel platform connecting travelers with local student guides for more authentic, personalized city experiences.",
    tags: ["React", "Firebase", "Tailwind CSS", "Mapbox", "Framer Motion"],
    image: "/assets/discoverbuddy-cover.png",
    imageAlt: "DiscoverBuddy project cover",
    caseStudyId: "discoverbuddy",
    imageFirst: true,
    status: "In Progress",
    caseStudy: true,
    links: {
      live: "https://discoverbuddy.vercel.app/",
      github: "https://github.com/ankithhegde-17/discoverbuddy",
    },
  },
  ecosort: {
    kicker: "AI / IoT · 2026 · Prototype",
    title: "EcoSort",
    description:
      "An AI-powered smart waste management ecosystem that uses computer vision, IoT and automation to intelligently segregate waste at source and optimise municipal waste collection.",
    tags: ["TensorFlow Lite", "Raspberry Pi", "ESP32-CAM", "IoT", "GPS"],
    image: "/assets/ecosort-cover.png",
    imageAlt: "EcoSort project cover",
    caseStudyId: "ecosort",
    links: {
      github: "https://github.com/ankithhegde-17/quicksort",
    },
    status: "Prototype",
    caseStudy: true,
  },
};

export const featuredProjects: FeaturedProject[] = projectOrder.map(
  (id, index) => ({
    ...projectCatalog[id],
    number: String(index + 1).padStart(2, "0"),
  }),
);
