"use client";

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

export default function Hero() {
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

      <div className={styles.intro} id="Home" data-intro>
        <h3>{heroData.greeting}</h3>
        {heroData.taglines.map((tagline, i) => (
          <h1 key={i} data-shadedimg>
            {i === 0 ? heroData.name : tagline}
          </h1>
        ))}
        <h3>{heroData.subtitle}</h3>
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
