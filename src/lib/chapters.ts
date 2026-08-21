export interface SluggedTimelineEntry {
  slug: string;
}

export function selectTimelineChapters<T extends SluggedTimelineEntry>(
  timeline: readonly T[],
  orderedSlugs: readonly string[],
): T[] {
  const bySlug = new Map(timeline.map((entry) => [entry.slug, entry]));
  return orderedSlugs.map((slug) => {
    const entry = bySlug.get(slug);
    if (!entry) throw new Error(`Unknown timeline chapter: ${slug}`);
    return entry;
  });
}
