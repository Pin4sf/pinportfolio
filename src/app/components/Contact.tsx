"use client";

import styles from "./Contact.module.scss";
import BlobButton from "./ui/BlobButton";
import CircleEyeButton from "./ui/CircleEyeButton";
import SquigglyLink from "./ui/SquigglyLink";
import { contactData } from "@/data/portfolio";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>({ clipReveal: true });

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.contact}`}
      id="contact"
    >
      <div className={styles.wrapper}>
        <div className={styles.header} data-reveal>
          <div className={styles.headerTitle}>/Contact</div>
          <div className={styles.headerSubtitle}>Get in touch</div>
        </div>

        <div className={styles.form} data-reveal>
          <form action={contactData.formAction} method="POST">
            <input type="hidden" name="_captcha" value="true" />
            <div className={styles.formFlex}>
              <div className={styles.formInfo}>
                <label>Hey, My name is</label>
                <input
                  type="text"
                  placeholder="Type your name"
                  name="name"
                  required
                />
              </div>
            </div>
            <div className={styles.formFlex}>
              <div className={styles.formInfo}>
                <label>Say Hello to me at</label>
                <input
                  type="email"
                  placeholder="Your Email Id here"
                  name="email"
                  required
                />
              </div>
            </div>
            <div className={styles.formFlex}>
              <textarea
                placeholder="Type your message"
                name="message"
                required
              ></textarea>
            </div>
            <div className={styles.formFlex}>
              <BlobButton darkFill>
                Send <i className="uil uil-message"></i>
              </BlobButton>
            </div>
          </form>
        </div>

        <div className={styles.profile} data-reveal>
          <div className={styles.profileItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={contactData.profile.image}
              alt={contactData.profile.name}
            />
            <div className={styles.profileCol}>
              <b>{contactData.profile.name}</b>
              <span>{contactData.profile.title}</span>
            </div>
          </div>
          <div className={styles.profileItem}>
            <div className={styles.profileCol}>
              {contactData.profile.emails.map((email) => (
                <span key={email}>{email}</span>
              ))}
            </div>
          </div>
          <div className={styles.profileItem}>
            <div className={styles.profileCol}>
              <span>{contactData.profile.location.city}</span>
              <span>
                <b>{contactData.profile.location.country}</b>
              </span>
            </div>
          </div>
          <div className={styles.profileItem}>
            <div className={styles.profileBg}></div>
            <div className={styles.profileCol}>
              <span>Get in touch with me.</span>
              <b>{contactData.profile.emails[0]}</b>
            </div>
          </div>
          <CircleEyeButton text=".Get In Touch." />
        </div>

        <div className={styles.socials} data-reveal>
          {contactData.socials.map((social) => (
            <SquigglyLink
              key={social.name}
              text={social.name}
              href={social.url}
            />
          ))}
        </div>

        <div className={styles.footer} data-reveal>
          <div className={styles.footerInfo}>Shivansh Fulper</div>
          <div className={styles.footerInfo}>
            <b>Made by Pin4sf 2025</b>
          </div>
          <div className={styles.footerInfo}>Stay Safe and RISE</div>
        </div>
      </div>
    </section>
  );
}
