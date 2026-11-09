import { journey } from "@/data/journey";
import styles from "./Journey.module.css";
export function Journey({
  onOpenCertificate,
}: {
  onOpenCertificate: (id: string) => void;
}) {
  return (
    <section id="journey" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <div className={styles.kicker}>06 / THE CHANGELOG</div>
            <h2>A journey, still unfolding.</h2>
          </div>
          <span className={styles.label}>2024 → 2026</span>
        </div>
        <p className={styles.intro}>
          Every milestone, along the way. Courses, competitions, communities,
          and experiences beyond the classroom.
        </p>
        <details className={styles.details}>
          <summary>
            Explore the full journey{" "}
            <span>
              {journey.length} ENTRIES <b aria-hidden="true">+</b>
            </span>
          </summary>
          <div className={styles.timeline}>
            {journey.map((item) => (
              <article key={item.year + item.title} className={styles.item}>
                <div className={styles.year}>{item.year}</div>
                <div className={styles.copy}>
                  <span className={styles.kind}>{item.kind}</span>
                  <h3>{item.title}</h3>
                  {item.detail && <p>{item.detail}</p>}
                  {item.project && (
                    <a className="btn-text" href={item.project.href}>
                      Explore {item.project.title} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {item.certId && (
                    <button
                      className="btn-text"
                      onClick={() => onOpenCertificate(item.certId!)}
                    >
                      View certificate ↗
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
