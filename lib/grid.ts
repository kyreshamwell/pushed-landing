/**
 * A seeded contribution pattern, shared by the hero backdrop and the widget
 * previews. Seeded rather than random so the server and the client render
 * the same squares and hydration stays quiet.
 */

/**
 * A small deterministic hash, good enough to look unplanned. `rest` is the
 * share of days with no contributions: a full year needs more of them than a
 * widget-sized slice, or the band reads as a wall of green.
 */
export function levelAt(col: number, row: number, rest = 0.34): number {
  const n = Math.sin(col * 12.9898 + row * 78.233) * 43758.5453;
  const f = n - Math.floor(n);
  if (f < rest) return 0;
  const busy = (f - rest) / (1 - rest);
  if (busy < 0.34) return 1;
  if (busy < 0.67) return 2;
  if (busy < 0.89) return 3;
  return 4;
}

export type Cell = { col: number; row: number; level: number; index: number };

/**
 * Column-major cells, with the last `streak` days always lit so the grid
 * reads as a streak that is still running.
 */
export function buildGrid(cols: number, rows: number, streak = 0, rest = 0.34): Cell[] {
  const total = cols * rows;
  return Array.from({ length: total }, (_, index) => {
    const col = Math.floor(index / rows);
    const row = index % rows;
    const fromEnd = total - 1 - index;
    const base = levelAt(col, row, rest);
    const level =
      fromEnd < streak ? (fromEnd === 0 ? 4 : Math.max(2, base)) : base;
    return { col, row, level, index };
  });
}
