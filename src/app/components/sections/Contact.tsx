import { contactData, homepageData } from "@/data/portfolio";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.invitation}>
          <span className="section__label">{homepageData.contact.eyebrow}</span>
          <h2>{homepageData.contact.title}</h2>
          <p>{homepageData.contact.invitation}</p>
        </div>

        <div className={styles.details}>
          <a href={`mailto:${contactData.email}`} className={styles.email}>
            {contactData.email}
          </a>
          <p className={styles.location}>{contactData.location}</p>

          <div className={styles.socials}>
            {contactData.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name} <span aria-hidden="true">↗</span>
                <span className="sr-only">
                  {homepageData.contact.externalLinkLabel}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
