"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { WidgetPreview } from "@/components/WidgetPreview";
import { themeById, widgetThemes, type LayoutId, type StyleId } from "@/lib/widgetStyles";

const layouts: { id: LayoutId; name: string }[] = [
  { id: "graph", name: "Graph" },
  { id: "streak", name: "Big streak" },
];

const spring = { stiffness: 220, damping: 26, mass: 0.6 };

export function HeroWidget() {
  const [styleId, setStyleId] = useState<StyleId>("classic");
  const [layout, setLayout] = useState<LayoutId>("graph");
  const theme = themeById(styleId);

  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Pointer position across the card, -0.5 to 0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), spring);

  function track(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  }

  function release() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="w-full">
      <div
        ref={ref}
        onPointerMove={track}
        onPointerLeave={release}
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* The platter the widget sits on, like a Home Screen tile. */}
          <motion.div
            className="rounded-[26px] p-2"
            animate={{
              boxShadow: `0 40px 90px -34px ${theme.pushed}59, 0 0 0 1px rgba(255,255,255,0.05)`,
            }}
            transition={{ duration: 0.6 }}
          >
            <WidgetPreview theme={theme} layout={layout} />
          </motion.div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label">Style</span>
          <div className="h-px flex-1 bg-hairline" />
        </div>

        <div role="tablist" aria-label="Widget style" className="mt-3 flex flex-wrap gap-1">
          {widgetThemes.map((t) => {
            const active = t.id === styleId;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setStyleId(t.id)}
                className={`relative px-3 py-2 font-mono text-[12px] tracking-wide transition-colors ${
                  active ? "text-surface" : "text-ink-dim hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="style-chip"
                    className="absolute inset-0 bg-ink"
                    transition={{ type: "spring", stiffness: 480, damping: 40 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="h-2 w-2" style={{ background: t.swatch }} />
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-4">
          <span className="label">Layout</span>
          <div className="h-px flex-1 bg-hairline" />
        </div>

        <div role="tablist" aria-label="Widget layout" className="mt-3 flex gap-1">
          {layouts.map((l) => {
            const active = l.id === layout;
            return (
              <button
                key={l.id}
                role="tab"
                aria-selected={active}
                onClick={() => setLayout(l.id)}
                className={`relative px-3 py-2 font-mono text-[12px] tracking-wide transition-colors ${
                  active ? "text-surface" : "text-ink-dim hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="layout-chip"
                    className="absolute inset-0 bg-ink"
                    transition={{ type: "spring", stiffness: 480, damping: 40 }}
                  />
                )}
                <span className="relative z-10">{l.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 min-h-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={styleId}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-sm leading-relaxed text-ink-faint"
            >
              {theme.tagline}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
