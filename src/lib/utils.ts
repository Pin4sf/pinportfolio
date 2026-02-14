import clsx, { type ClassValue } from "clsx";

/** Merge class names with clsx */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format a date string to readable format */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Estimate reading time from text content */
export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
