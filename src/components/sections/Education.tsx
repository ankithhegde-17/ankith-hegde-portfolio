import { education } from "@/data/site";
import styles from "./Education.module.css";
export function Education() {
  return (
    <section id="education" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.kicker}>EDUCATION / CURRENT BUILD</div>
        <div className={styles.grid}>
          <div className={styles.years}>{education.years}</div>
          <div>
            <h2>{education.degree}</h2>
            <p>{education.institution}</p>
            <span>{education.detail}</span>
            {education.location && <p>{education.location}</p>}
          </div>
          <span className={styles.mark} aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </section>
  );
}
