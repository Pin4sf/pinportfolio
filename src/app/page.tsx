import dynamic from "next/dynamic";

// Dynamic imports for client components - avoid SSR for Three.js/GSAP
const LoadingScreen = dynamic(
  () => import("./components/LoadingScreen"),
  { ssr: false }
);
const SmoothScroll = dynamic(
  () => import("./components/SmoothScroll"),
  { ssr: false }
);
const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const SkillsMarquee = dynamic(
  () => import("./components/SkillsMarquee"),
  { ssr: false }
);
const About = dynamic(() => import("./components/About"), { ssr: false });
const Projects = dynamic(
  () => import("./components/Projects"),
  { ssr: false }
);
const FAQ = dynamic(() => import("./components/FAQ"), { ssr: false });
const Contact = dynamic(
  () => import("./components/Contact"),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll>
        <Hero />
        <SkillsMarquee />
        <About />
        <Projects />
        <FAQ />
        <Contact />
      </SmoothScroll>
    </>
  );
}
