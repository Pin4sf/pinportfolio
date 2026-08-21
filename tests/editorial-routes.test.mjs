import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function sourceFile(file) {
  return ts.createSourceFile(
    file,
    read(file),
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

function hasClientDirective(file) {
  const [first] = sourceFile(file).statements;
  return Boolean(
    first &&
    ts.isExpressionStatement(first) &&
    ts.isStringLiteral(first.expression) &&
    first.expression.text === "use client",
  );
}

function localDependencies(file) {
  const dependencies = [];
  const directory = path.dirname(path.join(root, file));

  for (const imported of ts.preProcessFile(read(file)).importedFiles) {
    const specifier = imported.fileName;
    if (!specifier.startsWith(".") && !specifier.startsWith("@/")) continue;

    const base = specifier.startsWith("@/")
      ? path.join(root, "src", specifier.slice(2))
      : path.resolve(directory, specifier);
    const resolved = [
      base,
      `${base}.ts`,
      `${base}.tsx`,
      path.join(base, "index.ts"),
      path.join(base, "index.tsx"),
    ].find(
      (candidate) =>
        fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
    );

    if (resolved) dependencies.push(path.relative(root, resolved));
  }

  return dependencies;
}

function dependencyClosure(entry) {
  const pending = [entry];
  const visited = new Set();

  while (pending.length > 0) {
    const file = pending.pop();
    if (!file || visited.has(file)) continue;
    visited.add(file);
    pending.push(...localDependencies(file));
  }

  return [...visited];
}

function runtimeViolations(file) {
  const violations = [];
  const ast = sourceFile(file);

  function visit(node) {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const specifier = node.moduleSpecifier.text;
      if (
        /^(?:gsap|three|lenis|framer-motion|@react-three|@react-spring)(?:\/|$)/.test(
          specifier,
        ) ||
        /(?:^|\/)hooks(?:\/|$)|(?:^|\/)components\/(?:three|ui\/TransitionLink)(?:\/|$)/.test(
          specifier,
        )
      ) {
        violations.push(`${file}: imports ${specifier}`);
      }
    }

    if (
      ts.isIdentifier(node) &&
      [
        "gsap",
        "ScrollTrigger",
        "TransitionLink",
        "window",
        "document",
        "requestAnimationFrame",
        "cancelAnimationFrame",
        "IntersectionObserver",
        "ResizeObserver",
      ].includes(node.text)
    ) {
      violations.push(`${file}: references ${node.text}`);
    }

    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      /^use[A-Z]/.test(node.expression.text)
    ) {
      violations.push(`${file}: calls ${node.expression.text}`);
    }

    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      node.tagName.getText(ast).toLowerCase() === "canvas"
    ) {
      violations.push(`${file}: renders canvas`);
    }

    ts.forEachChild(node, visit);
  }

  visit(ast);
  return violations;
}

function scssBlocks(source, selector) {
  const blocks = [];
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, "");
  let cursor = 0;

  while (cursor < clean.length) {
    const start = clean.indexOf(selector, cursor);
    if (start === -1) break;
    const open = clean.indexOf("{", start + selector.length);
    if (open === -1) break;

    let depth = 1;
    let end = open + 1;
    while (end < clean.length && depth > 0) {
      if (clean[end] === "{") depth += 1;
      if (clean[end] === "}") depth -= 1;
      end += 1;
    }

    if (depth === 0) blocks.push(clean.slice(open + 1, end - 1));
    cursor = end;
  }

  return blocks;
}

