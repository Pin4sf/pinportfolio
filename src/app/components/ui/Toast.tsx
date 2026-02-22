"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Toast.module.scss";
import { X, Check, AlertCircle, Info } from "lucide-react";

export interface ToastProps {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({
  id,
  message,
  type = "success",
  duration = 4000,
  onClose,
}: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toast = toastRef.current;
    const progress = progressRef.current;
    if (!toast || !progress) return;

    // Entrance animation
    const tl = gsap.timeline();
    tl.fromTo(
      toast,
      { x: 400, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );

    // Progress bar countdown
    gsap.fromTo(
      progress,
      { scaleX: 1 },
      { scaleX: 0, duration: duration / 1000, ease: "none" }
    );

    // Auto-dismiss
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const handleClose = () => {
    const toast = toastRef.current;
    if (!toast) return;

    gsap.to(toast, {
      x: 400,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => onClose(id),
    });
  };

  const icons = {
    success: Check,
    error: AlertCircle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div ref={toastRef} className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.icon}>
        <Icon size={18} />
      </div>
      <p className={styles.message}>{message}</p>
      <button
        onClick={handleClose}
        className={styles.close}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
      <div ref={progressRef} className={styles.progress} />
    </div>
  );
}
