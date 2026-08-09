import type { Gallery } from "@/types";

// Ported verbatim from Portfolio Concept.dc.html's `galleries` map.
export const galleries: Record<string, Gallery> = {
  travel: {
    id: "travel",
    title: "Travel",
    description: "Exploring cultures, places and perspectives.",
    images: [
      { src: "/assets/travel-01.jpeg", alt: "Aircraft seen through an airport opening at sunrise" },
      { src: "/assets/travel-02.jpeg", alt: "Wooden pagoda above a lotus pond, prayer flags overhead" },
      { src: "/assets/travel-03.jpeg", alt: "Limestone karsts rising from calm bay water" },
      { src: "/assets/travel-04.jpeg", alt: "Tree-lined boulevard and fountain seen from a terrace" },
      { src: "/assets/travel-05.jpeg", alt: "City intersection at night with lit signage" },
    ],
  },
  design: {
    id: "design",
    title: "Design",
    description: "Creating intuitive and purposeful experiences.",
    images: [
      { src: "/assets/design-01.png", alt: "Startup Spark event poster" },
      { src: "/assets/design-02.png", alt: "EntreMITT 2026 stall booking expo poster" },
      { src: "/assets/design-03.jpeg", alt: "EntreMITT 2026 — Inspiring Vision to Venture poster" },
      { src: "/assets/design-04.png", alt: "EntreMITT 2026 illustrated poster" },
    ],
  },
  cloudai: {
    id: "cloudai",
    title: "Cloud & AI",
    description: "Learning technologies that shape the future.",
    images: [
      { src: "/assets/cloudai-01.png", alt: "Google Cloud Career Launchpad — Cloud Engineer track certificate" },
    ],
  },
  adventure: {
    id: "adventure",
    title: "Adventure",
    description: "Growing through new challenges and experiences beyond the familiar.",
    images: [
      { src: "/assets/adventure-01.png", alt: "Bare trees and a hillside path in thick morning mist" },
      { src: "/assets/adventure-02.png", alt: "Hillside forest opening onto a distant valley" },
      { src: "/assets/adventure-03.png", alt: "Trees along a stone ledge above farmland" },
      { src: "/assets/adventure-04.png", alt: "Low cloud over a green valley, stone structure on the ridge" },
    ],
  },
};
