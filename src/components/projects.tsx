import { site } from "@/config/site";
import { AuroraSpot } from "@/components/ui/aurora";
import { CompactProject, FeaturedProject } from "@/components/project-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects() {
  const featured = site.projects.filter((project) => project.featured);
  const rest = site.projects.filter((project) => !project.featured);

  return (
    <section
      id="work"
      className="relative overflow-x-clip px-6 py-28 sm:py-36"
    >
      <AuroraSpot className="top-1/3 -right-40" color="cyan" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="02 — Selected work"
          title="Things I've built and shipped."
          description="A few projects that show how I think about product, performance and the details in between."
        />

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {featured.map((project, index) => (
            <Reveal key={project.title} direction="up" duration={0.7}>
              <FeaturedProject project={project} index={index} />
            </Reveal>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-28">
            <Reveal>
              <h3 className="font-mono text-xs tracking-[0.2em] text-dim uppercase">
                Also worth a look
              </h3>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2" stagger={0.1}>
              {rest.map((project) => (
                <RevealItem key={project.title}>
                  <CompactProject project={project} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </section>
  );
}
