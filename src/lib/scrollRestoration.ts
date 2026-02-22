/**
 * Scroll restoration utility
 * Stores which section the user was viewing before navigating to a subpage
 * Restores scroll position when returning to homepage
 */

const SOURCE_SECTION_KEY = "source_section";

/**
 * Store the current section ID before navigating away
 */
export function storeSourceSection(sectionId: string) {
  try {
    sessionStorage.setItem(SOURCE_SECTION_KEY, sectionId);
  } catch (e) {
    // Ignore storage errors
  }
}

/**
 * Get the stored source section ID
 */
export function getSourceSection(): string | null {
  try {
    return sessionStorage.getItem(SOURCE_SECTION_KEY);
  } catch (e) {
    return null;
  }
}

/**
 * Clear the stored source section
 */
export function clearSourceSection() {
  try {
    sessionStorage.removeItem(SOURCE_SECTION_KEY);
  } catch (e) {
    // Ignore storage errors
  }
}

/**
 * Scroll to a section smoothly (works with Lenis)
 */
export function scrollToSection(sectionId: string, immediate = false) {
  const element = document.querySelector(sectionId);
  if (!element) return;

  const lenis = (window as any).__lenis;

  if (lenis && !immediate) {
    // Use Lenis for smooth scroll
    lenis.scrollTo(element, {
      offset: -80, // Account for fixed header
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    // Fallback to instant scroll
    const top = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  }
}

/**
 * Map case study slugs to their corresponding sections
 */
const SLUG_TO_SECTION_MAP: Record<string, string> = {
  onesync: "#timeline",
  "ecofresh-greensync": "#timeline",
  atlan: "#timeline",
  // Add other case studies and their sections here
};

/**
 * Get the section ID for a given case study slug
 */
export function getSectionForSlug(slug: string): string | null {
  return SLUG_TO_SECTION_MAP[slug] || null;
}
