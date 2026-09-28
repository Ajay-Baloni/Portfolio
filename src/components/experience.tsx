"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { site } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);

  // The timeline spine fills in as the section scrolls past.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="03 — Experience"
          title="Where I've worked and studied."
        />

        <div ref={trackRef} className="relative mt-16 pl-8 sm:pl-12">
          {/* Track + animated fill */}
          <div className="absolute top-2 bottom-2 left-0 w-px bg-white/8 sm:left-1" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-0 w-px origin-top bg-gradient-to-b from-glow via-glow-cyan to-glow-pink sm:left-1"
          />

          <ol className="space-y-14">
            {site.experience.map((job, index) => (
              <li key={`${job.company}-${job.period}`} className="relative">
                {/* Node */}
                <span className="absolute top-1.5 -left-8 grid size-3 place-items-center sm:-left-[2.6rem]">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "backOut" }}
                    className="size-2.5 rounded-full bg-glow-cyan shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                  />
                </span>

                <Reveal delay={index * 0.06}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-xl font-medium tracking-tight text-chalk">
                      {job.role}
                      <span className="text-dim"> · </span>
                      <span className="text-gradient">{job.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-dim">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-xs text-dim">{job.location}</p>

                  <p className="mt-4 max-w-2xl leading-relaxed text-mist text-pretty">
                    {job.summary}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/8 bg-white/3 px-2.5 py-1 font-mono text-[11px] text-mist"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
