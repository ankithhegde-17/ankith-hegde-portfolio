import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask, RenderTask } from "pdfjs-dist";
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import styles from "./CertificateModal.module.css";

let pdfjsLibPromise: Promise<typeof import("pdfjs-dist")> | null = null;

function loadPdfjs() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import("pdfjs-dist").then((lib) => {
      lib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
      return lib;
    });
  }
  return pdfjsLibPromise;
}

interface CertificatePdfPageProps {
  src: string;
}

/**
 * Renders page 1 of a PDF onto a canvas, scaled to "contain" within the
 * frame — the whole page always fits with no cropping/stretching, regardless
 * of the browser's own PDF viewer or the page's aspect ratio.
 */
export function CertificatePdfPage({ src }: CertificatePdfPageProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let generation = 0;
    let loadingTask: PDFDocumentLoadingTask | null = null;
    let renderTask: RenderTask | null = null;

    async function render() {
      const myGeneration = ++generation;
      const frame = frameRef.current;
      const canvas = canvasRef.current;
      if (!frame || !canvas) return;

      const { width: frameWidth, height: frameHeight } = frame.getBoundingClientRect();
      if (frameWidth === 0 || frameHeight === 0) return;

      try {
        const pdfjsLib = await loadPdfjs();
        if (cancelled || myGeneration !== generation) return;
        if (!loadingTask) loadingTask = pdfjsLib.getDocument({ url: src });
        const pdfDoc = await loadingTask.promise;
        if (cancelled || myGeneration !== generation) return;

        const page = await pdfDoc.getPage(1);
        if (cancelled || myGeneration !== generation) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const fitScale = Math.min(frameWidth / baseViewport.width, frameHeight / baseViewport.height);
        // Cap DPR: uncapped 3x devices can push canvas allocation past mobile
        // Safari's canvas memory limits, causing a silent render failure.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale: fitScale * dpr });

        if (cancelled || myGeneration !== generation) return;
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        renderTask?.cancel();
        renderTask = page.render({ canvas, viewport });
        await renderTask.promise;
      } catch (err) {
        if (!cancelled && myGeneration === generation && !(err instanceof Error && err.name === "RenderingCancelledException")) {
          console.error("Certificate PDF render failed:", err);
          setError(true);
        }
      }
    }

    const ro = new ResizeObserver(() => render());
    if (frameRef.current) ro.observe(frameRef.current);

    return () => {
      cancelled = true;
      ro.disconnect();
      renderTask?.cancel();
      loadingTask?.destroy();
    };
  }, [src]);

  return (
    <div ref={frameRef} className={styles.pdfFrame}>
      {error ? (
        <div className={styles.pending}>Certificate preview couldn't be loaded.</div>
      ) : (
        <canvas ref={canvasRef} className={styles.pdfCanvas} />
      )}
    </div>
  );
}
