import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small mono label above the title, e.g. "01 — About". */
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-dim uppercase">
          <span className="h-px w-8 bg-gradient-to-r from-glow to-glow-cyan" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-5 text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.14}>
          <p className="mt-5 text-lg leading-relaxed text-mist text-pretty">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
