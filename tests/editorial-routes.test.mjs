import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const requireFromTest = createRequire(import.meta.url);
const React = requireFromTest("react");
const editorialRouteEntries = [
  "src/app/about/page.tsx",
  "src/app/research/page.tsx",
  "src/app/experience/page.tsx",
  "src/app/reading/page.tsx",
  "src/app/writing/page.tsx",
  "src/app/writing/[slug]/page.tsx",
  "src/app/work/[slug]/page.tsx",
];

function parseSource(source, file = "fixture.tsx") {
  return ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

function sourceFile(file) {
  return parseSource(read(file), file);
}

function hasClientDirective(file) {
  for (const statement of sourceFile(file).statements) {
    if (
      !ts.isExpressionStatement(statement) ||
      !ts.isStringLiteral(statement.expression)
    ) {
      return false;
    }
    if (statement.expression.text === "use client") return true;
  }
  return false;
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

function editorialDependencyClosure() {
  return [
    ...new Set(
      editorialRouteEntries.flatMap((entry) => dependencyClosure(entry)),
    ),
  ];
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

function splitSelectorList(source) {
  const members = [];
  let start = 0;
  let quote = null;
  let escaped = false;
  let brackets = 0;
  let parentheses = 0;
  let interpolation = 0;

  for (let cursor = 0; cursor < source.length; cursor += 1) {
    const character = source[cursor];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (character === "\\") {
      escaped = true;
      continue;
    }
    if (quote) {
      if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "#" && source[cursor + 1] === "{") {
      interpolation += 1;
      cursor += 1;
      continue;
    }
    if (interpolation > 0) {
      if (character === "{") interpolation += 1;
      if (character === "}") interpolation -= 1;
      continue;
    }
    if (character === "[") brackets += 1;
    if (character === "]") brackets -= 1;
    if (character === "(") parentheses += 1;
    if (character === ")") parentheses -= 1;
    if (
      character === "," &&
      brackets === 0 &&
      parentheses === 0 &&
      interpolation === 0
    ) {
      members.push(source.slice(start, cursor).trim());
      start = cursor + 1;
    }
  }

  members.push(source.slice(start).trim());
  return members;
}

function scssBlocks(source, selector) {
  const blocks = [];
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, "");
  let blockDepth = 0;
  let preludeStart = 0;
  let matchedBlockStart = null;
  let quote = null;
  let escaped = false;
  let brackets = 0;
  let parentheses = 0;
  let interpolation = 0;

  for (let cursor = 0; cursor < clean.length; cursor += 1) {
    const character = clean[cursor];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (character === "\\") {
      escaped = true;
      continue;
    }
    if (quote) {
      if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "#" && clean[cursor + 1] === "{") {
      interpolation += 1;
      cursor += 1;
      continue;
    }
    if (interpolation > 0) {
      if (character === "{") interpolation += 1;
      if (character === "}") interpolation -= 1;
      continue;
    }
    if (character === "[") brackets += 1;
    if (character === "]") brackets -= 1;
    if (character === "(") parentheses += 1;
    if (character === ")") parentheses -= 1;
    if (brackets > 0 || parentheses > 0) continue;

    if (character === "{") {
      if (
        blockDepth === 0 &&
        splitSelectorList(clean.slice(preludeStart, cursor)).includes(
          selector.trim(),
        )
      ) {
        matchedBlockStart = cursor;
      }
      blockDepth += 1;
      continue;
    }
    if (character === "}") {
      blockDepth -= 1;
      if (blockDepth === 0) {
        if (matchedBlockStart !== null) {
          blocks.push(clean.slice(matchedBlockStart + 1, cursor));
          matchedBlockStart = null;
        }
        preludeStart = cursor + 1;
      }
      continue;
    }
    if (character === ";" && blockDepth === 0) preludeStart = cursor + 1;
  }

  return blocks;
}

function archiveIsThinWrapper(source) {
  const ast = parseSource(source);
  const component = ast.statements.find(
    (statement) =>
      ts.isFunctionDeclaration(statement) &&
      statement.name?.text === "WritingArchive",
  );
  if (!component?.body) return false;
  if (component.body.statements.length !== 2) return false;
  const [stateStatement, returnStatement] = component.body.statements;
  if (
    !ts.isVariableStatement(stateStatement) ||
    stateStatement.declarationList.declarations.length !== 1 ||
    !ts.isReturnStatement(returnStatement) ||
    !returnStatement.expression
  ) {
    return false;
  }

  const [stateDeclaration] = stateStatement.declarationList.declarations;
  if (
    !ts.isArrayBindingPattern(stateDeclaration.name) ||
    stateDeclaration.name.elements.length !== 2 ||
    !stateDeclaration.initializer ||
    !ts.isCallExpression(stateDeclaration.initializer) ||
    !ts.isIdentifier(stateDeclaration.initializer.expression) ||
    stateDeclaration.initializer.expression.text !== "useState" ||
    stateDeclaration.initializer.arguments.length !== 1 ||
    !ts.isStringLiteral(stateDeclaration.initializer.arguments[0]) ||
    stateDeclaration.initializer.arguments[0].text !== "all"
  ) {
    return false;
  }
  const [stateElement, setterElement] = stateDeclaration.name.elements;
  if (
    !ts.isBindingElement(stateElement) ||
    !ts.isIdentifier(stateElement.name) ||
    !ts.isBindingElement(setterElement) ||
    !ts.isIdentifier(setterElement.name)
  ) {
    return false;
  }

  const surfaceCall = returnStatement.expression;
  if (
    !ts.isCallExpression(surfaceCall) ||
    !ts.isIdentifier(surfaceCall.expression) ||
    surfaceCall.expression.text !== "renderWritingArchive" ||
    surfaceCall.arguments.length !== 3
  ) {
    return false;
  }
  const [modelCall, selectionCallback, classNames] = surfaceCall.arguments;
  return (
    ts.isCallExpression(modelCall) &&
    ts.isIdentifier(modelCall.expression) &&
    modelCall.expression.text === "createWritingArchiveViewModel" &&
    modelCall.arguments.length === 2 &&
    ts.isIdentifier(modelCall.arguments[0]) &&
    modelCall.arguments[0].text === "posts" &&
    ts.isIdentifier(modelCall.arguments[1]) &&
    modelCall.arguments[1].text === stateElement.name.text &&
    ts.isIdentifier(selectionCallback) &&
    selectionCallback.text === setterElement.name.text &&
    ts.isIdentifier(classNames) &&
    classNames.text === "styles"
  );
}

function animationDeclarations(source) {
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, "");
  return [
    ...clean.matchAll(
      /(?:^|[;{}\n])\s*((?:-[a-z0-9]+-)?animation(?:-[a-z-]+)?)\s*:/gim,
    ),
  ].map((match) => match[1].toLowerCase());
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

function importCommonJsTypeScriptModule(file) {
  const output = ts.transpileModule(read(file), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const module = { exports: {} };
  const requireFromModule = createRequire(path.join(root, file));
  Function(
    "require",
    "module",
    "exports",
    output,
  )(requireFromModule, module, module.exports);
  return module.exports;
}

function reactElements(rootElement) {
  const elements = [];
  function visit(node) {
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (!React.isValidElement(node)) return;
    elements.push(node);
    React.Children.forEach(node.props.children, visit);
  }
  visit(rootElement);
  return elements;
}

function reactText(node) {
  if (node === null || node === undefined || typeof node === "boolean")
    return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactText).join("");
  if (React.isValidElement(node)) return reactText(node.props.children);
  return "";
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
  const sourceFiles = files.filter((file) => /\.(?:ts|tsx)$/.test(file));
  const clientFiles = sourceFiles.filter(hasClientDirective);
  const violations = sourceFiles.flatMap(runtimeViolations);

  assert.deepEqual(clientFiles, []);
  assert.deepEqual(violations, []);
  assert.ok(files.includes("src/app/work/[slug]/CaseStudy.tsx"));
  assert.ok(files.includes("src/app/components/editorial/EditorialFooter.tsx"));
});

test("directive prologues expose transitive client dependencies", () => {
  const files = dependencyClosure("tests/fixtures/editorial-route/page.tsx");
  assert.deepEqual(files.filter(hasClientDirective), [
    "tests/fixtures/outside/HiddenClient.tsx",
  ]);
});

test("archive filtering is the only client island in editorial routes", () => {
  const files = editorialDependencyClosure().filter((file) =>
    /\.(?:ts|tsx)$/.test(file),
  );

  assert.deepEqual(files.filter(hasClientDirective).sort(), [
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

test("SCSS root matching rejects selector prefixes", () => {
  assert.deepEqual(
    scssBlocks('.pageShell { background: url("/noisetexture.jpg"); }', ".page"),
    [],
  );
});

test("SCSS root matching rejects descendants and accepts exact selector-list members", () => {
  assert.deepEqual(
    scssBlocks(
      '.pageShell .page { background: url("/noisetexture.jpg"); }',
      ".page",
    ),
    [],
  );
  assert.deepEqual(
    scssBlocks(
      '.pageShell,\n.page { background: url("/noisetexture.jpg"); }',
      ".page",
    ),
    [' background: url("/noisetexture.jpg"); '],
  );
});

test("SCSS root matching rejects exact selectors nested below another rule", () => {
  assert.deepEqual(
    scssBlocks(
      '.pageShell { .page { background: url("/noisetexture.jpg"); } }',
      ".page",
    ),
    [],
  );
  assert.deepEqual(
    scssBlocks('.page { background: url("/noisetexture.jpg"); }', ".page"),
    [' background: url("/noisetexture.jpg"); '],
  );
});

test("SCSS selector lists ignore commas inside selector syntax", () => {
  for (const selector of [
    '[data-copy="x, .page, y"]',
    "[data-copy='x, .page, y']",
    ":is(.foo,.page)",
    String.raw`.escaped\,item`,
    String.raw`.item-#{"x,.page"}`,
  ]) {
    assert.deepEqual(
      scssBlocks(`${selector} { color: green; }`, ".page"),
      [],
      `${selector} exposed an internal comma as a selector boundary`,
    );
  }

  assert.deepEqual(scssBlocks(".pageShell, .page { color: green; }", ".page"), [
    " color: green; ",
  ]);
});

test("animation scanning rejects renamed shorthand and name declarations", () => {
  const mutation = `
    .page { animation: shimmer 1s linear infinite; }
    .article { animation-name: drift; }
    /* .ignored { animation: commented 1s; } */
  `;
  assert.deepEqual(animationDeclarations(mutation), [
    "animation",
    "animation-name",
  ]);
});

test("animation scanning rejects vendor-prefixed declarations", () => {
  const mutation = `
    .page { -webkit-animation: shimmer 1s linear infinite; }
    .article { -webkit-animation-name: drift; }
    .legacy { -moz-animation-duration: 2s; }
  `;
  assert.deepEqual(animationDeclarations(mutation), [
    "-webkit-animation",
    "-webkit-animation-name",
    "-moz-animation-duration",
  ]);
});

test("animation scanning resumes after same-line nested rule boundaries", () => {
  const mutation = `
    .page { .child {} -webkit-animation-name: pulse; }
    .article { .mark {} animation-duration: 2s; }
  `;
  assert.deepEqual(animationDeclarations(mutation), [
    "-webkit-animation-name",
    "animation-duration",
  ]);
});

test("editorial route dependency styles do not declare animations", () => {
  const styles = editorialDependencyClosure().filter((file) =>
    file.endsWith(".scss"),
  );
  const allowlist = new Map();
  const violations = styles.flatMap((file) => {
    const allowed = allowlist.get(file) ?? new Set();
    return animationDeclarations(read(file))
      .filter((property) => !allowed.has(property))
      .map((property) => `${file}: ${property}`);
  });

  assert.ok(styles.length > 0, "editorial route styles were not traversed");
  assert.deepEqual(violations, []);
});

test("writing derives only available formats and filters real post fixtures", async () => {
  const modulePath = path.join(root, "src/lib/postFormats.ts");
  assert.ok(fs.existsSync(modulePath), "missing shared post-format module");
  const {
    createWritingArchiveViewModel,
    filterPostsByFormat,
    formatLabels,
    getAvailableFormats,
  } = await importTypeScriptModule("src/lib/postFormats.ts");
  const posts = [
    { slug: "a", title: "Essay A", format: "essay" },
    { slug: "b", title: "Research B", format: "research-note" },
    { slug: "c", title: "Essay C", format: "essay" },
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

  assert.equal(typeof createWritingArchiveViewModel, "function");
  const initial = createWritingArchiveViewModel(posts, "all");
  assert.deepEqual(initial.filters, [
    { value: "all", label: "All", active: true },
    { value: "essay", label: "Essay", active: false },
    { value: "research-note", label: "Research Note", active: false },
  ]);
  assert.deepEqual(
    initial.cards.map(({ title, href }) => ({ title, href })),
    [
      { title: "Essay A", href: "/writing/a" },
      { title: "Research B", href: "/writing/b" },
      { title: "Essay C", href: "/writing/c" },
    ],
  );

  const filtered = createWritingArchiveViewModel(posts, "research-note");
  assert.deepEqual(
    filtered.filters.filter(({ active }) => active).map(({ value }) => value),
    ["research-note"],
  );
  assert.deepEqual(
    filtered.cards.map(({ title, href }) => ({ title, href })),
    [{ title: "Research B", href: "/writing/b" }],
  );

  const archive = read("src/app/writing/WritingArchive.tsx");
  assert.equal(archiveIsThinWrapper(archive), true);
  assert.doesNotMatch(archive, /No posts in this category yet/);
});

test("archive presentation renders the verified model and wires selection", async () => {
  const presentationPath = "src/app/writing/WritingArchivePresentation.ts";
  assert.ok(fs.existsSync(path.join(root, presentationPath)));
  const { renderWritingArchive } =
    importCommonJsTypeScriptModule(presentationPath);
  const { createWritingArchiveViewModel } = await importTypeScriptModule(
    "src/lib/postFormats.ts",
  );
  const posts = [
    {
      slug: "essay-a",
      title: "Essay A",
      description: "A public essay.",
      date: "2026-08-01",
      category: "research",
      format: "essay",
      publicationState: "public",
      featured: false,
      readingTime: 4,
    },
    {
      slug: "research-b",
      title: "Research B",
      description: "A public research note.",
      date: "2026-08-02",
      category: "research",
      format: "research-note",
      publicationState: "public",
      featured: false,
      readingTime: 6,
    },
    {
      slug: "draft-c",
      title: "Draft C",
      description: "Not public.",
      date: "2026-08-03",
      category: "field-note",
      format: "field-note",
      publicationState: "draft",
      featured: false,
      readingTime: 2,
    },
  ];
  const publicPosts = posts.filter(
    ({ publicationState }) => publicationState === "public",
  );
  const model = createWritingArchiveViewModel(publicPosts, "all");
  let selectedFormat = null;
  const surface = renderWritingArchive(
    model,
    (format) => {
      selectedFormat = format;
    },
    {
      filters: "filters",
      filterBtn: "filter-button",
      active: "active",
      list: "list",
      card: "card",
      cardMeta: "card-meta",
      format: "format",
      dot: "dot",
      evidence: "evidence",
      cardTitle: "card-title",
      cardDescription: "card-description",
    },
  );
  const elements = reactElements(surface);
  const buttons = elements.filter(({ type }) => type === "button");
  const links = elements.filter(({ type }) => type === "a");

  assert.deepEqual(buttons.map(reactText), ["All", "Essay", "Research Note"]);
  assert.deepEqual(
    buttons.map(({ props }) => props["aria-pressed"]),
    [true, false, false],
  );
  assert.deepEqual(
    links.map(({ props }) => props.href),
    ["/writing/essay-a", "/writing/research-b"],
  );
  assert.deepEqual(
    elements.filter(({ type }) => type === "h2").map(reactText),
    ["Essay A", "Research B"],
  );
  assert.deepEqual(elements.filter(({ type }) => type === "p").map(reactText), [
    "A public essay.",
    "A public research note.",
  ]);
  assert.doesNotMatch(reactText(surface), /Draft C|Field Note/);

  buttons
    .find((button) => reactText(button) === "Research Note")
    .props.onClick();
  assert.equal(selectedFormat, "research-note");

  const filteredSurface = renderWritingArchive(
    createWritingArchiveViewModel(publicPosts, selectedFormat),
    () => {},
    {
      filters: "filters",
      filterBtn: "filter-button",
      active: "active",
      list: "list",
      card: "card",
      cardMeta: "card-meta",
      format: "format",
      dot: "dot",
      evidence: "evidence",
      cardTitle: "card-title",
      cardDescription: "card-description",
    },
  );
  const filteredElements = reactElements(filteredSurface);
  assert.deepEqual(
    filteredElements
      .filter(({ type }) => type === "button")
      .map(({ props }) => props["aria-pressed"]),
    [false, false, true],
  );
  assert.deepEqual(
    filteredElements.filter(({ type }) => type === "h2").map(reactText),
    ["Research B"],
  );
});

test("archive helper checks reject dead comment mutations", () => {
  const mutation = `
    const availableFormats = [];
    const filteredPosts = posts;
    // getAvailableFormats(posts)
    // filterPostsByFormat(posts, activeFormat)
  `;
  assert.equal(archiveIsThinWrapper(mutation), false);
});

test("archive helper checks reject dead variables bypassed by render maps", () => {
  const mutation = `
    function WritingArchive({ posts }) {
      const activeFormat = "all";
      const availableFormats = getAvailableFormats(posts);
      const filteredPosts = filterPostsByFormat(posts, activeFormat);

      return (
        <section>
          <div>{["all", "essay"].map((format) => <button>{format}</button>)}</div>
          <div>{posts.map((post) => <a className={styles.card}>{post.title}</a>)}</div>
        </section>
      );
    }
  `;
  assert.equal(archiveIsThinWrapper(mutation), false);
});

test("archive helper checks reject correct render maps hidden behind false", () => {
  const mutation = `
    function WritingArchive({ posts }) {
      const activeFormat = "all";
      const viewModel = createWritingArchiveViewModel(posts, activeFormat);

      return (
        <section>
          {false && viewModel.filters.map((filter) => <button>{filter.label}</button>)}
          {false && viewModel.cards.map((card) => <a className={styles.card}>{card.title}</a>)}
        </section>
      );
    }
  `;
  assert.equal(archiveIsThinWrapper(mutation), false);
});

test("archive helper checks reject a view model shadowed inside a returned function", () => {
  const mutation = `
    function WritingArchive({ posts }) {
      const activeFormat = "all";
      const viewModel = createWritingArchiveViewModel(posts, activeFormat);

      return (() => {
        const viewModel = {
          filters: [{ value: "all", label: "All", active: true }],
          cards: posts,
        };
        return (
          <section>
            {viewModel.filters.map((filter) => <button>{filter.label}</button>)}
            {viewModel.cards.map((post) => <a className={styles.card}>{post.title}</a>)}
          </section>
        );
      })();
    }
  `;
  assert.equal(archiveIsThinWrapper(mutation), false);
});

test("archive helper checks reject extra hard-coded render maps", () => {
  const mutation = `
    function WritingArchive({ posts }) {
      const activeFormat = "all";
      const viewModel = createWritingArchiveViewModel(posts, activeFormat);

      return (
        <section>
          {viewModel.filters.map((filter) => <button>{filter.label}</button>)}
          {viewModel.cards.map((card) => <a className={styles.card}>{card.title}</a>)}
          {posts.map((post) => <a className={styles.card}>{post.title}</a>)}
        </section>
      );
    }
  `;
  assert.equal(archiveIsThinWrapper(mutation), false);
});

test("archive helper checks reject expected JSX in an unreachable branch", () => {
  const mutation = `
    function WritingArchive({ posts }) {
      const activeFormat = "all";
      const viewModel = createWritingArchiveViewModel(posts, activeFormat);
      return false
        ? <section>
            {viewModel.filters.map((filter) => <button>{filter.label}</button>)}
            {viewModel.cards.map((card) => <a className={styles.card}>{card.title}</a>)}
          </section>
        : null;
    }
  `;
  assert.equal(archiveIsThinWrapper(mutation), false);
});

test("archive helper checks reject view-model reassignment", () => {
  const mutation = `
    function WritingArchive({ posts }) {
      const activeFormat = "all";
      let viewModel = createWritingArchiveViewModel(posts, activeFormat);
      viewModel = {
        filters: [{ value: "all", label: "Hard coded", active: true }],
        cards: [{ title: "Hard coded", href: "/wrong", post: posts[0] }],
      };
      return (
        <section>
          {viewModel.filters.map((filter) => <button>{filter.label}</button>)}
          {viewModel.cards.map((card) => <a className={styles.card}>{card.title}</a>)}
        </section>
      );
    }
  `;
  assert.equal(archiveIsThinWrapper(mutation), false);
});

test("archive helper checks reject extra flat-mapped draft cards", () => {
  const mutation = `
    function WritingArchive({ posts }) {
      const activeFormat = "all";
      const viewModel = createWritingArchiveViewModel(posts, activeFormat);
      return (
        <section>
          {viewModel.filters.map((filter) => <button>{filter.label}</button>)}
          {viewModel.cards.map((card) => <a className={styles.card}>{card.title}</a>)}
          {posts.flatMap((post) => post.publicationState === "draft"
            ? [<a className={styles.card} href={"/writing/" + post.slug}>{post.title}</a>]
            : [])}
        </section>
      );
    }
  `;
  assert.equal(archiveIsThinWrapper(mutation), false);
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

  const [media] = scssBlocks(waldo, ".heroFigure");
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
