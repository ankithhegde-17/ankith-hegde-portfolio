import { journey } from "@/data/journey";
import { hackathonHighlights } from "@/data/beyondTheCode";
import styles from "./Achievements.module.css";

const achievements = [
  "Smart India Hackathon (college internal round) — First Place · Team Code for India",
  "Build Bengaluru Hackathon — Finalist · Microsoft Office, Bengaluru",
  "Vision Mysuru 2050 — Finalist",
  "Grassroots Innovation (Government of Karnataka) — Finalist",
  "PALS innoWAH! Cluster Finals — Team SATTVA",
  "Sigma Ideathon — Second Place",
];

const experienceTitles = [
  "ISRO ISTRAC Visit",
  "E-Summit IIT Bombay",
  "Munde Banni",
  "Aero Modelling Workshop",
];
const experiences = journey.filter((item) => experienceTitles.includes(item.title));
const hackmitten = hackathonHighlights.find((item) => item.id === "hackmitten-3");

export function Achievements() {
  return (
    <section id="achievements" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.kicker}>05 / RECOGNITION & EXPERIENCES</div>
        <div className={styles.grid}>
          <h2>
            Meaningful
            <br />
            <span>milestones.</span>
          </h2>
          <div>
            <h3>Competition results</h3>
            <ul>
              {achievements.map((item, i) => (
                <li key={item}>
                  <span>0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
            <h3>Visits, events & workshops</h3>
            <ul>
              {hackmitten && (
                <li>
                  <span>Participation</span>
                  <div>
                    {hackmitten.title}
                    <p className={styles.detail}>
                      {hackmitten.date} · Team {hackmitten.team}
                    </p>
                    {hackmitten.project && (
                      <a href={hackmitten.project.href}>{hackmitten.project.title} ↗</a>
                    )}
                  </div>
                </li>
              )}
              {experiences.map((item) => (
                <li key={item.title}>
                  <span>{item.kind}</span>
                  <div>
                    {item.title}
                    <p className={styles.detail}>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
