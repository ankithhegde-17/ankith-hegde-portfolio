import { experience } from "@/data/experience";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <section data-screen-label="Experience" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.kickerCol}>
            <div className={styles.kicker}>05 — Experience</div>
          </div>
          <div className={styles.list}>
            {experience.map((entry) => (
              <div key={entry.title + entry.org} className={styles.row}>
                <div>
                  <div className={styles.title}>{entry.title}</div>
                  <div className={styles.org}>{entry.org}</div>
                </div>
                <div className={styles.description}>{entry.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
