import { optimizedImage } from "@/lib/assets";
import { site } from "@/data/site";
import styles from "./Hero.module.css";
export function Hero() {
  return (
    <section id="home" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.topline}>
          <span>Software Development × AI &amp; Data Science Engineering</span>
          <span className={styles.availability}>
            <i /> Open to internships
          </span>
        </div>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <div className={styles.hello}>Hello, world. I’m</div>
            <h1 className={styles.name}>
              ANKITH
              <br />
              HEGDE<span>.</span>
            </h1>
            <p className={styles.tagline}>BUILD. BREAK. DEBUG. REPEAT.</p>
            <p className={styles.lede}>
              AI &amp; Data Science Engineering student turning practical ideas into usable software.
              Exploring the intersection of{" "}
              <strong>AI, data, and thoughtful product development.</strong>
            </p>
            <div className={styles.ctas}>
              <a href="#projects" className="btn btn-primary">
                Explore work <span aria-hidden="true">↘</span>
              </a>
              <a href="#about" className="btn btn-secondary">
                About me <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className={styles.socials}>
              <a href={site.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href="/Ankith_Hegde_Resume.pdf" download>
                Résumé ↓
              </a>
              <a href={"mailto:" + site.email}>Email ↗</a>
            </div>
          </div>
          <div className={styles.art}>
            <div className={styles.orbit} aria-hidden="true" />
            <div className={styles.portraitCard}>
              <div className={styles.cardBar}>
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <span>ankith / in real life</span>
                <span>↗</span>
              </div>
              <img
                src={optimizedImage("/assets/ankith-portrait.png")}
                alt="Ankith Hegde"
                width="1240"
                height="1550"
              />
              <div className={styles.cardCaption}>
                <strong>Always a work in progress.</strong>
                <span>MYSURU, INDIA · {site.role}</span>
              </div>
            </div>
            <span className={styles.codeSticker} aria-hidden="true">
              &lt;/&gt;<small>BUILD WITH INTENT</small>
            </span>
            <span className={styles.reactSticker} aria-hidden="true">
              ✳ <span>React</span>
            </span>
            <span className={styles.pythonSticker} aria-hidden="true">
              Python ↗
            </span>
            <span className={styles.note} aria-hidden="true">
              Curiosity is
              <br />
              the starting point.<span>↖</span>
            </span>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>
            B.E. AI & Data Science <b>/</b> Class of 2028
          </span>
          <a href="#projects">
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className={styles.strip} aria-hidden="true">
        <span>SOFTWARE DEVELOPMENT</span>
        <b>✳</b>
        <span>AI & DATA SCIENCE</span>
        <b>✳</b>
        <span>THOUGHTFUL PRODUCTS</span>
        <b>✳</b>
        <span>ALWAYS LEARNING</span>
        <b>✳</b>
      </div>
    </section>
  );
}
