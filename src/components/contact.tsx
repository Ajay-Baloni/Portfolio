"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import { site } from "@/config/site";
import { AuroraSpot } from "@/components/ui/aurora";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the
      // mailto link beside this button still works.
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 sm:py-44"
    >
      <AuroraSpot className="-bottom-40 left-1/2 -translate-x-1/2" color="pink" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-30" />

      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-dim uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-glow" />
            04 — Contact
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-glow-cyan" />
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
            Have something you want <span className="text-gradient">built</span>?
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-mist text-pretty">
            I&apos;m open to full-time roles, contract work and the occasional
            interesting side project. Tell me what you&apos;re working on.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-chalk px-7 py-3.5 text-sm font-medium text-ink"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{site.email}</span>
                <ArrowUpRight className="relative size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3.5 text-sm font-medium text-chalk transition-colors duration-200 hover:border-white/25 hover:bg-white/5"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-4 text-glow-cyan" />
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="size-4" />
                    Copy email
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-dim transition-colors duration-200 hover:text-chalk"
                >
                  <span className="font-medium">{social.label}</span>
                  <span className="font-mono text-xs opacity-60">
                    {social.handle}
                  </span>
                  <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
