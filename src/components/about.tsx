import { site } from "@/config/site";
import { AuroraSpot } from "@/components/ui/aurora";
import { Counter } from "@/components/ui/counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-x-clip px-6 py-28 sm:py-36"
    >
      <AuroraSpot className="-top-20 -left-40" color="glow" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="01 — About" title={site.about.heading} />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="space-y-6">
            {site.about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="text-lg leading-relaxed text-mist text-pretty">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <dl className="flex flex-wrap gap-x-10 gap-y-4 pt-4 font-mono text-sm">
                <div>
                  <dt className="text-dim">Based in</dt>
                  <dd className="mt-1 text-chalk">{site.location}</dd>
                </div>
                <div>
                  <dt className="text-dim">Currently</dt>
                  <dd className="mt-1 text-chalk">{site.role}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="space-y-10">
            <RevealGroup className="grid grid-cols-2 gap-4">
              {site.stats.map((stat) => (
                <RevealItem key={stat.label}>
                  <SpotlightCard className="h-full p-5" radius={220}>
                    <div className="text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-2 text-sm leading-snug text-dim text-pretty">
                      {stat.label}
                    </div>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup className="space-y-3" stagger={0.1}>
              {site.expertise.map((group) => (
                <RevealItem key={group.title}>
                  <SpotlightCard className="p-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-medium text-chalk">{group.title}</h3>
                      <span className="font-mono text-xs text-dim">
                        {group.items.length} areas
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-dim text-pretty">
                      {group.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-xs text-mist"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
