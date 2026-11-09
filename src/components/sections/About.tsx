import { aboutInfo, site } from "@/data/site";
import styles from "./About.module.css";
export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.kicker}>03 / THE PERSON BEHIND THE CODE</div>
          <h2>
            Curious mind.
            <br />
            Engineering
            <br />
            <span>in progress.</span>
          </h2>
          <div className={styles.identity}>
            Software Development
            <br />
            {site.role}
          </div>
          <a
            href="/Ankith_Hegde_Resume.pdf"
            download
            className="btn btn-secondary"
          >
            Download résumé ↓
          </a>
        </div>
        <div className={styles.copy}>
          <p className={styles.lead}>
            I’m a Computer Science Engineering student specializing in
            Artificial Intelligence &amp; Data Science.
          </p>
          <p>
            I build AI and web products that turn practical ideas into usable
            experiences.
          </p>
          <p>
            My work spans product-focused interfaces, AI-enabled ideas, and
            hands-on technical exploration. I’m looking for internships where I
            can contribute to real software or ML systems and keep learning from
            experienced teams.
          </p>
          <p className={styles.education}>{site.subtagline}</p>
          <dl className={styles.info}>
            {aboutInfo.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
