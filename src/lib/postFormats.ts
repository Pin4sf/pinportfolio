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
export type PostFormatFilter = "all" | PostFormat;

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
