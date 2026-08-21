import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const lifecycleModule =
  await import("../src/lib/heroRendererLifecycle.ts").catch(() => ({}));

function getMountHeroRenderer() {
  assert.equal(
    typeof lifecycleModule.mountHeroRenderer,
    "function",
    "missing the testable hero renderer lifecycle seam",
  );
  return lifecycleModule.mountHeroRenderer;
}

function createHarness({
  gpuTier = "high",
  devicePixelRatio = 3,
  createResourcesThrows = false,
  renderThrows = false,
} = {}) {
  let hidden = false;
  let nextFrameId = 1;
  let visibilityListener;
  let intersectionListener;
  let resizeListener;
  const frames = new Map();
  const canvasListeners = new Map();
  const calls = {
    appended: 0,
    canvasAttributes: [],
    cancelledFrames: [],
    clearColors: [],
    contextPrevented: 0,
    disconnects: 0,
    geometryDisposals: 0,
    materialDisposals: 0,
    observedTargets: [],
    failures: 0,
    pixelRatios: [],
    removed: 0,
    removedCanvasListeners: [],
    removedResizeListeners: 0,
    removedVisibilityListeners: 0,
    renderTimes: [],
    rendererDisposals: 0,
    sizes: [],
    uniformSizes: [],
  };

  const canvas = {
    style: { pointerEvents: "" },
    tabIndex: 0,
    setAttribute(name, value) {
      calls.canvasAttributes.push([name, value]);
    },
    addEventListener(type, listener) {
      canvasListeners.set(type, listener);
    },
    removeEventListener(type, listener) {
      if (canvasListeners.get(type) === listener) canvasListeners.delete(type);
      calls.removedCanvasListeners.push(type);
    },
  };
  const uniformTime = { value: 0 };
  const target = { id: "hero" };
  const host = {
    target,
    getSize: () => ({ width: 640, height: 360 }),
    appendCanvas(received) {
      assert.equal(received, canvas);
      calls.appended += 1;
    },
    containsCanvas: () => calls.appended > calls.removed,
    removeCanvas(received) {
      assert.equal(received, canvas);
      calls.removed += 1;
    },
  };
  const renderer = {
    setClearColor(color, alpha) {
      calls.clearColors.push([color, alpha]);
    },
    setPixelRatio(value) {
      calls.pixelRatios.push(value);
    },
    setSize(width, height, updateStyle) {
      calls.sizes.push([width, height, updateStyle]);
    },
    render() {
      if (renderThrows) throw new Error("render failed");
      calls.renderTimes.push(uniformTime.value);
    },
    dispose() {
      calls.rendererDisposals += 1;
    },
  };
  const environment = {
    getDevicePixelRatio: () => devicePixelRatio,
    isDocumentHidden: () => hidden,
    requestFrame(callback) {
      const id = nextFrameId;
      nextFrameId += 1;
      frames.set(id, callback);
      return id;
    },
    cancelFrame(id) {
      frames.delete(id);
      calls.cancelledFrames.push(id);
    },
    observeIntersection(receivedTarget, listener) {
      calls.observedTargets.push(receivedTarget);
      intersectionListener = listener;
      return () => {
        calls.disconnects += 1;
      };
    },
    addDocumentVisibilityListener(listener) {
      visibilityListener = listener;
      return () => {
        calls.removedVisibilityListeners += 1;
      };
    },
    addResizeListener(listener) {
      resizeListener = listener;
      return () => {
        calls.removedResizeListeners += 1;
      };
    },
  };

  const cleanup = getMountHeroRenderer()({
    gpuTier,
    host,
    environment,
    createResources() {
      if (createResourcesThrows) throw new Error("creation failed");
      return {
        canvas,
        renderer,
        scene: {},
        camera: {},
        geometry: {
          dispose() {
            calls.geometryDisposals += 1;
          },
        },
        material: {
          dispose() {
            calls.materialDisposals += 1;
          },
        },
        uniforms: {
          uTime: uniformTime,
          uResolution: {
            value: {
              set(width, height) {
                calls.uniformSizes.push([width, height]);
              },
            },
          },
        },
      };
    },
    onFailure() {
      calls.failures += 1;
    },
  });

  return {
    calls,
    canvas,
    cleanup,
    pendingFrames: () => frames.size,
    runNextFrame(time) {
      const next = frames.entries().next().value;
      assert.ok(next, "no animation frame is pending");
      const [id, callback] = next;
      frames.delete(id);
      callback(time);
    },
    setDocumentHidden(value) {
      hidden = value;
      assert.ok(visibilityListener, "visibility listener was not installed");
      visibilityListener();
    },
    setIntersecting(value) {
      assert.ok(
        intersectionListener,
        "intersection observer was not installed",
      );
      intersectionListener(value);
    },
    triggerContextLoss() {
      const listener = canvasListeners.get("webglcontextlost");
      assert.ok(listener, "context-loss listener was not installed");
      listener({
        preventDefault() {
          calls.contextPrevented += 1;
        },
      });
    },
    triggerResize() {
      assert.ok(resizeListener, "resize listener was not installed");
      resizeListener();
    },
  };
}

