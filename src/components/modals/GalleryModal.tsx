import { useRef, useState, type PointerEvent } from "react";
import { optimizedImage } from "@/lib/assets";
import type { Gallery } from "@/types";
import { Modal, ModalHeader } from "./Modal";
import styles from "./GalleryModal.module.css";

interface GalleryModalProps {
  gallery: Gallery;
  onClose: () => void;
}

export function GalleryModal({ gallery, onClose }: GalleryModalProps) {
  const [index, setIndex] = useState(0);
  const swipeStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const total = gallery.images.length;
  const photo = gallery.images[index];
  const move = (direction: number) => {
    setIndex((current) => (current + direction + total) % total);
  };

  const startSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch" || total < 2) return;
    if (!event.isPrimary) {
      swipeStart.current = null;
      return;
    }
    swipeStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const cancelSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current?.id === event.pointerId) swipeStart.current = null;
  };

  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    if (!start || start.id !== event.pointerId) return;
    swipeStart.current = null;
    const horizontal = event.clientX - start.x;
    const vertical = event.clientY - start.y;
    if (Math.abs(horizontal) >= 45 && Math.abs(horizontal) > Math.abs(vertical) * 1.25) {
      move(horizontal < 0 ? 1 : -1);
    }
  };

  return (
    <Modal
      label={gallery.title}
      onClose={onClose}
      raised
      onKeyDown={(event) => {
        if (total < 2 || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }}
    >
      <ModalHeader onClose={onClose} ariaLabel="Close gallery">
        <div className={styles.headerText}>
          <div className={styles.title}>{gallery.title}</div>
          <div className={styles.description}>{gallery.description}</div>
        </div>
      </ModalHeader>

      <div className={styles.body}>
        {photo && (
          <div
            className={styles.stage}
            onPointerDown={startSwipe}
            onPointerUp={finishSwipe}
            onPointerCancel={cancelSwipe}
            onLostPointerCapture={cancelSwipe}
          >
            <img src={optimizedImage(photo.src)} alt={photo.alt} draggable={false} />
          </div>
        )}
        {total > 1 && (
          <>
            <div className={styles.controls}>
              <button type="button" className={styles.arrow} aria-label="Previous photo" onClick={() => move(-1)}>←</button>
              <p className={styles.counter} aria-live="polite">{index + 1} / {total}</p>
              <button type="button" className={styles.arrow} aria-label="Next photo" onClick={() => move(1)}>→</button>
            </div>
            <div className={styles.thumbs} role="group" aria-label="Choose a photo">
              {gallery.images.map((image, position) => (
                <button
                  key={image.src}
                  type="button"
                  className={styles.thumb}
                  aria-label={`Photo ${position + 1}: ${image.alt}`}
                  aria-current={position === index ? "true" : undefined}
                  onClick={() => setIndex(position)}
                >
                  <img src={optimizedImage(image.src)} alt="" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
