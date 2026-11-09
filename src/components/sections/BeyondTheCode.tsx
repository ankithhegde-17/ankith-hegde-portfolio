import {
  hackathonHighlights,
  communityExperiences,
  completedCourses,
  type CompletedCourse,
} from "@/data/beyondTheCode";
import styles from "./BeyondTheCode.module.css";
import { certificates } from "@/data/certificates";

const pinnedIds = [
  "google-cloud-career-launchpad",
  "aiquantum-summer-internship",
];
const pinnedCourses = pinnedIds.map(
  (id) => completedCourses.find((course) => course.id === id)!,
);
type CertificateCard = Omit<CompletedCourse, "status" | "certificateImage">;

const otherCertificates: CertificateCard[] = [
  ...completedCourses.filter((course) => !pinnedIds.includes(course.id)),
  ...Object.values(certificates)
    .filter((certificate) => certificate.certificate && certificate.id !== "gc-launchpad")
    .map((certificate) => ({
      id: certificate.id,
      title: certificate.title,
      platform: certificate.issuer ?? certificate.type,
      issuingInstitution: certificate.subtitle,
      completionDate: certificate.date,
      credentialId: certificate.credentialId,
      certificatePdf: certificate.certificate,
      verificationUrl: certificate.verifyUrl,
    })),
];

export function BeyondTheCode({
  onOpenCertificate,
}: {
  onOpenCertificate: (id: string) => void;
}) {
  const renderCertificate = (course: CertificateCard, pinned = false) => (
    <article key={course.id} className={styles.course}>
      <div className={styles.courseMeta}>
        <span>{course.platform}</span>
        {pinned && <span className={styles.completed}>Pinned</span>}
      </div>
      <h4>{course.title}</h4>
      {course.issuingInstitution && (
        <p>{course.issuingInstitution}</p>
      )}
      {course.completionDate && (
        <p className={styles.location}>{course.completionDate}</p>
      )}
      {course.credentialId && (
        <p className={styles.location}>
          Credential ID: {course.credentialId}
        </p>
      )}
      {(course.certificatePdf || course.verificationUrl) && (
        <div className={styles.credentialLinks}>
          {course.certificatePdf && (
            <button
              type="button"
              className="btn btn-secondary"
              aria-label={"View certificate: " + course.title}
              onClick={() => onOpenCertificate(course.id)}
            >
              View certificate ↗
            </button>
          )}
          {course.verificationUrl && (
            <a
              href={course.verificationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Verify credential ↗
            </a>
          )}
        </div>
      )}
    </article>
  );

  return (
    <section
      id="beyond-the-code"
      className={styles.section}
      aria-labelledby="beyond-the-code-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <div className={styles.kicker}>
              FIELD NOTES / EXPERIENCES & LEARNING
            </div>
            <h2 id="beyond-the-code-title">
              BEYOND THE CODE<span>.</span>
            </h2>
          </div>
          <p>
            From hackathon floors to real-world learning — experiences shaping
            how I think, build, and collaborate.
          </p>
        </header>
        <nav className={styles.index} aria-label="Beyond the Code groups">
          <a href="#hackathons">
            01 / Hackathons & Achievements <span aria-hidden="true">↘</span>
          </a>
          <a href="#community">
            02 / Events & Volunteering <span aria-hidden="true">↘</span>
          </a>
          <a href="#coursework">
            03 / Certifications & Learning <span aria-hidden="true">↘</span>
          </a>
        </nav>

        <section
          id="hackathons"
          className={styles.group}
          aria-labelledby="hackathons-title"
        >
          <div className={styles.groupHeading}>
            <span>01</span>
            <h3 id="hackathons-title">Hackathons & Achievements</h3>
          </div>
          <div className={styles.hackathons}>
            {hackathonHighlights.map((item) => (
              <article key={item.id} className={styles.hackathon}>
                <span className={styles.badge}>{item.badge}</span>
                <h4>{item.title}</h4>
                <p className={styles.scope}>{item.scope}</p>
                <dl className={styles.metadata}>
                  {item.date && (
                    <div>
                      <dt>When</dt>
                      <dd>{item.date}</dd>
                    </div>
                  )}
                  {item.team && (
                    <div>
                      <dt>Team</dt>
                      <dd>{item.team}</dd>
                    </div>
                  )}
                  {item.venue && (
                    <div>
                      <dt>Where</dt>
                      <dd>{item.venue}</dd>
                    </div>
                  )}
                </dl>
                <p className={styles.description}>{item.description}</p>
                {item.project && (
                  <a className={styles.projectLink} href={item.project.href}>
                    Explore {item.project.title}{" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          id="community"
          className={styles.group}
          aria-labelledby="community-title"
        >
          <div className={styles.groupHeading}>
            <span>02</span>
            <h3 id="community-title">Events & Volunteering</h3>
          </div>
          <div className={styles.timeline}>
            {communityExperiences.map((item) => (
              <article key={item.id} className={styles.event}>
                <div className={styles.eventDate}>
                  {item.date}
                  <span>{item.role}</span>
                </div>
                <div className={styles.eventCopy}>
                  <h4>{item.title}</h4>
                  <p className={styles.location}>{item.location}</p>
                  <p>{item.description}</p>
                  {item.activities.length > 0 && (
                    <ul className={styles.activities}>
                      {item.activities.map((activity) => (
                        <li key={activity}>{activity}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="coursework"
          className={styles.group}
          aria-labelledby="coursework-title"
        >
          <div className={styles.groupHeading}>
            <span>03</span>
            <h3 id="coursework-title">Certifications & Learning</h3>
          </div>
          <div className={styles.courses}>
            {pinnedCourses.map((course) => (
              renderCertificate(course, true)
            ))}
          </div>
          <details className={styles.moreCertificates}>
            <summary className="btn btn-secondary">View more <span aria-hidden="true">▾</span></summary>
            <div className={styles.courses + " " + styles.expandedCourses}>
              {otherCertificates.map((certificate) => renderCertificate(certificate))}
            </div>
          </details>
        </section>
      </div>
    </section>
  );
}
