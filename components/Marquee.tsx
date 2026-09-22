"use client";

import { useAnimationFrame, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { screenshots } from "@/lib/site";

/** How fast the band drifts on its own, in pixels per second. */
const SPEED = 26;
/** Three copies of the list, so there is a full copy of room either way. */
const COPIES = 3;

/**
 * A band of screenshots that drifts by on its own and is also a real scroll
 * container: hovering stops the drift, and you can then drag it with a mouse,
 * swipe it on a touchscreen or scroll it with a trackpad. It wraps in both
 * directions, so it never runs out either way.
 */
export function Marquee() {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, scroll: 0 });
  const reduced = useReducedMotion();

  /**
   * The distance from one copy of the list to the next. Measured between two
   * items rather than taken from scrollWidth, which leaves out the gap after
   * the last item and would put every wrap one gap out of place.
   */
  const period = useRef(0);

  const measure = useCallback(() => {
    const el = scroller.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const second = el?.children[screenshots.length] as HTMLElement | undefined;
    if (first && second) period.current = second.offsetLeft - first.offsetLeft;
  }, []);

  /** Keep the scroll position inside the middle copy. */
  const wrap = useCallback(() => {
    const el = scroller.current;
    const copy = period.current;
    if (!el || copy <= 0) return;
    if (el.scrollLeft >= copy * 2) el.scrollLeft -= copy;
    else if (el.scrollLeft <= 0) el.scrollLeft += copy;
  }, []);

  // Start in the middle copy so there is room to scroll backwards too.
  useEffect(() => {
    measure();
    const el = scroller.current;
    if (el) el.scrollLeft = period.current;

    // Item widths change at the sm breakpoint, so the period does too.
    const onResize = () => {
      const before = period.current;
      measure();
      if (el && before > 0 && period.current > 0) {
        el.scrollLeft = (el.scrollLeft / before) * period.current;
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  useAnimationFrame((_, delta) => {
    const el = scroller.current;
    if (!el || reduced || paused.current || dragging.current) return;
    // delta can spike after a background tab wakes up; cap it so the band
    // does not lurch forward.
    el.scrollLeft += (SPEED * Math.min(delta, 50)) / 1000;
    wrap();
  });

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    // Touch and pen already scroll this natively; only take over for a mouse.
    if (event.pointerType !== "mouse" || !scroller.current) return;
    dragging.current = true;
    dragStart.current = { x: event.clientX, scroll: scroller.current.scrollLeft };
    scroller.current.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current || !scroller.current) return;
    scroller.current.scrollLeft =
      dragStart.current.scroll - (event.clientX - dragStart.current.x);
    wrap();
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current || !scroller.current) return;
    dragging.current = false;
    scroller.current.releasePointerCapture(event.pointerId);
  }

  const track = Array.from({ length: COPIES }, () => screenshots).flat();

  return (
    <div
      ref={scroller}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={(event) => {
        paused.current = false;
        endDrag(event);
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onScroll={wrap}
      className="flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain select-none active:cursor-grabbing sm:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {track.map((shot, i) => (
        <div
          key={`${shot.src}-${i}`}
          className="w-[190px] shrink-0 overflow-hidden border border-edge bg-surface-raised sm:w-[250px]"
        >
          <Image
            src={shot.src}
            alt={i < screenshots.length ? shot.alt : ""}
            aria-hidden={i >= screenshots.length}
            width={660}
            height={1434}
            sizes="(max-width: 640px) 190px, 250px"
            draggable={false}
            className="pointer-events-none h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}