test("HeroBackground delegates its lifecycle and failure handler to the tested runtime", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "src/app/components/three/HeroBackground.tsx"),
    "utf8",
  );
  assert.match(
    source,
    /return mountHeroRenderer\(\{[\s\S]*?environment: createBrowserHeroRendererEnvironment\(\)[\s\S]*?createResources:[\s\S]*?\n\s+onFailure,\n\s+\}\);/,
  );
});

test("renderer lifecycle caps DPR for mid and high GPU tiers", () => {
  const mid = createHarness({ gpuTier: "mid", devicePixelRatio: 3 });
  const high = createHarness({ gpuTier: "high", devicePixelRatio: 3 });

  assert.deepEqual(mid.calls.pixelRatios, [1]);
  assert.deepEqual(high.calls.pixelRatios, [1.25]);
  mid.cleanup();
  high.cleanup();
});

test("renderer lifecycle limits rendering to 30 FPS", () => {
  const harness = createHarness();

  harness.runNextFrame(1);
  harness.runNextFrame(17);
  harness.runNextFrame(35);

  assert.deepEqual(harness.calls.renderTimes, [0.001, 0.035]);
  harness.cleanup();
});

test("renderer lifecycle pauses while the document is hidden", () => {
  const harness = createHarness();

  assert.equal(harness.pendingFrames(), 1);
  harness.setDocumentHidden(true);
  assert.equal(harness.pendingFrames(), 0);
  harness.setDocumentHidden(false);
  assert.equal(harness.pendingFrames(), 1);
  harness.runNextFrame(10);
  assert.equal(harness.calls.renderTimes.length, 1);
  harness.cleanup();
});

test("renderer lifecycle pauses while the hero is outside the viewport", () => {
  const harness = createHarness();

  harness.setIntersecting(false);
  assert.equal(harness.pendingFrames(), 0);
  harness.setIntersecting(true);
  assert.equal(harness.pendingFrames(), 1);
  harness.runNextFrame(10);
  assert.equal(harness.calls.renderTimes.length, 1);
  harness.cleanup();
});

test("renderer lifecycle reports resource creation failure", () => {
  const harness = createHarness({ createResourcesThrows: true });

  assert.equal(harness.calls.failures, 1);
  assert.equal(harness.pendingFrames(), 0);
  assert.equal(harness.calls.appended, 0);
});

test("renderer lifecycle reports render failure once", () => {
  const harness = createHarness({ renderThrows: true });

  harness.runNextFrame(10);
  assert.equal(harness.calls.failures, 1);
  assert.equal(harness.pendingFrames(), 0);
  harness.cleanup();
});

test("renderer lifecycle reports WebGL context loss once", () => {
  const harness = createHarness();

  harness.triggerContextLoss();
  harness.triggerContextLoss();
  assert.equal(harness.calls.contextPrevented, 2);
  assert.equal(harness.calls.failures, 1);
  assert.equal(harness.pendingFrames(), 0);
  harness.cleanup();
});

test("renderer lifecycle cleanup releases every owned resource", () => {
  const harness = createHarness();

  harness.triggerResize();
  harness.cleanup();
  harness.cleanup();

  assert.deepEqual(harness.calls.sizes, [
    [640, 360, false],
    [640, 360, false],
  ]);
  assert.deepEqual(harness.calls.uniformSizes, [
    [640, 360],
    [640, 360],
  ]);
  assert.equal(harness.calls.disconnects, 1);
  assert.equal(harness.calls.removedVisibilityListeners, 1);
  assert.equal(harness.calls.removedResizeListeners, 1);
  assert.deepEqual(harness.calls.removedCanvasListeners, ["webglcontextlost"]);
  assert.equal(harness.calls.geometryDisposals, 1);
  assert.equal(harness.calls.materialDisposals, 1);
  assert.equal(harness.calls.rendererDisposals, 1);
  assert.equal(harness.calls.removed, 1);
  assert.equal(harness.pendingFrames(), 0);
});
