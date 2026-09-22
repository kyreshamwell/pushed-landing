"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { buildGrid } from "@/lib/grid";

const COLS = 52;
const ROWS = 7;
const STREAK = 21;
/** A real year has plenty of quiet days. */
const cells = buildGrid(COLS, ROWS, STREAK, 0.52);

const LEVELS = ["#15181d", "#0e4429", "#006d32", "#26a641", "#39d353"] as const;

/**
 * The hero's contribution grid. It cascades in on load, then lights up a
 * square every so often, so the page has a pulse without asking for
 * attention.
 */
export function HeroGrid({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) return;

    // Only the quieter squares get to flare, so the streak tail stays steady.
    const candidates = cells
      .filter((c) => c.level <= 2 && c.index < cells.length - STREAK * ROWS)
      .map((c) => c.index);

    const tick = window.setInterval(() => {
      const next = candidates[Math.floor(Math.random() * candidates.length)];
      setLit(next);
      window.setTimeout(() => setLit(null), 900);
    }, 1400);

    return () => window.clearInterval(tick);
  }, [reduced]);

  return (
    <div
      className={`grid grid-flow-col grid-rows-7 gap-[2px] sm:gap-[3px] ${className}`}
      aria-hidden="true"
    >
      {cells.map((cell) => {
        const isLit = lit === cell.index;
        return (
          <motion.span
            key={cell.index}
            className="aspect-square w-full rounded-[1px]"
            initial={reduced ? false : { opacity: 0, scale: 0.4 }}
            animate={{
              opacity: 1,
              scale: isLit ? 1.25 : 1,
              backgroundColor: isLit ? LEVELS[4] : LEVELS[cell.level],
              boxShadow: isLit
                ? `0 0 14px ${LEVELS[4]}, 0 0 4px ${LEVELS[4]}`
                : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={
              isLit
                ? { duration: 0.28, ease: "easeOut" }
                : {
                    opacity: { duration: 0.42, delay: cell.col * 0.014 + cell.row * 0.01 },
                    scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    backgroundColor: { duration: 0.7 },
                    boxShadow: { duration: 0.7 },
                  }
            }
          />
        );
      })}
    </div>
  );
}
