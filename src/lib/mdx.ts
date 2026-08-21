import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "src/content/writing");

export type PostCategory =
  | "research"
  | "field-note"
  | "founder-note"
  | "historical";

export type PostFormat =
  | "essay"
  | "research-note"
  | "field-note"
  | "explainer"
  | "book-chapter"
  | "course-lesson";

export type PostPublicationState =
  | "public"
  | "draft"
  | "historical"
  | "excluded";

const POST_CATEGORIES = new Set<PostCategory>([
  "research",
  "field-note",
  "founder-note",
  "historical",
]);

const POST_FORMATS = new Set<PostFormat>([
  "essay",
  "research-note",
  "field-note",
  "explainer",
  "book-chapter",
  "course-lesson",
]);

const POST_PUBLICATION_STATES = new Set<PostPublicationState>([
  "public",
  "draft",
  "historical",
  "excluded",
]);

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  revised?: string;
  category: PostCategory;
  format: PostFormat;
  publicationState: PostPublicationState;
  description: string;
  featured: boolean;
  evidenceStatus?: "observed" | "derived" | "hypothesis" | "historical";
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

function parsePostMeta(
  slug: string,
  filename: string,
  data: Record<string, unknown>,
  content: string,
): PostMeta {
  const category = data.category as PostCategory;
  if (!POST_CATEGORIES.has(category)) {
    throw new Error(`Invalid writing category "${data.category}" in ${filename}`);
  }

  const format = data.format as PostFormat;
  if (!POST_FORMATS.has(format)) {
    throw new Error(`Invalid writing format "${data.format}" in ${filename}`);
  }

  const publicationState = data.publicationState as PostPublicationState;
  if (!POST_PUBLICATION_STATES.has(publicationState)) {
    throw new Error(
      `Invalid writing publication state "${data.publicationState}" in ${filename}`,
    );
  }

  const stats = readingTime(content);
  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || new Date().toISOString(),
    revised: data.revised as string | undefined,
    category,
    format,
    publicationState,
    description: (data.description as string) || "",
    featured: (data.featured as boolean) || false,
    evidenceStatus: data.evidenceStatus as PostMeta["evidenceStatus"],
    readingTime: Math.ceil(stats.minutes),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs
    .readdirSync(contentDirectory)
    .filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return parsePostMeta(slug, filename, data, content);
  });

  return posts.filter((post) => post.publicationState === "public").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const meta = parsePostMeta(slug, `${slug}.mdx`, data, content);

  if (meta.publicationState !== "public") {
    return null;
  }

  return {
    ...meta,
    content,
  };
}

export function getFeaturedPosts(limit = 3): PostMeta[] {
  const allPosts = getAllPosts();
  const featured = allPosts.filter((p) => p.featured);

  // If not enough featured, pad with recent posts
  if (featured.length < limit) {
    const nonFeatured = allPosts.filter((p) => !p.featured);
    return [...featured, ...nonFeatured].slice(0, limit);
  }

  return featured.slice(0, limit);
}
