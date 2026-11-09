import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

import { certificates } from "@/data/certificates";
import { completedCourses } from "@/data/beyondTheCode";
import { galleries } from "@/data/galleries";
import type { Certificate } from "@/types";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
const CertificateModal = lazy(() =>
  import("@/components/modals/CertificateModal").then((m) => ({
    default: m.CertificateModal,
  })),
);
import { GalleryModal } from "@/components/modals/GalleryModal";

import { Journey } from "@/components/sections/Journey";
import { BeyondCode } from "@/components/sections/BeyondCode";
import { BeyondTheCode } from "@/components/sections/BeyondTheCode";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Achievements } from "@/components/sections/Achievements";
import { ProjectPage } from "@/components/ProjectPage";

import styles from "./App.module.css";

export default function App() {
  const [theme, toggleTheme] = useTheme();

  const [certId, setCertId] = useState<string | null>(null);
  const [galleryId, setGalleryId] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(styles.sectionHeadingEntered);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.25 });

    for (const section of main.querySelectorAll(":scope > section:not(#home)")) {
      const heading = section.querySelector("h2");
      if (heading) observer.observe(heading);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCertId(null);
        setGalleryId(null);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Direct/deep anchor links (e.g. loading the site at "/#contact") land before
  // React mounts the target, so the browser's native hash-scroll finds nothing.
  // Jump once the target exists, respecting each section's scroll-margin-top.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target) return;
    const prevBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    target.scrollIntoView({ block: "start" });
    document.documentElement.style.scrollBehavior = prevBehavior;
  }, []);

  const activeCourse = completedCourses.find((course) => course.id === certId);
  const activeCertificate: Certificate | null = activeCourse
    ? {
        id: activeCourse.id,
        title: activeCourse.title,
        subtitle: activeCourse.platform,
        issuer: activeCourse.issuingInstitution,
        date: activeCourse.completionDate ?? "",
        type: "Course certificate",
        certificate: activeCourse.certificatePdf,
        previewImage: activeCourse.certificateImage,
        credentialId: activeCourse.credentialId,
        verifyUrl: activeCourse.verificationUrl,
      }
    : certId
      ? certificates[certId] ?? null
      : null;
  const activeGallery = galleryId ? galleries[galleryId] : null;
  const projectSlug = window.location.pathname.match(
    /^\/projects\/([^/]+)$/,
  )?.[1];

  if (projectSlug) return <ProjectPage slug={projectSlug} />;

  return (
    <>
      {activeCertificate && (
        <Suspense
          fallback={
            <div role="status" className="modal-loading">
              Loading certificate…
            </div>
          }
        >
          <CertificateModal
            key={activeCertificate.id}
            certificate={activeCertificate}
            onClose={() => setCertId(null)}
          />
        </Suspense>
      )}
      {activeGallery && (
        <GalleryModal
          gallery={activeGallery}
          onClose={() => setGalleryId(null)}
        />
      )}

      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <div className={styles.page}>
        <main id="main" tabIndex={-1} ref={mainRef}>
          <Hero />
          <FeaturedProjects />
          <Skills />
          <About />
          <Experience />
          <Education />
          <Achievements />
          <Journey onOpenCertificate={setCertId} />
          <BeyondTheCode onOpenCertificate={setCertId} />
          <BeyondCode onOpenGallery={setGalleryId} />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
