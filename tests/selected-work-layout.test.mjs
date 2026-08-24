import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import * as sass from "sass";

const root = process.cwd();

function pngDimensions(buffer) {
  assert.equal(buffer.subarray(1, 4).toString(), "PNG");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

test("the featured Waldo artwork is the supplied public 16:9 frame", async () => {
  const { getVentures } = await import("../src/data/portfolio.ts");
  const waldo = getVentures().find((venture) => venture.slug === "waldo");

  assert.ok(waldo, "Waldo should remain the featured venture");
  assert.equal(waldo.homepageImage, "/images/projects/waldo/frame.png");

  const imagePath = path.join(root, "public", waldo.homepageImage);
  assert.ok(
    fs.existsSync(imagePath),
    "the Waldo frame is missing from public assets",
  );
  assert.deepEqual(pngDimensions(fs.readFileSync(imagePath)), {
    width: 1920,
    height: 1080,
  });
});

test("the Waldo feature uses a desktop image-and-copy split that stacks on small screens", () => {
  const css = sass.compile(
    path.join(root, "src/app/components/sections/SelectedWork.module.scss"),
  ).css;

  assert.match(
    css,
    /\.card\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(18rem,\s*0\.72fr\);/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*820px\)[\s\S]*?\.card\s*\{[^}]*grid-template-columns:\s*1fr;/,
  );
});

test("the first featured artwork is prioritized when it becomes the page LCP", () => {
  const component = fs.readFileSync(
    path.join(root, "src/app/components/sections/SelectedWork.tsx"),
    "utf8",
  );

  assert.match(component, /priority=\{index === 0\}/);
  assert.doesNotMatch(component, /loading="lazy"/);
});
