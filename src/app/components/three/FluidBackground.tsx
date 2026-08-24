"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { useGpuTier } from "@/app/hooks/useGpuTier";
import { getFluidRendererProfile } from "@/lib/fluidRendererProfile";

import baseVert from "@/shaders/fluid/base.vert.glsl";
import dropFrag from "@/shaders/fluid/drop.frag.glsl";
import updateFrag from "@/shaders/fluid/update.frag.glsl";
import renderFrag from "@/shaders/fluid/render.frag.glsl";

interface Props {
  backgroundCanvas?: HTMLCanvasElement | null;
  onFailure?: () => void;
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  attach(id: number): number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap(): void;
}

interface Program {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
  bind(): void;
}

export default function FluidBackground({
  backgroundCanvas,
  onFailure,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const gpuTier = useGpuTier();
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const pointerRef = useRef({ x: 0, y: 0, prevX: -1, prevY: -1, moved: false });
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep bgCanvas ref in sync without re-running the WebGL effect
  useEffect(() => {
    bgCanvasRef.current = backgroundCanvas ?? null;
  }, [backgroundCanvas]);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- WebGL context ---
    const params: WebGLContextAttributes = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    let gl = canvas.getContext(
      "webgl2",
      params,
    ) as WebGL2RenderingContext | null;
    const isWebGL2 = !!gl;
    if (!gl) {
      gl = (canvas.getContext("webgl", params) ||
        canvas.getContext(
          "experimental-webgl",
          params,
        )) as WebGL2RenderingContext | null;
    }
    if (!gl) {
      onFailure?.();
      return;
    }

    let failureReported = false;
    const reportFailure = () => {
      if (failureReported) return;
      failureReported = true;
      canvas.style.visibility = "hidden";
      onFailure?.();
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      reportFailure();
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    let halfFloatExt: { HALF_FLOAT_OES: number } | null = null;
    let supportsFloatTarget = false;
    if (!isWebGL2) {
      halfFloatExt = gl.getExtension("OES_texture_half_float");
      gl.getExtension("OES_texture_half_float_linear");
      supportsFloatTarget = halfFloatExt !== null;
    }
    if (isWebGL2) {
      supportsFloatTarget = gl.getExtension("EXT_color_buffer_float") !== null;
      gl.getExtension("OES_texture_float_linear");
    }

    if (!supportsFloatTarget) {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      reportFailure();
      return;
    }

    const halfFloatType = isWebGL2
      ? (gl as WebGL2RenderingContext).HALF_FLOAT
      : halfFloatExt
        ? halfFloatExt.HALF_FLOAT_OES
        : gl.UNSIGNED_BYTE;

    const internalFormat = isWebGL2
      ? (gl as WebGL2RenderingContext).RGBA16F
      : gl.RGBA;
    const format = gl.RGBA;

    // --- Config (GPU tier-aware) ---
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const tier = isCoarse ? "low" : gpuTier;
    const { framesPerSecond, damping } = getFluidRendererProfile(tier);

    const SIM_RES = tier === "low" ? 128 : tier === "mid" ? 192 : 256;
    const DROP_RADIUS = tier === "low" ? 0.05 : 0.035;
    const DROP_STRENGTH = tier === "low" ? 0.02 : 0.025;
    const DAMPING = damping;
    const PERTURBANCE = tier === "low" ? 0.03 : 0.04;
    const RAIN_INTERVAL = tier === "low" ? 3000 : tier === "mid" ? 2000 : 1400;
    const RAIN_RADIUS = tier === "low" ? 0.04 : 0.035;
    const RAIN_STRENGTH = tier === "low" ? 0.008 : 0.01;
    const TRAIL_MAX_STEPS = tier === "low" ? 1 : tier === "mid" ? 2 : 3;

    const dprCap = tier === "high" ? 1.5 : 1.25;
    const dpr = Math.min(window.devicePixelRatio, dprCap);

    // --- Resize canvas ---
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    };
    resize();

    // --- Compile shader ---
    const compileShader = (
      type: number,
      source: string,
    ): WebGLShader | null => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.warn("Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // --- Create program ---
    const createProgram = (
      vertSrc: string,
      fragSrc: string,
    ): Program | null => {
      const vert = compileShader(gl!.VERTEX_SHADER, vertSrc);
      const frag = compileShader(gl!.FRAGMENT_SHADER, fragSrc);
      if (!vert || !frag) return null;

      const program = gl!.createProgram();
      if (!program) return null;

      gl!.attachShader(program, vert);
      gl!.attachShader(program, frag);
      gl!.linkProgram(program);

      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
        console.warn("Program link error:", gl!.getProgramInfoLog(program));
        return null;
      }

      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const uniformCount = gl!.getProgramParameter(
        program,
        gl!.ACTIVE_UNIFORMS,
      );
      for (let i = 0; i < uniformCount; i++) {
        const info = gl!.getActiveUniform(program, i);
        if (info) {
          uniforms[info.name] = gl!.getUniformLocation(program, info.name);
        }
      }

      return {
        program,
        uniforms,
        bind() {
          gl!.useProgram(program);
        },
      };
    };

    // --- Create FBO ---
    const createFBO = (w: number, h: number): FBO | null => {
      const texture = gl!.createTexture();
      if (!texture) return null;

      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        format,
        halfFloatType,
        null,
      );

      const fbo = gl!.createFramebuffer();
      if (!fbo) return null;

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(
        gl!.FRAMEBUFFER,
        gl!.COLOR_ATTACHMENT0,
        gl!.TEXTURE_2D,
        texture,
        0,
      );
      if (
        gl!.checkFramebufferStatus(gl!.FRAMEBUFFER) !== gl!.FRAMEBUFFER_COMPLETE
      ) {
        gl!.deleteFramebuffer(fbo);
        gl!.deleteTexture(texture);
        return null;
      }
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, texture);
          return id;
        },
      };
    };

    const destroyFBO = (fbo: FBO) => {
      gl!.deleteTexture(fbo.texture);
      gl!.deleteFramebuffer(fbo.fbo);
    };

    // --- Create double FBO (ping-pong) ---
    const createDoubleFBO = (w: number, h: number): DoubleFBO | null => {
      const fbo1 = createFBO(w, h);
      if (!fbo1) return null;
      const fbo2 = createFBO(w, h);
      if (!fbo2) {
        destroyFBO(fbo1);
        return null;
      }

      return {
        width: w,
        height: h,
        texelSizeX: 1.0 / w,
        texelSizeY: 1.0 / h,
        read: fbo1,
        write: fbo2,
        swap() {
          const tmp = this.read;
          this.read = this.write;
          this.write = tmp;
        },
      };
    };

    // --- Fullscreen quad ---
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW,
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW,
    );
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    const blit = (fbo: FBO | null) => {
      if (fbo) {
        gl!.viewport(0, 0, fbo.width, fbo.height);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo.fbo);
      } else {
        gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      }
      gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0);
    };

    // --- Compile programs ---
    const dropProg = createProgram(baseVert, dropFrag);
    const updateProg = createProgram(baseVert, updateFrag);
    const renderProg = createProgram(baseVert, renderFrag);

    if (!dropProg || !updateProg || !renderProg) {
      console.warn("FluidBackground: shader compilation failed");
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      reportFailure();
      return;
    }

    // --- Simulation resolution ---
    const getResolution = (res: number) => {
      const aspectRatio = gl!.drawingBufferWidth / gl!.drawingBufferHeight;
      if (aspectRatio < 1) {
        return {
          width: Math.round(res),
          height: Math.round(res / aspectRatio),
        };
      }
      return { width: Math.round(res * aspectRatio), height: Math.round(res) };
    };

    const simSize = getResolution(SIM_RES);

    // --- Create ripple FBO (single DoubleFBO — R=height, G=velocity) ---
    let ripples = createDoubleFBO(simSize.width, simSize.height);
    if (!ripples) {
      console.warn("FluidBackground: FBO creation failed");
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      reportFailure();
      return;
    }

    // --- Background texture (uploaded from HeroBackground canvas each frame) ---
    const bgTexture = gl.createTexture();
    if (!bgTexture) {
      [dropProg, updateProg, renderProg].forEach((program) =>
        gl!.deleteProgram(program.program),
      );
      destroyFBO(ripples.read);
      destroyFBO(ripples.write);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      reportFailure();
      return;
    }
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, bgTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    let bgTextureReady = false;
    let bgTextureWidth = 0;
    let bgTextureHeight = 0;

    const updateBackgroundTexture = (sourceCanvas: HTMLCanvasElement) => {
      if (sourceCanvas.width === 0 || sourceCanvas.height === 0) return;
      gl!.activeTexture(gl!.TEXTURE2);
      gl!.bindTexture(gl!.TEXTURE_2D, bgTexture);
      if (
        sourceCanvas.width !== bgTextureWidth ||
        sourceCanvas.height !== bgTextureHeight
      ) {
        gl!.texImage2D(
          gl!.TEXTURE_2D,
          0,
          gl!.RGBA,
          gl!.RGBA,
          gl!.UNSIGNED_BYTE,
          sourceCanvas,
        );
        bgTextureWidth = sourceCanvas.width;
        bgTextureHeight = sourceCanvas.height;
      } else {
        gl!.texSubImage2D(
          gl!.TEXTURE_2D,
          0,
          0,
          0,
          gl!.RGBA,
          gl!.UNSIGNED_BYTE,
          sourceCanvas,
        );
      }
      bgTextureReady = true;
    };

    // --- Pointer handler ---
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.moved = true;
    };

    canvas.parentElement?.addEventListener("pointermove", handlePointerMove);

    let lastRainTime = 0;
    let lastFrameTime = 0;
    let lastBackgroundUploadTime = 0;
    const FRAME_INTERVAL_MS = 1000 / framesPerSecond;
    const BACKGROUND_UPLOAD_INTERVAL_MS = 1000 / 30;

    // --- Main loop ---
    const step = (time: number) => {
      if (!visibleRef.current) {
        animRef.current = requestAnimationFrame(step);
        return;
      }

      if (time - lastFrameTime < FRAME_INTERVAL_MS) {
        animRef.current = requestAnimationFrame(step);
        return;
      }
      lastFrameTime = time;

      // The source renderer remains capped at 30 fps. The fluid simulation can run
      // faster for responsive pointer trails without uploading duplicate frames.
      const bgCanvas = bgCanvasRef.current;
      if (
        bgCanvas &&
        (lastBackgroundUploadTime === 0 ||
          time - lastBackgroundUploadTime >= BACKGROUND_UPLOAD_INTERVAL_MS)
      ) {
        updateBackgroundTexture(bgCanvas);
        lastBackgroundUploadTime = time;
      }

      // If background isn't ready yet, skip rendering (HeroBackground visible underneath)
      if (!bgTextureReady) {
        animRef.current = requestAnimationFrame(step);
        return;
      }

      // --- Helper: emit a single drop ---
      const emitDrop = (
        cx: number,
        cy: number,
        radius: number,
        strength: number,
      ) => {
        dropProg.bind();
        gl!.uniform2f(
          dropProg.uniforms.texelSize,
          ripples!.texelSizeX,
          ripples!.texelSizeY,
        );
        gl!.uniform1i(dropProg.uniforms.uTexture, ripples!.read.attach(0));
        gl!.uniform2f(dropProg.uniforms.uCenter, cx, cy);
        gl!.uniform1f(dropProg.uniforms.uRadius, radius);
        gl!.uniform1f(dropProg.uniforms.uStrength, strength);
        blit(ripples!.write);
        ripples!.swap();
      };

      // --- Drop: velocity-aware mouse trail ---
      if (pointerRef.current.moved) {
        pointerRef.current.moved = false;
        const px = pointerRef.current.x;
        const py = pointerRef.current.y;
        const ppx = pointerRef.current.prevX;
        const ppy = pointerRef.current.prevY;

        if (ppx >= 0) {
          // Velocity from previous → current position
          const dx = px - ppx;
          const dy = py - ppy;
          const velocity = Math.sqrt(dx * dx + dy * dy);
          const velFactor = Math.min(velocity * 10, 1.0);

          // Faster cursor → slightly larger, stronger ripples
          const radius = DROP_RADIUS * (0.7 + velFactor * 0.5);
          const strength = DROP_STRENGTH * (0.6 + velFactor * 0.8);

          // Interpolate trail drops between prev and current position
          const steps = Math.max(
            1,
            Math.min(TRAIL_MAX_STEPS, Math.floor(velocity / 0.008)),
          );
          for (let s = 0; s < steps; s++) {
            const t = steps === 1 ? 1 : s / (steps - 1);
            const cx = ppx + (px - ppx) * t;
            const cy = ppy + (py - ppy) * t;
            emitDrop(cx, cy, radius * (0.7 + Math.random() * 0.3), strength);
          }
        } else {
          emitDrop(px, py, DROP_RADIUS, DROP_STRENGTH);
        }

        pointerRef.current.prevX = px;
        pointerRef.current.prevY = py;
      }

      // --- Drop: varied ambient rain with occasional bursts ---
      if (time - lastRainTime > RAIN_INTERVAL) {
        lastRainTime = time;

        // Primary drop
        emitDrop(
          Math.random(),
          Math.random(),
          RAIN_RADIUS * (0.6 + Math.random() * 0.8),
          RAIN_STRENGTH * (0.5 + Math.random()),
        );

        // 15% chance of a burst: 1 extra drop nearby
        if (Math.random() < 0.15) {
          const burstX = Math.random();
          const burstY = Math.random();
          const burstCount = 1;
          for (let b = 0; b < burstCount; b++) {
            emitDrop(
              burstX + (Math.random() - 0.5) * 0.15,
              burstY + (Math.random() - 0.5) * 0.15,
              RAIN_RADIUS * (0.4 + Math.random() * 0.5),
              RAIN_STRENGTH * (0.3 + Math.random() * 0.5),
            );
          }
        }
      }

      // --- Update: wave equation propagation ---
      updateProg.bind();
      gl!.uniform2f(
        updateProg.uniforms.texelSize,
        ripples!.texelSizeX,
        ripples!.texelSizeY,
      );
      gl!.uniform1i(updateProg.uniforms.uTexture, ripples!.read.attach(0));
      gl!.uniform1f(updateProg.uniforms.uDamping, DAMPING);
      blit(ripples!.write);
      ripples!.swap();

      // --- Render: refract background through water surface ---
      renderProg.bind();
      gl!.uniform1i(renderProg.uniforms.uRipples, ripples!.read.attach(0));
      gl!.activeTexture(gl!.TEXTURE2);
      gl!.bindTexture(gl!.TEXTURE_2D, bgTexture);
      gl!.uniform1i(renderProg.uniforms.uBackground, 2);
      gl!.uniform2f(
        renderProg.uniforms.uDelta,
        ripples!.texelSizeX,
        ripples!.texelSizeY,
      );
      gl!.uniform1f(renderProg.uniforms.uPerturbance, PERTURBANCE);
      gl!.uniform1i(renderProg.uniforms.uLowTier, tier === "low" ? 1 : 0);
      blit(null);

      if (gl!.getError() !== gl!.NO_ERROR) {
        reportFailure();
        return;
      }
      canvas.style.visibility = "visible";

      animRef.current = requestAnimationFrame(step);
    };

    // --- Visibility observer ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    animRef.current = requestAnimationFrame(step);

    // --- Resize ---
    const handleResize = () => {
      resize();
      const newSimSize = getResolution(SIM_RES);
      const newRipples = createDoubleFBO(newSimSize.width, newSimSize.height);
      if (!newRipples) {
        reportFailure();
        return;
      }

      const previousRipples = ripples;
      if (!previousRipples) {
        destroyFBO(newRipples.read);
        destroyFBO(newRipples.write);
        reportFailure();
        return;
      }

      destroyFBO(previousRipples.read);
      destroyFBO(previousRipples.write);
      ripples = newRipples;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.parentElement?.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      [dropProg, updateProg, renderProg].forEach((p) =>
        gl!.deleteProgram(p.program),
      );

      if (ripples) {
        destroyFBO(ripples.read);
        destroyFBO(ripples.write);
      }
      if (bgTexture) gl!.deleteTexture(bgTexture);
      gl!.deleteBuffer(quadBuffer);
    };
  }, [reducedMotion, gpuTier, onFailure]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      tabIndex={-1}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        visibility: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
