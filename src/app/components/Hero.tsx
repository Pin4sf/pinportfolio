"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.scss";
import ThreeBackground from "./three/ThreeBackground";
import ShadedImage from "./three/ShadedImage";
import GlitchIcon from "./ui/GlitchIcon";
import ScrollIndicator from "./ui/ScrollIndicator";
import Header from "./Header";
import { heroData } from "@/data/portfolio";

const shadedImages = [
  "/images/expme/me2.jpeg",
  "/images/expme/1a.jpg",
  "/images/expme/2a.jpg",
  "/images/expme/3a.jpg",
  "/images/expme/4a.jpg",
];

/** Split text into individual character spans for animation */
function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={styles.char}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const introRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !introRef.current) return;
    hasAnimated.current = true;

    const intro = introRef.current;
    const chars = intro.querySelectorAll(`.${styles.char}`);
    const greeting = intro.querySelector("[data-hero-greeting]");
    const subtitle = intro.querySelector("[data-hero-subtitle]");
    const taglines = intro.querySelectorAll("[data-hero-tagline]");

    const tl = gsap.timeline({ delay: 2.5 });

    // 1. Greeting fades in
    if (greeting) {
      gsap.set(greeting, { y: 20, opacity: 0 });
      tl.to(greeting, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    }

    // 2. Name characters stagger in
    if (chars.length > 0) {
      gsap.set(chars, { y: "100%", opacity: 0 });
      tl.to(
        chars,
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "power4.out",
        },
        "-=0.2"
      );
    }

    // 3. Taglines reveal with mask effect
    if (taglines.length > 0) {
      gsap.set(taglines, { y: 30, opacity: 0 });
      tl.to(
        taglines,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }

    // 4. Subtitle fades in
    if (subtitle) {
      gsap.set(subtitle, { y: 20, opacity: 0 });
      tl.to(
        subtitle,
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
    }
  }, []);

  return (
    <div className={styles.landing} data-landing>
      <ThreeBackground />
      <ShadedImage
        containerSelector="[data-landing]"
        innerSelector="[data-intro]"
        linkSelector="[data-shadedimg]"
        images={shadedImages}
      />

      <Header />

      <div className={styles.intro} id="Home" data-intro ref={introRef}>
        <h3 data-hero-greeting>{heroData.greeting}</h3>
        {heroData.taglines.map((tagline, i) => (
          <h1
            key={i}
            data-shadedimg
            data-hero-tagline={i > 0 ? "" : undefined}
            style={i === 0 ? { overflow: "hidden" } : undefined}
          >
            {i === 0 ? (
              <SplitChars text={heroData.name} />
            ) : (
              tagline
            )}
          </h1>
        ))}
        <h3 data-hero-subtitle>{heroData.subtitle}</h3>
      </div>

      <div className={styles.socials} data-socials>
        {heroData.socials.map((social) => (
          <GlitchIcon
            key={social.name}
            iconClass={social.icon}
            href={social.url}
          />
        ))}
      </div>

      <div data-scroll-indicator>
        <ScrollIndicator />
      </div>
    </div>
  );
}
