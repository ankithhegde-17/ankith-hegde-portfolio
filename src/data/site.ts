// Site-wide constants ported verbatim from Portfolio Concept.dc.html —
// name, external links, nav labels and short static copy shared across sections.
// All external URLs are preserved exactly as exported.
export const site = {
  name: "Ankith Hegde",
  role: "AI & Data Science Engineering Student",
  subtagline: "B.E. Computer Science Engineering (Artificial Intelligence & Data Science) · Maharaja Institute of Technology Thandavapura · Class of 2028",
  email: "ankithhegde001@gmail.com",
  github: "https://github.com/ankithhegde-17",
  githubLabel: "ankithhegde-17",
  linkedin: "https://www.linkedin.com/in/hegdeankith/",
  linkedinLabel: "hegdeankith",
  location: "Mysuru, Karnataka, India",
  locationShort: "Mysuru, Karnataka",
};

export const navLinks = [
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#achievements", label: "Achievements", id: "achievements" },
  { href: "#about", label: "About", id: "about" },
  { href: "#beyond-the-code", label: "Beyond code", id: "beyond-the-code" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export const footerSectionLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export const heroStats = [
  { value: "5", label: "Projects listed" },
  { value: "4", label: "Competition placements / finals" },
  { value: "1", label: "ML & DL internship" },
  { value: "5", label: "Certificates listed" },
];

export const aboutInfo = [
  { label: "Focus", value: "AI & Data Science, product engineering, design" },
  { label: "Based in", value: "Mysuru, Karnataka, India" },
  { label: "Looking for", value: "ML / software internship opportunities" },
];

export const education = {
  years: "2024 — 2028 (expected)",
  degree: "B.E. Computer Science Engineering (Artificial Intelligence & Data Science)",
  detail: "Visvesvaraya Technological University (VTU)",
  institution: "Maharaja Institute of Technology Thandavapura",
  location: "",
};

export const contactRows = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "GitHub", value: site.githubLabel, href: site.github },
  { label: "LinkedIn", value: site.linkedinLabel, href: site.linkedin },
  { label: "Based in", value: site.locationShort },
];

export const teamForge = {
  title: "TeamForge",
  meta: "EdTech · Collaboration Platform · 2026",
  description:
    "An all-in-one student collaboration platform connecting students, ideas, teams, and hackathon organizers.",
  status: "In development",
  github: "https://github.com/ankithhegde-17/TeamForge",
  caseStudyId: "teamforge",
};
