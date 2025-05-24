import React, { useState } from 'react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {/* Regular Card - What users see initially */}
            <div 
                className="project-card" 
                onClick={() => setIsExpanded(true)}
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
                            <span key={i} className="tech-tag">{tech}</span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="tech-tag">+{project.technologies.length - 3}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Expanded View - Only shows when isExpanded is true */}
            {isExpanded && (
                <>
                    {/* Dark Backdrop - Click to close */}
                    <div 
                        className="modal-backdrop" 
                        onClick={() => setIsExpanded(false)}
                    />
                    
                    {/* Expanded Content Modal */}
                    <div className="modal-container">
                        {/* Gradient effect for expanded modal */}
                        <div className="modal-gradient" />
                        
                        <div className="modal-content">
                            {/* Close Button */}
                            <button 
                                className="modal-close-btn"
                                onClick={() => setIsExpanded(false)}
                            >
                                ✕
                            </button>

                            {/* Title */}
                            <h2 className="modal-title">
                                {project.title}
                            </h2>

                            {/* Full Description */}
                            <p className="modal-description">
                                {project.fullDescription}
                            </p>

                            {/* All Technologies */}
                            <div className="modal-tech-section">
                                <h3 className="modal-section-title">Technologies</h3>
                                <div className="modal-tech-list">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="modal-tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="modal-links">
                                <a 
                                    href={project.githubLink} 
                                    className="modal-btn modal-btn-secondary"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    View on GitHub
                                </a>
                                {project.liveLink && (
                                    <a 
                                        href={project.liveLink} 
                                        className="modal-btn modal-btn-primary"
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProjectCard;