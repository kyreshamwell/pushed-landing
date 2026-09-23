"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";

/**
 * The demo video, in a phone-shaped frame.
 *
 * It holds a poster frame and nothing else until someone asks for it:
 * `preload="none"` means the 7MB of video is never fetched on page load. The
 * first play comes from a real click, so the browser lets it start with sound,
 * which matters because the video is narrated.
 */
export function DemoVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function start() {
    setPlaying(true);
    video.current?.play();
  }

  function reset() {
    setPlaying(false);
    // Reloading restores the poster, which a finished video would otherwise
    // replace with its last frame.
    video.current?.load();
  }

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[349px]">
      <div className="h-full w-full overflow-hidden rounded-[34px] bg-surface-raised p-[5px] ring-1 ring-edge">
        <video
          ref={video}
          poster="/pushed-demo-poster.jpg"
          preload="none"
          playsInline
          controls={playing}
          onEnded={reset}
          onPause={() => video.current?.ended && reset()}
          className="h-full w-full rounded-[29px] object-cover"
        >
          <source src="/pushed-demo.mp4" type="video/mp4" />
          Your browser cannot play this video.
        </video>
      </div>

      {!playing && (
        <motion.button
          type="button"
          onClick={start}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="group absolute inset-0 flex items-center justify-center rounded-[34px]"
          aria-label="Play the demo video, 43 seconds, with sound"
        >
          <span className="absolute inset-[5px] rounded-[29px] bg-surface/25 transition-colors group-hover:bg-surface/10" />
          <motion.span
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-ink shadow-[0_8px_40px_-6px_rgba(0,0,0,0.7)]"
          >
            <svg viewBox="0 0 24 24" className="ml-[3px] h-6 w-6 fill-surface" aria-hidden="true">
              <path d="M8 5.14v13.72a.5.5 0 0 0 .77.42l10.28-6.86a.5.5 0 0 0 0-.84L8.77 4.72a.5.5 0 0 0-.77.42Z" />
            </svg>
          </motion.span>
        </motion.button>
      )}
    </div>
  );
}
