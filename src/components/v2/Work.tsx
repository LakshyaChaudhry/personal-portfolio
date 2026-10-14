import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, Github } from 'lucide-react';
import { cardFaces, experienceRows } from '../../data/projects';
import type { CardFace } from '../../data/projects';

function TagList({ tags }: { tags: readonly string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-white/10 px-2 py-1 rounded-full"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}

function destinationAriaLabel(label: string, title: string, external: boolean): string {
    const name = `${label}: ${title}`;
    return external ? `${name} (opens in a new tab)` : name;
}

function DestinationIcon({ label }: { label: CardFace['activation']['label'] }) {
    switch (label) {
        case 'Writeup':
            return <ArrowUpRight size={14} aria-hidden="true" className="shrink-0" />;
        case 'Paper':
            return <FileText size={14} aria-hidden="true" className="shrink-0" />;
        case 'Code':
            return <Github size={14} aria-hidden="true" className="shrink-0" />;
        default: {
            const unexpected: never = label;
            return unexpected;
        }
    }
}

const activationClass =
    "after:absolute after:inset-0 after:content-[''] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:focus-visible:outline-white";

function Activation({ face }: { face: CardFace }) {
    const { activation, title } = face;
    const ariaLabel = destinationAriaLabel(activation.label, title, activation.external);
    if (activation.external) {
        return (
            <a
                href={activation.href}
                target="_blank"
                rel="noopener noreferrer"
                className={activationClass}
                aria-label={ariaLabel}
            >
                {title}
            </a>
        );
    }
    return (
        <Link to={activation.href} className={activationClass} aria-label={ariaLabel}>
            {title}
        </Link>
    );
}

function ActionLink({ link, title }: { link: CardFace['links'][number]; title: string }) {
    const className = [
        'min-h-11 px-3 inline-flex items-center gap-1.5 pointer-events-auto relative z-10',
        'text-[10px] uppercase tracking-widest font-mono border',
        'border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-900',
        'dark:border-white/15 dark:text-neutral-400 dark:hover:text-white dark:hover:border-white',
    ].join(' ');
    return (
        <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-label={destinationAriaLabel(link.label, title, link.external)}
        >
            <DestinationIcon label={link.label} />
            {link.label}
        </a>
    );
}

const toneClass = {
    accepted:
        'text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-950/30',
    review:
        'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-600/50 bg-amber-50 dark:bg-amber-950/30',
    sky: 'text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-600/50 bg-sky-50 dark:bg-sky-950/30',
    neutral: 'text-neutral-400 border-neutral-300 dark:border-white/20',
} as const;

function ProjectCard({ face, index }: { face: CardFace; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative min-w-0 h-full flex flex-col bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-white/5 p-5 sm:p-8 rounded-sm transition-all duration-500 ring-1 ring-transparent hover:ring-black dark:hover:ring-white focus-within:ring-black dark:focus-within:ring-white md:hover:-translate-y-1 md:hover:shadow-lg dark:md:hover:shadow-white/5"
        >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-5">
                <span className="text-neutral-500 font-mono text-xs tracking-widest uppercase">
                    {face.eyebrow}
                </span>
                {face.status && (
                    <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border max-w-full ${toneClass[face.status.tone]}`}>
                        {face.status.label}
                    </span>
                )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold mb-3 leading-snug break-words text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                <Activation face={face} />
            </h3>

            <p className="pointer-events-none text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-light leading-relaxed flex-grow">
                {face.summary}
            </p>

            <div className="relative z-10 flex flex-wrap gap-2 mb-5 pointer-events-none">
                <span
                    aria-hidden="true"
                    className="pointer-events-none min-h-11 px-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-mono border border-neutral-900 text-neutral-900 dark:border-white dark:text-white"
                >
                    <DestinationIcon label={face.activation.label} />
                    {face.activation.label}
                </span>
                {face.links.map((link) => (
                    <ActionLink key={link.label} link={link} title={face.title} />
                ))}
            </div>

            <div className="pointer-events-none">
                <TagList tags={face.tags} />
            </div>
        </motion.article>
    );
}

export default function Work() {
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
                    {experienceRows.map((row, index) => (
                        <motion.div
                            key={row.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-8 border-l border-neutral-200 dark:border-white/10 pl-8 ml-4 md:ml-0"
                        >
                            <div className="md:col-span-3 text-neutral-500 font-mono text-sm pt-1">
                                {row.period}
                            </div>
                            <div className="md:col-span-9">
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{row.title}</h3>
                                <div className="text-neutral-500 dark:text-neutral-400 mb-4 font-medium">{row.role}</div>
                                <TagList tags={row.tags} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Education & Certifications */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-16 px-4 md:px-0">
                    <h2 className="text-[8vw] leading-[0.8] font-bold tracking-tighter text-neutral-200 dark:text-neutral-800 select-none">
                        EDUCATION
                    </h2>
                </div>

                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 border-l border-neutral-200 dark:border-white/10 pl-8 ml-4 md:ml-0"
                    >
                        <div className="md:col-span-3 text-neutral-500 font-mono text-sm pt-1">
                            2026
                        </div>
                        <div className="md:col-span-9">
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Y Combinator</h3>
                            <div className="text-neutral-500 dark:text-neutral-400 font-medium">Startup School SF 2026</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-white/10 px-2 py-1 rounded-full">Program</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 border-l border-neutral-200 dark:border-white/10 pl-8 ml-4 md:ml-0"
                    >
                        <div className="md:col-span-3 text-neutral-500 font-mono text-sm pt-1">
                            2026
                        </div>
                        <div className="md:col-span-9">
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Blue Dot Impact</h3>
                            <div className="text-neutral-500 dark:text-neutral-400 font-medium">Technical AI Safety Course</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-white/10 px-2 py-1 rounded-full">Certification</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 border-l border-neutral-200 dark:border-white/10 pl-8 ml-4 md:ml-0"
                    >
                        <div className="md:col-span-3 text-neutral-500 font-mono text-sm pt-1">
                            2026
                        </div>
                        <div className="md:col-span-9">
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">NVIDIA</h3>
                            <div className="text-neutral-500 dark:text-neutral-400 font-medium">Building Multimodal AI Agents</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-white/10 px-2 py-1 rounded-full">Certification</span>
                            </div>
                        </div>
                    </motion.div>
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
                    {cardFaces.map((face, index) => (
                        <ProjectCard key={face.id} face={face} index={index} />
                    ))}
                </div>
            </div>

        </section>
    );
}
