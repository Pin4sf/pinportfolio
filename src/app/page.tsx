import HomeExperience from "./components/HomeExperience";
import Header from "./components/layout/Header";
import Contact from "./components/sections/Contact";
import CuriosityThread from "./components/sections/CuriosityThread";
import Hero from "./components/sections/Hero";
import Now from "./components/sections/Now";
import PersonalPreview from "./components/sections/PersonalPreview";
import ReadingPreview from "./components/sections/ReadingPreview";
import SelectedChapters from "./components/sections/SelectedChapters";
import Writing from "./components/sections/Writing";
import Footer from "./components/sections/Footer";
import {
  getFeaturedAuthoredPublications,
  getPublicReadingEntries,
} from "@/data/portfolio";
import { getFeaturedPosts } from "@/lib/mdx";

export default function Page() {
  const featuredPosts = getFeaturedPosts(3);
  const featuredPublications = getFeaturedAuthoredPublications(1);
  const readingEntries = getPublicReadingEntries(3);

  return (
    <HomeExperience>
      <Header />
      <main id="main-content">
        <Hero />
        <Now />
        <CuriosityThread />
        <Writing
          featuredPosts={featuredPosts}
          featuredPublication={featuredPublications[0]}
        />
        <ReadingPreview entries={readingEntries} />
        <SelectedChapters />
        <PersonalPreview />
        <Contact />
      </main>
      <Footer />
    </HomeExperience>
  );
}
