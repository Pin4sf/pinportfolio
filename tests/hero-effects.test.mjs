import assert from "node:assert/strict";
import test from "node:test";
import { shouldEnableHeroEffects } from "../src/lib/heroEffects.ts";

const capable = {
  reducedMotion: false,
  reducedData: false,
  viewportWidth: 1024,
  interactionCapable: true,
  gpuTier: "high",
};

test("hero effects require a capable desktop with motion and data permission", () => {
  assert.equal(shouldEnableHeroEffects(capable), true);
  assert.equal(shouldEnableHeroEffects({ ...capable, gpuTier: "mid" }), true);
  for (const override of [
    { reducedMotion: true },
    { reducedData: true },
    { viewportWidth: 1023 },
    { interactionCapable: false },
    { gpuTier: "pending" },
    { gpuTier: "low" },
  ])
    assert.equal(shouldEnableHeroEffects({ ...capable, ...override }), false);
});
