import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { Github, ArrowUpRight, FileText } from 'lucide-react';

export default function Work() {
    const experience = projects.filter(p => p.category === 'experience');
    const projectItems = projects.filter(p => p.category === 'project');
    const publications = projects.filter(p => p.category === 'publication');

    const Card = ({ item, index }: { item: typeof projects[0], index: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col h-full bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-white/5 p-8 transition-all duration-500 rounded-sm hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-white/5 ring-1 ring-transparent hover:ring-black dark:hover:ring-white"
        >
            <div className="flex justify-between items-start mb-6">
                <span className="text-neutral-500 font-mono text-xs tracking-widest uppercase">
                    {item.category}
                </span>
                <div className="flex gap-3">
                    {item.githubLink && (
                        <a href={item.githubLink} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                            <Github size={18} />
                        </a>
                    )}
                    {item.liveLink && (
                        <a href={item.liveLink} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                            <ArrowUpRight size={18} />
                        </a>
                    )}
                    {item.paperLink && (
                        <a href={item.paperLink} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                            <FileText size={18} />
                        </a>
                    )}
                </div>
            </div>

            <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                {item.title}
            </h3>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-light leading-relaxed flex-grow">
                {item.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-neutral-200 dark:border-white/5">
                {item.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="text-[10px] uppercase tracking-wider font-mono text-neutral-500">
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );

    return (
        <section id="work" className="py-32">
            {/* Experience (Timeline) */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-16 px-4 md:px-0">
                    <h2 className="text-[10vw] leading-[0.8] font-bold tracking-tighter text-neutral-200 dark:text-neutral-800 select-none">
                        WORK
                    </h2>
                </div>

                <div className="space-y-12">
                    {experience.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-8 border-l border-neutral-200 dark:border-white/10 pl-8 ml-4 md:ml-0"
                        >
                            <div className="md:col-span-3 text-neutral-500 font-mono text-sm pt-1">
                                {item.period}
                            </div>
                            <div className="md:col-span-9">
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{item.title}</h3>
                                <div className="text-neutral-500 dark:text-neutral-400 mb-4 font-medium">{item.role}</div>
                                {/* Description removed per request */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {item.technologies.map(tech => (
                                        <span key={tech} className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-white/10 px-2 py-1 rounded-full">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Projects */}
            <div id="projects" className="mb-32">
                <div className="flex items-end justify-between mb-16 px-4 md:px-0">
                    <h2 className="text-[8vw] leading-[0.8] font-bold tracking-tighter text-neutral-200 dark:text-neutral-800 select-none">
                        PROJECTS
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projectItems.map((project, index) => (
                        <Card key={project.id} item={project} index={index} />
                    ))}
                </div>
            </div>

            {/* Publications */}
            {publications.length > 0 && (
                <div>
                    <div className="flex items-end justify-between mb-16 px-4 md:px-0">
                        <h2 className="text-[6vw] leading-[0.8] font-bold tracking-tighter text-neutral-200 dark:text-neutral-800 select-none">
                            RESEARCH
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {publications.map((pub) => (
                            <motion.div
                                key={pub.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group border border-neutral-200 dark:border-white/10 p-8 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{pub.title}</h3>
                                        <p className="text-neutral-600 dark:text-neutral-400 font-light">{pub.shortDescription}</p>
                                    </div>
                                    {pub.githubLink && (
                                        <a href={pub.githubLink} className="text-neutral-400 hover:text-black dark:hover:text-white">
                                            <ArrowUpRight />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
