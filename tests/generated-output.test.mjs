import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const nextDir = path.join(root, ".next");

const forbiddenPublicSignatures = [
  {
    label: "private Waldo Brain checkout path",
    value: ["/Users/shivanshfulper/Developer/Pin4sf", "waldo-brain"].join("/"),
  },
  {
    label: "private applications and outreach area",
    value: ["06", "Applications", "and", "Outreach"].join("-"),
  },
  {
    label: "excluded research direction",
    value: ["Quantum", "AI"].join(" + "),
  },
  {
    label: "unconfirmed Reading placeholder",
    value: ["unconfirmed", "book"].join("-"),
  },
];

const editorialRoutes = [
  {
    label: "/reading",
    manifestKey: "/reading/page",
    serverEntry: "server/app/reading/page.js",
    referenceManifest: "server/app/reading/page_client-reference-manifest.js",
  },
  {
    label: "/research",
    manifestKey: "/research/page",
    serverEntry: "server/app/research/page.js",
    referenceManifest: "server/app/research/page_client-reference-manifest.js",
  },
  {
    label: "/writing",
    manifestKey: "/writing/page",
    serverEntry: "server/app/writing/page.js",
    referenceManifest: "server/app/writing/page_client-reference-manifest.js",
  },
  {
    label: "/writing/[slug]",
    manifestKey: "/writing/[slug]/page",
    serverEntry: "server/app/writing/[slug]/page.js",
    referenceManifest:
      "server/app/writing/[slug]/page_client-reference-manifest.js",
  },
  {
    label: "/experience",
    manifestKey: "/experience/page",
    serverEntry: "server/app/experience/page.js",
    referenceManifest:
      "server/app/experience/page_client-reference-manifest.js",
  },
  {
    label: "/about",
    manifestKey: "/about/page",
    serverEntry: "server/app/about/page.js",
    referenceManifest: "server/app/about/page_client-reference-manifest.js",
  },
  {
    label: "/work/waldo",
    manifestKey: "/work/[slug]/page",
    serverEntry: "server/app/work/[slug]/page.js",
    referenceManifest:
      "server/app/work/[slug]/page_client-reference-manifest.js",
  },
];

const forbiddenRuntimeMarkers = [
  { label: "three", value: "node_modules/three" },
  { label: "three components", value: "components/three" },
  { label: "HeroBackground", value: "HeroBackground" },
  { label: "FluidBackground", value: "FluidBackground" },
  { label: "GpuTierContext", value: "/lib/GpuTierContext" },
  { label: "CustomCursor", value: "/ui/CustomCursor" },
  { label: "SmoothScroll", value: "/components/SmoothScroll" },
  { label: "PageTransition", value: "/ui/PageTransition" },
  { label: "TransitionContext", value: "/lib/TransitionContext" },
];

function requireProductionBuild() {
  assert.ok(
    fs.existsSync(path.join(nextDir, "BUILD_ID")),
    "run npm run build before this acceptance test",
  );
}

function readGenerated(relativePath) {
  const fullPath = path.join(nextDir, relativePath);
  assert.ok(
    fs.existsSync(fullPath),
    `missing generated artifact ${relativePath}`,
  );
  return fs.readFileSync(fullPath, "utf8");
}

function filesRecursively(directory) {
  const files = [];
  const pending = [directory];

  while (pending.length > 0) {
    const current = pending.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) pending.push(fullPath);
      else if (entry.isFile()) files.push(fullPath);
    }
  }

  return files;
}

function discoverDeployableArtifacts(buildDir, publicFiles) {
  const artifacts = [...publicFiles];
  const requiredServerFilesPath = path.join(
    buildDir,
    "required-server-files.json",
  );
  assert.ok(
    fs.existsSync(requiredServerFilesPath),
    "missing required-server-files.json",
  );
  const requiredServerFiles = JSON.parse(
    fs.readFileSync(requiredServerFilesPath, "utf8"),
  );
  assert.ok(
    Array.isArray(requiredServerFiles.files),
    "required-server-files.json has no deployable file declarations",
  );
  for (const declaredPath of requiredServerFiles.files) {
    if (!declaredPath.startsWith(".next/")) continue;
    const fullPath = path.join(buildDir, declaredPath.slice(".next/".length));
    assert.ok(
      fs.existsSync(fullPath),
      `missing required server artifact ${declaredPath}`,
    );
    artifacts.push(fullPath);
  }

  for (const entry of fs.readdirSync(buildDir, { withFileTypes: true })) {
    // `.next/cache` is incremental compiler state and `.next/trace` is local
    // build telemetry. Neither is shipped as an application artifact.
    if (entry.name === "cache" || entry.name === "trace") continue;
    const fullPath = path.join(buildDir, entry.name);
    if (entry.isDirectory()) artifacts.push(...filesRecursively(fullPath));
    else if (entry.isFile()) artifacts.push(fullPath);
  }
  return [...new Set(artifacts)];
}

