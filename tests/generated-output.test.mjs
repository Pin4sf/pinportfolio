import assert from "node:assert/strict";
import fs from "node:fs";
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

test("generated public output excludes private and explicitly excluded material", () => {
  requireProductionBuild();

  const acceptanceSource = fs.readFileSync(new URL(import.meta.url), "utf8");
  for (const signature of forbiddenPublicSignatures) {
    assert.ok(
      !acceptanceSource.includes(signature.value),
      `${signature.label} must stay assembled so the acceptance test cannot seed its own scan`,
    );
  }

  const generatedPublicFiles = [
    ...filesRecursively(path.join(nextDir, "server")),
    ...filesRecursively(path.join(nextDir, "static")),
    path.join(nextDir, "app-build-manifest.json"),
    path.join(nextDir, "app-path-routes-manifest.json"),
    path.join(nextDir, "prerender-manifest.json"),
    path.join(nextDir, "routes-manifest.json"),
    path.join(root, "public", "agents.txt"),
    path.join(root, "public", "llms.txt"),
    path.join(root, "public", "llms-full.txt"),
  ];

  assert.ok(generatedPublicFiles.length > 20, "generated-output scan is empty");
  for (const file of generatedPublicFiles) {
    const source = fs.readFileSync(file, "utf8");
    for (const signature of forbiddenPublicSignatures) {
      assert.ok(
        !source.includes(signature.value),
        `${signature.label} leaked into ${path.relative(root, file)}`,
      );
    }
  }
});

test("editorial route bundles exclude homepage runtime machinery", () => {
  requireProductionBuild();

  const appBuildManifest = JSON.parse(readGenerated("app-build-manifest.json"));
  const homeServerEntry = readGenerated("server/app/page.js");
  assert.match(
    homeServerEntry,
    /Hero\.tsx -> \.\.\/three\/HeroBackground/,
    "homepage runtime marker is missing; bundle-isolation scan lacks its positive control",
  );

  for (const route of editorialRoutes) {
    const assets = appBuildManifest.pages[route.manifestKey];
    assert.ok(
      Array.isArray(assets),
      `${route.label} is absent from app manifest`,
    );
    assert.ok(assets.length > 0, `${route.label} has no generated assets`);

    const inspectedArtifacts = [
      route.serverEntry,
      route.referenceManifest,
      ...assets,
    ];
    const generatedGraph = inspectedArtifacts
      .map((relativePath) => readGenerated(relativePath))
      .join("\n");

    for (const marker of forbiddenRuntimeMarkers) {
      assert.ok(
        !generatedGraph.includes(marker.value),
        `${route.label} references homepage runtime marker ${marker.label}`,
      );
    }
  }
});
