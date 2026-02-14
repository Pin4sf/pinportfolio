"use client";

import { useEffect, useRef } from "react";
import styles from "./About.module.scss";
import { aboutData } from "@/data/portfolio";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

export default function About() {
  const swiperContainerRef = useRef<HTMLDivElement | null>(null);
  const initialized = useRef(false);
  const sectionRef = useScrollReveal<HTMLDivElement>({ clipReveal: true });

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Dynamic import Swiper to avoid SSR issues
    import("swiper").then(({ default: Swiper }) => {
      import("swiper/modules").then(({ Pagination }) => {
        const el = swiperContainerRef.current;
        if (!el) return;
        const swiperEl = el.querySelector(".swiper") as HTMLElement;
        if (!swiperEl) return;
        new Swiper(swiperEl, {
          modules: [Pagination],
          slidesPerView: 1,
          spaceBetween: 10,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets",
          },
        });
      });
    });
  }, []);

  return (
    <div
      ref={(node) => {
        // Combine both refs
        (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        swiperContainerRef.current = node;
      }}
      className={`section ${styles.experties}`}
      id="explore"
    >
      <div className={styles.expertiesHeader} data-reveal>
        <div className={styles.instructor}>
          <div className={styles.instructorCurve}></div>
          <div className={styles.instructorInfos}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={aboutData.profile.image}
              alt="Shivansh Fulper"
              className={styles.instructorImg}
            />
            <div className={styles.instructorCol}>
              {aboutData.profile.tags.map((tag) => (
                <div key={tag} className={styles.instructorInfo}>
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.swiperWrapper} data-reveal>
        <div className="swiper">
          <div className="swiper-wrapper">
            {/* Slide 1: About Me */}
            <div className="swiper-slide">
              <div className={styles.review}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewTopborder}></div>
                  <div className={styles.reviewText}>
                    <span>
                      <h1>{aboutData.slides[0].title}</h1>
                    </span>
                    {aboutData.slides[0].content}
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2: Technologies */}
            <div className="swiper-slide">
              <div className={styles.review}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewTopborder}></div>
                  <div className={styles.reviewText}>
                    <span>
                      <h1>{aboutData.slides[1].title}</h1>
                    </span>
                    <div className={styles.techList}>
                      {aboutData.slides[1].techLists?.map((list, i) => (
                        <div key={i}>
                          <ul>
                            {list.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    I am planning to explore{" "}
                    <h3>{aboutData.slides[1].exploring}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}
