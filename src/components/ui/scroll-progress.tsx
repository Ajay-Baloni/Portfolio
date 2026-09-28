"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient bar pinned to the top of the viewport tracking read progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-100 h-0.5 origin-left bg-gradient-to-r from-glow via-glow-cyan to-glow-pink"
    />
  );
}
