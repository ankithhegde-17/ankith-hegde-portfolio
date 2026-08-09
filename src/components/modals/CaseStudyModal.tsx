import type { CaseStudy } from "@/types";
import { Modal, ModalHeader, ModalFooter, modalStyles } from "./Modal";
import styles from "./CaseStudyModal.module.css";

interface CaseStudyModalProps {
  study: CaseStudy;
  onClose: () => void;
}

export function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  const hasFeatures = !!study.features?.length;
  const hasBullets = !!study.featureBullets?.length;
  const hasRows = !!study.featureRows?.length;
  const hasKeyFeatures = hasFeatures || hasBullets || hasRows;

  return (
    <Modal onClose={onClose} raised>
      <ModalHeader onClose={onClose} ariaLabel="Close case study">
        <div className={styles.headerText}>
          <div className={styles.kicker}>{study.meta}</div>
          <div className={styles.title}>{study.title}</div>
        </div>
      </ModalHeader>

      <div className={styles.body}>
        <div className={styles.row}>
          <div className={styles.rowLabel}>The problem</div>
          <div className={styles.rowText}>{study.problem}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowLabel}>The solution</div>
          <div>
            <div className={styles.rowText}>{study.solution}</div>
            {study.quote && <div className={styles.quote}>{study.quote}</div>}
            {study.solutionAfter && <div className={styles.rowText} style={{ marginTop: 18 }}>{study.solutionAfter}</div>}
          </div>
        </div>

        {hasKeyFeatures && (
          <div className={styles.row}>
            <div className={styles.rowLabel}>Key features</div>
            <div>
              {hasFeatures && (
                <div className={styles.tagList}>
                  {study.features!.map((feat) => (
                    <span key={feat} className="tag tag-outline" style={{ whiteSpace: "nowrap" }}>
                      {feat}
                    </span>
                  ))}
                </div>
              )}
              {hasBullets &&
                study.featureBullets!.map((fb) => (
                  <div key={fb} className={styles.bulletRow}>
                    <span className={styles.bulletMark}>—</span>
                    <span>{fb}</span>
                  </div>
                ))}
              {hasRows &&
                study.featureRows!.map((fr) => (
                  <div key={fr.name} className={styles.detailRow}>
                    <div className={styles.detailName}>{fr.name}</div>
                    <div className={styles.detailText}>{fr.text}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className={styles.row}>
          <div className={styles.rowLabel}>My role</div>
          <div className={styles.rowText}>{study.role}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowLabel}>Challenge</div>
          <div className={styles.rowText}>{study.challenge}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowLabel}>Approach</div>
          <div>
            <div className={styles.rowText}>{study.approach}</div>
            {study.pillars?.map((p) => (
              <div key={p.name} className={styles.pillarRow}>
                <div className={styles.detailName}>{p.name}</div>
                <div className={styles.detailText}>{p.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.row} ${styles.noBorder}`}>
          <div className={styles.rowLabel}>Outcome</div>
          <div className={styles.rowText}>{study.outcome}</div>
        </div>
      </div>

      <ModalFooter>
        <div className={modalStyles.footerNote}>{study.stack}</div>
        <button onClick={onClose} className={`btn btn-secondary ${modalStyles.actionBtn}`}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}
