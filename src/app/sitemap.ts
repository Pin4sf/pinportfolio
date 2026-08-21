import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";
import { getAllPosts } from "@/lib/mdx";

type CanonicalStaticRoute = {
  path:
    | ""
    | "/work/waldo"
    | "/research"
    | "/writing"
    | "/reading"
    | "/experience"
    | "/about";
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

const staticRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/work/waldo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/research", changeFrequency: "weekly", priority: 0.8 },
  { path: "/writing", changeFrequency: "weekly", priority: 0.8 },
  { path: "/reading", changeFrequency: "monthly", priority: 0.7 },
  { path: "/experience", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
] satisfies readonly CanonicalStaticRoute[];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog post pages
  const posts = getAllPosts();
  const writingPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(post.revised ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...writingPages];
}
