"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

/**
 * Nudges its child toward the cursor while hovered, then springs back.
 * Renders a plain wrapper when reduced motion is requested.
 */
export function Magnetic({
  children,
  className,
  /** How far the element may travel, as a fraction of cursor offset. */
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
