import type { Gallery } from "@/types";
import { Modal, ModalHeader } from "./Modal";
import styles from "./GalleryModal.module.css";

interface GalleryModalProps {
  gallery: Gallery;
  onClose: () => void;
}

export function GalleryModal({ gallery, onClose }: GalleryModalProps) {
  const [lead, ...rest] = gallery.images;

  return (
    <Modal onClose={onClose} raised>
      <ModalHeader onClose={onClose} ariaLabel="Close gallery">
        <div className={styles.headerText}>
          <div className={styles.title}>{gallery.title}</div>
          <div className={styles.description}>{gallery.description}</div>
        </div>
      </ModalHeader>

      <div className={styles.body}>
        {lead && <img className={styles.lead} src={lead.src} alt={lead.alt} />}
        <div className={styles.thumbs}>
          {rest.map((im) => (
            <img key={im.src} className={styles.thumb} src={im.src} alt={im.alt} loading="lazy" />
          ))}
        </div>
      </div>
    </Modal>
  );
}
