export interface HackathonHighlight {
  id: string;
  title: string;
  scope: string;
  badge: string;
  date: string | null;
  team: string | null;
  venue: string | null;
  description: string;
  project: { title: string; href: string } | null;
}

export const hackathonHighlights: HackathonHighlight[] = [
  {
    id: "sih-internal",
    title: "Smart India Hackathon",
    scope: "College-level internal hackathon",
    badge: "1ST PLACE",
    date: null,
    team: "Code for India",
    venue: null,
    description:
      "Secured first place as part of Team Code for India in the college-level internal Smart India Hackathon. The experience strengthened my problem-solving, collaboration, and innovation skills through competitive team-based development.",
    project: null,
  },
  {
    id: "build-bengaluru",
    title: "Build Bengaluru Hackathon",
    scope: "Selected for the final rounds",
    badge: "FINALIST",
    date: null,
    team: null,
    venue: "Microsoft Office, Bengaluru",
    description:
      "Selected for the final rounds of the Build Bengaluru Hackathon, where our team presented HR Signal AI at the Microsoft office in Bengaluru. The experience provided an opportunity to demonstrate our solution, collaborate under pressure, and gain valuable exposure to a competitive technology environment.",
    project: { title: "HR Signal AI", href: "/projects/hr-signal-ai" },
  },
  {
    id: "hackmitten-3",
    title: "HackMITTEN 3.0",
    scope: "24-hour hackathon · Participation",
    badge: "PARTICIPANT",
    date: "October 28–29, 2026",
    team: "PsyNex",
    venue: "Maharaja Institute of Technology, Thandavapura",
    description:
      "Participated in HackMITTEN 3.0, a 24-hour hackathon, where our team developed Campus Unify, a multi-campus Enterprise Resource Planning platform designed to simplify academic administration through centralized management, role-based access, and fee workflows.",
    project: { title: "Campus Unify", href: "/projects/campus-unify" },
  },
];

export const communityExperiences = [
  {
    id: "ecell-bengaluru",
    title: "E-Cell Bombay Chapter Event — Bengaluru",
    date: "October 4, 2026",
    location: "Sapthagiri NPS College",
    role: "Participant",
    activities: ["Business Model Canvas Workshop", "IPL Auction Simulation"],
    description:
      "Participated in entrepreneurship-focused activities, including a Business Model Canvas workshop and an IPL auction simulation. These activities provided practical exposure to business planning, budgeting, strategic decision-making, and resource allocation.",
  },
  {
    id: "dasara-volunteering",
    title: "Mysuru Dasara Exhibition",
    date: "October 19–20, 2026",
    location: "Mysuru Dasara Exhibition",
    role: "Volunteer · Science & Aerospace",
    activities: [],
    description:
      "Volunteered during the 2026 Mysuru Dasara Exhibition, supporting a science and aerospace presentation featuring a 2D aircraft model. The experience offered exposure to indigenous Indian aircraft and missile technologies, along with opportunities to learn about engineering innovation and public science engagement.",
  },
];

/** Unknown credential details remain null until the original records are supplied. */
export interface CompletedCourse {
  id: string;
  title: string;
  platform: string;
  status: "Completed";
  issuingInstitution: string | null;
  completionDate: string | null;
  certificateImage: string | null;
  certificatePdf: string | null;
  verificationUrl: string | null;
  credentialId: string | null;
}

export const completedCourses: CompletedCourse[] = [
  {
    id: "embedded-web-security",
    title: "Web Connectivity and Security in Embedded Systems",
    platform: "Coursera",
    status: "Completed",
    issuingInstitution: "28DIGITAL",
    completionDate: "October 26, 2026",
    certificateImage: "/certificates/previews/coursera-embedded-web-security.png",
    certificatePdf: "/certificates/coursera-embedded-web-security.pdf",
    verificationUrl: "https://coursera.org/verify/70UN14EBIPJ2",
    credentialId: null,
  },
  {
    id: "cloud-101",
    title: "Cloud Computing Basics (Cloud 101)",
    platform: "Coursera",
    status: "Completed",
    issuingInstitution: "LearnQuest",
    completionDate: "October 23, 2026",
    certificateImage: "/certificates/previews/coursera-cloud-101.png",
    certificatePdf: "/certificates/coursera-cloud-101.pdf",
    verificationUrl: "https://coursera.org/verify/EBWL8AG20GXU",
    credentialId: null,
  },
  {
    id: "udemy-full-stack-bootcamp",
    title: "The Complete Full-Stack Web Development Bootcamp",
    platform: "Udemy",
    status: "Completed",
    issuingInstitution: null,
    completionDate: "January 28, 2026",
    certificateImage: "/certificates/previews/udemy-full-stack-bootcamp.png",
    certificatePdf: "/certificates/udemy-full-stack-bootcamp.pdf",
    verificationUrl: "https://ude.my/UC-a344b417-5f96-4dc1-8edf-2a318a9205f4",
    credentialId: "UC-a344b417-5f96-4dc1-8edf-2a318a9205f4",
  },
  {
    id: "google-cloud-career-launchpad",
    title: "Google Cloud Career Launchpad",
    platform: "Google Cloud",
    status: "Completed",
    issuingInstitution: "Cloud Engineer track",
    completionDate: "Issued May 20, 2026",
    certificateImage: "/certificates/previews/gc-launchpad.png",
    certificatePdf: "/certificates/google-cloud-career-launchpad.pdf",
    verificationUrl: null,
    credentialId: null,
  },
  {
    id: "aiquantum-summer-internship",
    title: "Machine Learning and Deep Learning using Python Programming",
    platform: "Summer internship training",
    status: "Completed",
    issuingInstitution: "AIQuantum Smart Solutions Pvt. Ltd.",
    completionDate: "August 19 – September 18, 2025",
    certificateImage: "/certificates/previews/aiquantum-summer-internship.png",
    certificatePdf: "/certificates/aiquantum-summer-internship.pdf",
    verificationUrl: null,
    credentialId: null,
  },
];
