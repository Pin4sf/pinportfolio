import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("editorial routes restore the predesign dark typographic header", () => {
  const source = read(
    "src/app/components/editorial/EditorialHeader.module.scss",
  );

  assert.match(source, /max-width:\s*72rem/);
  assert.match(source, /font-size:\s*clamp\(4rem,\s*10vw,\s*9rem\)/);
  assert.doesNotMatch(source, /noisetexture\.jpg/);
});

test("active mobile navigation and editorial actions own 44px targets", () => {
  const expectations = [
    [
      "src/app/components/layout/Header.module.scss",
      /\.logo\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/layout/Header.module.scss",
      /\.menuBtn\s*\{[\s\S]*?width:\s*44px;[\s\S]*?height:\s*44px/,
    ],
    [
      "src/app/components/sections/Now.module.scss",
      /\.links\s*\{[\s\S]*?a\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/sections/CuriosityThread.module.scss",
      /\.cta\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/sections/Writing.module.scss",
      /\.allWriting,[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/sections/ReadingPreview.module.scss",
      /\.allLink\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/sections/SelectedChapters.module.scss",
      /\.allLink\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/sections/PersonalPreview.module.scss",
      /\.allLink\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/sections/Contact.module.scss",
      /\.email\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/sections/Contact.module.scss",
      /\.socials\s*\{[\s\S]*?a\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/editorial/EditorialFooter.module.scss",
      /\.reading,[\s\S]*?\.contact a\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/editorial/EditorialFooter.module.scss",
      /\.socials a\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/reading/ReadingPage.module.scss",
      /\.entry a\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/editorial/EditorialHeader.module.scss",
      /\.home\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/components/editorial/EditorialPrimaryNav.module.scss",
      /\.nav\s*\{[\s\S]*?a\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/writing/WritingArchive.module.scss",
      /\.researchLink\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/writing/WritingArchive.module.scss",
      /\.filterBtn\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/writing/[slug]/BlogPost.module.scss",
      /\.back\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/experience/ExperiencePage.module.scss",
      /\.links a\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/about/AboutPage.module.scss",
      /\.readingLinks\s*\{[\s\S]*?a\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/research/ResearchPage.module.scss",
      /\.readingLink\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/work/[slug]/CaseStudy.module.scss",
      /\.back\s*\{[\s\S]*?min-height:\s*44px/,
    ],
    [
      "src/app/work/[slug]/CaseStudy.module.scss",
      /\.navLink\s*\{[\s\S]*?min-height:\s*44px/,
    ],
  ];

  for (const [file, pattern] of expectations) {
    assert.match(read(file), pattern, file);
  }
});

test("restored home motion stays optional and reduced-motion content stays visible", () => {
  const footer = read("src/app/components/sections/Footer.tsx");
  const footerStyles = read("src/app/components/sections/Footer.module.scss");
  const header = read("src/app/components/layout/Header.tsx");
  const homeExperience = read("src/app/components/HomeExperience.tsx");
  const cursor = read("src/app/components/ui/CustomCursor.tsx");

  assert.doesNotMatch(footerStyles, /\.reveal\s*\{[\s\S]*?opacity:\s*0/);
  assert.match(footer, /if \(reducedMotion\)[\s\S]*?opacity:\s*1/);
  assert.match(footer, /behavior:\s*reducedMotion \? "auto" : "smooth"/);
  assert.match(header, /useReducedMotion/);
  assert.match(header, /if \(reducedMotion\) return/);
  assert.doesNotMatch(header, /ScrollTrigger/);
  assert.match(homeExperience, /!reducedMotion && <CustomCursor/);
  assert.match(cursor, /useReducedMotion/);
  assert.match(
    cursor,
    /if \(reducedMotion \|\| !cursorEffectsEnabled\) return null/,
  );
});
