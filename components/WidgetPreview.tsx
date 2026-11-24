"use client";

import { motion } from "motion/react";
import { buildGrid, type Cell } from "@/lib/grid";
import type { LayoutId, WidgetTheme } from "@/lib/widgetStyles";

/**
 * A medium widget as the 1.3 app draws it: a header with the streak and
 * today's status, then the squares. Today wears a ring, rest days and
 * freezes are striped, and Marks swaps the shading for a symbol per day.
 */

const COLS = 20;
/** Big streak shows the recent weeks beside the number. */
const STREAK_COLS = 12;
const ROWS = 7;
const STREAK_DAYS = 34;

const graphCells = buildGrid(COLS, ROWS, STREAK_DAYS);
const streakCells = buildGrid(STREAK_COLS, ROWS, STREAK_DAYS);
/** This week layout: last week over this week, Sunday to Saturday. */
const weekCells = buildGrid(2, ROWS, STREAK_DAYS);
const TODAY = 1; // Monday
const LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

const ease = [0.22, 1, 0.36, 1] as const;

function stripes(color: string) {
  return `repeating-linear-gradient(135deg, ${color} 0 2px, transparent 2px 4px)`;
}

/** The fill a cell draws, before any symbol. */
function cellPaint(theme: WidgetTheme, cell: Cell) {
  if (theme.marks) return { backgroundColor: theme.levels[0], backgroundImage: "none" };
  if (cell.kind === "rest")
    return { backgroundColor: theme.levels[0], backgroundImage: stripes(theme.levels[2]) };
  if (cell.kind === "freeze")
    return { backgroundColor: theme.levels[0], backgroundImage: stripes(theme.freeze) };
  return { backgroundColor: theme.levels[cell.level], backgroundImage: "none" };
}

/** Marks: a dot when pushed, × when missed, F for a freeze, R for rest. */
function Mark({ theme, cell }: { theme: WidgetTheme; cell: Cell }) {
  const letter = cell.kind === "rest" ? "R" : cell.kind === "freeze" ? "F" : cell.level === 0 ? "×" : null;
  if (letter) {
    const opacity = cell.kind === "rest" ? 0.38 : cell.kind === "freeze" ? 0.6 : 0.32;
    return (
      <span
        className="absolute inset-0 flex items-center justify-center font-semibold leading-none"
        style={{ fontSize: "70%", color: theme.primaryText, opacity, containerType: "size" } as React.CSSProperties}
      >
        <span style={{ fontSize: "62cqh" }}>{letter}</span>
      </span>
    );
  }
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="block rounded-full" style={{ width: "42%", height: "42%", background: theme.levels[cell.level] }} />
    </span>
  );
}

