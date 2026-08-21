import type { PostFormat } from "./mdx";

export const formatLabels: Record<PostFormat, string> = {
  essay: "Essay",
  "research-note": "Research Note",
  "field-note": "Field Note",
  explainer: "Explainer",
  "book-chapter": "Book / Chapter",
  "course-lesson": "Course / Lesson",
};

type FormattedPost = { format: PostFormat };
export type ArchivePost = FormattedPost & { slug: string; title: string };
export type PostFormatFilter = "all" | PostFormat;

export interface WritingArchiveViewModel<T extends ArchivePost> {
  filters: Array<{
    value: PostFormatFilter;
    label: string;
    active: boolean;
  }>;
  cards: Array<{
    href: string;
    title: string;
    formatLabel: string;
    post: T;
  }>;
}

export function getAvailableFormats(
  posts: readonly FormattedPost[],
): PostFormat[] {
  return Array.from(new Set(posts.map((post) => post.format)));
}

export function filterPostsByFormat<T extends FormattedPost>(
  posts: readonly T[],
  format: PostFormatFilter,
): readonly T[] {
  return format === "all"
    ? posts
    : posts.filter((post) => post.format === format);
}

export function createWritingArchiveViewModel<T extends ArchivePost>(
  posts: readonly T[],
  activeFormat: PostFormatFilter,
): WritingArchiveViewModel<T> {
  return {
    filters: (["all", ...getAvailableFormats(posts)] as const).map((value) => ({
      value,
      label: value === "all" ? "All" : formatLabels[value],
      active: value === activeFormat,
    })),
    cards: filterPostsByFormat(posts, activeFormat).map((post) => ({
      href: `/writing/${post.slug}`,
      title: post.title,
      formatLabel: formatLabels[post.format],
      post,
    })),
  };
}
