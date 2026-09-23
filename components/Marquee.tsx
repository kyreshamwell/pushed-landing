"use client";

import { useAnimationFrame, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { screenshots } from "@/lib/site";

/** How fast the band drifts on its own, in pixels per second. */
const SPEED = 58;
/** Copies of the list in the track, so there is room to move either way. */
const COPIES = 3;
/** How quickly a flick decays after you let go, per 60fps frame. */
const FRICTION = 0.94;

/**
 * A band of screenshots that drifts by on its own and can also be grabbed.
 *
 * The position is a float driven onto a transform rather than onto
 * scrollLeft: browsers snap scroll offsets to whole device pixels, so a slow
 * drift lands as 0px, 1px, 0px, 1px per frame and visibly stutters.
 * Transforms move at sub-pixel precision on the compositor, so the same speed
 * reads as smooth.
 */
export function Marquee() {
  const frame = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /** Current translate, always kept in (-period, 0]. */
  const offset = useRef(0);
  /** Distance from one copy of the list to the next. */
  const period = useRef(0);
  const paused = useRef(false);
  const dragging = useRef(false);
  const dragFrom = useRef({ pointer: 0, offset: 0 });
  /** Pixels per second carried over from a flick. */
  const velocity = useRef(0);
  const lastMove = useRef({ x: 0, at: 0 });

  /**
   * Measured between two matching items rather than taken from the track's
   * width, which leaves out the gap after the last item and would put every
   * wrap one gap out of place.
   */
  const measure = useCallback(() => {
    const kids = track.current?.children;
    const first = kids?.[0] as HTMLElement | undefined;
    const next = kids?.[screenshots.length] as HTMLElement | undefined;
    if (first && next) period.current = next.offsetLeft - first.offsetLeft;
  }, []);

  /** Fold the offset back into one period, however far it has travelled. */
  const wrap = useCallback(() => {
    const span = period.current;
    if (span <= 0) return;
    let next = offset.current % span;
    if (next > 0) next -= span;
    offset.current = next;
  }, []);

  const paint = useCallback(() => {
    if (track.current) {
      track.current.style.transform = `translate3d(${offset.current}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    measure();
    paint();
    // Item widths change at the sm breakpoint, so the period does too.
    const onResize = () => {
      measure();
      wrap();
      paint();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure, paint, wrap]);

  useAnimationFrame((_, delta) => {
    if (reduced || dragging.current) return;
    // delta spikes when a background tab wakes up; cap it so the band does
    // not lurch forward.
    const step = Math.min(delta, 50);
    const seconds = step / 1000;

    if (Math.abs(velocity.current) > 2) {
      offset.current += velocity.current * seconds;
      velocity.current *= Math.pow(FRICTION, step / 16.67);
    } else if (!paused.current) {
      velocity.current = 0;
      offset.current -= SPEED * seconds;
    } else {
      return;
    }

    wrap();
    paint();
  });

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    velocity.current = 0;
    dragFrom.current = { pointer: event.clientX, offset: offset.current };
    lastMove.current = { x: event.clientX, at: performance.now() };
    frame.current?.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    offset.current =
      dragFrom.current.offset + (event.clientX - dragFrom.current.pointer);

    const now = performance.now();
    const elapsed = now - lastMove.current.at;
    if (elapsed > 0) {
      velocity.current = ((event.clientX - lastMove.current.x) / elapsed) * 1000;
    }
    lastMove.current = { x: event.clientX, at: now };

    wrap();
    paint();
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    // A flick that ended a moment ago should not keep throwing the band.
    if (performance.now() - lastMove.current.at > 90) velocity.current = 0;
    frame.current?.releasePointerCapture(event.pointerId);
  }

  /** Sideways trackpad swipes, which never become pointer events. */
  function onWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    velocity.current = 0;
    offset.current -= event.deltaX;
    wrap();
    paint();
  }

  const items = Array.from({ length: COPIES }, () => screenshots).flat();

  return (
    <div
      ref={frame}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={(event) => {
        paused.current = false;
        endDrag(event);
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      className="cursor-grab overflow-hidden select-none active:cursor-grabbing"
      style={{
        // Vertical swipes stay with the page; sideways ones come to us.
        touchAction: "pan-y",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        ref={track}
        className="flex w-max gap-4 will-change-transform sm:gap-5"
      >
        {items.map((shot, i) => (
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
    </div>
  );
}
