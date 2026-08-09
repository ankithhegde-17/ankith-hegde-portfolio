import { teamForge } from "@/data/site";
import styles from "./CurrentlyBuilding.module.css";

interface CurrentlyBuildingProps {
  onViewMore: (caseStudyId: string) => void;
}

export function CurrentlyBuilding({ onViewMore }: CurrentlyBuildingProps) {
  return (
    <section data-screen-label="Currently Building" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.kickerCol}>
            <div className={styles.kicker}>07 — Currently Building</div>
            <h2 className={styles.heading}>Work in progress.</h2>
          </div>
          <div className={styles.listCol}>
            <div className={styles.row}>
              <div>
                <div className={styles.projectTitle}>{teamForge.title}</div>
                <div className={styles.projectMeta}>{teamForge.meta}</div>
                <div className={styles.projectDescription}>{teamForge.description}</div>
                <div className={styles.actions}>
                  <button onClick={() => onViewMore(teamForge.caseStudyId)} className={styles.viewMoreBtn}>
                    View more
                  </button>
                  <a href={teamForge.github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                    GitHub
                  </a>
                </div>
              </div>
              <div className={styles.status}>{teamForge.status}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
