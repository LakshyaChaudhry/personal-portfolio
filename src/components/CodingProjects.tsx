//import react from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const CodingProjects: React.FC = () => {
    return (
        <div className="page-section">
            <h1 className="text-5xl font-bold text-white text-center mb-12">
                Projects
            </h1>

            <div className="projects-grid">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>  
        </div>
    );
};

export default CodingProjects;