import type { Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="project-card">
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
    );
};

export default ProjectCard;