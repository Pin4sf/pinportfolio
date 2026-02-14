"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

interface ShadedImageProps {
  containerSelector: string;
  innerSelector: string;
  linkSelector: string;
  images: string[];
}

export default function ShadedImage({
  containerSelector,
  innerSelector,
  linkSelector,
  images,
}: ShadedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on touch/mobile devices — effect is hover-driven
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.innerWidth < 768) return;

    const container = document.querySelector(containerSelector) as HTMLElement;
    const inner = document.querySelector(innerSelector) as HTMLElement;
    const links = Array.from(
      document.querySelectorAll(linkSelector)
    ) as HTMLElement[];

    if (!container || !inner || links.length === 0) return;

    const loader = new THREE.TextureLoader();
    const textures = images.map((img) => loader.load(img));

    const perspective = 1000;
    const scene = new THREE.Scene();

    // Setup camera
    const width = window.innerWidth;
    const height = window.innerHeight;
    const fov =
      (180 * (2 * Math.atan(height / 2 / perspective))) / Math.PI;
    const camera = new THREE.PerspectiveCamera(
      fov,
      width / height,
      0.1,
      1000
    );
    camera.position.set(0, 0, perspective);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "3";
    container.appendChild(renderer.domElement);
    canvasRef.current = renderer.domElement;

    // Uniforms
    const uniforms = {
      uTexture: { value: textures[1] || textures[0] },
      uAlpha: { value: 0.0 },
      uOffset: { value: new THREE.Vector2(0.0, 0.0) },
    };

    // Create mesh
    const geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(370, 470, 1);
    scene.add(mesh);

    // Mouse tracking state
    let targetX = 0;
    let targetY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let hovered = false;

    // Link hover handlers — swap texture per h1
    const linkEnterHandlers: (() => void)[] = [];
    links.forEach((link, i) => {
      const handler = () => {
        if (textures[i]) {
          uniforms.uTexture.value = textures[i];
        }
      };
      linkEnterHandlers.push(handler);
      link.addEventListener("mouseenter", handler);
    });

    // Container (intro area) hover — show/hide the plane
    const onInnerEnter = () => {
      hovered = true;
    };
    const onInnerLeave = () => {
      hovered = false;
    };
    inner.addEventListener("mouseenter", onInnerEnter);
    inner.addEventListener("mouseleave", onInnerLeave);

    // Mouse move
    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.fov =
        (180 * (2 * Math.atan(h / 2 / perspective))) / Math.PI;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Render loop
    let animationId: number;
    const render = () => {
      offsetX = lerp(offsetX, targetX, 0.1);
      offsetY = lerp(offsetY, targetY, 0.1);

      uniforms.uOffset.value.set(
        (targetX - offsetX) * 0.003,
        (targetY - offsetY) * 0.003
      );

      mesh.position.set(
        offsetX - window.innerWidth / 2,
        -(offsetY - window.innerHeight / 2),
        0
      );

      uniforms.uAlpha.value = hovered
        ? lerp(uniforms.uAlpha.value, 1.0, 0.1)
        : lerp(uniforms.uAlpha.value, 0.0, 0.1);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      inner.removeEventListener("mouseenter", onInnerEnter);
      inner.removeEventListener("mouseleave", onInnerLeave);
      links.forEach((link, i) => {
        link.removeEventListener("mouseenter", linkEnterHandlers[i]);
      });
      geometry.dispose();
      material.dispose();
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      canvasRef.current = null;
    };
  }, [containerSelector, innerSelector, linkSelector, images]);

  return null;
}
