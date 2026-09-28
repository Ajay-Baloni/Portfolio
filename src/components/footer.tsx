import { ArrowUp } from "lucide-react";

import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/6 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-dim">
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>

        <a
          href="#home"
          className="group inline-flex items-center gap-2 font-mono text-xs text-dim transition-colors hover:text-chalk"
        >
          Back to top
          <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
