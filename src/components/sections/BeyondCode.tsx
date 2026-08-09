import { beyondCode } from "@/data/beyondCode";
import styles from "./BeyondCode.module.css";

interface BeyondCodeProps {
  onOpenGallery: (galleryId: string) => void;
}

export function BeyondCode({ onOpenGallery }: BeyondCodeProps) {
  return (
    <section data-screen-label="Beyond Code" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <div>
            <div className={styles.kicker}>08 — Beyond Code</div>
            <h2 className={styles.heading}>The rest of it.</h2>
          </div>
        </div>
        <div className={styles.grid}>
          {beyondCode.map((entry) => (
            <figure key={entry.galleryId}>
              <div className={styles.imageFrame}>
                <img
                  src={entry.image}
                  alt={entry.imageAlt}
                  className={styles.image}
                  style={{ objectFit: entry.imageFit, objectPosition: entry.objectPosition ?? "50% 50%" }}
                />
              </div>
              <figcaption className={styles.caption}>
                <strong style={{ fontFamily: "var(--font-heading)" }}>{entry.title}</strong> {entry.description}
              </figcaption>
              <button onClick={() => onOpenGallery(entry.galleryId)} className={styles.viewMoreBtn}>
                View more
              </button>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
