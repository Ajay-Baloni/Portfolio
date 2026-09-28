import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { StackMarquee } from "@/components/stack-marquee";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="relative">
        <Hero />
        <StackMarquee />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
