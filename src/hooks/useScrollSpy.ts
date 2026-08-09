import { useEffect, useState } from "react";

/**
 * Underlines the nav item for the section currently under the header bar —
 * ported from Portfolio Concept.dc.html's markActiveSection().
 */
export function useScrollSpy(ids: string[], offset = 140): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const markActive = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    markActive();
    window.addEventListener("scroll", markActive, { passive: true });
    return () => window.removeEventListener("scroll", markActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|"), offset]);

  return active;
}
