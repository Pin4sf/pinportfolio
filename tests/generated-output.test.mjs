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
  return source.match(/\/Users\/[^"'`\s<>{}\[\](),;]*/g) ?? [];
}

function isSamePathOrDescendant(candidate, allowedRoot) {
  const relativePath = path.relative(allowedRoot, candidate);
  return (
    relativePath === "" ||
    (relativePath !== ".." &&
      !relativePath.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relativePath))
  );
}

function frameworkBuildRootException({
  canonicalAbsolutePath,
  buildDir,
  canonicalRepositoryRoot,
  file,
  publicFileSet,
}) {
  const relativeBuildPath = path
    .relative(buildDir, file)
    .split(path.sep)
    .join("/");
  const repositorySourceRoot = path.resolve(
    canonicalRepositoryRoot,
    "src",
    "app",
  );
  const nextRuntimeRoot = path.resolve(
    canonicalRepositoryRoot,
    "node_modules",
    "next",
  );

  // Public machine context, rendered payloads, and browser-delivered assets
  // have no build-root exception. The cases below are server/build metadata
  // classes observed in a fresh Next production build.
  if (
    publicFileSet.has(path.resolve(file)) ||
    relativeBuildPath.startsWith("static/") ||
    /\.(?:body|html|meta|rsc)$/.test(relativeBuildPath)
  ) {
    return null;
  }
  if (
    relativeBuildPath === "required-server-files.json" &&
    canonicalAbsolutePath === canonicalRepositoryRoot
  ) {
    return "required server configuration root";
  }
  if (
    /^server\/next-font-manifest\.(?:js|json)$/.test(relativeBuildPath) &&
    isSamePathOrDescendant(canonicalAbsolutePath, repositorySourceRoot)
  ) {
    return "Next font source metadata";
  }
  if (
    /^server\/app\/.+_client-reference-manifest\.js$/.test(relativeBuildPath) &&
    (isSamePathOrDescendant(canonicalAbsolutePath, repositorySourceRoot) ||
      isSamePathOrDescendant(canonicalAbsolutePath, nextRuntimeRoot))
  ) {
    return "RSC client-reference metadata";
  }
  if (
    /^server\/app\/.+\.js$/.test(relativeBuildPath) &&
    isSamePathOrDescendant(canonicalAbsolutePath, repositorySourceRoot)
  ) {
    return "compiled app source metadata";
  }
  if (
    /^server\/chunks\/[^/]+\.js$/.test(relativeBuildPath) &&
    isSamePathOrDescendant(canonicalAbsolutePath, nextRuntimeRoot)
  ) {
    return "Next server-chunk source metadata";
  }
  if (
    /^types\/app\/.+\.ts$/.test(relativeBuildPath) &&
    isSamePathOrDescendant(canonicalAbsolutePath, repositorySourceRoot)
  ) {
    return "generated route-type source metadata";
  }
  return null;
}

function scanPublicArtifacts({ buildDir, publicFiles, repositoryRoot }) {
  const artifacts = discoverDeployableArtifacts(buildDir, publicFiles);
  const canonicalRepositoryRoot = path.normalize(path.resolve(repositoryRoot));
  const publicFileSet = new Set(
    publicFiles.map((file) => path.normalize(path.resolve(file))),
  );
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
      // This acceptance target is POSIX/macOS, where `\` is not a path
      // separator. Reject it before canonicalization or exception matching so
      // an ambiguous cross-platform candidate can never inherit an allowlist.
      if (absolutePath.includes("\\")) {
        throw new Error(
          `cross-separator absolute source path leaked into ${path.relative(repositoryRoot, file)}: ${absolutePath}`,
        );
      }
      const canonicalAbsolutePath = path.normalize(path.resolve(absolutePath));
      const classification = frameworkBuildRootException({
        canonicalAbsolutePath,
        buildDir,
        canonicalRepositoryRoot,
        file,
        publicFileSet,
      });
      if (classification) {
        acceptedBuildRootOccurrences.push({
          classification,
          file,
          value: canonicalAbsolutePath,
        });
      } else {
        throw new Error(
          `private absolute source path leaked into ${path.relative(repositoryRoot, file)}: ${absolutePath} (canonical: ${canonicalAbsolutePath})`,
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
    const summaryKey = `${occurrence.classification}\t${relativePath}`;
    const summary = acceptedByFile.get(summaryKey) ?? {
      count: 0,
    };
    summary.count += 1;
    acceptedByFile.set(summaryKey, summary);
  }
  assert.ok(
    acceptedBuildRootOccurrences.length > 0,
    "expected framework-generated build-root metadata was not reported",
  );
  console.log("accepted framework build-root metadata exceptions:");
  for (const [summaryKey, summary] of [...acceptedByFile].sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const [classification, file] = summaryKey.split("\t");
    console.log(`[${classification}] ${file}: ${summary.count} occurrence(s)`);
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
      classification: "required server configuration root",
      file: path.join(fixtureBuild, "required-server-files.json"),
      value: acceptedRoot,
    },
  ]);
});

