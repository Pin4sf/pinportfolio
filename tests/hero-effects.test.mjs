import assert from "node:assert/strict";
import test from "node:test";
import { shouldEnableHeroEffects } from "../src/lib/heroEffects.ts";

test("hero effects require a resolved capable desktop without reduced motion", () => {
  const cases = [
    [{ reducedMotion: false, isMobile: false, gpuTier: "pending" }, false],
    [{ reducedMotion: false, isMobile: false, gpuTier: "low" }, false],
    [{ reducedMotion: false, isMobile: false, gpuTier: "mid" }, true],
    [{ reducedMotion: false, isMobile: false, gpuTier: "high" }, true],
    [{ reducedMotion: false, isMobile: true, gpuTier: "high" }, false],
    [{ reducedMotion: true, isMobile: false, gpuTier: "high" }, false],
  ];

  for (const [input, expected] of cases) {
    assert.equal(
      shouldEnableHeroEffects(input),
      expected,
      JSON.stringify(input),
    );
  }
});
