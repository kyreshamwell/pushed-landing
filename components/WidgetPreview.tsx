"use client";

import { motion } from "motion/react";
import { buildGrid } from "@/lib/grid";
import type { LayoutId, WidgetTheme } from "@/lib/widgetStyles";

const COLS = 20;
/** Big streak shows only the recent weeks, beside the number. */
const STREAK_COLS = 11;
const ROWS = 7;
const STREAK_DAYS = 12;

const graphCells = buildGrid(COLS, ROWS, STREAK_DAYS);
const streakCells = buildGrid(STREAK_COLS, ROWS, STREAK_DAYS);

/** Ember and Terminal halo their brightest cells, the way the widget does. */
function cellGlow(theme: WidgetTheme, level: number) {
  if (!theme.glows || level < 3) return undefined;
  return `0 0 6px ${theme.levels[level]}`;
}

function Grid({ theme, dense = false }: { theme: WidgetTheme; dense?: boolean }) {
  const cells = dense ? streakCells : graphCells;
  const cols = dense ? STREAK_COLS : COLS;
  return (
    <div
      className="mx-auto grid"
      style={{
        aspectRatio: `${cols} / ${ROWS}`,
        ...(dense
          ? { height: "100%", width: "auto", maxWidth: "100%" }
          : { width: "100%", maxHeight: "100%" }),
        gridAutoFlow: "column",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        gap: "2.5px",
      }}
    >
      {cells.map((cell) => (
        <motion.span
          key={cell.index}
          className="h-full w-full"
          animate={{
            backgroundColor: theme.levels[cell.level],
            borderRadius: `${theme.cornerFraction * 100}%`,
            boxShadow: cellGlow(theme, cell.level) ?? "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{
            duration: 0.5,
            delay: cell.col * 0.012,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}

function StatusDot({ theme }: { theme: WidgetTheme }) {
  return (
    <motion.span
      className="inline-block h-[7px] w-[7px] rounded-full"
      animate={{ backgroundColor: theme.pushed }}
      transition={{ duration: 0.4 }}
      style={{ boxShadow: theme.glows ? `0 0 6px ${theme.pushed}` : undefined }}
    />
  );
}

/** The streak number, which Ember paints with a gradient. */
function StreakNumber({ theme, className }: { theme: WidgetTheme; className: string }) {
  return (
    <motion.span
      className={className}
      animate={{ color: theme.numberIsGradient ? "transparent" : theme.numberFill }}
      transition={{ duration: 0.4 }}
      style={{
        fontFamily: theme.fontFamily,
        backgroundImage: theme.numberIsGradient ? theme.numberFill : undefined,
        backgroundClip: theme.numberIsGradient ? "text" : undefined,
        WebkitBackgroundClip: theme.numberIsGradient ? "text" : undefined,
        textShadow: theme.glows && !theme.numberIsGradient
          ? `0 0 14px ${theme.numberFill}`
          : undefined,
      }}
    >
      {STREAK_DAYS}
    </motion.span>
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
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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

      {layout === "graph" ? (
        <div className="flex h-full flex-col justify-between p-3.5">
          <div className="flex min-h-0 flex-1 items-center">
            <Grid theme={theme} />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] leading-none">🔥</span>
              <StreakNumber theme={theme} className="text-[13px] font-semibold leading-none" />
            </div>
            <div className="flex items-center gap-1.5">
              <StatusDot theme={theme} />
              <motion.span
                className="text-[10px] leading-none"
                animate={{ color: theme.secondaryText }}
                transition={{ duration: 0.4 }}
              >
                committed today
              </motion.span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-stretch gap-3.5 p-3.5">
          <div className="flex flex-col justify-center">
            <span className="mb-1 text-[15px] leading-none">🔥</span>
            <StreakNumber theme={theme} className="text-[44px] font-bold leading-[0.9] tracking-tight" />
            <motion.span
              className="mt-1 text-[12px] leading-none"
              animate={{ color: theme.secondaryText }}
              transition={{ duration: 0.4 }}
            >
              day streak
            </motion.span>
            <div className="mt-2 flex items-center gap-1.5">
              <StatusDot theme={theme} />
              <motion.span
                className="text-[9px] leading-none"
                animate={{ color: theme.secondaryText }}
                transition={{ duration: 0.4 }}
              >
                committed today
              </motion.span>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <Grid theme={theme} dense />
          </div>
        </div>
      )}
    </motion.div>
  );
}
