import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * MathRenderer component parses markdown/text and renders KaTeX math formulas.
 * Supports:
 * - Block math: $$ ... $$ or \[ ... \]
 * - Inline math: $ ... $ or \( ... \)
 */
export default function MathRenderer({ content, className = '' }) {
  const renderedElements = useMemo(() => {
    if (!content) return null;

    const text = String(content);
    // Split by block math first, then inline math
    const parts = [];
    const blockRegex = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]/g;
    
    let lastIndex = 0;
    let match;

    while ((match = blockRegex.exec(text)) !== null) {
      // Push preceding text before block math
      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: text.substring(lastIndex, match.index) });
      }

      const formula = match[1] || match[2];
      parts.push({ type: 'blockMath', value: formula });
      lastIndex = blockRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', value: text.substring(lastIndex) });
    }

    return parts.map((part, index) => {
      if (part.type === 'blockMath') {
        try {
          const html = katex.renderToString(part.value, { displayMode: true, throwOnError: false });
          return (
            <div
              key={`block-${index}`}
              className="my-3 overflow-x-auto p-2 bg-slate-900/60 rounded-lg text-cyan-300 font-mono text-center border border-slate-700/50"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (e) {
          return <code key={`err-${index}`} className="text-amber-400 font-mono">[{part.value}]</code>;
        }
      }

      // Process inline math within text parts
      const inlineRegex = /\$([^\$]+)\$|\\\((.+?)\\\)/g;
      const inlineParts = [];
      let inlineLastIndex = 0;
      let inlineMatch;

      while ((inlineMatch = inlineRegex.exec(part.value)) !== null) {
        if (inlineMatch.index > inlineLastIndex) {
          inlineParts.push(part.value.substring(inlineLastIndex, inlineMatch.index));
        }

        const inlineFormula = inlineMatch[1] || inlineMatch[2];
        try {
          const html = katex.renderToString(inlineFormula, { displayMode: false, throwOnError: false });
          inlineParts.push(
            <span
              key={`inline-${index}-${inlineMatch.index}`}
              className="inline-block px-1 text-emerald-300 font-mono"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (e) {
          inlineParts.push(<span key={`inline-err-${index}`} className="text-amber-400 font-mono">${inlineFormula}$</span>);
        }

        inlineLastIndex = inlineRegex.lastIndex;
      }

      if (inlineLastIndex < part.value.length) {
        inlineParts.push(part.value.substring(inlineLastIndex));
      }

      return <span key={`text-${index}`}>{inlineParts}</span>;
    });
  }, [content]);

  return <div className={`math-renderer leading-relaxed ${className}`}>{renderedElements}</div>;
}
