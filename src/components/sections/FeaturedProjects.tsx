import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./FeaturedProjects.module.css";
export function FeaturedProjects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <div>
            <div className={styles.kicker}>01 / SELECTED WORK</div>
            <h2 className={styles.heading}>
              Ideas into <span>working software.</span>
            </h2>
          </div>
          <p className={styles.intro}>
            Product thinking. Technical exploration.
            <br />A selection of what I’m building and learning.
          </p>
        </div>
        <div className={styles.projects}>
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.caseStudyId}
              project={project}
            />
          ))}
        </div>
        <div className={styles.endnote}>
          <span>FROM WEB APPLICATIONS TO CONNECTED HARDWARE</span>
          <a
            href="https://github.com/ankithhegde-17"
            target="_blank"
            rel="noreferrer"
          >
            More on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
