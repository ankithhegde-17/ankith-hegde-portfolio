import { journey } from "@/data/journey";
import styles from "./Journey.module.css";

interface JourneyProps {
  onOpenCertificate: (certId: string) => void;
}

export function Journey({ onOpenCertificate }: JourneyProps) {
  return (
    <section id="journey" data-screen-label="Journey" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <div>
            <div className={styles.kicker}>06 — Journey of Growth</div>
            <h2 className={styles.heading}>Every milestone, along the way.</h2>
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.legendDotFilled} />
              Milestone
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendDotOutline} />
              Step
            </span>
          </div>
        </div>

        <div className={styles.topRule} />

        {journey.map((item, i) => {
          const dotSize = item.big ? 14 : 10;
          const isLast = i === journey.length - 1;
          return (
            <div key={`${item.year}-${item.title}`} className={styles.item}>
              <div className={styles.year}>{item.year}</div>
              <div className={styles.dotCol}>
                {!isLast && <div className={styles.dotLine} />}
                <div
                  className={styles.dot}
                  style={{
                    width: dotSize,
                    height: dotSize,
                    background: item.big ? "var(--color-accent)" : "var(--color-bg)",
                    border: `2px solid ${item.big ? "var(--color-accent)" : "var(--color-divider)"}`,
                  }}
                />
              </div>
              <div>
                <div className={styles.mobileYear}>{item.year}</div>
                <div className={styles.itemTitle}>{item.title}</div>
                {item.detail && <div className={styles.itemDetail}>{item.detail}</div>}
              </div>
              <div className={styles.itemMeta}>
                <span className="tag tag-outline" style={{ whiteSpace: "nowrap" }}>
                  {item.kind}
                </span>
                {item.certId && (
                  <button className={styles.certBtn} onClick={() => onOpenCertificate(item.certId!)}>
                    Certificate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
