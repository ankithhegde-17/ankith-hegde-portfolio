import { useEffect, useRef, useState } from "react";

/**
 * Brief entrance for project cards with a small stagger.
 */
export function useReveal<T extends HTMLElement>(index = 0) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(node);
    const fallback = window.setTimeout(() => setRevealed(true), 3000);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const style: React.CSSProperties = {
    opacity: revealed ? 1 : 0.85,
    transform: revealed ? "none" : "translateY(5px)",
    transition:
      "opacity 320ms var(--ease-out), transform 320ms var(--ease-out)",
    transitionDelay: `${(index % 2) * 40}ms`,
  };

  return { ref, style };
}
