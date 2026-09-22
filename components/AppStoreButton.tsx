"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { site } from "@/lib/site";

function AppleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/**
 * The download button. It leans a little toward the cursor, which makes it
 * feel like a physical target rather than a rectangle.
 */
export function AppStoreButton({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function follow(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    setOffset({
      x: (event.clientX - (box.left + box.width / 2)) * 0.14,
      y: (event.clientY - (box.top + box.height / 2)) * 0.22,
    });
  }

  return (
    <motion.a
      ref={ref}
      href={site.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={follow}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`group relative inline-flex items-center gap-3 overflow-hidden bg-ink px-6 py-3.5 text-surface shadow-[0_0_0_rgba(57,211,83,0)] transition-shadow duration-500 hover:shadow-[0_0_50px_-8px_rgba(57,211,83,0.65)] ${className}`}
    >
      {/* A sheen that crosses the button on hover. */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <AppleLogo className="relative h-7 w-7 shrink-0" />
      <span className="relative text-left leading-tight">
        <span className="block text-[11px] font-medium tracking-wide opacity-70">
          Download on the
        </span>
        <span className="block font-display text-lg font-semibold tracking-tight">App Store</span>
      </span>
    </motion.a>
  );
}
