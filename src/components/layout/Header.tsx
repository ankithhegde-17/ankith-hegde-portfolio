import { useEffect, useState } from "react";
import type { Theme } from "@/types";
import { site, navLinks } from "@/data/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import styles from "./Header.module.css";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(navLinks.map((l) => l.id));

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <header className={styles.header} data-screen-label="Nav">
      <div className={styles.bar}>
        <a href="#home" className={styles.brand}>
          <span className={styles.brandName}>{site.name}</span>
          <span className={styles.brandRole}>{site.role}</span>
        </a>
        <nav aria-label="Primary" className={styles.nav}>
          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`${styles.navLink} ${activeId === link.id ? styles.active : ""}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button onClick={onToggleTheme} className={`btn btn-secondary ${styles.themeToggle}`}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button
            className={styles.navToggle}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburger}>
              <span />
              <span />
            </span>
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} onClick={closeMenu} className={styles.mobileLink}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
