import { skillCategories } from "@/data/skills";
import styles from "./Skills.module.css";

export function Skills() {
  return (
    <section data-screen-label="Skills" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.kickerCol}>
            <div className={styles.kicker}>03 — Skills &amp; Technologies</div>
          </div>
          <div className={styles.categoriesCol}>
            {skillCategories.map((cat) => (
              <div key={cat.label} className={styles.category}>
                <div className={styles.categoryLabel}>{cat.label}</div>
                <div className={styles.tagList}>
                  {cat.skills.map((skill) => (
                    <span key={skill} className="tag tag-outline" style={{ whiteSpace: "nowrap" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
