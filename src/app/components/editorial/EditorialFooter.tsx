import Link from "next/link";
import { contactData, navItems } from "@/data/portfolio";
import ExternalLink from "@/app/components/ui/ExternalLink";
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
              <ExternalLink
                href={social.url}
                key={social.name}
                rel="noopener noreferrer"
              >
                {social.name}
              </ExternalLink>
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
