import type { SkillCategory } from "@/types";

// Ported verbatim from Portfolio Concept.dc.html's "Skills & Technologies" section.
export const skillCategories: SkillCategory[] = [
  { label: "Frontend", skills: ["React", "Next.js", "HTML", "CSS", "JavaScript", "Tailwind CSS"] },
  { label: "Backend", skills: ["Node.js", "Firebase", "Supabase"] },
  { label: "AI & Cloud", skills: ["Python", "Google Cloud", "TensorFlow"] },
  { label: "Design", skills: ["Figma", "Canva"] },
  { label: "Developer Tools", skills: ["Git", "GitHub", "VS Code"] },
  { label: "AI Productivity", skills: ["ChatGPT", "Claude"] },
];
