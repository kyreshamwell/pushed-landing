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

/** A normal day, a rest day, or a day saved by a freeze. */
export type DayKind = "day" | "rest" | "freeze";

export type Cell = {
  col: number;
  row: number;
  level: number;
  kind: DayKind;
  index: number;
  today: boolean;
};

/**
 * Column-major cells, rows Sunday to Saturday. The last `streak` days are
 * the running streak: lit, with Saturdays as rest days and one freeze, the
 * way the demo account in the app looks. The last cell is today.
 */
export function buildGrid(cols: number, rows: number, streak = 0): Cell[] {
  const total = cols * rows;
  return Array.from({ length: total }, (_, index) => {
    const col = Math.floor(index / rows);
    const row = index % rows;
    const fromEnd = total - 1 - index;
    const base = levelAt(col, row);
    let level = base;
    let kind: DayKind = "day";
    if (fromEnd < streak) {
      if (row === rows - 1 && fromEnd > 0) {
        kind = "rest";
      } else if (fromEnd === 16) {
        kind = "freeze";
      } else {
        level = fromEnd === 0 ? 3 : Math.max(1, base);
      }
    }
    return { col, row, level, kind, index, today: fromEnd === 0 };
  });
}
