export type Theme = "light" | "dark";

export interface Certificate {
  id: string;
  title: string;
  subtitle: string | null;
  issuer: string | null;
  date: string;
  type: string;
  /** Static file path under /public, e.g. "/certificates/foo.pdf". Null if not supplied yet. */
  certificate: string | null;
  /** Static preview image path under /public. Null until supplied. */
  previewImage: string | null;
  credentialId: string | null;
  verifyUrl: string | null;
}

export interface CaseStudyFeatureRow {
  name: string;
  text: string;
}

export interface CaseStudyPillar {
  name: string;
  text: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  meta: string;
  problem: string;
  solution: string;
  quote: string;
  solutionAfter: string;
  features: string[] | null;
  featureBullets: string[] | null;
  featureRows: CaseStudyFeatureRow[] | null;
  role: string;
  challenge: string;
  approach: string;
  pillars: CaseStudyPillar[] | null;
  outcome: string;
  stack: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Gallery {
  id: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface JourneyItem {
  year: string;
  title: string;
  detail: string;
  kind: string;
  big: boolean;
  certId?: string;
}

export interface FeaturedProject {
  number: string;
  kicker: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  caseStudyId: string;
  links: {
    live?: string;
    liveDisabled?: boolean;
    github?: string;
  };
  imageFirst?: boolean;
}

export interface ExperienceEntry {
  title: string;
  org: string;
  description: string;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export interface BeyondCodeEntry {
  galleryId: string;
  image: string;
  imageAlt: string;
  imageFit: "cover" | "contain";
  objectPosition?: string;
  title: string;
  description: string;
}
