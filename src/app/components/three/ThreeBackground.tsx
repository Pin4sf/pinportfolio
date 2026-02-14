"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Simple 3D Simplex-like noise (hash-based approximation)
function noise(x: number, y: number, z: number): number {
  const p = x * 157 + y * 113 + z * 47;
  const n = Math.sin(p) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number, t: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  // Hermite smoothing
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = noise(ix, iy, t);
  const b = noise(ix + 1, iy, t);
  const c = noise(ix, iy + 1, t);
  const d = noise(ix + 1, iy + 1, t);
  return a + sx * (b - a) + sy * (c - a) + sx * sy * (a - b - c + d);
}

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      10
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load background texture
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(18, 10, 30, 18);
    const material = new THREE.MeshBasicMaterial({
      map: loader.load("/images/background/101.jpg"),
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 5;

    const count = geometry.attributes.position.count;
    const clock = new THREE.Clock();

    // Mouse tracking for cursor influence
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Scroll velocity tracking
    let scrollVelocity = 0;
    const onScroll = () => {
      // Lenis dispatches scroll events; we estimate velocity from rapid calls
      scrollVelocity = Math.min(Math.abs(scrollVelocity) + 0.5, 5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let animationId: number;
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Decay scroll velocity
      scrollVelocity *= 0.95;

      const velocityInfluence = 1 + scrollVelocity * 0.3;

      for (let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);

        // Noise-based organic deformation
        const noiseVal =
          smoothNoise(x * 0.5, y * 0.5, elapsed * 0.3) * 2 - 1;

        // Cursor proximity influence
        const dx = x / 9 - mouseX;
        const dy = y / 5 - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const cursorInfluence = Math.max(0, 1 - dist) * 0.4;

        const z =
          (Math.sin(x * 0.8 + elapsed * 0.4) * 0.3 +
            noiseVal * 0.4 +
            cursorInfluence) *
          velocityInfluence;

        geometry.attributes.position.setZ(i, z);
      }
      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
