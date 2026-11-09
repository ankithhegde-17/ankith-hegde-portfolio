import { experience } from "@/data/experience";
import styles from "./Experience.module.css";
export function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.kicker}>04 / EXPERIENCE</div>
          <h2>
            Learning by
            <br />
            doing the work.
          </h2>
          <p>
            Internship experience, technical leadership, and engineering
            communities.
          </p>
        </div>
        <div className={styles.list}>
          {experience.map((entry, i) => (
            <article key={entry.title + entry.org} className={styles.row}>
              <span className={styles.number}>0{i + 1}</span>
              <div>
                <h3>{entry.title}</h3>
                <div className={styles.org}>{entry.org}</div>
                <ul>
                  {entry.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
