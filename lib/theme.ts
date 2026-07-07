/**
 * Runtime access to the design tokens declared in `app/globals.css`.
 * Canvas / WebGL code can't read Tailwind classes, so it reads the
 * CSS variables directly — meaning globals.css stays the ONLY place
 * where colors are defined.
 */

const FALLBACKS: Record<string, string> = {
  "--accent": "72 255 194",
  "--bg": "5 7 8",
  "--text-hi": "255 255 255",
};

function readVar(name: string): [number, number, number] {
  let raw = "";
  if (typeof window !== "undefined") {
    raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  if (!raw) raw = FALLBACKS[name] ?? "255 255 255";
  const parts = raw.split(/\s+/).map(Number);
  if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) {
    return [255, 255, 255];
  }
  return [parts[0], parts[1], parts[2]];
}

export function accentRGB(): [number, number, number] {
  return readVar("--accent");
}

export function accentCSS(alpha = 1): string {
  const [r, g, b] = accentRGB();
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function bgCSS(): string {
  const [r, g, b] = readVar("--bg");
  return `rgb(${r}, ${g}, ${b})`;
}
