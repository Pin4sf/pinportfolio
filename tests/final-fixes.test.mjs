import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

test("About orders compass, longer horizon, then selected influences", () => {
  const about = stripComments(read("src/app/about/page.tsx"));
  const sequence = [
    'aria-labelledby="principles-heading"',
    'aria-labelledby="horizon-heading"',
    'aria-labelledby="influences-heading"',
  ].map((marker) => about.indexOf(marker));

  assert.ok(sequence.every((position) => position >= 0));
  assert.ok(sequence[0] < sequence[1] && sequence[1] < sequence[2]);
});

test("selected chapters use exact stable slugs and expose bounded evidence", async () => {
  const portfolio = read("src/data/portfolio.ts");
  const homepageDataStart = portfolio.indexOf("export const homepageData");
  const chaptersData = portfolio.slice(
    portfolio.indexOf("chapters: {", homepageDataStart),
    portfolio.indexOf("personal: {", homepageDataStart),
  );
  const slugBlock = chaptersData.match(/timelineSlugs:\s*\[([\s\S]*?)\]/);
  assert.ok(slugBlock, "homepage chapters need ordered timelineSlugs");
  const slugs = [...slugBlock[1].matchAll(/"([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(slugs, [
    "atlan",
    "project-eka",
    "mirai-setu",
    "hackbyte",
    "smart-manufacturing",
  ]);

  const { selectTimelineChapters } = await import("../src/lib/chapters.ts");
  const { homepageData, timelineData } =
    await import("../src/data/portfolio.ts");
  const selected = selectTimelineChapters(
    timelineData,
    homepageData.chapters.timelineSlugs,
  );
  assert.deepEqual(
    selected.map(({ slug }) => slug),
    slugs,
  );
  assert.deepEqual(
    selected.map(({ evidence }) => evidence),
    [
      "Helped build and operate more than 30 production agent instances across teams and workflows.",
      "Built Eka Curator and worked on the COOM framework; the program's full scale remains attributed to Project EKA.",
      "Selected for the month-long 2025 program and company-internship exchange; the published yearbook records the cohort.",
      "Helped grow HackByte from an internal event to 5,154 registrations and started project-led ML learning programs.",
      "Completed the degree as branch topper with an 8.5 CPI; co-invented published dental-inspection and waste-to-value patent applications.",
    ],
  );

  const component = read("src/app/components/sections/SelectedChapters.tsx");
  assert.match(component, /chapter\.evidence/);
  assert.match(component, /homepageData\.chapters\.evidenceLabel/);
  assert.doesNotMatch(component, /organizationNames|\.includes\(/);
});

test("homepage restores the strongest original articulation without rolling back Reading", async () => {
  const { homepageData, researchDirectionData } =
    await import("../src/data/portfolio.ts");

  assert.equal(researchDirectionData.eyebrow, "A thread of curiosity");
  assert.equal(researchDirectionData.title, "Models → Agents → World.");
  assert.equal(
    researchDirectionData.introduction,
    "I started below the interface, working on multilingual data and model infrastructure. Then I watched models become systems with tools, permissions, failures, and real users. Now I want to understand what changes when agents begin to see, move, and act in the physical world.",
  );
  assert.equal(
    researchDirectionData.waypoints[2].question,
    "What changes when actions have physical consequences?",
  );
  assert.equal(homepageData.personal.eyebrow, "Outside the thesis");
  assert.equal(homepageData.contact.title, "Let’s Build Something");
  assert.equal(
    homepageData.contact.invitation,
    "Have a question, a disagreement, or something worth building? Write to me.",
  );
  assert.equal(homepageData.reading.title, "Things I keep returning to.");
  assert.equal(homepageData.reading.cta.href, "/reading");
});

test("hero effects begin at 1024px and require fine hover interaction", () => {
  return import("../src/lib/heroEffects.ts").then(
    ({ shouldEnableHeroEffects }) => {
      const capable = {
        reducedMotion: false,
        reducedData: false,
        viewportWidth: 1024,
        interactionCapable: true,
        gpuTier: "high",
      };

      for (const viewportWidth of [767, 768, 1023]) {
        assert.equal(
          shouldEnableHeroEffects({ ...capable, viewportWidth }),
          false,
        );
      }
      assert.equal(shouldEnableHeroEffects(capable), true);
      assert.equal(
        shouldEnableHeroEffects({ ...capable, interactionCapable: false }),
        false,
      );
    },
  );
});

test("writing dates are calendar-stable across timezones", async () => {
  const { formatCalendarDate } = await import("../src/lib/dates.ts");
  const previousTimezone = process.env.TZ;
  try {
    process.env.TZ = "UTC";
    const utc = formatCalendarDate("2026-08-13", "long");
    process.env.TZ = "America/Los_Angeles";
    const losAngeles = formatCalendarDate("2026-08-13", "long");
    assert.equal(utc, "August 13, 2026");
    assert.equal(losAngeles, utc);
  } finally {
    if (previousTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = previousTimezone;
  }

  for (const file of [
    "src/app/writing/WritingArchivePresentation.ts",
    "src/app/writing/[slug]/BlogPost.tsx",
  ]) {
    const source = read(file);
    assert.match(source, /formatCalendarDate/);
    assert.doesNotMatch(source, /new Date\([^)]*\)\.toLocaleDateString/);
  }
});

test("active external links share one visible and announced affordance", () => {
  const externalLinkPath = "src/app/components/ui/ExternalLink.tsx";
  assert.ok(fs.existsSync(path.join(root, externalLinkPath)));
  const externalLink = read(externalLinkPath);
  assert.match(externalLink, /target="_blank"/);
  assert.match(externalLink, /noopener noreferrer/);
  assert.match(externalLink, /aria-hidden="true">\s*↗/);
  assert.match(externalLink, /Opens in a new tab/);

  const activeSurfaces = [
    "src/app/components/sections/Hero.tsx",
    "src/app/components/sections/Now.tsx",
    "src/app/components/sections/Contact.tsx",
    "src/app/components/editorial/ArtifactList.tsx",
    "src/app/components/editorial/EditorialFooter.tsx",
    "src/app/about/page.tsx",
    "src/app/experience/page.tsx",
    "src/app/reading/page.tsx",
    "src/app/work/[slug]/CaseStudy.tsx",
    "src/app/projects/[slug]/page.tsx",
  ];
  for (const file of activeSurfaces) {
    const source = read(file);
    assert.doesNotMatch(
      source,
      /target\s*=\s*(?:"_blank"|\{[^}]*"_blank"[^}]*\})/,
      `${file} bypasses the shared external-link contract`,
    );
  }
});

