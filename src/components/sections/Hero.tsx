import type { MouseEvent } from "react";
import { site, heroStats } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Hero.module.css";

export function Hero() {
  const handleResumeClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <section id="home" data-screen-label="Hero" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <Reveal as="div" index={0} className={styles.badge}>
            <span className={styles.badgeDot} />
            Open to internships &amp; collaborations
          </Reveal>

          <Reveal as="div" index={1} className={styles.hello}>
            Hello, I'm
          </Reveal>

          <Reveal as="h1" index={2} className={styles.name}>
            {site.name.split(" ")[0]}
            <br />
            {site.name.split(" ").slice(1).join(" ")}
          </Reveal>

          <Reveal as="div" index={3} className={styles.roleRow}>
            <span className={styles.roleRule} />
            <div className={styles.roleText}>
              {site.tagline}
              <div className={styles.roleSub}>{site.subtagline}</div>
            </div>
          </Reveal>

          <Reveal as="p" index={4} className={styles.lede}>
            Building digital products where engineering, thoughtful design, and real-world impact come together.
          </Reveal>

          <Reveal as="div" index={5} className={styles.ctas}>
            <a href="#work" className={`btn btn-primary ${styles.ctaBtn}`}>
              View Projects
            </a>
            <a
              href="#"
              onClick={handleResumeClick}
              title="Resume coming soon"
              aria-disabled="true"
              className={`btn btn-secondary ${styles.ctaBtn}`}
            >
              Download Resume
            </a>
          </Reveal>

          <Reveal as="div" index={0} className={styles.socials}>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className={styles.socialLink}>
              Email
            </a>
          </Reveal>
        </div>

        <div className={styles.portraitCol}>
          <div className={`grayscale ${styles.portraitFrame}`}>
            <img
              src="/assets/ankith-portrait.png"
              alt="Portrait of Ankith Hegde"
              width={1240}
              height={1550}
              className={styles.portraitImg}
            />
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        {heroStats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
