import {
  getPublicAuthoredPublication,
  researchDirectionData,
} from "@/data/portfolio";
import ExternalLink from "../ui/ExternalLink";
import styles from "./CuriosityThread.module.scss";

export default function CuriosityThread() {
  const fieldbook = getPublicAuthoredPublication(
    researchDirectionData.publicationSlug,
  );

  return (
    <section id="research" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className="section__label">
            {researchDirectionData.eyebrow}
          </span>
          <h2>{researchDirectionData.title}</h2>
        </div>

        <div className={styles.note}>
          <p>{researchDirectionData.homepageIntroduction}</p>
          {fieldbook && (
            <ExternalLink href={fieldbook.href} className={styles.cta}>
              {fieldbook.cta}
            </ExternalLink>
          )}
        </div>
      </div>
    </section>
  );
}
