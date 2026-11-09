import { optimizedImage } from "@/lib/assets";
import { useEffect } from "react";
import { featuredProjects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";
import styles from "./ProjectPage.module.css";

const caseStudyLinks = [
  { id: "problem", label: "The problem" },
  { id: "solution", label: "The solution" },
  { id: "contribution", label: "Contribution & context" },
  { id: "architecture", label: "Architecture & approach" },
  { id: "outcome", label: "Outcome & next steps" },
];

export function ProjectPage({ slug }: { slug: string }) {
  const project = featuredProjects.find((p) => p.caseStudyId === slug);
  const study = caseStudies[slug];
  useEffect(() => {
    const title = project
      ? project.title + " — " + site.name
      : "Project not found — " + site.name;
    document.title = title;
    if (!project) return;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const url = new URL("/projects/" + project.caseStudyId, canonical?.href ?? "https://ankithhegde.com").href;
    const description = project.description;
    const metadata = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:url"]': url,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
    };
    for (const [selector, content] of Object.entries(metadata)) {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
    }
    canonical?.setAttribute("href", url);
  }, [project]);
  if (!project)
    return (
      <main className={styles.page}>
        <a href="/">← Back to portfolio</a>
        <h1>Project not found.</h1>
        <p>The project you’re looking for isn’t available at this address.</p>
      </main>
    );
  const isResumeLens = slug === "resumelens";
  const hasCover = slug !== "teamforge";
  return (
    <main className={styles.page}>
      <a className={styles.back} href="/#projects">
        ← Back to selected work
      </a>
      <article>
        <header className={styles.header}>
          <div className={styles.meta}>
            PROJECT {project.number} / {project.kicker}
          </div>
          <h1>
            {project.title}
            <span>.</span>
          </h1>
          {project.subtitle && (
            <p className={styles.subtitle}>{project.subtitle}</p>
          )}
          <p className={styles.lede}>{project.description}</p>
          {project.tags.length > 0 && (
            <div className={styles.tags}>
              {project.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className={styles.links}>
            {project.links.live && (
              <a
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
                href={project.links.live}
              >
                Live project ↗
              </a>
            )}
            {project.links.github && (
              <a
                className="btn btn-secondary"
                target="_blank"
                rel="noreferrer"
                href={project.links.github}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </header>
        {hasCover && (
          <figure
            className={project.imageCaption ? styles.fullFigure : undefined}
          >
            <img
              className={`${styles.cover} ${isResumeLens ? styles.dashboardCover : ""}`}
              src={optimizedImage(project.image)}
              alt={project.imageAlt}
              width={isResumeLens ? 1901 : 1200}
              height={isResumeLens ? 918 : 675}
            />
            {project.imageCaption && (
              <figcaption>{project.imageCaption}</figcaption>
            )}
          </figure>
        )}
        {study ? (
          <div className={styles.studyLayout}>
            <nav className={styles.studyIndex} aria-label="Case study sections">
              <p>ON THIS PAGE</p>
              {caseStudyLinks.map(({ id, label }) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </nav>
            <div className={styles.study}>
              {study.overview && (
                <section>
                  <h2>Project overview</h2>
                  <p className={styles.meta}>{study.meta}</p>
                  <p>{study.overview}</p>
                </section>
              )}
              <section id="problem">
                <h2>The problem</h2>
                <p>{study.problem}</p>
              </section>
              <section id="solution">
                <h2>The solution</h2>
                <p>{study.solution}</p>
                {study.quote && <blockquote>{study.quote}</blockquote>}
                {study.solutionAfter && <p>{study.solutionAfter}</p>}
              </section>
              {(study.features ||
                study.featureBullets ||
                study.featureRows) && (
                <section>
                  <h2>Key features</h2>
                  {study.features && (
                    <ul>
                      {study.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
                  {study.featureBullets && (
                    <ul>
                      {study.featureBullets.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
                  {study.featureRows?.map((f) => (
                    <div className={styles.feature} key={f.name}>
                      <h3>{f.name}</h3>
                      <p>{f.text}</p>
                    </div>
                  ))}
                </section>
              )}
              <section id="contribution">
                <h2>{study.roleHeading || "My contribution"}</h2>
                <p>{study.role}</p>
              </section>
              <section>
                <h2>Engineering challenge</h2>
                <p>{study.challenge}</p>
              </section>
              <section id="architecture">
                <h2>Architecture & approach</h2>
                <p>{study.approach}</p>
                {study.pillars?.map((p) => (
                  <div className={styles.feature} key={p.name}>
                    <h3>{p.name}</h3>
                    <p>{p.text}</p>
                  </div>
                ))}
              </section>
              <section id="outcome">
                <h2>Outcome & next steps</h2>
                <p>{study.outcome}</p>
              </section>
              <section>
                <h2>Technology</h2>
                <p>{study.stack}</p>
              </section>
            </div>
          </div>
        ) : (
          <div className={styles.study}>
            <section>
              <h2>Project overview</h2>
              <p>{project.overview || project.description}</p>
            </section>
            {project.context && (
              <section>
                <h2>Hackathon context</h2>
                <p>{project.context}</p>
              </section>
            )}
            {project.tags.length > 0 && (
              <section>
                <h2>Technology & focus</h2>
                <p>{project.tags.join(" · ")}</p>
              </section>
            )}
          </div>
        )}
        <nav className={styles.other} aria-label="Other projects">
          <h2>Keep exploring</h2>
          <div className={styles.relatedProjects}>
            {featuredProjects
              .filter((p) => p.caseStudyId !== slug)
              .map((p) => (
                <a key={p.caseStudyId} href={"/projects/" + p.caseStudyId}>
                  {p.title} ↗
                </a>
              ))}
          </div>
        </nav>
      </article>
      <a href="/#contact" className="btn btn-primary">
        Let’s talk ↗
      </a>
    </main>
  );
}
