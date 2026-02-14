"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anime from "animejs";
import styles from "./Contact.module.scss";
import { contactData } from "@/data/portfolio";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { Github as GithubIcon, Linkedin as LinkedinIcon, Twitter as TwitterIcon, Instagram as InstagramIcon, Send, Loader2, Check, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const constellationDots = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3.5 + 1.5,
      })),
    []
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // Email reveal
    const emailEl = emailRef.current;
    if (emailEl) {
      const text = emailEl.textContent || "";
      emailEl.innerHTML = "";

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.transform = "translateY(100%)";
        span.style.opacity = "0";
        span.classList.add("email-char");
        emailEl.appendChild(span);
      });

      tl.to(".email-char", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        ease: "power4.out",
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reducedMotion]);

  // anime.js constellation background
  useEffect(() => {
    if (reducedMotion) return;
    const container = constellationRef.current;
    if (!container) return;

    const dots = container.querySelectorAll(`.${styles.constellationDot}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Staggered reveal from center
            anime({
              targets: dots,
              opacity: [0, () => Math.random() * 0.45 + 0.15],
              scale: [0, 1],
              delay: anime.stagger(50, { from: "center" }),
              duration: 1200,
              easing: "easeOutExpo",
            });

            // Gentle drift
            anime({
              targets: dots,
              translateX: () => anime.random(-25, 25),
              translateY: () => anime.random(-25, 25),
              duration: () => anime.random(4000, 7000),
              delay: () => anime.random(0, 3000),
              direction: "alternate",
              loop: true,
              easing: "easeInOutSine",
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("sending");

    try {
      const res = await fetch(contactData.formAction, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitState("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitState("idle"), 4000);
      } else {
        setSubmitState("error");
        setTimeout(() => setSubmitState("idle"), 4000);
      }
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      {/* Large background text */}
      <span className={styles.bgText} aria-hidden="true">Let&apos;s Talk</span>

      {/* Constellation particle background */}
      {!reducedMotion && (
        <div ref={constellationRef} className={styles.constellation}>
          {constellationDots.map((d) => (
            <span
              key={d.id}
              className={styles.constellationDot}
              style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
            />
          ))}
        </div>
      )}

      <span className="section__label">Contact</span>
      <h2 className={styles.heading}>Let&apos;s Build Something</h2>

      <div className={styles.grid}>
        <div className={styles.emailSide}>
          <a
            ref={emailRef}
            href={`mailto:${contactData.email}`}
            className={styles.email}
          >
            {contactData.email}
          </a>

          <p className={styles.location}>{contactData.location}</p>

          <div className={styles.socials}>
            {contactData.socials.map((social) => {
              const Icon = iconMap[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  {Icon && <Icon size={20} />}
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input type="hidden" name="_captcha" value="false" />
          <div className={styles.field}>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder=" "
              required
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              autoComplete="name"
            />
            <label htmlFor="contact-name" className={styles.label}>Your name</label>
          </div>
          <div className={styles.field}>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder=" "
              required
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              autoComplete="email"
              spellCheck={false}
            />
            <label htmlFor="contact-email" className={styles.label}>Your email</label>
          </div>
          <div className={styles.field}>
            <textarea
              id="contact-message"
              name="message"
              placeholder=" "
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
            />
            <label htmlFor="contact-message" className={styles.label}>Your message</label>
          </div>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitState === "sending"}
            aria-busy={submitState === "sending"}
          >
            {submitState === "sending" && <><Loader2 size={14} className={styles.spinner} /> Sending...</>}
            {submitState === "sent" && <><Check size={14} /> Sent!</>}
            {submitState === "error" && <>Failed — try again</>}
            {submitState === "idle" && <>Send Message <Send size={14} /></>}
          </button>
        </form>
      </div>
    </section>
  );
}
