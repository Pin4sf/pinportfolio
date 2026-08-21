import assert from "node:assert/strict";
import test from "node:test";
import { shouldEnableHeroEffects } from "../src/lib/heroEffects.ts";

const capable = {
  reducedMotion: false,
  reducedData: false,
  isMobile: false,
  gpuTier: "high",
};

test("hero effects require a capable desktop with motion and data permission", () => {
  assert.equal(shouldEnableHeroEffects(capable), true);
  for (const override of [
    { reducedMotion: true },
    { reducedData: true },
    { isMobile: true },
    { gpuTier: "pending" },
    { gpuTier: "low" },
  ])
    assert.equal(shouldEnableHeroEffects({ ...capable, ...override }), false);
});
