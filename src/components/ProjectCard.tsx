import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        layout
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        onClick={() => setOpen(true)}
        className="group relative cursor-pointer"
      >
        <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 
                      bg-white dark:bg-gray-900 p-6 
                      shadow-sm hover:shadow-xl 
                      transition-all duration-300">
          <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-medium rounded-full
                         bg-gray-100 dark:bg-gray-800 
                         text-gray-700 dark:text-gray-300
                         transition-colors duration-200"
              >
                {t}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full
                             bg-gray-100 dark:bg-gray-800 
                             text-gray-700 dark:text-gray-300">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            >
              {/* Modal Panel */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto 
                         rounded-2xl border border-gray-200 dark:border-gray-800 
                         bg-white dark:bg-gray-900 p-8 
                         shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center 
                           rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
                           text-gray-500 dark:text-gray-400 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <h2 className="mb-4 pr-12 text-3xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                  {project.fullDescription}
                </p>

                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-2 text-sm font-medium rounded-full
                                 bg-gray-100 dark:bg-gray-800 
                                 text-gray-700 dark:text-gray-300
                                 transition-colors duration-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                             bg-gray-900 dark:bg-white 
                             text-white dark:text-gray-900 
                             font-medium transition-all duration-200
                             hover:scale-105 hover:shadow-lg"
                  >
                    <Github size={18} />
                    View on GitHub
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                               bg-blue-600 text-white font-medium 
                               transition-all duration-200
                               hover:scale-105 hover:shadow-lg"
                    >
                      <ExternalLink size={18} />
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
