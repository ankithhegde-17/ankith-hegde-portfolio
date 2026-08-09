// Site-wide constants ported verbatim from Portfolio Concept.dc.html —
// name, external links, nav labels and short static copy shared across sections.
// All external URLs are preserved exactly as exported.
export const site = {
  name: "Ankith Hegde",
  role: "AI & Data Science",
  tagline: "AI & Data Science Engineering Student",
  subtagline: "Product Builder • Design Enthusiast",
  email: "ankithhegde001@gmail.com",
  github: "https://github.com/ankithhegde-17",
  githubLabel: "ankithhegde-17",
  linkedin: "https://www.linkedin.com/in/hegdeankith/",
  linkedinLabel: "hegdeankith",
  location: "Mysuru, Karnataka, India",
  locationShort: "Mysuru, Karnataka",
};

export const navLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#work", label: "Work", id: "work" },
  { href: "#journey", label: "Journey", id: "journey" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export const footerSectionLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export const heroStats = [
  { value: "3rd year", label: "B.E. AI & Data Science" },
  { value: "Mysuru", label: "Karnataka, India" },
  { value: "Build + design", label: "Where I work" },
  { value: "Open", label: "Internships & collaborations" },
];

export const aboutInfo = [
  { label: "Focus", value: "AI & Data Science, product engineering, design" },
  { label: "Based in", value: "Mysuru, Karnataka, India" },
  { label: "Availability", value: "Open to internships & collaborations" },
];

export const education = {
  years: "2024 —",
  degree: "Bachelor of Engineering, Artificial Intelligence & Data Science",
  detail: "Currently in the third year.",
  institution: "Maharaja Institute of Technology",
  location: "Mysuru",
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
