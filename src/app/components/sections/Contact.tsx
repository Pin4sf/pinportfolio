import { contactData, homepageData } from "@/data/portfolio";
import ExternalLink from "../ui/ExternalLink";
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
              <ExternalLink
                key={social.name}
                href={social.url}
                rel="noopener noreferrer"
              >
                {social.name}
              </ExternalLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
