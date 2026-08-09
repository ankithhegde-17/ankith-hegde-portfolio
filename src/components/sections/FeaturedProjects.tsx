import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./FeaturedProjects.module.css";

interface FeaturedProjectsProps {
  onViewCaseStudy: (caseStudyId: string) => void;
}

export function FeaturedProjects({ onViewCaseStudy }: FeaturedProjectsProps) {
  return (
    <section id="work" data-screen-label="Featured Projects" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <div>
            <div className={styles.kicker}>04 — Featured Projects</div>
            <h2 className={styles.heading}>Three flagship projects.</h2>
          </div>
        </div>

        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.caseStudyId} project={project} onViewMore={onViewCaseStudy} index={i} />
        ))}
      </div>
    </section>
  );
}
