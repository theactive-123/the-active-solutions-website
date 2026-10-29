/** Renders "Text with *accent* words" with the accent wrapped in <em> (red italic serif). */
export function withAccent(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part,
  );
}
