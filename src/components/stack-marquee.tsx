import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Two infinite marquee rows moving in opposite directions.
 * Each row renders its items twice so the -50% translation loops seamlessly.
 */
export function StackMarquee() {
  const half = Math.ceil(site.stack.length / 2);
  const rows = [site.stack.slice(0, half), site.stack.slice(half)];

  return (
    <section className="relative border-y border-white/6 py-14">
      <div className="mask-fade-x space-y-4">
        {rows.map((row, index) => (
          <MarqueeRow
            key={index}
            items={row}
            reverse={index % 2 === 1}
            duration={index === 0 ? 46 : 38}
          />
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: readonly string[];
  reverse: boolean;
  duration: number;
}) {
  return (
    <div className="group flex overflow-hidden">
      <div
        className={cn(
          "marquee-track flex shrink-0 group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-3 pr-3"
          >
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/8 bg-white/3 px-5 py-2.5 text-sm whitespace-nowrap text-mist transition-colors duration-300 hover:border-glow/40 hover:text-chalk"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
