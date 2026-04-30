import type { ReactNode } from "react";

// Renders a string with markdown-style asterisk emphasis (*like this*) into
// React nodes, wrapping each emphasised span in a styled element. Used wherever
// content from `site.json` may contain emphasis markers (hero headline, section
// headlines, the nav brand, etc.).
//
// Pass `emphasisClassName` to override the default styling — useful on dark
// backgrounds where the default text-accent doesn't read (use text-accent-light
// instead).
//
// Nested asterisks are deliberately not supported.

const DEFAULT_CLASS = "font-serif italic text-accent";

export function renderEmphasis(
  text: string,
  emphasisClassName: string = DEFAULT_CLASS,
): ReactNode {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <span key={i} className={emphasisClassName}>
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}
