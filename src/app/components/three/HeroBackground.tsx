"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  varying vec2 vUv;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                             dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 st = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.15;

    // Cursor influence — subtle warp
    vec2 mouse = vec2(uMouse.x * aspect, uMouse.y);
    float cursorDist = length(st - mouse);
    float cursorWarp = smoothstep(0.8, 0.0, cursorDist) * 0.15;

    // Layered noise
    float n1 = fbm(st * 1.5 + vec2(t, t * 0.7) + cursorWarp);
    float n2 = fbm(st * 2.5 + vec2(-t * 0.5, t * 0.3));
    float n3 = fbm(st * 0.8 + vec2(t * 0.2, -t * 0.4));

    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

    // Color palette
    vec3 bgDark = vec3(0.035, 0.039, 0.055);     // #090a0e
    vec3 accent  = vec3(0.424, 1.0, 0.553);       // #6cff8d green
    vec3 warm    = vec3(0.941, 0.753, 0.251);      // #f0c040 gold
    vec3 deep    = vec3(0.15, 0.18, 0.25);         // muted blue-grey

    // Gradient from bottom-left to top-right with noise distortion
    float grad = (uv.x * 0.3 + uv.y * 0.7) + noise * 0.3;

    vec3 col = bgDark;
    col = mix(col, deep, smoothstep(0.1, 0.5, grad) * 0.4);
    col = mix(col, accent * 0.15, smoothstep(0.3, 0.8, noise + cursorWarp * 2.0) * 0.3);
    col = mix(col, warm * 0.08, smoothstep(0.5, 0.9, n2) * 0.2);

    // Subtle vignette
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 1.5);
    col *= mix(0.7, 1.0, vignette);

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface HeroBackgroundProps {
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export default function HeroBackground({ onCanvasReady }: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, preserveDrawingBuffer: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    onCanvasReady?.(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    scene.add(new THREE.Mesh(geometry, material));

    // Mouse tracking
    let targetMouse = { x: 0.5, y: 0.5 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", onResize);

    // Render loop
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();

      // Smooth mouse lerp
      uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.05;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onCanvasReady]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
