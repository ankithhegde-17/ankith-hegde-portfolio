import { site } from "@/data/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} data-screen-label="Footer">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.brandName}>{site.name}</div>
            <div className={styles.brandTagline}>
              Software Development · AI & Data Science
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.colLinks}>
              <a href="#projects">Projects</a>
              <a href="/Ankith_Hegde_Resume.pdf">Resume</a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.accentLink}
              >
                GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.accentLink}
              >
                LinkedIn
              </a>
              <a href={`mailto:${site.email}`} className={styles.accentLink}>
                Email
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 {site.name}</span>
          <span>BUILT WITH CURIOSITY.</span>
        </div>
      </div>
    </footer>
  );
}
