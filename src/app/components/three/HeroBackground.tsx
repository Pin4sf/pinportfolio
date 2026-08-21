"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGpuTier } from "@/app/hooks/useGpuTier";
import {
  createBrowserHeroRendererEnvironment,
  mountHeroRenderer,
} from "@/lib/heroRendererLifecycle";

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

  varying vec2 vUv;

  vec2 hash22(vec2 point) {
    point = vec2(
      dot(point, vec2(127.1, 311.7)),
      dot(point, vec2(269.5, 183.3))
    );
    return fract(sin(point) * 43758.5453);
  }

  float cellular(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    float nearest = 1.0;

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 seed = hash22(cell + neighbor);
        vec2 drift = 0.5 + 0.32 * sin(uTime * 0.16 + 6.28318 * seed);
        nearest = min(nearest, length(neighbor + drift - local));
      }
    }

    return nearest;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 fieldPosition = vUv - 0.5;
    fieldPosition.x *= aspect;

    float distanceField = cellular(
      fieldPosition * 5.2 + vec2(uTime * 0.035, -uTime * 0.018)
    );
    float contour = 1.0 - smoothstep(
      0.025,
      0.105,
      abs(distanceField - 0.42)
    );

    float wave =
      0.045 * sin(fieldPosition.x * 9.0 + uTime * 0.34) +
      0.022 * sin(fieldPosition.x * 24.0 - uTime * 0.21);
    float liveTrace = 1.0 - smoothstep(
      0.007,
      0.022,
      abs(fieldPosition.y - wave)
    );

    float lift = 1.0 - smoothstep(
      0.05,
      0.92,
      length(fieldPosition - vec2(-0.22, 0.08))
    );

    vec3 blackField = vec3(0.018, 0.021, 0.017);
    vec3 warmCream = vec3(0.945, 0.918, 0.858);
    vec3 liveGreen = vec3(0.424, 1.0, 0.553);

    vec3 color = blackField;
    color = mix(color, warmCream, contour * 0.052 + lift * 0.025);
    color = mix(color, liveGreen, liveTrace * (0.34 + contour * 0.12));

    float edgeFade = 1.0 - smoothstep(0.42, 0.95, length(vUv - 0.5));
    color *= mix(0.72, 1.0, edgeFade);

    gl_FragColor = vec4(color, 0.9);
  }
`;

interface HeroBackgroundProps {
  onFailure?: () => void;
}

export default function HeroBackground({ onFailure }: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gpuTier = useGpuTier();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    return mountHeroRenderer({
      gpuTier,
      host: {
        target: container,
        getSize: () => ({
          width: container.clientWidth,
          height: container.clientHeight,
        }),
        appendCanvas: (canvas: HTMLCanvasElement) => {
          container.appendChild(canvas);
        },
        containsCanvas: (canvas: HTMLCanvasElement) =>
          container.contains(canvas),
        removeCanvas: (canvas: HTMLCanvasElement) => {
          container.removeChild(canvas);
        },
      },
      environment: createBrowserHeroRendererEnvironment(),
      createResources: () => {
        const renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true,
        });
        const scene = new THREE.Scene();
        const camera = new THREE.Camera();
        const geometry = new THREE.PlaneGeometry(2, 2);
        const uniforms = {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
        };
        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
          transparent: true,
          depthWrite: false,
          depthTest: false,
        });
        scene.add(new THREE.Mesh(geometry, material));

        return {
          canvas: renderer.domElement,
          renderer,
          scene,
          camera,
          geometry,
          material,
          uniforms,
        };
      },
      onFailure,
    });
  }, [gpuTier, onFailure]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
