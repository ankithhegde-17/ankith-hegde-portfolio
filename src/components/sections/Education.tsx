import { education } from "@/data/site";
import styles from "./Education.module.css";

export function Education() {
  return (
    <section data-screen-label="Education" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.kickerCol}>
            <div className={styles.kicker}>02 — Education</div>
          </div>
          <div className={styles.contentCol}>
            <div className={styles.row}>
              <div className={styles.years}>{education.years}</div>
              <div>
                <div className={styles.degree}>{education.degree}</div>
                <div className={styles.detail}>{education.detail}</div>
              </div>
              <div className={styles.institution}>
                {education.institution}
                <br />
                {education.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
