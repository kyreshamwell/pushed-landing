/**
 * The seeded contribution pattern the widget previews draw. Seeded rather
 * than random so the server and the client render the same squares and
 * hydration stays quiet.
 */

/** Share of days with no contributions. */
const REST = 0.34;

/** A small deterministic hash, good enough to look unplanned. */
function levelAt(col: number, row: number): number {
  const n = Math.sin(col * 12.9898 + row * 78.233) * 43758.5453;
  const f = n - Math.floor(n);
  if (f < REST) return 0;
  const busy = (f - REST) / (1 - REST);
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
export function buildGrid(cols: number, rows: number, streak = 0): Cell[] {
  const total = cols * rows;
  return Array.from({ length: total }, (_, index) => {
    const col = Math.floor(index / rows);
    const row = index % rows;
    const fromEnd = total - 1 - index;
    const base = levelAt(col, row);
    const level =
      fromEnd < streak ? (fromEnd === 0 ? 4 : Math.max(2, base)) : base;
    return { col, row, level, index };
  });
}
