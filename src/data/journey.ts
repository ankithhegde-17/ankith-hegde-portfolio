import type { JourneyItem } from "@/types";

// Ported verbatim from Portfolio Concept.dc.html's `journey` array (built via the `mk` helper).
export const journey: JourneyItem[] = [
  { year: "Jun 2026", title: "Munde Banni", detail: "SJCE Mysuru · 6 June 2026", kind: "Event", big: false },
  { year: "May 2026", title: "Google Cloud Career Launchpad", detail: "Cloud Engineer Track · 20 May 2026", kind: "Certification", big: true, certId: "gc-launchpad" },
  { year: "Mar 2026", title: "Vision Mysuru 2050 — Finalist", detail: "15 March 2026", kind: "Competition", big: true },
  { year: "Mar 2026", title: "ISRO ISTRAC Visit", detail: "Bengaluru · 4 March 2026", kind: "Visit", big: false },
  { year: "Feb 2026", title: "PALS innoWAH! Cluster Finals", detail: "Team SATTVA · PALS · 14 February 2026 · NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY, BENGALURU", kind: "Competition", big: true, certId: "pals-innowah" },
  { year: "Feb 2026", title: "Full Stack Web Development", detail: "February 2026", kind: "Certification", big: false, certId: "fullstack-web" },
  { year: "Jan 2026", title: "IUCEE IASF 2026", detail: "GITAM University, Bengaluru · January 2026", kind: "Conference", big: false, certId: "iucee-iasf" },
  { year: "Dec 2025", title: "Drone Workshop Organizer", detail: "WINGS of MITT Aero Club · 18 December 2025", kind: "Workshop", big: true },
  { year: "Dec 2025", title: "E-Summit IIT Bombay", detail: "December 2025", kind: "Event", big: false },
  { year: "Oct 2025", title: "Grassroots Innovation — Finalist", detail: "Government of Karnataka · 15 October 2025", kind: "Competition", big: true },
  { year: "2025", title: "Generative AI with Microsoft Copilot", detail: "", kind: "Certification", big: false, certId: "copilot-genai" },
  { year: "Aug 2025", title: "ML & Deep Learning Internship", detail: "AIQuantum Smart Solutions Pvt. Ltd. · 19 Aug — 18 Sept 2025", kind: "Internship", big: true },
  { year: "Aug 2025", title: "Sigma Ideathon — Second Place", detail: "21 August 2025", kind: "Competition", big: true, certId: "sigma-ideathon" },
  { year: "Oct 2024", title: "Aero Modelling Workshop", detail: "Nitte Meenakshi Institute of Technology, Bengaluru · October 2024", kind: "Workshop", big: false },
  { year: "2024", title: "Started B.E. in AI & Data Science", detail: "Maharaja Institute of Technology Mysuru", kind: "Milestone", big: true },
];
