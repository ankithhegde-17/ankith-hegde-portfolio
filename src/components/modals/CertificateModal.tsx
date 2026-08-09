import { useState } from "react";
import type { Certificate } from "@/types";
import { Modal, ModalHeader, ModalFooter, modalStyles } from "./Modal";
import { CertificatePdfPage } from "./CertificatePdfPage";
import styles from "./CertificateModal.module.css";

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

export function CertificateModal({ certificate: c, onClose }: CertificateModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const meta = [c.subtitle, c.issuer, c.date].filter(Boolean).join(" · ");
  const hasPreviewImage = !!c.previewImage && !imageFailed;
  const showImageFallback = !!c.previewImage && imageFailed;
  const hasPdf = !!c.certificate && !c.previewImage;
  const pending = !c.certificate;
  const credential = c.credentialId
    ? `Credential ID ${c.credentialId}`
    : c.certificate
    ? "PDF · original file"
    : "Certificate file pending";

  return (
    <Modal onClose={onClose} wide={hasPdf || !!c.previewImage}>
      <ModalHeader onClose={onClose} ariaLabel="Close certificate">
        <div className={styles.headerText}>
          <div className={styles.kicker}>{c.type}</div>
          <div className={styles.title}>{c.title}</div>
          <div className={styles.meta}>{meta}</div>
        </div>
      </ModalHeader>

      <div className={styles.body}>
        {hasPreviewImage && (
          <div className={styles.previewWrap}>
            {!imageLoaded && <div className={styles.previewLoading}>Loading certificate preview…</div>}
            <img
              className={styles.previewImg}
              src={c.previewImage!}
              alt={`${c.title} certificate`}
              style={{ display: imageLoaded ? "block" : "none" }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
            />
          </div>
        )}
        {showImageFallback && (
          <div className={styles.pending}>
            Certificate preview couldn't be loaded.
            <br />
            Use Open PDF or Download Certificate below.
          </div>
        )}
        {hasPdf && <CertificatePdfPage src={c.certificate!} />}
        {pending && (
          <div className={styles.pending}>
            Certificate file not supplied yet.
            <br />
            Add the PDF and it will appear here.
          </div>
        )}
      </div>

      <ModalFooter>
        <div className={modalStyles.footerNote}>{credential}</div>
        <div className={modalStyles.footerActions}>
          {c.certificate && (
            <a
              href={c.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-secondary ${modalStyles.actionBtn}`}
            >
              Open PDF
            </a>
          )}
          {c.certificate && (
            <a href={c.certificate} download className={`btn btn-primary ${modalStyles.actionBtn}`}>
              Download Certificate
            </a>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
}