test("hero identity is canonical typed data rather than component prose", () => {
  const portfolio = read("src/data/portfolio.ts");
  const hero = read("src/app/components/sections/Hero.tsx");
  assert.match(portfolio, /eyebrow:\s*"Founder \+ AI systems researcher"/);
  assert.match(hero, /heroData\.eyebrow/);
  assert.doesNotMatch(hero, /Founder \+ AI systems researcher/);
});

test("hash destinations are not marked as page-current from pathname alone", async () => {
  const { isPageCurrent } = await import("../src/lib/navigation.ts");
  assert.equal(isPageCurrent("/", "/#contact"), false);
  assert.equal(isPageCurrent("/", "/"), true);
  assert.equal(isPageCurrent("/research", "/research"), true);
  assert.equal(isPageCurrent("/research/notes", "/research"), true);
  assert.match(read("src/app/components/layout/Header.tsx"), /isPageCurrent/);
});

test("Reading models internal and external sources explicitly", () => {
  const portfolio = read("src/data/portfolio.ts");
  const reading = read("src/app/reading/page.tsx");
  assert.doesNotMatch(portfolio, /externalUrl\?:|externalUrl:/);
  assert.match(portfolio, /kind:\s*"internal"\s*\|\s*"external"/);
  assert.match(portfolio, /source:\s*\{\s*kind:\s*"internal"/);
  assert.match(portfolio, /source:\s*\{\s*kind:\s*"external"/);
  assert.match(reading, /entry\.source\.kind === "internal"/);
  assert.match(reading, /<Link/);
  assert.match(reading, /<ExternalLink/);
  assert.match(reading, /entry\.annotation/);
});