async function importTypeScriptModule(file) {
  const output = ts.transpileModule(read(file), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return import(
    `data:text/javascript;base64,${Buffer.from(output).toString("base64")}`
  );
}

test("the global shell excludes smooth scroll, custom cursor, and transition machinery", () => {
  const layout = read("src/app/layout.tsx");
  const page = read("src/app/page.tsx");
  const header = read("src/app/components/layout/Header.tsx");
  assert.doesNotMatch(layout, /ClientShell|TransitionProvider|GpuTierProvider/);
  assert.doesNotMatch(page, /SmoothScroll/);
  assert.doesNotMatch(header, /gsap|ScrollTrigger|TransitionLink/);
  assert.doesNotMatch(
    read("src/app/globals.scss"),
    /custom-cursor-active|--sv|skewY\(/,
  );
});

test("case study navigation stays direct without a transition provider", () => {
  const caseStudy = read("src/app/work/[slug]/CaseStudy.tsx");
  assert.doesNotMatch(caseStudy, /TransitionLink|useTransition/);
  assert.match(caseStudy, /<a href="\/" className=\{styles\.back\}>/);
});

test("the case-study dependency graph stays server-rendered and static", () => {
  const files = dependencyClosure("src/app/work/[slug]/page.tsx");
  const clientFiles = files.filter(hasClientDirective);
  const violations = files.flatMap(runtimeViolations);

  assert.deepEqual(clientFiles, []);
  assert.deepEqual(violations, []);
  assert.ok(files.includes("src/app/work/[slug]/CaseStudy.tsx"));
  assert.ok(files.includes("src/app/components/editorial/EditorialFooter.tsx"));
});

test("archive filtering is the only client island in editorial routes", () => {
  const directories = [
    "src/app/about",
    "src/app/research",
    "src/app/experience",
    "src/app/reading",
    "src/app/writing",
    "src/app/work",
    "src/app/components/editorial",
  ];
  const files = directories.flatMap((directory) =>
    fs
      .readdirSync(path.join(root, directory), { recursive: true })
      .filter((name) => /\.(?:ts|tsx)$/.test(name))
      .map((name) => path.join(directory, name)),
  );

  assert.deepEqual(files.filter(hasClientDirective), [
    "src/app/writing/WritingArchive.tsx",
  ]);
});

test("editorial primitives stay server-rendered", () => {
  for (const file of [
    "src/app/components/editorial/EditorialHeader.tsx",
    "src/app/components/editorial/ArtifactList.tsx",
  ]) {
    const source = read(file);
    assert.doesNotMatch(source, /^"use client"/);
    assert.match(source, /next\/link/);
    assert.doesNotMatch(source, /gsap|ScrollTrigger|TransitionLink/);
  }
});

test("every dedicated route reuses the canonical primary navigation", () => {
  const primaryNav = read(
    "src/app/components/editorial/EditorialPrimaryNav.tsx",
  );
  const header = read("src/app/components/editorial/EditorialHeader.tsx");
  const blogPost = read("src/app/writing/[slug]/BlogPost.tsx");
  const caseStudy = read("src/app/work/[slug]/CaseStudy.tsx");
  const portfolio = read("src/data/portfolio.ts");

  assert.match(primaryNav, /import \{ navItems \} from "@\/data\/portfolio"/);
  assert.match(primaryNav, /aria-label="Primary navigation"/);
  assert.match(primaryNav, /navItems\.map\(\(item\) =>/);
  assert.match(primaryNav, /<a href=\{item\.href\}/);
  assert.doesNotMatch(
    primaryNav,
    /^"use client"|useState|useEffect|gsap|next\/link/,
  );

  for (const source of [header, blogPost, caseStudy]) {
    assert.match(source, /EditorialPrimaryNav/);
    assert.match(source, /<EditorialPrimaryNav \/>/);
  }

  assert.match(header, /> Home/);
  assert.match(blogPost, /Back to Writing/);
  assert.match(caseStudy, />\s*Home\s*</);
  assert.match(caseStudy, /aria-label="Case studies"/);

  for (const [label, href] of [
    ["Venture", "/work/waldo"],
    ["Research + Writing", "/research"],
    ["Experience", "/experience"],
    ["About", "/about"],
    ["Contact", "/#contact"],
  ]) {
    assert.match(
      portfolio,
      new RegExp(`label: "${label.replace("+", "\\+")}"`),
    );
    assert.match(portfolio, new RegExp(`href: "${href.replace("/", "\\/")}"`));
  }
});

test("skip link becomes fully visible when focused", () => {
  const globals = read("src/app/globals.scss");
  const focusedRule = globals.match(
    /\.sr-only\s*\{[\s\S]*?&:focus-visible\s*\{([\s\S]*?)\n\s*\}/,
  );

  assert.ok(focusedRule, "Missing .sr-only focus-visible reset");
  for (const declaration of [
    /position:\s*fixed/,
    /width:\s*auto/,
    /height:\s*auto/,
    /margin:\s*0/,
    /overflow:\s*visible/,
    /clip:\s*auto/,
    /white-space:\s*normal/,
    /z-index:\s*\d+/,
  ]) {
    assert.match(focusedRule[1], declaration);
  }
});

test("primary navigation uses canonical routes", () => {
  const header = read("src/app/components/layout/Header.tsx");
  assert.match(header, /usePathname/);
  assert.doesNotMatch(header, /document\.querySelector\(item\.href\)/);
});

test("mobile navigation exposes its disclosure state", () => {
  const header = read("src/app/components/layout/Header.tsx");
  assert.match(header, /aria-expanded=\{menuOpen\}/);
});

test("mobile navigation owns focus and scroll for the full dialog lifecycle", () => {
  const header = read("src/app/components/layout/Header.tsx");
  assert.match(
    header,
    /const menuButtonRef = useRef<HTMLButtonElement>\(null\)/,
  );
  assert.match(
    header,
    /const previousBodyOverflow = document\.body\.style\.overflow/,
  );
  assert.match(header, /document\.body\.style\.overflow = "hidden"/);
  assert.match(
    header,
    /document\.body\.style\.overflow = previousBodyOverflow/,
  );
  assert.match(header, /const menuButton = menuButtonRef\.current/);
  assert.match(header, /menuButton\?\.focus\(\)/);
  assert.match(header, /if \(e\.key === "Escape"\)/);
  assert.match(header, /document\.activeElement === first/);
  assert.match(header, /document\.activeElement === last/);
  assert.match(header, /ref=\{menuButtonRef\}/);
});

test("hash routes bypass the page-transition curtain", () => {
  const coolLink = read("src/app/components/ui/CoolLink.tsx");
  assert.match(coolLink, /href\.startsWith\("\/"\) && !href\.includes\("#"\)/);
});

test("artifact date ranges omit invalid machine-readable dates", () => {
  const artifactList = read("src/app/components/editorial/ArtifactList.tsx");
  assert.doesNotMatch(artifactList, /<time dateTime=\{artifact\.date\}>/);
  assert.match(
    artifactList,
    /const isDateRange = \/\^\\d\{4\}-\\d\{4\}\$\/\.test\(artifact\.date\)/,
  );
  assert.match(
    artifactList,
    /dateTime=\{isDateRange \? undefined : artifact\.date\}/,
  );
});

test("external artifacts and About links expose a visible external affordance", () => {
  const artifactList = read("src/app/components/editorial/ArtifactList.tsx");
  const about = read("src/app/about/page.tsx");

  assert.match(artifactList, /external \? "↗" : "→"/);
  assert.match(artifactList, /Opens in a new tab/);
  assert.match(artifactList, /target="_blank"/);
  assert.match(artifactList, /rel="noopener noreferrer"/);
  assert.match(about, /function ExternalMarker/);
  assert.match(about, /<ExternalMarker \/>/);
  assert.match(about, /Opens in a new tab/);
});

test("about route is candid, server-rendered, and source bounded", () => {
  const source = read("src/app/about/page.tsx");
  assert.doesNotMatch(source, /^"use client"/);
  assert.match(source, /aboutPageData/);
  assert.match(source, /compassPrinciples/);
  assert.match(source, /personalInfluences/);
  assert.doesNotMatch(source, /gsap|ScrollTrigger|TransitionLink/);
});

test("research route exposes questions, artifacts, and uncertainty", () => {
  const source = read("src/app/research/page.tsx");
  assert.doesNotMatch(source, /^"use client"/);
  assert.match(source, /researchClusters/);
  assert.match(source, /getAllPosts/);
  assert.match(source, /cluster\.uncertainty/);
  assert.doesNotMatch(source, /gsap|ScrollTrigger|backdrop-filter/);
});

test("every canonical page exposes the global skip-link target", () => {
  for (const file of [
    "src/app/page.tsx",
    "src/app/about/page.tsx",
    "src/app/research/page.tsx",
    "src/app/experience/page.tsx",
    "src/app/writing/page.tsx",
    "src/app/writing/[slug]/BlogPost.tsx",
    "src/app/work/[slug]/CaseStudy.tsx",
  ]) {
    assert.match(
      read(file),
      /<main(?=[^>]*\bid="main-content")[^>]*>/,
      `${file} is missing #main-content`,
    );
  }
});

test("research restores experience evidence links after the route is available", () => {
  const research = read("src/app/research/page.tsx");
  const portfolio = read("src/data/portfolio.ts");

  assert.doesNotMatch(research, /Task 6 staged guard/);
  assert.doesNotMatch(research, /isAvailableOnResearchRoute/);
  assert.match(research, /\.filter\(isPublicArtifact\);/);
  assert.match(portfolio, /slug: "atlan"[\s\S]*?href: "\/experience"/);
  assert.match(
    portfolio,
    /slug: "smart-manufacturing"[\s\S]*?href: "\/experience"/,
  );
});

test("artifact lists can render subordinate headings on research clusters", () => {
  const artifactList = read("src/app/components/editorial/ArtifactList.tsx");
  const research = read("src/app/research/page.tsx");
  assert.match(artifactList, /headingLevel\?: "h2" \| "h3"/);
  assert.match(artifactList, /headingLevel = "h2"/);
  assert.match(artifactList, /const Heading = headingLevel/);
  assert.match(artifactList, /<Heading>\{artifact\.title\}<\/Heading>/);
  assert.match(research, /headingLevel="h3"/);
});

test("research does not repeat related writing as a supporting artifact", () => {
  const source = read("src/app/research/page.tsx");
  assert.match(source, /const relatedWritingHrefs = new Set/);
  assert.match(
    source,
    /relatedPosts\.map\(\(post\) => `\/writing\/\$\{post\.slug\}`\)/,
  );
  assert.match(source, /!relatedWritingHrefs\.has\(artifact\.href\)/);
  assert.doesNotMatch(source, /artifact\.kind !== "writing"/);
});

test("experience route uses an editorial chronology", () => {
  const source = read("src/app/experience/page.tsx");
  assert.doesNotMatch(source, /^"use client"/);
  assert.match(source, /timelineData/);
  assert.match(source, /entry\.evidence/);
  assert.match(source, /entry\.nextQuestion/);
  assert.doesNotMatch(source, /gsap|ScrollTrigger|IntersectionObserver/);
});

test("sitemap and machine surfaces expose only canonical public routes", () => {
  const sitemap = read("src/app/sitemap.ts");
  for (const route of [
    "/about",
    "/research",
    "/experience",
    "/writing",
    "/work/waldo",
  ]) {
    assert.match(sitemap, new RegExp(route.replace("/", "\\/")));
  }
  for (const file of ["public/agents.txt", "public/llms-full.txt"]) {
    const source = read(file);
    assert.doesNotMatch(
      source,
      /06-Applications-and-Outreach|waldo-brain|\/Users\//,
    );
    assert.doesNotMatch(source, /EcoFresh|OneSync|Quantum \+ AI/);
  }
});

test("writing format filters expose their selected state", () => {
  const source = read("src/app/writing/WritingArchive.tsx");
  assert.match(source, /aria-pressed=\{activeFormat === format\}/);
});

test("editorial shell and routes apply the real static texture without theatre", () => {
  const texture = path.join(root, "public/noisetexture.jpg");
  assert.ok(fs.statSync(texture).size > 0);

  for (const [file, rootSelector] of [
    ["src/app/components/editorial/EditorialHeader.module.scss", ".header"],
    ["src/app/research/ResearchPage.module.scss", ".page"],
    ["src/app/writing/WritingArchive.module.scss", ".page"],
    ["src/app/writing/[slug]/BlogPost.module.scss", ".page"],
    ["src/app/experience/ExperiencePage.module.scss", ".page"],
    ["src/app/about/AboutPage.module.scss", ".page"],
    ["src/app/work/[slug]/CaseStudy.module.scss", ".page"],
  ]) {
    const source = read(file);
    const [rootRule] = scssBlocks(source, rootSelector);
    assert.ok(rootRule, `${file} is missing ${rootSelector}`);
    assert.match(rootRule, /url\("\/noisetexture\.jpg"\)/);
    assert.doesNotMatch(
      source.replace(/\/\*[\s\S]*?\*\//g, ""),
      /animation:\s*grain|backdrop-filter|position:\s*sticky/i,
    );
  }

  const [article] = scssBlocks(
    read("src/app/writing/[slug]/BlogPost.module.scss"),
    ".article",
  );
  assert.match(article, /max-width:\s*68ch/);
});

test("writing derives only available formats and filters real post fixtures", async () => {
  const modulePath = path.join(root, "src/lib/postFormats.ts");
  assert.ok(fs.existsSync(modulePath), "missing shared post-format module");
  const { filterPostsByFormat, formatLabels, getAvailableFormats } =
    await importTypeScriptModule("src/lib/postFormats.ts");
  const posts = [
    { slug: "a", format: "essay" },
    { slug: "b", format: "research-note" },
    { slug: "c", format: "essay" },
  ];

  assert.deepEqual(getAvailableFormats(posts), ["essay", "research-note"]);
  assert.deepEqual(
    filterPostsByFormat(posts, "research-note").map((post) => post.slug),
    ["b"],
  );
  assert.strictEqual(filterPostsByFormat(posts, "all"), posts);
  assert.deepEqual(formatLabels, {
    essay: "Essay",
    "research-note": "Research Note",
    "field-note": "Field Note",
    explainer: "Explainer",
    "book-chapter": "Book / Chapter",
    "course-lesson": "Course / Lesson",
  });

  const archive = read("src/app/writing/WritingArchive.tsx");
  assert.match(archive, /getAvailableFormats\(posts\)/);
  assert.match(archive, /filterPostsByFormat\(posts, activeFormat\)/);
  assert.doesNotMatch(archive, /No posts in this category yet/);
});

test("article and archive share one server-safe format vocabulary", () => {
  for (const file of [
    "src/app/writing/[slug]/BlogPost.tsx",
    "src/app/writing/WritingArchive.tsx",
  ]) {
    const imports = sourceFile(file)
      .statements.filter(ts.isImportDeclaration)
      .map((statement) => statement.moduleSpecifier.text);
    assert.ok(imports.includes("@/lib/postFormats"));
  }

  const shared = read("src/lib/postFormats.ts");
  assert.doesNotMatch(shared, /use client|node:fs|node:path/);
});

test("mobile editorial rules scope one-column layouts and usable controls", () => {
  const experience = read("src/app/experience/ExperiencePage.module.scss");
  const experienceMobile = scssBlocks(
    experience,
    "@media (max-width: 700px)",
  ).find((block) => block.includes(".timeline::before"));
  assert.ok(experienceMobile, "experience timeline must collapse at 700px");
  assert.match(
    experienceMobile,
    /\.entry\s*\{[\s\S]*grid-template-columns:\s*1fr/,
  );

  const waldo = read("src/app/work/[slug]/CaseStudy.module.scss");
  const waldoMobile = scssBlocks(waldo, "@media (max-width: 700px)").find(
    (block) => block.includes(".overview"),
  );
  assert.ok(waldoMobile, "Waldo is missing its 700px layout contract");
  assert.match(waldoMobile, /\.cardGrid[\s\S]*grid-template-columns:\s*1fr/);

  const artifact = read(
    "src/app/components/editorial/ArtifactList.module.scss",
  );
  const [artifactMeta] = scssBlocks(artifact, ".meta");
  assert.match(artifactMeta, /font-size:\s*0\.75rem/);
  const artifactMobile = scssBlocks(artifact, "@media (max-width: 700px)").find(
    (block) => block.includes(".link"),
  );
  assert.match(artifactMobile, /\.link\s*\{[\s\S]*min-height:\s*44px/);

  const [media] = scssBlocks(waldo, ".heroFigure,\n.storyMedia");
  const [caption] = scssBlocks(media, "figcaption");
  const [captionLink] = scssBlocks(caption, "a");
  assert.match(captionLink, /min-height:\s*44px/);
});

test("Waldo reserves the display scale for its title", () => {
  const waldo = read("src/app/work/[slug]/CaseStudy.module.scss");
  const displayConsumers = waldo.match(
    /font-size:\s*var\(--editorial-display\)/g,
  );
  const [title] = scssBlocks(waldo, ".richTitle");
  const [closing] = scssBlocks(waldo, ".closing");
  const [closingCopy] = scssBlocks(closing, "p");

  assert.equal(displayConsumers?.length, 1);
  assert.match(title, /font-size:\s*var\(--editorial-display\)/);
  assert.match(closingCopy, /font-size:\s*clamp\(1\.8rem, 3vw, 3rem\)/);
});

test("reading is canonical, server-rendered, and absent from primary navigation", () => {
  const reading = read("src/app/reading/page.tsx");
  const primaryNav = read("src/data/portfolio.ts").slice(
    read("src/data/portfolio.ts").indexOf("export const navItems"),
    read("src/data/portfolio.ts").indexOf("// ==================== HERO"),
  );
  assert.doesNotMatch(reading, /^"use client"/);
  assert.match(reading, /getPublicReadingEntries/);
  assert.match(reading, /<main(?=[^>]*\bid="main-content")[^>]*>/);
  assert.match(reading, /<ol/);
  assert.doesNotMatch(reading, /rating|stars|coming soon/i);
  assert.doesNotMatch(primaryNav, /Reading|\/reading/);
});

test("reading is linked from research, writing, about, and the editorial footer", () => {
  for (const file of [
    "src/app/research/page.tsx",
    "src/app/writing/page.tsx",
    "src/app/about/page.tsx",
    "src/app/components/editorial/EditorialFooter.tsx",
  ])
    assert.match(read(file), /href="\/reading"/);
});

test("every editorial destination shares the quiet footer", () => {
  for (const file of [
    "src/app/reading/page.tsx",
    "src/app/research/page.tsx",
    "src/app/writing/page.tsx",
    "src/app/writing/[slug]/BlogPost.tsx",
    "src/app/about/page.tsx",
    "src/app/experience/page.tsx",
    "src/app/work/[slug]/CaseStudy.tsx",
  ])
    assert.match(read(file), /EditorialFooter/);
});
