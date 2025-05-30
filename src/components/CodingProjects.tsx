// src/components/CodingProjects.tsx
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const CodingProjects: React.FC = () => (
  <section id="projects" className="min-h-screen pt-28 pb-16 text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
      Projects
    </h1>
    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    My journey through hands on learning and research.
                </p>

    <div className="mx-auto mt-20 grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 px-4">
      {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
    </div>
  </section>
);

export default CodingProjects;
