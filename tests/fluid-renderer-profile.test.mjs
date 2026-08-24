import assert from "node:assert/strict";
import test from "node:test";

const fluidProfileModule =
  await import("../src/lib/fluidRendererProfile.ts").catch(() => ({}));

test("liquid rendering is responsive on capable desktops without overdriving weaker GPUs", () => {
  assert.equal(typeof fluidProfileModule.getFluidRendererProfile, "function");

  assert.deepEqual(fluidProfileModule.getFluidRendererProfile("high"), {
    framesPerSecond: 60,
    damping: Math.sqrt(0.982),
  });
  assert.deepEqual(fluidProfileModule.getFluidRendererProfile("mid"), {
    framesPerSecond: 45,
    damping: Math.pow(0.976, 30 / 45),
  });
  assert.deepEqual(fluidProfileModule.getFluidRendererProfile("low"), {
    framesPerSecond: 30,
    damping: 0.97,
  });
});
