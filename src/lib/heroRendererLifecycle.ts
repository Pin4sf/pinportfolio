import type { GpuTier } from "./GpuTierContext";

type Cleanup = () => void;

interface HeroRendererCanvas {
  style: { pointerEvents: string };
  tabIndex: number;
  setAttribute(name: string, value: string): void;
  addEventListener(type: string, listener: (event: Event) => void): void;
  removeEventListener(type: string, listener: (event: Event) => void): void;
}

interface HeroRenderer<TScene, TCamera> {
  setClearColor(color: number, alpha: number): void;
  setPixelRatio(value: number): void;
  setSize(width: number, height: number, updateStyle: boolean): void;
  render(scene: TScene, camera: TCamera): void;
  dispose(): void;
}

interface Disposable {
  dispose(): void;
}

interface HeroRendererResources<
  TScene,
  TCamera,
  TCanvas extends HeroRendererCanvas,
> {
  canvas: TCanvas;
  renderer: HeroRenderer<TScene, TCamera>;
  scene: TScene;
  camera: TCamera;
  geometry: Disposable;
  material: Disposable;
  uniforms: {
    uTime: { value: number };
    uResolution: { value: { set(width: number, height: number): void } };
  };
}

interface HeroRendererHost<TCanvas extends HeroRendererCanvas> {
  target: object;
  getSize(): { width: number; height: number };
  appendCanvas(canvas: TCanvas): void;
  containsCanvas(canvas: TCanvas): boolean;
  removeCanvas(canvas: TCanvas): void;
}

export interface HeroRendererEnvironment {
  getDevicePixelRatio(): number;
  isDocumentHidden(): boolean;
  requestFrame(callback: FrameRequestCallback): number;
  cancelFrame(id: number): void;
  observeIntersection(
    target: object,
    listener: (isIntersecting: boolean) => void,
  ): Cleanup;
  addDocumentVisibilityListener(listener: () => void): Cleanup;
  addResizeListener(listener: () => void): Cleanup;
}

interface MountHeroRendererOptions<
  TScene,
  TCamera,
  TCanvas extends HeroRendererCanvas,
> {
  gpuTier: GpuTier;
  host: HeroRendererHost<TCanvas>;
  environment: HeroRendererEnvironment;
  createResources(): HeroRendererResources<TScene, TCamera, TCanvas>;
  onFailure?: () => void;
}

const noCleanup = () => {};

export function createBrowserHeroRendererEnvironment(): HeroRendererEnvironment {
  return {
    getDevicePixelRatio: () => window.devicePixelRatio || 1,
    isDocumentHidden: () => document.hidden,
    requestFrame: (callback) => requestAnimationFrame(callback),
    cancelFrame: (id) => cancelAnimationFrame(id),
    observeIntersection: (target, listener) => {
      const observer = new IntersectionObserver(
        ([entry]) => listener(entry.isIntersecting),
        { threshold: 0.01 },
      );
      observer.observe(target as Element);
      return () => observer.disconnect();
    },
    addDocumentVisibilityListener: (listener) => {
      document.addEventListener("visibilitychange", listener);
      return () => document.removeEventListener("visibilitychange", listener);
    },
    addResizeListener: (listener) => {
      window.addEventListener("resize", listener, { passive: true });
      return () => window.removeEventListener("resize", listener);
    },
  };
}

export function mountHeroRenderer<
  TScene,
  TCamera,
  TCanvas extends HeroRendererCanvas,
>({
  gpuTier,
  host,
  environment,
  createResources,
  onFailure,
}: MountHeroRendererOptions<TScene, TCamera, TCanvas>): Cleanup {
  let resources: HeroRendererResources<TScene, TCamera, TCanvas>;
  try {
    resources = createResources();
  } catch {
    onFailure?.();
    return noCleanup;
  }

  const { canvas, renderer, scene, camera, geometry, material, uniforms } =
    resources;
  let animationFrame: number | null = null;
  let appended = false;
  let disposed = false;
  let failureReported = false;
  let isIntersecting = true;
  let lastRenderTime = 0;
  let stopObserving = noCleanup;
  let removeVisibilityListener = noCleanup;
  let removeResizeListener = noCleanup;

  const stopLoop = () => {
    if (animationFrame === null) return;
    environment.cancelFrame(animationFrame);
    animationFrame = null;
  };

  const reportFailure = () => {
    if (failureReported || disposed) return;
    failureReported = true;
    stopLoop();
    onFailure?.();
  };

  const resize = () => {
    const size = host.getSize();
    const width = Math.max(1, size.width);
    const height = Math.max(1, size.height);

    try {
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    } catch {
      reportFailure();
    }
  };

  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    stopLoop();
    stopObserving();
    removeVisibilityListener();
    removeResizeListener();
    canvas.removeEventListener("webglcontextlost", handleContextLost);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    if (appended && host.containsCanvas(canvas)) host.removeCanvas(canvas);
  };

  const scheduleFrame = () => {
    if (
      disposed ||
      failureReported ||
      animationFrame !== null ||
      environment.isDocumentHidden() ||
      !isIntersecting
    )
      return;

    animationFrame = environment.requestFrame(renderFrame);
  };

  const frameInterval = 1000 / 30;
  const renderFrame = (time: number) => {
    animationFrame = null;
    if (
      disposed ||
      failureReported ||
      environment.isDocumentHidden() ||
      !isIntersecting
    )
      return;

    if (lastRenderTime === 0 || time - lastRenderTime >= frameInterval) {
      uniforms.uTime.value = time * 0.001;
      try {
        renderer.render(scene, camera);
      } catch {
        reportFailure();
        return;
      }
      lastRenderTime = time;
    }

    scheduleFrame();
  };

  const handleVisibilityChange = () => {
    if (environment.isDocumentHidden()) stopLoop();
    else {
      lastRenderTime = 0;
      scheduleFrame();
    }
  };

  function handleContextLost(event: Event) {
    event.preventDefault();
    reportFailure();
  }

  try {
    canvas.setAttribute("aria-hidden", "true");
    canvas.setAttribute("role", "presentation");
    canvas.tabIndex = -1;
    canvas.style.pointerEvents = "none";

    const maxDpr = gpuTier === "high" ? 1.25 : 1;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      Math.min(environment.getDevicePixelRatio() || 1, maxDpr),
    );
    resize();
    if (failureReported) {
      cleanup();
      return noCleanup;
    }

    host.appendCanvas(canvas);
    appended = true;
    stopObserving = environment.observeIntersection(
      host.target,
      (nextIsIntersecting) => {
        isIntersecting = nextIsIntersecting;
        if (isIntersecting) {
          lastRenderTime = 0;
          scheduleFrame();
        } else {
          stopLoop();
        }
      },
    );
    removeVisibilityListener = environment.addDocumentVisibilityListener(
      handleVisibilityChange,
    );
    removeResizeListener = environment.addResizeListener(resize);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    scheduleFrame();
  } catch {
    reportFailure();
    cleanup();
    return noCleanup;
  }

  return cleanup;
}
