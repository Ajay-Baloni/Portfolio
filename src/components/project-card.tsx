"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { MouseEvent } from "react";

import type { Project } from "@/config/site";
import { GithubIcon } from "@/components/ui/icons";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

/** Large alternating card used for the projects marked `featured`. */
export function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flipped = index % 2 === 1;

  return (
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <div className={cn(flipped && "lg:order-2")}>
        <ProjectVisual project={project} index={index} />
      </div>

      <div className={cn(flipped && "lg:order-1")}>
        <div className="flex items-center gap-3 font-mono text-xs tracking-wide text-dim uppercase">
          <span>{project.year}</span>
          <span className="h-px w-6 bg-white/15" />
          <span>{project.role}</span>
        </div>

        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          {project.title}
        </h3>

        <p className="mt-4 leading-relaxed text-mist text-pretty">
          {project.blurb}
        </p>

        {project.highlights.length > 0 && (
          <ul className="mt-6 space-y-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2.5 text-sm text-mist"
              >
                <span className="size-1 rounded-full bg-glow-cyan" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/8 bg-white/4 px-3 py-1 font-mono text-xs text-mist"
            >
              {tag}
            </li>
          ))}
        </ul>

        <ProjectLinks project={project} className="mt-8" />
      </div>
    </article>
  );
}

/** Compact card for the secondary grid. */
export function CompactProject({ project }: { project: Project }) {
  return (
    <SpotlightCard className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
        <span className="font-mono text-xs text-dim">{project.year}</span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-mist text-pretty">
        {project.blurb}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/8 px-2.5 py-1 font-mono text-[11px] text-dim"
          >
            {tag}
          </li>
        ))}
      </ul>

      <ProjectLinks project={project} className="mt-6" compact />
    </SpotlightCard>
  );
}

function ProjectLinks({
  project,
  className,
  compact = false,
}: {
  project: Project;
  className?: string;
  compact?: boolean;
}) {
  if (!project.liveUrl && !project.repoUrl) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group inline-flex items-center gap-1.5 rounded-full font-medium transition-colors duration-200",
            compact
              ? "text-sm text-chalk hover:text-glow-cyan"
              : "bg-chalk px-5 py-2.5 text-sm text-ink hover:bg-white",
          )}
        >
          {compact ? "Live" : "Visit site"}
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}

      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group inline-flex items-center gap-1.5 font-medium transition-colors duration-200",
            compact
              ? "text-sm text-dim hover:text-chalk"
              : "rounded-full border border-white/12 px-5 py-2.5 text-sm text-chalk hover:border-white/25 hover:bg-white/5",
          )}
        >
          <GithubIcon className="size-4" />
          {compact ? "Code" : "Source"}
        </a>
      )}
    </div>
  );
}

/**
 * The project's image, or a generated gradient panel when none is set.
 * Tilts toward the cursor in 3D.
 */
function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * 12);
    rotateX.set(-py * 12);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  // Each project gets its own accent pairing.
  const gradients = [
    "from-glow/40 via-glow-cyan/20 to-transparent",
    "from-glow-cyan/35 via-glow/20 to-transparent",
    "from-glow-pink/35 via-glow/20 to-transparent",
    "from-glow/35 via-glow-pink/20 to-transparent",
  ];

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform }}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/8 bg-surface will-change-transform"
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              gradients[index % gradients.length],
            )}
          />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-mono text-[clamp(3rem,10vw,6rem)] font-bold text-white/10 select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-white/45 uppercase">
              {project.title}
            </span>
            <span className="rounded-full border border-white/12 bg-black/25 px-2.5 py-1 font-mono text-[10px] text-white/50 backdrop-blur">
              {project.tags[0]}
            </span>
          </div>
        </>
      )}

      {/* Glare that follows the tilt. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