test("build-root exceptions stay out of public and rendered artifacts", (t) => {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "portfolio-path-classes-"),
  );
  t.after(() => fs.rmSync(fixtureRoot, { force: true, recursive: true }));
  const fixtureBuild = path.join(fixtureRoot, ".next");
  const fixturePublic = path.join(fixtureRoot, "public");
  const acceptedRoot = [
    "",
    "Users",
    "builder",
    ".codex",
    "worktrees",
    "fixture",
    "pinportfolio",
  ].join("/");
  const llmsPath = path.join(fixturePublic, "llms.txt");
  const htmlPath = path.join(fixtureBuild, "server", "app", "page.html");
  const rscPath = path.join(fixtureBuild, "server", "app", "page.rsc");
  const appSourcePath = path.join(fixtureBuild, "server", "app", "page.js");
  const clientReferencePath = path.join(
    fixtureBuild,
    "server",
    "app",
    "page_client-reference-manifest.js",
  );
  const fontManifestPath = path.join(
    fixtureBuild,
    "server",
    "next-font-manifest.json",
  );
  const serverChunkPath = path.join(
    fixtureBuild,
    "server",
    "chunks",
    "runtime.js",
  );
  const staticPath = path.join(fixtureBuild, "static", "chunks", "page.js");
  const routeTypePath = path.join(fixtureBuild, "types", "app", "page.ts");
  const requiredServerFilesPath = path.join(
    fixtureBuild,
    "required-server-files.json",
  );

  for (const directory of [
    fixturePublic,
    path.dirname(htmlPath),
    path.dirname(serverChunkPath),
    path.dirname(staticPath),
    path.dirname(routeTypePath),
  ]) {
    fs.mkdirSync(directory, { recursive: true });
  }
  fs.writeFileSync(path.join(fixtureBuild, "BUILD_ID"), "fixture");
  fs.writeFileSync(
    requiredServerFilesPath,
    JSON.stringify({ appDir: acceptedRoot, files: [] }),
  );
  fs.writeFileSync(llmsPath, "public machine context");
  fs.writeFileSync(htmlPath, "<main>public page</main>");
  fs.writeFileSync(rscPath, "public RSC payload");
  fs.writeFileSync(
    appSourcePath,
    `//# sourceURL=${acceptedRoot}/src/app/page.tsx`,
  );
  fs.writeFileSync(
    clientReferencePath,
    JSON.stringify({ source: `${acceptedRoot}/src/app/components/Nav.tsx` }),
  );
  fs.writeFileSync(
    fontManifestPath,
    JSON.stringify({ [`${acceptedRoot}/src/app/layout`]: [] }),
  );
  fs.writeFileSync(
    serverChunkPath,
    `//# sourceURL=${acceptedRoot}/node_modules/next/dist/client/link.js`,
  );
  fs.writeFileSync(staticPath, "self.page = true;");
  fs.writeFileSync(
    routeTypePath,
    `// generated from ${acceptedRoot}/src/app/page.tsx`,
  );

  const scan = () =>
    scanPublicArtifacts({
      buildDir: fixtureBuild,
      publicFiles: [llmsPath],
      repositoryRoot: acceptedRoot,
    });
  const acceptedClassifications = new Set(
    scan().acceptedBuildRootOccurrences.map(
      (occurrence) => occurrence.classification,
    ),
  );
  assert.deepEqual(
    acceptedClassifications,
    new Set([
      "required server configuration root",
      "Next font source metadata",
      "RSC client-reference metadata",
      "compiled app source metadata",
      "Next server-chunk source metadata",
      "generated route-type source metadata",
    ]),
  );

  for (const mutation of [
    {
      file: llmsPath,
      source: `repositoryRoot=${acceptedRoot}/notes`,
      expected: /absolute source path.*public\/llms\.txt/,
    },
    {
      file: htmlPath,
      source: `<meta name="repositoryRoot" content="${acceptedRoot}/notes">`,
      expected: /absolute source path.*server\/app\/page\.html/,
    },
    {
      file: rscPath,
      source: encodeURIComponent(`${acceptedRoot}/notes`),
      expected: /absolute source path.*server\/app\/page\.rsc/,
    },
    {
      file: staticPath,
      source: `self.repositoryRoot = ${JSON.stringify(`${acceptedRoot}/notes`)};`,
      expected: /absolute source path.*static\/chunks\/page\.js/,
    },
    {
      file: fontManifestPath,
      source: JSON.stringify({ source: `${acceptedRoot}/notes` }),
      expected: /absolute source path.*server\/next-font-manifest\.json/,
    },
    {
      file: appSourcePath,
      source: `//# sourceURL=${acceptedRoot}/notes`,
      expected: /absolute source path.*server\/app\/page\.js/,
    },
    {
      file: serverChunkPath,
      source: `//# sourceURL=${acceptedRoot}/notes`,
      expected: /absolute source path.*server\/chunks\/runtime\.js/,
    },
    {
      file: appSourcePath,
      source: `//# sourceURL=${acceptedRoot}/src/app/../../notes/private.js`,
      expected: /absolute source path.*server\/app\/page\.js/,
    },
    {
      file: appSourcePath,
      source: encodeURIComponent(
        `${acceptedRoot}/src/app/../../notes/private.js`,
      ),
      expected: /absolute source path.*server\/app\/page\.js/,
    },
    {
      file: serverChunkPath,
      source: `//# sourceURL=${acceptedRoot}/node_modules/next/../../notes/private.js`,
      expected: /absolute source path.*server\/chunks\/runtime\.js/,
    },
    {
      file: clientReferencePath,
      source: encodeURIComponent(
        `${acceptedRoot}/node_modules/next/../../notes/private.js`,
      ),
      expected: /absolute source path.*page_client-reference-manifest\.js/,
    },
    {
      file: appSourcePath,
      source: `//# sourceURL=${acceptedRoot}/src/application/private.js`,
      expected: /absolute source path.*server\/app\/page\.js/,
    },
    {
      file: appSourcePath,
      source: `//# sourceURL=${acceptedRoot}/src/app\\..\\..\\notes\\private.js`,
      expected: /absolute source path.*server\/app\/page\.js/,
    },
    {
      file: clientReferencePath,
      source: encodeURIComponent(
        `${acceptedRoot}/node_modules/next\\..\\..\\notes\\private.js`,
      ),
      expected: /absolute source path.*page_client-reference-manifest\.js/,
    },
  ]) {
    const original = fs.readFileSync(mutation.file, "utf8");
    fs.writeFileSync(mutation.file, mutation.source);
    assert.throws(scan, mutation.expected);
    fs.writeFileSync(mutation.file, original);
  }

  const crossSeparatorCases = [
    {
      label: "benign child candidate",
      file: appSourcePath,
      candidate: `${acceptedRoot}/src/app/components\\Button.tsx`,
    },
    {
      label: "font metadata",
      file: fontManifestPath,
      candidate: `${acceptedRoot}/src/app/fonts/page\\..\\..\\notes\\private.js`,
    },
    {
      label: "client-reference metadata",
      file: clientReferencePath,
      candidate: `${acceptedRoot}/src/app/components/Nav.tsx\\..\\..\\notes\\private.js`,
    },
    {
      label: "compiled app source metadata",
      file: appSourcePath,
      candidate: `${acceptedRoot}/src/app/page.tsx\\..\\..\\notes\\private.js`,
    },
    {
      label: "app-server runtime metadata",
      file: clientReferencePath,
      candidate: `${acceptedRoot}/node_modules/next/dist/client/link.js\\..\\..\\notes\\private.js`,
    },
    {
      label: "server-chunk metadata",
      file: serverChunkPath,
      candidate: `${acceptedRoot}/node_modules/next/dist/client/link.js\\..\\..\\notes\\private.js`,
    },
    {
      label: "route-type metadata",
      file: routeTypePath,
      candidate: `${acceptedRoot}/src/app/page.tsx\\..\\..\\notes\\private.js`,
    },
    {
      label: "required-server configuration",
      file: requiredServerFilesPath,
      candidate: `${acceptedRoot}\\metadata\\..\\..\\notes\\private.js`,
      serialize: (candidate) =>
        JSON.stringify({ appDir: candidate, files: [] }),
    },
  ];
  for (const mutation of crossSeparatorCases) {
    const original = fs.readFileSync(mutation.file, "utf8");
    for (const candidate of [
      mutation.candidate,
      encodeURIComponent(mutation.candidate),
    ]) {
      fs.writeFileSync(
        mutation.file,
        mutation.serialize ? mutation.serialize(candidate) : candidate,
      );
      assert.throws(
        scan,
        /cross-separator absolute source path/,
        `${mutation.label} accepted ${candidate}`,
      );
    }
    fs.writeFileSync(mutation.file, original);
  }
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
