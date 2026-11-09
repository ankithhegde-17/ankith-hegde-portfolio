import { skillCategories } from "@/data/skills";
import styles from "./Skills.module.css";
export function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <div className={styles.kicker}>02 / THE TOOLKIT</div>
            <h2>
              Tools for the
              <br />
              ideas in my head.
            </h2>
          </div>
          <p>
            The languages, frameworks, and tools I use to explore ideas and
            build practical products.
          </p>
        </div>
        <div className={styles.categories}>
          {skillCategories.map((cat, i) => (
            <div key={cat.label} className={styles.category}>
              <div className={styles.top}>
                <span>0{i + 1}</span>
                <span aria-hidden="true">{["{ }", "✳", "</>", "↗"][i]}</span>
              </div>
              <h3>{cat.label}</h3>
              <div className={styles.skills}>
                {cat.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.note}>
          <span aria-hidden="true">↳</span> A growing toolkit. Applied through
          projects, coursework, and hands-on learning.
        </div>
      </div>
    </section>
  );
}
