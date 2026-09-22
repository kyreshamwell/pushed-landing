"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * A heading whose words rise into place one after another. Each word gets a
 * clipping row so the letters slide up from behind an edge rather than
 * fading in on the spot.
 */
export function SplitHeading({
  text,
  accentFrom,
  className = "",
  delay = 0,
}: {
  text: string;
  /** Index of the first word to paint in the accent green. */
  accentFrom?: number;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={
              accentFrom !== undefined && i >= accentFrom
                ? { color: "var(--color-level-4)" }
                : undefined
            }
          >
            {word}
            {i < words.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** The same rise, for anything that is not a heading. */
export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
