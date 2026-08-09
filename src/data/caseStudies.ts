import type { CaseStudy } from "@/types";

// Ported verbatim from Portfolio Concept.dc.html's `caseStudies` map.
export const caseStudies: Record<string, CaseStudy> = {
  memoir: {
    id: "memoir",
    title: "Memoir",
    meta: "Personal Life Companion · 2026 · In Development",
    problem:
      "Our lives are scattered across multiple disconnected apps. Journaling, tasks, expenses, memories, photos, habits, moods, and reflections often exist separately, making it difficult to understand the bigger picture of how we lived and changed over time.",
    solution:
      "Memoir brings different aspects of everyday life into one calm, unified experience centered around the idea:",
    quote: "“Here's today's page of your life.”",
    solutionAfter:
      "Each day becomes a page. Over time, those pages become chapters of a personal story.",
    features: [
      "Today's Page",
      "Journal",
      "Tasks & Habits",
      "Mood, Sleep & Water",
      "Expenses",
      "Daily Reflection",
      "Daily Story",
      "Search",
      "Statistics",
      "Offline-first PWA",
    ],
    featureBullets: null,
    featureRows: null,
    role: "Product strategy, product design, UX/UI design, system architecture, frontend development, database architecture, and overall product development.",
    challenge:
      "Bring many different aspects of personal life into one product without making Memoir feel like a cluttered collection of trackers.",
    approach:
      "Design the entire experience around the user's day and organize the product around three pillars:",
    pillars: [
      { name: "Remember", text: "Preserve experiences and memories." },
      { name: "Reflect", text: "Understand the day and personal patterns." },
      { name: "Grow", text: "Support habits, tasks, and progress." },
    ],
    outcome:
      "Memoir is being developed as a polished, installable Progressive Web App designed to become a long-term personal life companion.",
    stack: "React · TypeScript · Vite · Tailwind CSS · Framer Motion · Supabase · PostgreSQL · Dexie.js · PWA · Vercel",
  },
  discoverbuddy: {
    id: "discoverbuddy",
    title: "DiscoverBuddy",
    meta: "Platform · 2026 · In Development",
    problem:
      "Travelers often experience cities through the same tourist attractions and commercial tour packages, making it difficult to discover authentic local experiences. At the same time, students who know their cities well have limited opportunities to share that knowledge and earn from it.",
    solution:
      "DiscoverBuddy is a travel platform that connects travelers with local student guides who can help them explore a city through personalized, local experiences.",
    quote:
      "The product initially focuses on Mysuru, with the goal of developing a model that can eventually expand to other cities.",
    solutionAfter: "",
    features: null,
    featureBullets: null,
    featureRows: [
      { name: "Student Guide Discovery", text: "Find local students who can guide travelers around their city." },
      { name: "Guide Profiles", text: "View information about guides and their local knowledge before choosing an experience." },
      { name: "Location-Based Discovery", text: "Explore places and experiences through an interactive map." },
      { name: "Traveler & Guide Experience", text: "Separate flows designed around the needs of travelers and student guides." },
    ],
    role: "I worked across the entire product — from defining the concept and user experience to designing and developing the platform. My contributions included product strategy, UX/UI design, frontend development, backend architecture, integration of location-based features, and deployment.",
    challenge:
      "The hardest part was not simply building the platform; it was defining the right product for a two-sided marketplace. I had to determine what travelers would actually need from a local guide, how to make student guides trustworthy, and which features were essential for the first version without overbuilding the product.",
    approach:
      "I focused on the core interaction first: discover a local guide → understand the experience → connect with the guide. Instead of trying to build a complete travel ecosystem, I kept the initial product focused on the relationship between travelers and local student guides. The first version targets Mysuru so the concept can be tested within a defined market before expanding to additional cities.",
    pillars: null,
    outcome:
      "A functional DiscoverBuddy prototype was developed with the core product experience and technical foundation in place. The project established the initial product direction, user flows, visual system, and architecture needed to test the concept with real travelers and student guides. The next step is to pilot the platform in Mysuru, gather feedback from both sides of the marketplace, and refine the experience based on real usage.",
    stack: "React · Firebase · Tailwind CSS · Mapbox · Framer Motion · GitHub · Netlify",
  },
  ecosort: {
    id: "ecosort",
    title: "EcoSort",
    meta: "AI / IoT · 2026 · Prototype",
    problem:
      "Improper waste segregation is one of the major challenges in effective waste management. Mixed waste reduces recycling efficiency, increases landfill volume and creates health and safety risks for sanitation workers. EcoSort addresses the problem at its source by enabling intelligent waste classification and segregation while also providing real-time monitoring of bin status and collection requirements.",
    solution:
      "EcoSort is an AI-driven smart waste management ecosystem that combines computer vision, IoT, edge computing and automation.",
    quote:
      "The system uses an ESP32-CAM to capture waste images, TensorFlow Lite for on-device waste classification, and a Raspberry Pi for local prediction and system orchestration. Ultrasonic sensors monitor bin fill levels, while GPS and cloud connectivity enable municipal teams to monitor bins and optimise collection routes.",
    solutionAfter:
      "The ecosystem also includes a citizen application and municipal dashboard for alerts, analytics, reporting and collection management.",
    features: null,
    featureRows: null,
    featureBullets: [
      "AI-based waste classification using TensorFlow Lite",
      "Automatic waste segregation using servo-actuated compartments",
      "Real-time fill-level monitoring using ultrasonic sensors",
      "GPS-enabled bin tracking, alerts and collection route optimisation",
    ],
    role: "I worked on the hardware and IoT side of the project, contributing to the design and integration of the smart-bin system and its connected components. I also contributed to the business strategy, including identifying potential customer segments, revenue opportunities and the pilot-to-scale approach for deploying the solution. My primary focus was on connecting the physical hardware and IoT layer with the broader EcoSort ecosystem.",
    challenge:
      "The key challenge was designing a system that could perform waste classification and segregation at the source while continuously monitoring the physical state of the bin. The system needed to combine AI inference, sensors, hardware actuation and cloud-based monitoring into one connected workflow.",
    approach:
      "We designed an edge-first architecture where waste is classified locally at the smart bin instead of relying entirely on cloud processing. The ESP32-CAM captures the waste image, TensorFlow Lite performs the classification, and the Raspberry Pi handles local predictions and device orchestration. Ultrasonic sensors continuously monitor fill levels, while GPS and cloud connectivity provide monitoring and collection optimisation. This architecture enables local decision-making at the bin while maintaining cloud-based monitoring for operators and municipalities.",
    pillars: null,
    outcome:
      "EcoSort developed into a complete AI-powered waste management concept rather than a standalone smart dustbin. The proposed ecosystem combines AI-based classification, automatic segregation, IoT monitoring, GPS-based collection optimisation, a citizen application and a municipal dashboard. The project was developed as part of the National Entrepreneurship Challenge (NEC) 2026 at E-Cell IIT Bombay, with the next steps including a technical trial at Maharaja Institute of Technology, a municipal pilot and tender-ready documentation.",
    stack: "TensorFlow Lite · Raspberry Pi · ESP32-CAM · Ultrasonic Sensors · IoT · GPS · Computer Vision · Cloud Platform · Municipal Dashboard · Citizen Mobile App · Servo Actuation",
  },
  teamforge: {
    id: "teamforge",
    title: "TeamForge",
    meta: "EdTech · Collaboration Platform · 2026 · In Development",
    problem:
      "Students often struggle to find the right teammates for hackathons, college projects, and startup ideas. Opportunities are scattered across WhatsApp groups, college communities, social media, and different event platforms. Students with good ideas also lack a dedicated way to find collaborators, receive feedback, or build a team around their idea. Hackathon organizers similarly rely on disconnected tools for registrations, team management, judging, and evaluation.",
    solution:
      "TeamForge is a unified platform where students can create profiles, discover teammates from their own college or other colleges, post project and startup ideas, receive suggestions, and join teams based on skills and interests. Organizers can create and manage hackathons, handle participants and teams, and conduct judging and evaluation directly through the platform.",
    quote:
      "The goal is to create a single ecosystem for student collaboration — from finding an idea and forming a team to participating in a hackathon and getting evaluated.",
    solutionAfter: "",
    features: null,
    featureBullets: null,
    featureRows: [
      { name: "Teammate Discovery", text: "Find students based on skills, interests, and project requirements." },
      { name: "Project & Startup Ideas", text: "Post ideas, receive feedback, and allow interested students to join." },
      { name: "Hackathon Management", text: "Create hackathons and manage registrations, teams, and participants." },
      { name: "Online Evaluation", text: "Judges and organizers can evaluate projects and assign scores directly through the platform." },
      { name: "Student Profiles", text: "Showcase skills, interests, projects, achievements, and hackathon experience." },
      { name: "Team Formation", text: "Create teams, invite members, and collaborate around projects." },
      { name: "Cross-College Collaboration", text: "Connect with students beyond your own institution." },
      { name: "Centralized Platform", text: "Bring students, teams, projects, startup ideas, hackathons, and evaluations into one ecosystem." },
    ],
    role: "Product Design · UI/UX · Frontend Development · Product Architecture. I am responsible for conceptualizing the product, defining the user experience, designing the interface, and developing the platform.",
    challenge:
      "The main challenge is designing one platform for multiple user types — students, team leaders, judges, and hackathon organizers — while keeping the experience simple and intuitive.",
    approach:
      "The product is designed as an ecosystem rather than a collection of separate features. The experience follows: Discover → Connect → Build → Participate → Evaluate. Students discover people and ideas, connect with potential teammates, form teams, participate in hackathons, and receive evaluation through the same platform.",
    pillars: null,
    outcome:
      "Currently in development. The platform is being built as a unified collaboration ecosystem for students and hackathon organizers, with the long-term goal of becoming a single destination for discovering teammates, building projects, developing startup ideas, participating in hackathons, and evaluating projects.",
    stack: "React · Next.js · TypeScript · Tailwind CSS · Firebase · Node.js",
  },
};