function decodeUrlEscapes(source) {
  return source.replace(/%[0-9a-f]{2}/gi, (escape) =>
    String.fromCharCode(Number.parseInt(escape.slice(1), 16)),
  );
}

function absoluteUserPaths(source) {
  return source.match(/\/Users\/[^"'`\\\s<>{}\[\](),;]*/g) ?? [];
}

function scanPublicArtifacts({ buildDir, publicFiles, repositoryRoot }) {
  const artifacts = discoverDeployableArtifacts(buildDir, publicFiles);
  const normalizedRepositoryRoot = repositoryRoot.replace(/\/$/, "");
  const acceptedBuildRootOccurrences = [];
  for (const file of artifacts) {
    const source = fs.readFileSync(file, "utf8");
    const decodedSource = decodeUrlEscapes(source);
    for (const signature of forbiddenPublicSignatures) {
      if (
        source.includes(signature.value) ||
        decodedSource.includes(signature.value)
      ) {
        throw new Error(
          `${signature.label} leaked into ${path.relative(repositoryRoot, file)}`,
        );
      }
    }

    for (const absolutePath of absoluteUserPaths(decodedSource)) {
      if (
        absolutePath === normalizedRepositoryRoot ||
        absolutePath.startsWith(`${normalizedRepositoryRoot}/`)
      ) {
        acceptedBuildRootOccurrences.push({ file, value: absolutePath });
      } else {
        throw new Error(
          `private absolute source path leaked into ${path.relative(repositoryRoot, file)}: ${absolutePath}`,
        );
      }
    }
  }
  return { acceptedBuildRootOccurrences, artifacts };
}

function generatedArtifact(buildDir, absolutePath) {
  assert.ok(
    fs.existsSync(absolutePath),
    `missing traced artifact ${path.relative(buildDir, absolutePath)}`,
  );
  return {
    file: absolutePath,
    relativePath: path.relative(buildDir, absolutePath),
    source: fs.readFileSync(absolutePath, "utf8"),
  };
}

function collectNftGraph(buildDir, serverEntry) {
  const entryPath = path.join(buildDir, serverEntry);
  const initialNftPath = `${entryPath}.nft.json`;
  const artifacts = new Map();
  const pendingNfts = [initialNftPath];
  const visitedNfts = new Set();

  for (const artifact of [
    generatedArtifact(buildDir, entryPath),
    generatedArtifact(buildDir, initialNftPath),
  ]) {
    artifacts.set(artifact.file, artifact);
  }

  while (pendingNfts.length > 0) {
    const nftPath = pendingNfts.pop();
    if (visitedNfts.has(nftPath)) continue;
    visitedNfts.add(nftPath);
    const nft = JSON.parse(fs.readFileSync(nftPath, "utf8"));
    assert.ok(Array.isArray(nft.files), `${nftPath} has no traced files`);

    for (const reference of nft.files) {
      const resolved = path.resolve(path.dirname(nftPath), reference);
      if (!resolved.startsWith(`${buildDir}${path.sep}`)) {
        artifacts.set(resolved, {
          file: resolved,
          relativePath: resolved,
          source: resolved,
        });
        continue;
      }

      const artifact = generatedArtifact(buildDir, resolved);
      if (!artifacts.has(resolved)) artifacts.set(resolved, artifact);
      if (resolved.endsWith(".nft.json")) pendingNfts.push(resolved);
    }
  }

  return [...artifacts.values()];
}

function collectRouteGraph({ appBuildManifest, buildDir, route }) {
  const assets = appBuildManifest.pages[route.manifestKey];
  assert.ok(
    Array.isArray(assets),
    `${route.label} is absent from app manifest`,
  );
  assert.ok(assets.length > 0, `${route.label} has no generated assets`);

  const artifacts = collectNftGraph(buildDir, route.serverEntry);
  for (const relativePath of [route.referenceManifest, ...assets]) {
    const artifact = generatedArtifact(
      buildDir,
      path.join(buildDir, relativePath),
    );
    if (!artifacts.some((candidate) => candidate.file === artifact.file)) {
      artifacts.push(artifact);
    }
  }
  return artifacts;
}

function assertRouteGraphIsolated({ appBuildManifest, buildDir, route }) {
  const artifacts = collectRouteGraph({ appBuildManifest, buildDir, route });
  for (const artifact of artifacts) {
    for (const marker of forbiddenRuntimeMarkers) {
      if (artifact.source.includes(marker.value)) {
        throw new Error(
          `${route.label} references homepage runtime marker ${marker.label} in ${artifact.relativePath}`,
        );
      }
    }
  }
  return artifacts;
}

function assertConcretePrerender({ buildDir, manifest, route, srcRoute }) {
  const entry = manifest.routes?.[route];
  assert.ok(entry, `missing concrete prerender entry for ${route}`);
  assert.equal(entry.srcRoute, srcRoute, `${route} has the wrong source route`);
  assert.equal(
    entry.dataRoute,
    `${route}.rsc`,
    `${route} has the wrong data route`,
  );

  const artifactStem = route.slice(1);
  const htmlPath = path.join(buildDir, "server", "app", `${artifactStem}.html`);
  const rscPath = path.join(buildDir, "server", "app", `${artifactStem}.rsc`);
  assert.ok(fs.existsSync(htmlPath), `${route} missing concrete HTML artifact`);
  assert.ok(fs.existsSync(rscPath), `${route} missing concrete RSC artifact`);
  return { htmlPath, rscPath };
}

test("generated public output excludes private and explicitly excluded material", () => {
  requireProductionBuild();

  const acceptanceSource = fs.readFileSync(new URL(import.meta.url), "utf8");
  for (const signature of forbiddenPublicSignatures) {
    assert.ok(
      !acceptanceSource.includes(signature.value),
      `${signature.label} must stay assembled so the acceptance test cannot seed its own scan`,
    );
  }

  const { acceptedBuildRootOccurrences, artifacts } = scanPublicArtifacts({
    buildDir: nextDir,
    publicFiles: [
      path.join(root, "public", "agents.txt"),
      path.join(root, "public", "llms.txt"),
      path.join(root, "public", "llms-full.txt"),
    ],
    repositoryRoot: root,
  });
  assert.ok(artifacts.length > 20, "generated-output scan is empty");
  for (const requiredPath of [
    "required-server-files.json",
    "server/font-manifest.json",
    "server/next-font-manifest.js",
    "server/next-font-manifest.json",
  ]) {
    assert.ok(
      artifacts.includes(path.join(nextDir, requiredPath)),
      `${requiredPath} is absent from the deployable privacy scan`,
    );
  }

  const acceptedByFile = new Map();
  for (const occurrence of acceptedBuildRootOccurrences) {
    const relativePath = path.relative(root, occurrence.file);
    const summary = acceptedByFile.get(relativePath) ?? {
      count: 0,
    };
    summary.count += 1;
    acceptedByFile.set(relativePath, summary);
  }
  assert.ok(
    acceptedBuildRootOccurrences.length > 0,
    "expected framework-generated build-root metadata was not reported",
  );
  console.log("accepted framework build-root metadata exceptions:");
  for (const [file, summary] of [...acceptedByFile].sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    console.log(`${file}: ${summary.count} occurrence(s)`);
  }
});

test("editorial route bundles exclude homepage runtime machinery", () => {
  requireProductionBuild();

  const appBuildManifest = JSON.parse(readGenerated("app-build-manifest.json"));
  const homeGraph = collectRouteGraph({
    appBuildManifest,
    buildDir: nextDir,
    route: {
      label: "/",
      manifestKey: "/page",
      serverEntry: "server/app/page.js",
      referenceManifest: "server/app/page_client-reference-manifest.js",
    },
  });
  assert.match(
    homeGraph.map((artifact) => artifact.source).join("\n"),
    /Hero\.tsx -> \.\.\/three\/HeroBackground/,
    "homepage runtime marker is missing; bundle-isolation scan lacks its positive control",
  );

  for (const route of editorialRoutes) {
    assertRouteGraphIsolated({
      appBuildManifest,
      buildDir: nextDir,
      route,
    });
  }
});

test("known dynamic routes have concrete prerender entries and artifacts", () => {
  requireProductionBuild();
  const manifest = JSON.parse(readGenerated("prerender-manifest.json"));
  for (const concreteRoute of [
    { route: "/work/waldo", srcRoute: "/work/[slug]" },
    {
      route: "/writing/agent-done-outcome-truth",
      srcRoute: "/writing/[slug]",
    },
  ]) {
    assertConcretePrerender({
      buildDir: nextDir,
      manifest,
      ...concreteRoute,
    });
  }
});

test("privacy scan follows required server manifest declarations", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "portfolio-generated-output-"),
  );
  t.after(() => fs.rmSync(fixtureRoot, { force: true, recursive: true }));
  const fixtureBuild = path.join(fixtureRoot, ".next");
  fs.mkdirSync(path.join(fixtureBuild, "server"), { recursive: true });
  fs.mkdirSync(path.join(fixtureBuild, "static"), { recursive: true });
  fs.writeFileSync(path.join(fixtureBuild, "BUILD_ID"), "fixture");
  fs.writeFileSync(
    path.join(fixtureBuild, "required-server-files.json"),
    JSON.stringify({
      files: [".next/server/next-font-manifest.json"],
      mutation: ["Quantum", "AI"].join(" + "),
    }),
  );
  fs.writeFileSync(
    path.join(fixtureBuild, "server", "next-font-manifest.json"),
    "{}",
  );

  assert.throws(
    () =>
      scanPublicArtifacts({
        buildDir: fixtureBuild,
        publicFiles: [],
        repositoryRoot: fixtureRoot,
      }),
    /excluded research direction.*required-server-files\.json/,
  );
});

