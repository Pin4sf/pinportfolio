"use client";

import { useState, useCallback } from "react";
import Toast, { type ToastProps } from "./Toast";
import styles from "./ToastContainer.module.scss";

type ToastData = Omit<ToastProps, "onClose">;

let toastId = 0;
let addToastFn: ((toast: Omit<ToastData, "id">) => void) | null = null;

export function toast(message: string, type?: ToastData["type"], duration?: number) {
  if (addToastFn) {
    addToastFn({ message, type, duration });
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, "id">) => {
    const id = `toast-${toastId++}`;
    setToasts((prev) => [...prev, { id, ...toast }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Expose addToast globally
  if (typeof window !== "undefined") {
    addToastFn = addToast;
  }

  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={removeToast} />
      ))}
    </div>
  );
}
