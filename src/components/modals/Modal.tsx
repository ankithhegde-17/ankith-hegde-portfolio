import type { MouseEvent, ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  /** Matches the original's two modal z-index tiers (certificate: 180, case study/gallery: 190). */
  raised?: boolean;
  /** Wider desktop panel — used by the certificate modal to give the PDF preview more room. */
  wide?: boolean;
}

export function Modal({ onClose, children, raised, wide }: ModalProps) {
  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <div className={`${styles.backdrop} ${raised ? styles.high : ""}`} onClick={onClose}>
      <div className={`${styles.panel} ${wide ? styles.panelWide : ""}`} onClick={stop}>
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({
  onClose,
  ariaLabel,
  children,
}: {
  onClose: () => void;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.header}>
      {children}
      <button className={styles.closeBtn} onClick={onClose} aria-label={ariaLabel}>
        ✕
      </button>
    </div>
  );
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return <div className={styles.footer}>{children}</div>;
}

export { styles as modalStyles };
