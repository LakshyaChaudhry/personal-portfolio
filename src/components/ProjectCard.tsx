import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {/* Regular Card with Motion */}
            <motion.div 
                className="project-card" 
                onClick={() => setIsExpanded(true)}
                whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                layout
            >
                <div className="project-card-gradient" />
                
                <div className="project-card-content">
                    <h3 className="project-title">
                        {project.title}
                    </h3>
                    <p className="project-description">
                        {project.shortDescription}
                    </p>

                    <div className="project-technologies">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                            <motion.span 
                                key={i} 
                                className="tech-tag"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="tech-tag">+{project.technologies.length - 3}</span>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Expanded View with AnimatePresence for exit animations */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Animated Backdrop */}
                        <motion.div 
                            className="modal-backdrop" 
                            onClick={() => setIsExpanded(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        {/* Animated Modal Container */}
                        <motion.div 
                            className="modal-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Animated Modal Content with Gradient Inside */}
                            {/* Animated Modal Content */}
                            <motion.div 
                                className="modal-content"
                                initial={{ 
                                    scale: 0.8, 
                                    opacity: 0,
                                    y: 50,
                                    rotateX: -15
                                }}
                                animate={{ 
                                    scale: 1, 
                                    opacity: 1,
                                    y: 0,
                                    rotateX: 0
                                }}
                                exit={{ 
                                    scale: 0.8, 
                                    opacity: 0,
                                    y: -50,
                                    rotateX: 15
                                }}
                                transition={{ 
                                    duration: 0.5, 
                                    ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
                                }}
                                whileHover={{ 
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {/* Animated Gradient Background - Now inside modal content */}
                                <motion.div 
                                    className="modal-gradient"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 0.4 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                                {/* Animated Close Button */}
                                <motion.button 
                                    className="modal-close-btn"
                                    onClick={() => setIsExpanded(false)}
                                    whileHover={{ 
                                        scale: 1.2, 
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    ✕
                                </motion.button>

                                {/* Animated Title */}
                                <motion.h2 
                                    className="modal-title"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    {project.title}
                                </motion.h2>

                                {/* Animated Description */}
                                <motion.p 
                                    className="modal-description"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                >
                                    {project.fullDescription}
                                </motion.p>

                                {/* Animated Technology Section */}
                                <motion.div 
                                    className="modal-tech-section"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.4 }}
                                >
                                    <h3 className="modal-section-title">Technologies</h3>
                                    <div className="modal-tech-list">
                                        {project.technologies.map((tech, i) => (
                                            <motion.span 
                                                key={i} 
                                                className="modal-tech-tag"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ 
                                                    delay: 0.5 + (i * 0.1), 
                                                    duration: 0.3 
                                                }}
                                                whileHover={{ 
                                                    scale: 1.1,
                                                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                                                    transition: { duration: 0.15 } // Fast hover response
                                                }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Animated Links */}
                                <motion.div 
                                    className="modal-links"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.4 }}
                                >
                                    <motion.a 
                                        href={project.githubLink} 
                                        className="modal-btn modal-btn-secondary"
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        whileHover={{ 
                                            y: -4,
                                            scale: 1.05,
                                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        View on GitHub
                                    </motion.a>
                                    {project.liveLink && (
                                        <motion.a 
                                            href={project.liveLink} 
                                            className="modal-btn modal-btn-primary"
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            whileHover={{ 
                                                y: -4,
                                                scale: 1.05,
                                                boxShadow: "0 10px 25px rgba(124, 58, 237, 0.4)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Live Demo
                                        </motion.a>
                                    )}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectCard;