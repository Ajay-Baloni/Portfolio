"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";

const FINE_POINTER = "(pointer: fine)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Touch devices and the server both report false, so hydration matches. */
function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

/**
 * A soft light that trails the pointer across the whole page.
 * Skipped entirely on touch devices and under reduced-motion.
 */
export function CursorGlow() {
  const reduced = useReducedMotion();
  const enabled = useFinePointer();

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const springX = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!enabled || reduced) return;

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed top-0 left-0 z-30 hidden h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-glow/12 to-transparent to-70% blur-2xl md:block"
    />
  );
}
