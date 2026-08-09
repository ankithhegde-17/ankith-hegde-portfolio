import { aboutInfo } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" data-screen-label="About" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.kickerCol}>
          <div className={styles.kicker}>01 — About</div>
        </div>
        <div className={styles.copyCol}>
          <Reveal as="p" index={0} className={styles.quote}>
            “How can this be both beautifully designed and genuinely useful?”
          </Reveal>
          <Reveal as="p" index={1} className={styles.paragraph}>
            I'm a 3rd-year AI &amp; Data Science engineering student at Maharaja Institute of Technology Mysuru,
            passionate about building digital products where engineering meets thoughtful design.
          </Reveal>
          <Reveal as="p" index={2} className={styles.paragraph}>
            I enjoy transforming ideas into intuitive, meaningful experiences through continuous learning, product
            thinking, and attention to detail. Every product I build begins with one question — the one above.
          </Reveal>
        </div>
        <div className={styles.infoCol}>
          {aboutInfo.map((item) => (
            <div key={item.label} className={styles.infoItem}>
              <div className={styles.infoLabel}>{item.label}</div>
              <div className={styles.infoValue}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
