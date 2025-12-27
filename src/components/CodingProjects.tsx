// src/components/CodingProjects.tsx
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const CodingProjects: React.FC = () => (
  <section id="projects" className="min-h-screen py-20 px-4 
                                   bg-gray-50 dark:bg-gray-900 
                                   transition-colors duration-300">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 
                     transition-colors duration-300">
          Projects
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto 
                    transition-colors duration-300">
          My journey through hands-on learning and research
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  </section>
);

export default CodingProjects;