function Square({ theme, cell, delay }: { theme: WidgetTheme; cell: Cell; delay: number }) {
  const glow = theme.glows && !theme.marks && cell.kind === "day" && cell.level >= 3;
  return (
    <motion.span
      className="relative block h-full w-full"
      animate={{
        ...cellPaint(theme, cell),
        borderRadius: `${theme.cornerFraction * 100}%`,
        boxShadow: cell.today
          ? `0 0 0 1.5px ${theme.background.startsWith("#") ? theme.background : "rgba(0,0,0,0.6)"}, 0 0 0 3px ${theme.primaryText}`
          : glow
            ? `0 0 6px ${theme.levels[cell.level]}`
            : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {theme.marks && <Mark theme={theme} cell={cell} />}
    </motion.span>
  );
}

function Grid({
  theme,
  cells,
  cols,
  fillHeight = false,
}: {
  theme: WidgetTheme;
  cells: Cell[];
  cols: number;
  fillHeight?: boolean;
}) {
  return (
    <div
      className="grid"
      style={{
        aspectRatio: `${cols} / ${ROWS}`,
        ...(fillHeight
          ? { height: "100%", width: "auto", maxWidth: "100%" }
          : { width: "100%", maxHeight: "100%" }),
        gridAutoFlow: "column",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        gap: "3px",
      }}
    >
      {cells.map((cell) => (
        <Square key={cell.index} theme={theme} cell={cell} delay={cell.col * 0.012} />
      ))}
    </div>
  );
}

function Status({ theme, size = 11 }: { theme: WidgetTheme; size?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <motion.span
        className="inline-block h-[7px] w-[7px] rounded-full"
        animate={{ backgroundColor: theme.pushed }}
        transition={{ duration: 0.4 }}
      />
      <motion.span
        className="font-semibold leading-none"
        style={{ fontSize: size }}
        animate={{ color: theme.primaryText }}
        transition={{ duration: 0.4 }}
      >
        Pushed today
      </motion.span>
    </div>
  );
}

/** The streak number, which Aurora and Ember paint with a gradient. */
function StreakNumber({ theme, size }: { theme: WidgetTheme; size: number }) {
  return (
    <motion.span
      className="font-bold leading-none tracking-tight"
      animate={{ color: theme.numberIsGradient ? "rgba(0,0,0,0)" : theme.numberFill }}
      transition={{ duration: 0.4 }}
      style={{
        fontSize: size,
        fontFamily: theme.numberFont ?? theme.fontFamily,
        backgroundImage: theme.numberIsGradient ? theme.numberFill : undefined,
        backgroundClip: theme.numberIsGradient ? "text" : undefined,
        WebkitBackgroundClip: theme.numberIsGradient ? "text" : undefined,
      }}
    >
      {STREAK_DAYS}
    </motion.span>
  );
}

function Caption({ theme, children, size = 12 }: { theme: WidgetTheme; children: string; size?: number }) {
  return (
    <motion.span
      className="leading-none"
      style={{ fontSize: size }}
      animate={{ color: theme.secondaryText }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.span>
  );
}

/** "34 day streak" on the left, today's status on the right. */
function Header({ theme }: { theme: WidgetTheme }) {
  return (
    <div className="flex items-baseline justify-between">
      <div className="flex items-baseline gap-1.5">
        <StreakNumber theme={theme} size={22} />
        <Caption theme={theme}>day streak</Caption>
      </div>
      <Status theme={theme} />
    </div>
  );
}

function WeekRows({ theme }: { theme: WidgetTheme }) {
  const last = weekCells.slice(0, ROWS);
  const now = weekCells.slice(ROWS).map((cell, i) => ({ ...cell, today: i === TODAY }));
  return (
    <div className="flex flex-col gap-2">
      {[last, now].map((week, w) => (
        <div key={w} className="grid grid-cols-7 gap-2">
          {week.map((cell, i) =>
            w === 1 && i > TODAY ? (
              <motion.span
                key={cell.index}
                className="block aspect-square border border-dashed"
                animate={{ borderColor: theme.levels[2], borderRadius: `${theme.cornerFraction * 100}%` }}
                style={{ opacity: 0.5 }}
              />
            ) : (
              <span key={cell.index} className="block aspect-square">
                <Square theme={theme} cell={{ ...cell, kind: i === 6 ? "rest" : "day", level: cell.level || 2 }} delay={i * 0.03} />
              </span>
            ),
          )}
        </div>
      ))}
      <div className="grid grid-cols-7 gap-2">
        {LETTERS.map((l, i) => (
          <motion.span
            key={i}
            className="text-center text-[10px] leading-none"
            style={{ fontWeight: i === TODAY ? 700 : 500 }}
            animate={{ color: i === TODAY ? theme.primaryText : theme.secondaryText }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function WidgetPreview({
  theme,
  layout,
  className = "",
}: {
  theme: WidgetTheme;
  layout: LayoutId;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative aspect-[2.1/1] overflow-hidden rounded-[22px] ${className}`}
      animate={{ background: theme.background }}
      transition={{ duration: 0.55, ease }}
      style={{ fontFamily: theme.fontFamily }}
    >
      {theme.scanlines && (
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)",
          }}
        />
      )}

      {layout === "graph" && (
        <div className="flex h-full flex-col gap-3 p-4">
          <Header theme={theme} />
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <Grid theme={theme} cells={graphCells} cols={COLS} />
          </div>
        </div>
      )}

      {layout === "streak" && (
        <div className="flex h-full gap-4 p-4">
          <div className="flex w-[30%] shrink-0 flex-col justify-between">
            <div className="flex flex-col gap-1.5">
              <StreakNumber theme={theme} size={50} />
              <Caption theme={theme} size={13}>day streak</Caption>
            </div>
            <Status theme={theme} size={10} />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-end">
            <Grid theme={theme} cells={streakCells} cols={STREAK_COLS} fillHeight />
          </div>
        </div>
      )}

      {layout === "week" && (
        <div className="flex h-full flex-col justify-between gap-2 p-4">
          <Header theme={theme} />
          <div className="mx-auto w-[62%]">
            <WeekRows theme={theme} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
