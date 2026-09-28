import { cn } from "@/lib/utils";

/**
 * Decorative background: drifting colour blobs over a masked grid.
 * Pure CSS so it costs nothing on the client bundle.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />

      <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 animate-drift rounded-full bg-glow/22 blur-[130px]" />
      <div className="absolute top-24 -right-32 h-[34rem] w-[34rem] animate-drift-slow rounded-full bg-glow-cyan/16 blur-[120px]" />
      <div className="absolute -bottom-40 -left-24 h-[32rem] w-[32rem] animate-drift rounded-full bg-glow-pink/12 blur-[120px]" />

      {/* Vignette so text never sits on a hot spot. */}
      <div className="absolute inset-0 bg-radial-[at_50%_0%] from-transparent to-ink to-75%" />
    </div>
  );
}

/** Smaller, dimmer variant for sections below the fold. */
export function AuroraSpot({
  className,
  color = "glow",
}: {
  className?: string;
  color?: "glow" | "cyan" | "pink";
}) {
  const tone = {
    glow: "bg-glow/12",
    cyan: "bg-glow-cyan/10",
    pink: "bg-glow-pink/10",
  }[color];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 h-[30rem] w-[30rem] animate-drift-slow rounded-full blur-[130px]",
        tone,
        className,
      )}
    />
  );
}
