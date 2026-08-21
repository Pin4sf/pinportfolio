import Link from "next/link";
import { contactData, navItems } from "@/data/portfolio";
import styles from "./EditorialFooter.module.scss";

export default function EditorialFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.label}>Elsewhere</p>
          <Link className={styles.reading} href="/reading">
            Reading
          </Link>
        </div>

        <nav className={styles.navigation} aria-label="Footer navigation">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.contact}>
          <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
          <div className={styles.socials}>
            {contactData.socials.map((social) => (
              <a
                href={social.url}
                key={social.name}
                rel="noopener noreferrer"
                target="_blank"
              >
                {social.name} <span aria-hidden="true">↗</span>
                <span className="sr-only">Opens in a new tab</span>
              </a>
            ))}
          </div>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Shivansh Fulper
        </p>
      </div>
    </footer>
  );
}
