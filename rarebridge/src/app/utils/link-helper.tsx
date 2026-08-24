import React from "react";
import { ExternalLink } from "lucide-react";

/**
 * Parses free text containing URLs or markdown-style links [text](url)
 * into safe, interactive React elements that can be clicked and visited.
 */
export function renderTextWithLinks(text: string | null | undefined): React.ReactNode {
  if (!text || typeof text !== "string") return null;

  // Regex to match markdown links: [label](url) OR raw URLs: https?://... or www....
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+|www\.[^\s\)]+)\)|(https?:\/\/[^\s,;)\]]+|www\.[^\s,;)\]]+)/gi;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Markdown link format [label](url)
      const label = match[1];
      let href = match[2];
      if (href.startsWith("www.")) href = `https://${href}`;

      parts.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-accent/40 hover:decoration-primary hover:text-accent transition-colors"
        >
          {label}
          <ExternalLink className="w-3 h-3 inline-block shrink-0 opacity-70" />
        </a>
      );
    } else if (match[3]) {
      // Plain URL match
      let url = match[3];
      const cleanUrl = url.replace(/[.,;)]+$/, ""); // strip trailing punctuation
      const punctuation = url.slice(cleanUrl.length);
      let href = cleanUrl;
      if (href.startsWith("www.")) href = `https://${href}`;

      parts.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-accent/40 hover:decoration-primary hover:text-accent transition-colors break-all"
        >
          {cleanUrl}
          <ExternalLink className="w-3 h-3 inline-block shrink-0 opacity-70" />
        </a>
      );
      if (punctuation) {
        parts.push(punctuation);
      }
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
