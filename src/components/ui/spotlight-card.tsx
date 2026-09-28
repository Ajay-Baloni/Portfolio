"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import type { MouseEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Radius of the cursor-following highlight, in pixels. */
  radius?: number;
};

/**
 * Card whose border and surface light up around the cursor. The highlight is
 * driven by motion values so it never triggers a React re-render.
 */
export function SpotlightCard({
  children,
  className,
  radius = 340,
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const reduced = useReducedMotion();

  const border = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(124,92,255,0.55), rgba(34,211,238,0.18) 40%, transparent 70%)`;
  const surface = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(124,92,255,0.10), transparent 65%)`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  }

  function handleLeave() {
    mouseX.set(-9999);
    mouseY.set(-9999);
  }

  return (
    <div
      onMouseMove={reduced ? undefined : handleMove}
      onMouseLeave={reduced ? undefined : handleLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/8 bg-surface/60 transition-colors duration-300 hover:border-white/15",
        className,
      )}
    >
      {/* Glowing border: a gradient layer masked to a 1px inset ring. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: border,
          padding: 1,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Soft interior wash. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: surface }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
