import dynamic from "next/dynamic";

// Dynamic imports for client components — avoid SSR for GSAP/Three.js
const CustomCursor = dynamic(
  () => import("./components/ui/CustomCursor"),
  { ssr: false }
);
const LoadingScreen = dynamic(
  () => import("./components/LoadingScreen"),
  { ssr: false }
);
const SmoothScroll = dynamic(
  () => import("./components/SmoothScroll"),
  { ssr: false }
);
const Header = dynamic(
  () => import("./components/layout/Header"),
  { ssr: false }
);
const Hero = dynamic(
  () => import("./components/sections/Hero"),
  { ssr: false }
);
const SelectedWork = dynamic(
  () => import("./components/sections/SelectedWork"),
  { ssr: false }
);
const About = dynamic(
  () => import("./components/sections/About"),
  { ssr: false }
);
const Writing = dynamic(
  () => import("./components/sections/Writing"),
  { ssr: false }
);
const SkillsExperience = dynamic(
  () => import("./components/sections/SkillsExperience"),
  { ssr: false }
);
const Timeline = dynamic(
  () => import("./components/sections/Timeline"),
  { ssr: false }
);
const Contact = dynamic(
  () => import("./components/sections/Contact"),
  { ssr: false }
);
const Footer = dynamic(
  () => import("./components/sections/Footer"),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <Header />
      <SmoothScroll>
        <main id="main-content">
          <Hero />
          <SelectedWork />
          <About />
          <Writing />
          <Timeline />
          <SkillsExperience />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
