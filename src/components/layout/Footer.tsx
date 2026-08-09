import { site, footerSectionLinks } from "@/data/site";
import styles from "./Footer.module.css";

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={styles.footer} data-screen-label="Footer">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.brandName}>{site.name}</div>
            <div className={styles.brandTagline}>
              {site.tagline}
              <br />
              {site.subtagline}
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colHeading}>Sections</div>
            <div className={styles.colLinks}>
              {footerSectionLinks.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colHeading}>Elsewhere</div>
            <div className={styles.colLinks}>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${site.email}`}>Email</a>
            </div>
          </div>

          <div className={styles.toTopCol}>
            <button onClick={toTop} className={`btn btn-secondary ${styles.toTopBtn}`}>
              Back to top ↑
            </button>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
