import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "src/content/writing");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: "building" | "thinking" | "technical";
  description: string;
  featured: boolean;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      category: data.category || "thinking",
      description: data.description || "",
      featured: data.featured || false,
      readingTime: Math.ceil(stats.minutes),
    } as PostMeta;
  });

  return posts.sort(
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
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    category: data.category || "thinking",
    description: data.description || "",
    featured: data.featured || false,
    readingTime: Math.ceil(stats.minutes),
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
