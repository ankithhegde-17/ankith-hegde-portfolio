import { useEffect, useRef, useState } from "react";

/**
 * Per-element fade/slide-in-on-scroll, ported from Portfolio Concept.dc.html's
 * setupReveals(). `index` staggers the transition delay the same way the
 * original did with `(i % 6) * 60ms`.
 */
export function useReveal<T extends HTMLElement>(index = 0) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(node);
    const fallback = window.setTimeout(() => setRevealed(true), 3000);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const style: React.CSSProperties = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "none" : "translateY(12px)",
    transition: "opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1)",
    transitionDelay: `${(index % 6) * 60}ms`,
  };

  return { ref, style };
}
