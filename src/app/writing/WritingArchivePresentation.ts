import { createElement, Fragment, type ReactElement } from "react";
import type { PostMeta } from "@/lib/mdx";
import type {
  PostFormatFilter,
  WritingArchiveViewModel,
} from "@/lib/postFormats";

export type WritingArchiveStyles = Readonly<Record<string, string>>;

function shortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function revisedDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function renderWritingArchive(
  viewModel: WritingArchiveViewModel<PostMeta>,
  onSelect: (format: PostFormatFilter) => void,
  styles: WritingArchiveStyles,
): ReactElement {
  return createElement(
    "section",
    { "aria-label": "Writing archive" },
    createElement(
      "div",
      { className: styles.filters },
      viewModel.filters.map((filter) =>
        createElement(
          "button",
          {
            key: filter.value,
            type: "button",
            "aria-pressed": filter.active,
            className: `${styles.filterBtn} ${filter.active ? styles.active : ""}`,
            onClick: () => onSelect(filter.value),
          },
          filter.label,
        ),
      ),
    ),
    createElement(
      "div",
      { className: styles.list },
      viewModel.cards.map((card) =>
        createElement(
          "a",
          { key: card.post.slug, href: card.href, className: styles.card },
          createElement(
            "div",
            { className: styles.cardMeta },
            createElement(
              "span",
              { className: styles.format },
              card.formatLabel,
            ),
            card.post.evidenceStatus
              ? createElement(
                  Fragment,
                  null,
                  createElement("span", { className: styles.dot }, "·"),
                  createElement(
                    "span",
                    { className: styles.evidence },
                    card.post.evidenceStatus,
                  ),
                )
              : null,
            createElement("span", { className: styles.dot }, "·"),
            createElement("span", null, shortDate(card.post.date)),
            createElement("span", { className: styles.dot }, "·"),
            createElement("span", null, `${card.post.readingTime} min read`),
            card.post.revised
              ? createElement(
                  Fragment,
                  null,
                  createElement("span", { className: styles.dot }, "·"),
                  createElement(
                    "span",
                    null,
                    `Revised ${revisedDate(card.post.revised)}`,
                  ),
                )
              : null,
          ),
          createElement("h2", { className: styles.cardTitle }, card.title),
          createElement(
            "p",
            { className: styles.cardDescription },
            card.post.description,
          ),
        ),
      ),
    ),
  );
}