test("privacy scan rejects encoded private paths and reports its build-root exception", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "portfolio-path-output-"),
  );
  t.after(() => fs.rmSync(fixtureRoot, { force: true, recursive: true }));
  const fixtureBuild = path.join(fixtureRoot, ".next");
  const acceptedRoot = [
    "",
    "Users",
    "builder",
    ".codex",
    "worktrees",
    "fixture",
    "pinportfolio",
  ].join("/");
  fs.mkdirSync(path.join(fixtureBuild, "server"), { recursive: true });
  fs.writeFileSync(path.join(fixtureBuild, "BUILD_ID"), "fixture");
  fs.writeFileSync(
    path.join(fixtureBuild, "required-server-files.json"),
    JSON.stringify({ appDir: acceptedRoot, files: [] }),
  );
  const encodedPrivatePath = encodeURIComponent(
    ["", "Users", "reviewer", "Developer", "private-vault"].join("/"),
  );
  fs.writeFileSync(
    path.join(fixtureBuild, "server", "private-reference.js"),
    JSON.stringify({ source: encodedPrivatePath }),
  );

  assert.throws(
    () =>
      scanPublicArtifacts({
        buildDir: fixtureBuild,
        publicFiles: [],
        repositoryRoot: acceptedRoot,
      }),
    /private absolute source path.*server\/private-reference\.js/,
  );

  fs.writeFileSync(
    path.join(fixtureBuild, "server", "private-reference.js"),
    "export default {};",
  );
  const result = scanPublicArtifacts({
    buildDir: fixtureBuild,
    publicFiles: [],
    repositoryRoot: acceptedRoot,
  });
  assert.deepEqual(result.acceptedBuildRootOccurrences, [
    {
      file: path.join(fixtureBuild, "required-server-files.json"),
      value: acceptedRoot,
    },
  ]);
});

