"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { useRef } from "react";

import { site } from "@/config/site";
import { Aurora } from "@/components/ui/aurora";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Content drifts up and dissolves as the next section arrives.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0]);

  const words = site.hero.headline.split(" ");

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden px-6 pt-28 pb-20"
    >
      <Aurora />

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl">
        {/* Availability badge */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 py-1.5 pr-4 pl-2.5 text-sm text-mist backdrop-blur transition-colors hover:border-white/20 hover:text-chalk"
        >
          <span className="size-1.5 animate-pulse-dot rounded-full bg-glow-cyan" />
          {site.availability}
          <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </motion.a>

        {/* Headline — each word rises out of its own clipping mask. */}
        <h1 className="mt-7 max-w-4xl text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
          {words.map((word, index) => {
            const clean = word.replace(/[^a-zA-Z]/g, "");
            const isAccent =
              clean.toLowerCase() === site.hero.accentWord.toLowerCase();

            return (
              <span
                key={`${word}-${index}`}
                className="inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <motion.span
                  className={cn("inline-block", isAccent && "text-gradient")}
                  initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    ease: EASE,
                    delay: 0.3 + index * 0.055,
                  }}
                >
                  {word}
                </motion.span>
                {index < words.length - 1 && <span>&nbsp;</span>}
              </span>
            );
          })}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 + words.length * 0.055 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-mist text-pretty"
        >
          {site.hero.subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.42 + words.length * 0.055 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-chalk px-6 py-3 text-sm font-medium text-ink transition-transform duration-200"
            >
              {/* Sheen sweeps across on hover. */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">View my work</span>
              <ArrowDown className="relative size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-medium text-chalk transition-colors duration-200 hover:border-white/25 hover:bg-white/5"
            >
              <Mail className="size-4" />
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        {/* Socials */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 + words.length * 0.055 }}
          className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm"
        >
          {site.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-dim transition-colors duration-200 hover:text-chalk"
              >
                {social.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-glow to-glow-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-dim">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
            Scroll
          </span>
          <span className="h-10 w-px animate-bob bg-gradient-to-b from-dim to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
