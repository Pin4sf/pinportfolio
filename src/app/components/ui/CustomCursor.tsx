"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.scss";

const MAX_POINTS = 80;
const POINT_LIFETIME = 600; // ms before a point fully fades

interface InkPoint {
  x: number;
  y: number;
  time: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !label || !canvas) return;

    // Canvas setup
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();

    // Ink trail state
    const points: InkPoint[] = [];

    // 60fps tracking with quickTo
    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);

      // Add point to ink trail
      points.push({ x: e.clientX, y: e.clientY, time: performance.now() });
      if (points.length > MAX_POINTS) points.shift();
    };

    // Click pulse effect
    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.4, duration: 0.1, ease: "power2.in" });
      gsap.to(ring, { scale: isHovering ? 1.5 : 0.7, duration: 0.1, ease: "power2.in" });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: isHovering ? 0.5 : 1, duration: 0.25, ease: "elastic.out(1, 0.5)" });
      gsap.to(ring, { scale: isHovering ? 2 : 1, duration: 0.25, ease: "elastic.out(1, 0.5)" });
    };

    // Context-aware hover labels
    const getCursorLabel = (el: Element): string => {
      const dataLabel = el.getAttribute("data-cursor");
      if (dataLabel) return dataLabel;

      const href = el.getAttribute("href") || "";
      if (href.startsWith("/work/")) return "View";
      if (href.startsWith("/writing/")) return "Read";
      if (href.startsWith("http")) return "Open";
      if (el.tagName === "BUTTON" || el.getAttribute("role") === "button") return "";
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") return "Type";
      return "";
    };

    const onMouseEnterInteractive = (e: Event) => {
      isHovering = true;
      const el = e.currentTarget as Element;
      const cursorLabel = getCursorLabel(el);

      gsap.to(ring, {
        scale: 2,
        borderColor: "rgba(108, 255, 141, 0.7)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });

      if (cursorLabel) {
        label.textContent = cursorLabel;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
      }
    };

    const onMouseLeaveInteractive = () => {
      isHovering = false;
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(108, 255, 141, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.15, ease: "power2.in" });
    };

    // Track interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [data-hover], [data-cursor], input, textarea, [role="button"]'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
      return interactives;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    let interactives = addHoverListeners();
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      interactives = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.documentElement.classList.add("custom-cursor-active");

    // Ink trail render loop
    let frameId: number;

    const renderTrail = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const now = performance.now();

      // Remove dead points
      while (points.length > 0 && now - points[0].time > POINT_LIFETIME) {
        points.shift();
      }

      if (points.length < 2) {
        frameId = requestAnimationFrame(renderTrail);
        return;
      }

      // Draw smooth ink line with fading segments
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];

        const age = (now - curr.time) / POINT_LIFETIME;
        const alpha = (1 - age) * 0.5;
        const width = (1 - age) * 2.5 + 0.5;

        if (alpha <= 0) continue;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(108, 255, 141, ${alpha})`;
        ctx.lineWidth = width;

        // Use midpoints for smoother curves
        if (i === 1) {
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
        } else {
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.moveTo((points[i - 2].x + prev.x) / 2, (points[i - 2].y + prev.y) / 2);
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }

        ctx.stroke();
      }

      frameId = requestAnimationFrame(renderTrail);
    };
    renderTrail();

    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.trailCanvas} />
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring}>
        <span ref={labelRef} className={styles.label} />
      </div>
    </>
  );
}
