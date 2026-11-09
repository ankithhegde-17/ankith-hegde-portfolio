import { optimizedImage } from "@/lib/assets";
import type { FeaturedProject } from "@/types";
import styles from "./FeaturedProjects.module.css";
export function ProjectCard({
  project,
}: {
  project: FeaturedProject;
}) {
  const isResumeLens = project.caseStudyId === "resumelens";
  return (
    <article
      className={`${styles.article} ${project.featured ? styles.featured : ""}`}
    >
      <a
        href={"/projects/" + project.caseStudyId}
        className={`${styles.imageCol} ${isResumeLens ? styles.dashboardPreview : ""}`}
        aria-label={"Explore " + project.title}
      >
        {project.caseStudyId === "teamforge" ? (
          <div
            className={styles.teamPoster}
            aria-hidden="true"
          >
            <div className={styles.posterMeta}>
              PROJECT / {project.number}
              <span>STUDENT COLLABORATION</span>
            </div>
            <div className={styles.posterMark}>
              T+
            </div>
            <div className={styles.posterTitle}>
              {project.title}
              <span>
                Discover. Connect. Build.
              </span>
            </div>
            <div className={styles.posterFoot}>
              PRODUCT EXPLORATION <span>↗</span>
            </div>
          </div>
        ) : (
          <div className={styles.imageFrame}>
            <img
              src={optimizedImage(project.image)}
              alt={project.imageAlt}
              className={styles.image}
              loading="lazy"
              decoding="async"
              width={isResumeLens ? 1901 : 1200}
              height={isResumeLens ? 918 : 675}
            />
          </div>
        )}
        <span className={styles.imageArrow} aria-hidden="true">
          ↗
        </span>
        {project.imageCaption && (
          <span className={styles.imageCaption}>{project.imageCaption}</span>
        )}
      </a>
      <div className={styles.copy}>
        <div className={styles.metaRow}>
          <span className={styles.number}>{project.number}</span>
          <span className={styles.metaText}>{project.kicker}</span>
          <span className={styles.status}>{project.status}</span>
        </div>
        <h3 className={styles.title}>
          <a href={"/projects/" + project.caseStudyId}>{project.title}</a>
        </h3>
        {project.subtitle && (
          <p className={styles.subtitle}>{project.subtitle}</p>
        )}
        <p className={styles.description}>{project.description}</p>
        {project.tags.length > 0 && (
          <div className={styles.tagList}>
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className={styles.actions}>
          <a
            href={"/projects/" + project.caseStudyId}
            className={styles.caseLink}
          >
            Explore project <span aria-hidden="true">↗</span>
          </a>
          <div>
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer">
                {project.featured ? "Live project ↗" : "Live demo ↗"}
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer">
                {project.featured ? "View source ↗" : "GitHub ↗"}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
