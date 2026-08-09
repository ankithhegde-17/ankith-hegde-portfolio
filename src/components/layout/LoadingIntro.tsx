import { site } from "@/data/site";
import styles from "./LoadingIntro.module.css";

interface LoadingIntroProps {
  pct: number;
}

export function LoadingIntro({ pct }: LoadingIntroProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.top}>
        <div>
          <div className={styles.name}>
            {site.name.split(" ")[0]}
            <br />
            {site.name.split(" ").slice(1).join(" ")}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.status}>
          <span>Loading</span>
          <span>{pct}</span>
        </div>
      </div>
    </div>
  );
}
