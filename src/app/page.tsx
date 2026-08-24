import HomeExperience from "./components/HomeExperience";
import Header from "./components/layout/Header";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import CuriosityThread from "./components/sections/CuriosityThread";
import Hero from "./components/sections/Hero";
import SelectedWork from "./components/sections/SelectedWork";
import SkillsExperience from "./components/sections/SkillsExperience";
import Timeline from "./components/sections/Timeline";
import Writing from "./components/sections/Writing";
import Footer from "./components/sections/Footer";
import { getFeaturedPosts } from "@/lib/mdx";

export default function Page() {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <HomeExperience>
      <Header />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <CuriosityThread />
        <About />
        <Writing featuredPosts={featuredPosts} />
        <Timeline />
        <SkillsExperience />
        <Contact />
      </main>
      <Footer />
    </HomeExperience>
  );
}
