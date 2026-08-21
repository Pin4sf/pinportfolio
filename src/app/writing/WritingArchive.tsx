"use client";

import { useState } from "react";
import styles from "./WritingArchive.module.scss";
import type { PostMeta } from "@/lib/mdx";
import {
  createWritingArchiveViewModel,
  type PostFormatFilter,
} from "@/lib/postFormats";
import { renderWritingArchive } from "./WritingArchivePresentation";

interface WritingArchiveProps {
  posts: PostMeta[];
}

export default function WritingArchive({ posts }: WritingArchiveProps) {
  const [activeFormat, setActiveFormat] = useState<PostFormatFilter>("all");
  return renderWritingArchive(
    createWritingArchiveViewModel(posts, activeFormat),
    setActiveFormat,
    styles,
  );
}
