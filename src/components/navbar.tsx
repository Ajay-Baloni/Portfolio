"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const sectionIds = site.nav.map((item) => item.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Highlight whichever section owns the middle of the viewport.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock scrolling behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6"
      >
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "glass border border-white/8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]"
              : "border border-transparent",
          )}
        >
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          >
            <span className="relative grid size-8 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-glow to-glow-cyan text-[13px] font-bold text-white">
              {site.shortName.charAt(0)}
              <span className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/15" />
            </span>
            <span className="hidden text-chalk sm:inline">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
                      isActive
                        ? "text-chalk"
                        : "text-mist hover:text-chalk",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/8"
                        transition={{ type: "spring", stiffness: 340, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-chalk transition-colors duration-200 hover:border-white/20 hover:bg-white/10 sm:flex"
            >
              Résumé
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-chalk transition-colors hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              className="flex h-full flex-col items-center justify-center gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {site.nav.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-3 text-3xl font-medium tracking-tight text-chalk"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-6"
              >
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-base text-chalk"
                >
                  Résumé
                  <ArrowUpRight className="size-4" />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
