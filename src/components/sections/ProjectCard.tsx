import type { FeaturedProject } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./FeaturedProjects.module.css";

interface ProjectCardProps {
  project: FeaturedProject;
  onViewMore: (caseStudyId: string) => void;
  index: number;
}

export function ProjectCard({ project, onViewMore, index }: ProjectCardProps) {
  const imageFirst = !!project.imageFirst;
  const kickerParts = project.kicker.split(" · ");
  const kickerStatus = kickerParts.pop();
  const kickerPrefix = kickerParts.join(" · ");

  return (
    <Reveal as="article" index={index} className={styles.article}>
      <div className={`${styles.copy} ${imageFirst ? styles.imageFirst : ""}`}>
        <div className={styles.metaRow}>
          <span className={styles.number}>{project.number}</span>
          <span className={styles.metaText}>
            {kickerPrefix} · <span className={styles.metaAccent}>{kickerStatus}</span>
          </span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tagList}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag tag-neutral" style={{ whiteSpace: "nowrap" }}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={() => onViewMore(project.caseStudyId)} className={styles.viewMoreBtn}>
            View more
          </button>
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={styles.linkOut}>
              Live
            </a>
          )}
          {project.links.liveDisabled && <span className={styles.linkMuted}>Live</span>}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={styles.linkOut}>
              GitHub
            </a>
          )}
        </div>
      </div>
      <div className={`${styles.imageCol} ${imageFirst ? styles.imageFirst : ""}`}>
        <div className={styles.imageFrame}>
          <img src={project.image} alt={project.imageAlt} className={styles.image} />
        </div>
      </div>
    </Reveal>
  );
}
