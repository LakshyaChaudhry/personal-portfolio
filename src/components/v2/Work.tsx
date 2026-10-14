import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, Github, X } from 'lucide-react';
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

function cardLinks(face: CardFace): readonly CardLink[] {
    return [face.activation, ...face.links];
}

function menuLabel(link: CardLink): string {
    if (link.label === 'Writeup') return 'WRITEUP';
    if (link.label === 'Code') return 'CODE';
    if (link.href.includes('openreview.net')) return 'OPENREVIEW';
    return 'PAPER';
}

const menuItemClass =
    'text-4xl font-bold tracking-tighter text-black dark:text-white hover:opacity-50 transition-opacity';

function CardOverlay({
    face,
    expanded,
    onOpen,
}: {
    face: CardFace;
    expanded: boolean;
    onOpen: (face: CardFace, trigger: HTMLButtonElement) => void;
}) {
    const links = cardLinks(face);
    if (links.length > 1) {
        return (
            <button
                type="button"
                className={cardLinkClass}
                aria-haspopup="dialog"
                aria-expanded={expanded}
                aria-label={`Open links for ${face.title}`}
                onClick={(event) => onOpen(face, event.currentTarget)}
            />
        );
    }
    const activation = links[0];
    if (activation.external) {
        return (
            <a
                href={activation.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardLinkClass}
                aria-label={`${face.title} (opens in a new tab)`}
            />
        );
    }
    return <Link to={activation.href} className={cardLinkClass} aria-label={face.title} />;
}

function LinkMenu({ face, onClose }: { face: CardFace; onClose: () => void }) {
    const panelRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const duration = reduceMotion ? 0 : 0.3;

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const panel = panelRef.current;
        const closeButton = panel?.querySelector<HTMLButtonElement>('button');
        closeButton?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }
            if (event.key !== 'Tab' || panel === null) return;
            const items = [...panel.querySelectorAll<HTMLElement>('a, button')];
            const first = items[0];
            const last = items[items.length - 1];
            if (first === undefined || last === undefined) return;
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-[60] flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={`Links for ${face.title}`}
                className="flex h-full w-full flex-col bg-white dark:bg-black md:w-[32rem]"
            >
                <div className="px-8 py-6 flex justify-end items-center">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-black dark:text-white"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
                <nav className="flex-1 flex flex-col items-center justify-center gap-10">
                    {cardLinks(face).map((link, index) => {
                        const label = menuLabel(link);
                        const item = (
                            <motion.div
                                key={label}
                                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration, delay: reduceMotion ? 0 : index * 0.1 }}
                            >
                                {link.external ? (
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={menuItemClass}
                                        aria-label={`${label} (opens in a new tab)`}
                                        onClick={onClose}
                                    >
                                        {label}
                                    </a>
                                ) : (
                                    <Link to={link.href} className={menuItemClass} onClick={onClose}>
                                        {label}
                                    </Link>
                                )}
                            </motion.div>
                        );
                        return item;
                    })}
                </nav>
            </div>
        </motion.div>
    );
}

const toneClass = {
    accepted:
        'text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-950/30',
    review:
        'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-600/50 bg-amber-50 dark:bg-amber-950/30',
    sky: 'text-neutral-400 border-neutral-300 dark:border-white/20',
    neutral: 'text-neutral-400 border-neutral-300 dark:border-white/20',
} as const;

function ProjectCard({
    face,
    index,
    expanded,
    onOpen,
}: {
    face: CardFace;
    index: number;
    expanded: boolean;
    onOpen: (face: CardFace, trigger: HTMLButtonElement) => void;
}) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex h-full min-w-0 cursor-pointer flex-col bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-white/5 p-8 transition-all duration-500 rounded-sm hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-white/5 ring-1 ring-transparent hover:ring-black dark:hover:ring-white focus-within:ring-black dark:focus-within:ring-white"
        >
            <CardOverlay face={face} expanded={expanded} onOpen={onOpen} />
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
    const [openFace, setOpenFace] = useState<CardFace | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const closeMenu = useCallback(() => {
        setOpenFace(null);
        const trigger = triggerRef.current;
        if (trigger?.isConnected) trigger.focus();
    }, []);
    const openMenu = useCallback((face: CardFace, trigger: HTMLButtonElement) => {
        triggerRef.current = trigger;
        setOpenFace(face);
    }, []);

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
                        <ProjectCard
                            key={face.id}
                            face={face}
                            index={index}
                            expanded={openFace?.id === face.id}
                            onOpen={openMenu}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {openFace ? <LinkMenu key={openFace.id} face={openFace} onClose={closeMenu} /> : null}
            </AnimatePresence>

        </section>
    );
}