test("route isolation follows NFT-referenced server chunks", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "portfolio-route-graph-"),
  );
  t.after(() => fs.rmSync(fixtureRoot, { force: true, recursive: true }));
  const fixtureBuild = path.join(fixtureRoot, ".next");
  const route = {
    label: "/reading",
    manifestKey: "/reading/page",
    serverEntry: "server/app/reading/page.js",
    referenceManifest: "server/app/reading/page_client-reference-manifest.js",
  };
  fs.mkdirSync(path.join(fixtureBuild, "server", "app", "reading"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(fixtureBuild, "server", "chunks"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(fixtureBuild, "static"), { recursive: true });
  fs.writeFileSync(
    path.join(fixtureBuild, route.serverEntry),
    "module.exports = {};",
  );
  fs.writeFileSync(
    path.join(fixtureBuild, `${route.serverEntry}.nft.json`),
    JSON.stringify({ files: ["../../chunks/runtime-mutation.js"] }),
  );
  fs.writeFileSync(
    path.join(fixtureBuild, route.referenceManifest),
    "globalThis.__RSC_MANIFEST = {};",
  );
  fs.writeFileSync(
    path.join(fixtureBuild, "server", "chunks", "runtime-mutation.js"),
    'require("/ui/CustomCursor");',
  );
  fs.writeFileSync(
    path.join(fixtureBuild, "static", "route.js"),
    "self.route = true;",
  );

  assert.throws(
    () =>
      assertRouteGraphIsolated({
        appBuildManifest: {
          pages: { [route.manifestKey]: ["static/route.js"] },
        },
        buildDir: fixtureBuild,
        route,
      }),
    /\/reading references homepage runtime marker CustomCursor.*server\/chunks\/runtime-mutation\.js/,
  );
});

