/**
 * The widget's five built-in looks, ported from `Shared/WidgetStyle.swift`
 * in the app so the previews on this page draw the same colors, cell shapes
 * and type the real widget does.
 */

export type StyleId = "classic" | "aurora" | "ember" | "terminal" | "paper";

export type WidgetTheme = {
  id: StyleId;
  name: string;
  tagline: string;
  /** Level 0 (no contributions) through 4. */
  levels: [string, string, string, string, string];
  /** Any CSS background value. */
  background: string;
  primaryText: string;
  secondaryText: string;
  /** A color, or a gradient painted onto the streak number. */
  numberFill: string;
  numberIsGradient: boolean;
  /** The status dot once you have pushed today. */
  pushed: string;
  /** Corner radius as a fraction of the cell: 0 is a square, 0.5 a dot. */
  cornerFraction: number;
  /** A soft halo around the busiest cells and the streak number. */
  glows: boolean;
  fontFamily: string;
  /** Faint CRT lines, for Terminal only. */
  scanlines: boolean;
  /** The dot in the style picker, chosen to read against the dark page. */
  swatch: string;
};

const SANS = "var(--font-sans)";
const MONO = "var(--font-mono)";
const ROUNDED = "ui-rounded, 'SF Pro Rounded', var(--font-sans)";
const SERIF = "ui-serif, 'New York', Georgia, serif";

export const widgetThemes: WidgetTheme[] = [
  {
    id: "classic",
    name: "Classic",
    tagline: "GitHub's own greens. Follows light and dark mode.",
    levels: ["#2f3640", "#0e4429", "#006d32", "#26a641", "#39d353"],
    background: "#161b22",
    primaryText: "#f0f6fc",
    secondaryText: "#8b949e",
    numberFill: "#f0f6fc",
    numberIsGradient: false,
    pushed: "#39d353",
    cornerFraction: 0.25,
    glows: false,
    fontFamily: SANS,
    scanlines: false,
    swatch: "#39d353",
  },
  {
    id: "aurora",
    name: "Aurora",
    tagline: "Frosted squares over a teal and violet glow.",
    levels: [
      "rgba(255,255,255,0.16)",
      "rgba(255,255,255,0.38)",
      "rgba(255,255,255,0.6)",
      "rgba(255,255,255,0.82)",
      "rgba(255,255,255,1)",
    ],
    background:
      "radial-gradient(ellipse 90% 90% at 0% 0%, rgba(20,184,166,0.8), transparent 70%), radial-gradient(ellipse 80% 80% at 100% 100%, rgba(236,72,153,0.6), transparent 70%), linear-gradient(135deg, #1e1b4b, #4c1d95)",
    primaryText: "#ffffff",
    secondaryText: "rgba(255,255,255,0.75)",
    numberFill: "#ffffff",
    numberIsGradient: false,
    pushed: "#6ee7b7",
    cornerFraction: 0.3,
    glows: false,
    fontFamily: ROUNDED,
    scanlines: false,
    swatch: "#a78bfa",
  },
  {
    id: "ember",
    name: "Ember",
    tagline: "Busy days burn hotter. Keep the fire going.",
    levels: ["#3a2a24", "#7c2d12", "#c2410c", "#f97316", "#facc15"],
    background:
      "radial-gradient(ellipse 85% 75% at 50% 100%, rgba(194,65,12,0.4), transparent 70%), linear-gradient(to bottom, #1a0f0b, #2b120a)",
    primaryText: "#fff7ed",
    secondaryText: "rgba(253,186,116,0.8)",
    numberFill: "linear-gradient(to bottom, #fde68a, #f97316)",
    numberIsGradient: true,
    pushed: "#facc15",
    cornerFraction: 0.25,
    glows: true,
    fontFamily: SANS,
    scanlines: false,
    swatch: "#f97316",
  },
  {
    id: "terminal",
    name: "Terminal",
    tagline: "Phosphor green on black, set in monospace.",
    levels: ["#14261a", "#0f5c2a", "#1a9a45", "#39d765", "#9cffb0"],
    background: "radial-gradient(ellipse 75% 75% at 50% 50%, #0c1a10, #030604)",
    primaryText: "#8cfca6",
    secondaryText: "#4fa968",
    numberFill: "#8cfca6",
    numberIsGradient: false,
    pushed: "#8cfca6",
    cornerFraction: 0,
    glows: true,
    fontFamily: MONO,
    scanlines: true,
    swatch: "#39d765",
  },
  {
    id: "paper",
    name: "Paper",
    tagline: "Ink dots on warm paper. Calm and bright.",
    levels: [
      "rgba(41,37,36,0.08)",
      "rgba(41,37,36,0.3)",
      "rgba(41,37,36,0.52)",
      "rgba(41,37,36,0.76)",
      "rgba(41,37,36,1)",
    ],
    background: "linear-gradient(to bottom, #f8f4ec, #eee6d6)",
    primaryText: "#1c1917",
    secondaryText: "#78716c",
    numberFill: "#1c1917",
    numberIsGradient: false,
    pushed: "#3f7d58",
    cornerFraction: 0.5,
    glows: false,
    fontFamily: SERIF,
    scanlines: false,
    swatch: "#e7e0d0",
  },
];

export const themeById = (id: StyleId): WidgetTheme =>
  widgetThemes.find((t) => t.id === id) ?? widgetThemes[0];

export type LayoutId = "graph" | "streak";
