import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, Github } from 'lucide-react';
import { cardFaces, experienceRows } from '../../data/projects';
import type { CardFace, CardLink } from '../../data/projects';

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

function CornerIcon({ label }: { label: CardLink['label'] }) {
    switch (label) {
        case 'Writeup':
            return <ArrowUpRight size={18} aria-hidden="true" />;
        case 'Paper':
            return <FileText size={18} aria-hidden="true" />;
        case 'Code':
            return <Github size={18} aria-hidden="true" />;
        default: {
            const unexpected: never = label;
            return unexpected;
        }
    }
}

const iconClass =
    'relative z-20 text-neutral-400 hover:text-black dark:hover:text-white focus-visible:text-black dark:focus-visible:text-white transition-colors';

function CornerLink({ link, title }: { link: CardLink; title: string }) {
    const icon = <CornerIcon label={link.label} />;
    const ariaLabel = destinationAriaLabel(link.label, title, link.external);
    if (link.external) {
        return (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label={ariaLabel}>
                {icon}
            </a>
        );
    }
    return (
        <Link to={link.href} className={iconClass} aria-label={ariaLabel}>
            {icon}
        </Link>
    );
}

function cornerLinks(face: CardFace): CardLink[] {
    const code = face.activation.label === 'Code' ? face.activation : face.links.find((link) => link.label === 'Code');
    const paper = face.activation.label === 'Paper' ? face.activation : face.links.find((link) => link.label === 'Paper');
    const links: CardLink[] = [];
    if (code) links.push(code);
    if (face.activation.label === 'Writeup') links.push(face.activation);
    if (paper) links.push(paper);
    return links;
}

const cardLinkClass = 'absolute inset-0 z-10 cursor-pointer rounded-sm focus-visible:outline-none';

function CardOverlay({ face }: { face: CardFace }) {
    const { activation, title } = face;
    if (activation.external) {
        return (
            <a
                href={activation.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardLinkClass}
                aria-label={`${title} (opens in a new tab)`}
            />
        );
    }
    return <Link to={activation.href} className={cardLinkClass} aria-label={title} />;
}

const toneClass = {
    accepted:
        'text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-950/30',
    review:
        'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-600/50 bg-amber-50 dark:bg-amber-950/30',
    sky: 'text-neutral-400 border-neutral-300 dark:border-white/20',
    neutral: 'text-neutral-400 border-neutral-300 dark:border-white/20',
} as const;

function ProjectCard({ face, index }: { face: CardFace; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex h-full min-w-0 cursor-pointer flex-col bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-white/5 p-8 transition-all duration-500 rounded-sm hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-white/5 ring-1 ring-transparent hover:ring-black dark:hover:ring-white focus-within:ring-black dark:focus-within:ring-white"
        >
            <CardOverlay face={face} />
            <div className="flex justify-between items-start mb-6">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="text-neutral-500 font-mono text-xs tracking-widest uppercase">
                        {face.eyebrow}
                    </span>
                    {face.status && (
                        <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${toneClass[face.status.tone]}`}>
                            {face.status.label}
                        </span>
                    )}
                </div>
                <div className="flex gap-3 shrink-0">
                    {cornerLinks(face).map((link) => (
                        <CornerLink key={link.label} link={link} title={face.title} />
                    ))}
                </div>
            </div>

            <h3 className="text-xl font-bold mb-3 break-words text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                {face.title}
            </h3>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-light leading-relaxed flex-grow">
                {face.summary}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-neutral-200 dark:border-white/5">
                {face.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-neutral-500">
                        {tag}
                    </span>
                ))}
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
