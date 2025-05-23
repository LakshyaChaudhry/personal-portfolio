//import react from 'react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project}) => {
    return (
        <div className="relative cursor-pointer">
            <div className = "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-48">
                <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                </h3>
                <p className="text-gray-300">
                    {project.shortDescription}
                </p>
            </div>
        </div>
    )
}

export default ProjectCard;

