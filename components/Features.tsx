"use client";

import { motion } from "motion/react";
import { features } from "@/lib/site";

/**
 * The feature list, set as numbered entries on hairline rules rather than a
 * grid of cards. Each row slides in from the left as it arrives.
 */
export function Features() {
  return (
    <ol className="mt-14 border-t border-hairline">
      {features.map((feature, i) => (
        <motion.li
          key={feature.title}
          className="group grid gap-x-8 gap-y-3 border-b border-hairline py-8 sm:grid-cols-[3rem_minmax(0,18rem)_1fr] sm:py-10"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[12px] text-level-3 transition-colors group-hover:text-level-4">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-pretty font-display text-xl font-medium leading-snug tracking-tight">
            {feature.title}
          </h3>
          <p className="text-pretty leading-relaxed text-ink-dim">{feature.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}
