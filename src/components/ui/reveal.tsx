"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  /** Where the element travels from. */
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  /** Re-run the animation every time it scrolls into view. */
  repeat?: boolean;
};

/**
 * Scroll-triggered entrance. Collapses to a plain fade when the visitor
 * has asked for reduced motion.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  repeat = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = reduced ? offsets.none : offsets[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !repeat, margin: "-80px" }}
      transition={{
        duration: reduced ? 0.2 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent for staggered children. Pair with <RevealItem />.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: reduced ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const reduced = useReducedMotion();
  const offset = reduced ? offsets.none : offsets[direction];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: reduced ? 0.2 : 0.6,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
