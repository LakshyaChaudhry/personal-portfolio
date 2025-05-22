// src/components/ProjectCard.tsx
import { useState} from "react";
import type { MouseEvent } from "react";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence} from "framer-motion";
import type { project } from "../data/projects.tsx";

interface ProjectCardProps {
  project: project;
  accent?: string;          // default falls back to logo blue
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Styling helpers                                                           */
/* ────────────────────────────────────────────────────────────────────────── */

const CARD_BASE =
  "group cursor-pointer select-none rounded-2xl p-6 backdrop-blur-md " +
  "border border-white/20 bg-white/5 transition-shadow duration-300 " +
  "hover:shadow-xl";

const TAG_STYLE =
  "rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 whitespace-nowrap";

/* ────────────────────────────────────────────────────────────────────────── */
/* Animation presets                                                         */
/* ────────────────────────────────────────────────────────────────────────── */

const bodyVariants: Variants = {
  collapsed: { opacity: 0, height: 0 },
  expanded:  { opacity: 1, height: "auto" },
};

/* ────────────────────────────────────────────────────────────────────────── */
/* Component                                                                 */
/* ────────────────────────────────────────────────────────────────────────── */

export default function ProjectCard({
  project,
  accent = "#0D6EFD",
}: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // Keep ⌘/Ctrl-click on the “Repo” link from toggling the card
  const stopBounce = (e: MouseEvent) => e.stopPropagation();

  return (
    <motion.article
      layout
      role="button"
      aria-expanded={isOpen}
      onClick={toggle}
      className={CARD_BASE}
      style={{
        boxShadow: isOpen
          ? `0 0 0 2px ${accent}, 0 10px 25px -5px rgb(0 0 0 / .2)`
          : undefined,
      }}
    >
      {/* Header — always visible */}
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <span
          className="h-2 w-2 rounded-full transition-colors"
          style={{ background: isOpen ? accent : "transparent" }}
        />
      </header>

      <p className="mt-2 text-sm text-white/60">{project.tagline}</p>

      {/* Body — toggles in & out */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            variants={bodyVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {project.description}
            </p>

            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className={TAG_STYLE}>
                  {tech}
                </li>
              ))}
            </ul>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-medium underline underline-offset-2"
                style={{ color: accent }}
                onClick={stopBounce}
              >
                Repo ↗
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