test("concrete prerender acceptance fails on missing entries and artifacts", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "portfolio-prerender-"),
  );
  t.after(() => fs.rmSync(fixtureRoot, { force: true, recursive: true }));
  const fixtureBuild = path.join(fixtureRoot, ".next");
  const waldoRoute = "/work/waldo";
  const articleRoute = "/writing/agent-done-outcome-truth";
  const manifest = {
    routes: {
      [waldoRoute]: {
        dataRoute: "/work/waldo.rsc",
        srcRoute: "/work/[slug]",
      },
      [articleRoute]: {
        dataRoute: "/writing/agent-done-outcome-truth.rsc",
        srcRoute: "/writing/[slug]",
      },
    },
  };
  for (const relativePath of [
    "server/app/work/waldo.html",
    "server/app/work/waldo.rsc",
    "server/app/writing/agent-done-outcome-truth.html",
    "server/app/writing/agent-done-outcome-truth.rsc",
  ]) {
    const fullPath = path.join(fixtureBuild, relativePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, "fixture");
  }

  assert.doesNotThrow(() =>
    assertConcretePrerender({
      buildDir: fixtureBuild,
      manifest,
      route: waldoRoute,
      srcRoute: "/work/[slug]",
    }),
  );
  assert.doesNotThrow(() =>
    assertConcretePrerender({
      buildDir: fixtureBuild,
      manifest,
      route: articleRoute,
      srcRoute: "/writing/[slug]",
    }),
  );

  fs.rmSync(path.join(fixtureBuild, "server/app/work/waldo.rsc"));
  assert.throws(
    () =>
      assertConcretePrerender({
        buildDir: fixtureBuild,
        manifest,
        route: waldoRoute,
        srcRoute: "/work/[slug]",
      }),
    /\/work\/waldo.*missing concrete RSC artifact/,
  );
  fs.writeFileSync(
    path.join(fixtureBuild, "server/app/work/waldo.rsc"),
    "fixture",
  );
  fs.rmSync(path.join(fixtureBuild, "server/app/work/waldo.html"));
  assert.throws(
    () =>
      assertConcretePrerender({
        buildDir: fixtureBuild,
        manifest,
        route: waldoRoute,
        srcRoute: "/work/[slug]",
      }),
    /\/work\/waldo.*missing concrete HTML artifact/,
  );

  delete manifest.routes[articleRoute];
  assert.throws(
    () =>
      assertConcretePrerender({
        buildDir: fixtureBuild,
        manifest,
        route: articleRoute,
        srcRoute: "/writing/[slug]",
      }),
    /missing concrete prerender entry.*agent-done-outcome-truth/,
  );
});
