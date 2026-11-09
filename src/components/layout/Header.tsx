import { useEffect, useRef, useState } from "react";
import type { Theme } from "@/types";
import { navLinks } from "@/data/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import styles from "./Header.module.css";
interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}
export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeId = useScrollSpy(navLinks.map((l) => l.id));
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width:1101px)");
    const onResize = () => {
      if (media.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onEsc);
      media.removeEventListener("change", onResize);
    };
  }, [menuOpen]);
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a
          href="/#home"
          className={styles.brand}
          aria-label="Ankith Hegde, home"
        >
          ANKITH HEGDE<span>.</span>
        </a>
        <nav className={styles.nav} aria-label="Primary">
          <div className={styles.navLinks}>
            {navLinks
              .filter((l) => l.id !== "contact")
              .map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={activeId === link.id ? "location" : undefined}
                  className={activeId === link.id ? styles.active : undefined}
                >
                  {link.label}
                </a>
              ))}
          </div>
          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {theme === "dark" ? "☀" : "◐"}
          </button>
          <a href="#contact" className={styles.contact}>
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={toggleRef}
            className={styles.navToggle}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className={styles.mobileMenu}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
          <a href="/Ankith_Hegde_Resume.pdf">Download résumé ↗</a>
        </nav>
      )}
    </header>
  );
}
