const svg = (content: string) =>
  `<svg viewBox="0 0 32 32" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;

const letterMark = (text: string, shape = "rounded") =>
  svg(
    `${
      shape === "hexagon"
        ? '<path d="M16 2 28 9v14l-12 7L4 23V9z" fill="none" stroke="currentColor" stroke-width="2"/>'
        : shape === "oval"
          ? '<ellipse cx="16" cy="16" rx="14" ry="9" fill="none" stroke="currentColor" stroke-width="2"/>'
          : '<rect x="3" y="3" width="26" height="26" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>'
    }<text x="16" y="19" text-anchor="middle" fill="currentColor" font-family="Arial,sans-serif" font-size="${text.length > 3 ? 7 : 10}" font-weight="700">${text}</text>`,
  );

export const getTechnologyBrandIconMarkup = (technology: string) => {
  const normalized = technology.trim().toLocaleLowerCase("en-US");
  if (normalized === "react") {
    return svg(
      '<circle cx="16" cy="16" r="2.3" fill="currentColor"/><ellipse cx="16" cy="16" rx="13" ry="5.2" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(60 16 16)" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(120 16 16)" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    );
  }
  if (normalized === "electron") {
    return svg(
      '<circle cx="16" cy="16" r="2" fill="currentColor"/><path d="M8 8c7-4 16 0 18 8M5 18c1 8 10 12 17 8M21 5c-7 0-14 7-14 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="7" cy="9" r="1.6" fill="currentColor"/><circle cx="25" cy="17" r="1.6" fill="currentColor"/><circle cx="21" cy="26" r="1.6" fill="currentColor"/>',
    );
  }
  if (normalized === "java") {
    return svg(
      '<path d="M11 20h12v2.5c0 3-2.5 5.5-5.5 5.5h-1A5.5 5.5 0 0 1 11 22.5zM23 21h2a3 3 0 0 1 0 6h-3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 17c-4-4 5-5 1-9M19 17c-3-3 4-4 1-8M18 7c1-2 3-3 5-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    );
  }
  if (normalized === "python") {
    return svg(
      '<path d="M16 3c-7 0-8 3-8 7v4h9v2H6c-3 0-4 2-4 6s2 7 5 7h4v-5c0-4 3-6 7-6h7c3 0 5-3 5-7s-2-8-7-8z" fill="currentColor" opacity=".82"/><circle cx="13" cy="8" r="1.3" fill="white"/><circle cx="21" cy="24" r="1.3" fill="white"/>',
    );
  }
  if (normalized === "rust") {
    return svg(
      '<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="3 2"/><text x="16" y="20" text-anchor="middle" fill="currentColor" font-family="Georgia,serif" font-size="13" font-weight="700">R</text>',
    );
  }
  if (normalized === "html") return letterMark("5", "hexagon");
  if (normalized === "css") return letterMark("3", "hexagon");
  if (normalized === "c#") return letterMark("C#", "hexagon");
  if (normalized === "c++") return letterMark("C++", "hexagon");
  if (normalized === "c") return letterMark("C", "hexagon");
  if (normalized === "php") return letterMark("php", "oval");
  if (normalized === "go") {
    return svg(
      '<path d="M3 10h7M1 14h8M4 18h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><text x="21" y="20" text-anchor="middle" fill="currentColor" font-family="Arial,sans-serif" font-size="13" font-style="italic" font-weight="800">GO</text>',
    );
  }
  if (normalized === ".net") return letterMark(".NET");
  if (normalized === "typescript") return letterMark("TS");
  return letterMark(technology.slice(0, 3).toLocaleUpperCase("en-US"));
};
