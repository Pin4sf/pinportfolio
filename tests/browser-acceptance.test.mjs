import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("editorial texture stays behind a dark reading veil", () => {
  const source = read(
    "src/app/components/editorial/EditorialHeader.module.scss",
  );

  assert.match(source, /background-color:\s*#[0-9a-f]{6}/i);
  assert.match(
    source,
    /linear-gradient\([\s\S]*?rgba\([^)]*,\s*0\.9\d*\)[\s\S]*?\),\s*url\("\/noisetexture\.jpg"\)/,
  );
});

test("active mobile navigation and editorial actions own 44px targets", () => {
  const expectations = [
    ["src/app/components/layout/Header.module.scss", /\.logo\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/layout/Header.module.scss", /\.menuBtn\s*\{[\s\S]*?width:\s*44px;[\s\S]*?height:\s*44px/],
    ["src/app/components/sections/Now.module.scss", /\.links\s*\{[\s\S]*?a\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/sections/CuriosityThread.module.scss", /\.cta\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/sections/Writing.module.scss", /\.allLink\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/sections/ReadingPreview.module.scss", /\.allLink\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/sections/SelectedChapters.module.scss", /\.allLink\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/sections/PersonalPreview.module.scss", /\.allLink\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/sections/Contact.module.scss", /\.email\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/sections/Contact.module.scss", /\.socials\s*\{[\s\S]*?a\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/editorial/EditorialFooter.module.scss", /\.reading,[\s\S]*?\.contact a\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/components/editorial/EditorialFooter.module.scss", /\.socials a\s*\{[\s\S]*?min-height:\s*44px/],
    ["src/app/reading/ReadingPage.module.scss", /\.entry a\s*\{[\s\S]*?min-height:\s*44px/],
  ];

  for (const [file, pattern] of expectations) {
    assert.match(read(file), pattern, file);
  }
});
