import { optimizedImage } from "@/lib/assets";
import { galleries } from "@/data/galleries";
import styles from "./BeyondCode.module.css";

interface BeyondCodeProps {
  onOpenGallery: (galleryId: string) => void;
}

const gallery = galleries["travel-adventure"];
const featuredPhotos = [galleries.travel.images[0], galleries.adventure.images[0]];

export function BeyondCode({ onOpenGallery }: BeyondCodeProps) {
  return (
    <section
      id="beyond-code"
      aria-labelledby="travel-adventure-title"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.kicker}>07 / A PERSONAL PHOTO JOURNAL</p>
          <h2 id="travel-adventure-title">Travel & Adventure</h2>
          <p>{gallery.description}</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onOpenGallery(gallery.id)}
          >
            View Travel & Adventure gallery ↗
          </button>
        </div>
        <div className={styles.photos}>
          {featuredPhotos.map((photo) => (
            <div className={styles.imageFrame} key={photo.src}>
              <img src={optimizedImage(photo.src)} alt={photo.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
