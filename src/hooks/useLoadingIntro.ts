import { useEffect, useState } from "react";

/**
 * The splash-screen progress bar shown on first load —
 * ported from Portfolio Concept.dc.html's runIntro().
 */
export function useLoadingIntro(durationMs = 1300, holdMs = 260) {
  const [loading, setLoading] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = window.setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / durationMs) * 100));
      setPct(p);
      if (p >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => setLoading(false), holdMs);
      }
    }, 40);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, pct };
}
