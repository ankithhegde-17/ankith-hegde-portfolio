import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLoadingIntro } from "@/hooks/useLoadingIntro";
import { certificates } from "@/data/certificates";
import { caseStudies } from "@/data/caseStudies";
import { galleries } from "@/data/galleries";

import { LoadingIntro } from "@/components/layout/LoadingIntro";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CertificateModal } from "@/components/modals/CertificateModal";
import { CaseStudyModal } from "@/components/modals/CaseStudyModal";
import { GalleryModal } from "@/components/modals/GalleryModal";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Experience } from "@/components/sections/Experience";
import { Journey } from "@/components/sections/Journey";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { BeyondCode } from "@/components/sections/BeyondCode";
import { Contact } from "@/components/sections/Contact";

import styles from "./App.module.css";

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const { loading, pct } = useLoadingIntro();

  const [certId, setCertId] = useState<string | null>(null);
  const [studyId, setStudyId] = useState<string | null>(null);
  const [galleryId, setGalleryId] = useState<string | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCertId(null);
        setStudyId(null);
        setGalleryId(null);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const activeCertificate = certId ? certificates[certId] : null;
  const activeCaseStudy = studyId ? caseStudies[studyId] : null;
  const activeGallery = galleryId ? galleries[galleryId] : null;

  return (
    <>
      {loading && <LoadingIntro pct={pct} />}

      {activeCertificate && <CertificateModal certificate={activeCertificate} onClose={() => setCertId(null)} />}
      {activeCaseStudy && <CaseStudyModal study={activeCaseStudy} onClose={() => setStudyId(null)} />}
      {activeGallery && <GalleryModal gallery={activeGallery} onClose={() => setGalleryId(null)} />}

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <div className={styles.page}>
        <Hero />
        <About />
        <Education />
        <Skills />
        <FeaturedProjects onViewCaseStudy={setStudyId} />
        <Experience />
        <Journey onOpenCertificate={setCertId} />
        <CurrentlyBuilding onViewMore={setStudyId} />
        <BeyondCode onOpenGallery={setGalleryId} />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
