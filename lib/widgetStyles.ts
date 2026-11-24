/**
 * The widget's six built-in looks, ported from `Shared/WidgetStyle.swift`
 * in the 1.3 app so the previews on this page draw the same colors, cell
 * shapes and type the real widget does. Classic uses its dark-mode colors,
 * to sit on this dark page.
 */

export type StyleId = "classic" | "aurora" | "ember" | "terminal" | "paper" | "marks";

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
  /** A soft halo around the busiest cells. */
  glows: boolean;
  fontFamily: string;
  /** Font for the streak number, when it differs (Paper's serif). */
  numberFont?: string;
  /** Faint CRT lines, for Terminal only. */
  scanlines: boolean;
  /** Marks draws a symbol for every day instead of a shaded square. */
  marks: boolean;
  /** The tint of a freeze day. */
  freeze: string;
  /** The dot in the style picker, chosen to read against the dark page. */
  swatch: string;
};

const SANS = "var(--font-sans)";
const MONO = "var(--font-mono)";
const SERIF = "ui-serif, 'New York', Georgia, serif";

const SOFT = 0.18;
const ROUNDED = 0.28;

export const widgetThemes: WidgetTheme[] = [
  {
    id: "classic",
    name: "Classic",
    tagline: "GitHub's own graph and greens. Follows light and dark mode.",
    levels: ["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"],
    background: "#0D1117",
    primaryText: "#E6EDF3",
    secondaryText: "#8B949E",
    numberFill: "#E6EDF3",
    numberIsGradient: false,
    pushed: "#39D353",
    cornerFraction: SOFT,
    glows: false,
    fontFamily: SANS,
    scanlines: false,
    marks: false,
    freeze: "#7DD3FC",
    swatch: "#39D353",
  },
  {
    id: "aurora",
    name: "Aurora",
    tagline: "Deep navy with teal and violet light. Busy days glow.",
    levels: ["rgba(255,255,255,0.08)", "#1C4E63", "#2A8C93", "#6EE7D8", "#E4D7FF"],
    background:
      "radial-gradient(ellipse 90% 120% at 0% 0%, rgba(45,212,191,0.30), transparent 55%), radial-gradient(ellipse 90% 120% at 100% 100%, rgba(167,139,250,0.34), transparent 60%), #0A0F24",
    primaryText: "#F2F5FF",
    secondaryText: "rgba(226,232,255,0.66)",
    numberFill: "linear-gradient(to bottom right, #A7F3E8, #E4D7FF)",
    numberIsGradient: true,
    pushed: "#6EE7D8",
    cornerFraction: ROUNDED,
    glows: true,
    fontFamily: SANS,
    scanlines: false,
    marks: false,
    freeze: "#7DD3FC",
    swatch: "#A78BFA",
  },
  {
    id: "ember",
    name: "Ember",
    tagline: "Warm black, coal to flame. Busy days glow like embers.",
    levels: ["#2A1A14", "#6B2410", "#B8400E", "#F2761B", "#FFC46B"],
    background:
      "radial-gradient(ellipse 80% 90% at 100% 0%, rgba(234,88,12,0.28), transparent 60%), radial-gradient(ellipse 70% 70% at 0% 100%, rgba(250,204,21,0.08), transparent 60%), #140B08",
    primaryText: "#FFF4E8",
    secondaryText: "rgba(253,200,150,0.72)",
    numberFill: "linear-gradient(to bottom, #FFE1A6, #F2761B)",
    numberIsGradient: true,
    pushed: "#F2761B",
    cornerFraction: ROUNDED,
    glows: true,
    fontFamily: SANS,
    scanlines: false,
    marks: false,
    freeze: "#7DD3FC",
    swatch: "#F2761B",
  },
  {
    id: "terminal",
    name: "Terminal",
    tagline: "Phosphor green in monospace, with faint scanlines.",
    levels: ["#0E1A12", "#14532D", "#15803D", "#22C55E", "#86EFAC"],
    background: "radial-gradient(ellipse 75% 75% at 50% 50%, #0B1A10, #030604)",
    primaryText: "#86EFAC",
    secondaryText: "#4E8F62",
    numberFill: "#86EFAC",
    numberIsGradient: false,
    pushed: "#22C55E",
    cornerFraction: 0,
    glows: false,
    fontFamily: MONO,
    scanlines: true,
    marks: false,
    freeze: "#7DD3FC",
    swatch: "#22C55E",
  },
  {
    id: "paper",
    name: "Paper",
    tagline: "Ink dots on warm paper, with a serif number.",
    levels: ["#E2DACB", "#C9BBA2", "#9A8970", "#5E5243", "#24211D"],
    background: "linear-gradient(to bottom, #F7F2E8, #EDE5D6)",
    primaryText: "#24211D",
    secondaryText: "#6E6456",
    numberFill: "#24211D",
    numberIsGradient: false,
    pushed: "#24211D",
    cornerFraction: 0.5,
    glows: false,
    fontFamily: SANS,
    numberFont: SERIF,
    scanlines: false,
    marks: false,
    freeze: "#0284C7",
    swatch: "#E7E0D0",
  },
  {
    id: "marks",
    name: "Marks",
    tagline: "One color and a symbol for every day: a dot, ×, F for a freeze, R for rest.",
    levels: [
      "rgba(255,255,255,0.045)",
      "rgba(242,242,242,0.55)",
      "rgba(242,242,242,0.72)",
      "rgba(242,242,242,0.86)",
      "#F2F2F2",
    ],
    background: "#111113",
    primaryText: "#F2F2F2",
    secondaryText: "#8E8E93",
    numberFill: "#F2F2F2",
    numberIsGradient: false,
    pushed: "#F2F2F2",
    cornerFraction: SOFT,
    glows: false,
    fontFamily: SANS,
    scanlines: false,
    marks: true,
    freeze: "#AEAEB2",
    swatch: "#F2F2F2",
  },
];

export const themeById = (id: StyleId): WidgetTheme =>
  widgetThemes.find((t) => t.id === id) ?? widgetThemes[0];

export type LayoutId = "graph" | "streak" | "week";
