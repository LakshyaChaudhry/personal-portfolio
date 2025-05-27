// src/components/CodingProjects.tsx
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const CodingProjects: React.FC = () => (
  <section id="projects" className="min-h-screen pt-28 pb-16 text-center">
    <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl">
      Projects
    </h1>

    <div className="mx-auto mt-20 grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 px-4">
      {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
    </div>
  </section>
);

export default CodingProjects;
