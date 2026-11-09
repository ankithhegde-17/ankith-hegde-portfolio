import { useEffect, useRef, type KeyboardEventHandler, type MouseEvent, type ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  label?: string;
  onClose: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  children: ReactNode;
  /** Matches the original's two modal z-index tiers (certificate: 180, case study/gallery: 190). */
  raised?: boolean;
  /** Wider desktop panel — used by the certificate modal to give the PDF preview more room. */
  wide?: boolean;
}

export function Modal({
  onClose,
  onKeyDown,
  children,
  raised,
  wide,
  label = "Portfolio detail",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const getFocusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href],button:not(:disabled),input:not(:disabled),textarea:not(:disabled),[tabindex="0"]',
        ) || [],
      ).filter((el) => el.getClientRects().length > 0);
    (getFocusable()[0] || panel)?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        panel?.focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <div
      className={`${styles.backdrop} ${raised ? styles.high : ""}`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`${styles.panel} ${wide ? styles.panelWide : ""}`}
        onClick={stop}
        onKeyDown={onKeyDown}
      >
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
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label={ariaLabel}
      >
        ✕
      </button>
    </div>
  );
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return <div className={styles.footer}>{children}</div>;
}

export { styles as modalStyles };
