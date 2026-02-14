"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 90;
const CONNECTION_DISTANCE = 2.8;
const MOUSE_RADIUS = 3.5;
const MOUSE_FORCE = 0.25;

export default function NeuralMesh() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Generate node data
    const positions: THREE.Vector3[] = [];
    const basePositions: THREE.Vector3[] = [];
    const spreadX = 5.5;
    const spreadY = 4.5;
    const spreadZ = 3;

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * spreadX * 2,
        (Math.random() - 0.5) * spreadY * 2,
        (Math.random() - 0.5) * spreadZ * 2
      );
      positions.push(pos.clone());
      basePositions.push(pos.clone());
    }

    // Instanced nodes (small dots)
    const nodeGeo = new THREE.SphereGeometry(0.045, 6, 6);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x6cff8d,
      transparent: true,
      opacity: 0.85,
    });
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
    scene.add(nodes);

    // Instanced glow halos (larger, subtle)
    const glowGeo = new THREE.SphereGeometry(0.1, 6, 6);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x6cff8d,
      transparent: true,
      opacity: 0.12,
    });
    const glows = new THREE.InstancedMesh(glowGeo, glowMat, NODE_COUNT);
    scene.add(glows);

    // Connection lines
    const maxLines = NODE_COUNT * 5;
    const linePos = new Float32Array(maxLines * 6);
    const lineCol = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3));
    lineGeo.setDrawRange(0, 0);

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Mouse tracking
    const mouseNDC = new THREE.Vector2(999, 999);
    const mouseWorld = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const intersectPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let mouseInside = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(intersectPlane, mouseWorld);
    };

    const onMouseEnter = () => {
      mouseInside = true;
    };
    const onMouseLeave = () => {
      mouseInside = false;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();
    const accent = new THREE.Color(0x6cff8d);
    const tempVec = new THREE.Vector3();
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Update node positions
      for (let i = 0; i < NODE_COUNT; i++) {
        const base = basePositions[i];
        const pos = positions[i];

        // Organic drift around base position
        pos.x = base.x + Math.sin(t * 0.3 + i * 0.47) * 0.35;
        pos.y = base.y + Math.cos(t * 0.25 + i * 0.31) * 0.25;
        pos.z = base.z + Math.sin(t * 0.2 + i * 0.73) * 0.15;

        // Cursor repulsion
        if (mouseInside) {
          tempVec.set(pos.x - mouseWorld.x, pos.y - mouseWorld.y, 0);
          const dist = tempVec.length();
          if (dist < MOUSE_RADIUS && dist > 0.01) {
            const strength = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            tempVec.normalize().multiplyScalar(strength);
            pos.x += tempVec.x;
            pos.y += tempVec.y;
          }
        }

        dummy.position.copy(pos);
        dummy.updateMatrix();
        nodes.setMatrixAt(i, dummy.matrix);
        glows.setMatrixAt(i, dummy.matrix);
      }

      nodes.instanceMatrix.needsUpdate = true;
      glows.instanceMatrix.needsUpdate = true;

      // Rebuild connections
      let li = 0;
      for (let i = 0; i < NODE_COUNT && li < maxLines; i++) {
        for (let j = i + 1; j < NODE_COUNT && li < maxLines; j++) {
          const d = positions[i].distanceTo(positions[j]);
          if (d < CONNECTION_DISTANCE) {
            const alpha = 1 - d / CONNECTION_DISTANCE;
            const idx = li * 6;

            linePos[idx] = positions[i].x;
            linePos[idx + 1] = positions[i].y;
            linePos[idx + 2] = positions[i].z;
            linePos[idx + 3] = positions[j].x;
            linePos[idx + 4] = positions[j].y;
            linePos[idx + 5] = positions[j].z;

            const r = accent.r * alpha;
            const g = accent.g * alpha;
            const b = accent.b * alpha;
            lineCol[idx] = r;
            lineCol[idx + 1] = g;
            lineCol[idx + 2] = b;
            lineCol[idx + 3] = r;
            lineCol[idx + 4] = g;
            lineCol[idx + 5] = b;

            li++;
          }
        }
      }

      lineGeo.setDrawRange(0, li * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // Gentle scene rotation
      scene.rotation.y = Math.sin(t * 0.08) * 0.12;
      scene.rotation.x = Math.cos(t * 0.06) * 0.04;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      nodeGeo.dispose();
      nodeMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
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
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    />
  );
}
