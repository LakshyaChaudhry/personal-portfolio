// src/components/ProjectCard.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data/projects';

interface Props { project: Project }

const ProjectCard: React.FC<Props> = ({ project }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {/* ⤵ card */}
      <motion.div
        layout
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        onClick={() => setOpen(true)}
        className="group relative cursor-pointer transition-transform duration-300"
      >
        {/* glow */}
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-60" />

        {/* card body */}
        <div className="relative h-48 rounded-xl border border-white/20 bg-white/10 p-6 text-black backdrop-blur-lg">
          <h3 className="mb-2 text-2xl font-bold">{project.title}</h3>
          <p className="mb-4 text-gray-600">{project.shortDescription}</p>

          <div className="absolute bottom-4 left-6 right-6 flex gap-2">
            {project.technologies.slice(0, 3).map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.1 }}
                className="text-xs"
              >
                {t}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs">+{project.technologies.length - 3}</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* ⤵ modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/80"
            />

            {/* container */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-8 [perspective:1000px]"
            >
              {/* modal panel */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -15 }}
                animate={{ scale: 1,   opacity: 1, y: 0,  rotateX: 0  }}
                exit={{   scale: 0.8, opacity: 0, y: -50, rotateX: 15 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.02 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg [transform-style:preserve-3d]"
              >
                {/* inner glow */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.4 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 blur-[40px]"
                />

                {/* X button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-2xl text-white/60"
                >
                  ×
                </button>

                {/* content */}
                <h2 className="mb-4 pr-8 text-3xl font-bold text-white">
                  {project.title}
                </h2>
                <p className="mb-6 leading-relaxed text-gray-300">
                  {project.fullDescription}
                </p>

                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        className="cursor-pointer rounded-full bg-white/20 px-3 py-2 text-sm text-white"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-md bg-white/20 px-6 py-2 font-medium text-white transition hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
                  >
                    View on GitHub
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md bg-violet-600 px-6 py-2 font-medium text-white transition hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
