import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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

const expandEase = [0.4, 0, 0.2, 1] as const;
const expandDuration = 0.7;

type CardOrigin = { top: number; left: number; width: number; height: number };

function readCardOrigin(trigger: HTMLElement): CardOrigin {
    const card = trigger.closest('[data-project-card]');
    const rect = (card ?? trigger).getBoundingClientRect();
    return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

function expandedFrame(): CardOrigin {
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    if (mobile) {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
    const inset = Math.max(64, Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.08));
    return {
        top: inset,
        left: inset,
        width: window.innerWidth - inset * 2,
        height: window.innerHeight - inset * 2,
    };
}

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

function MenuLinks({ face, onClose }: { face: CardFace; onClose: () => void }) {
    const reduceMotion = useReducedMotion();
    return (
        <nav className="flex w-full flex-col items-center justify-center gap-8 md:gap-10">
            {cardLinks(face).map((link, index) => {
                const label = menuLabel(link);
                const className = menuItemClass;
                return (
                    <motion.div
                        key={label}
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.12 + index * 0.05 }}
                    >
                        {link.external ? (
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={className}
                                aria-label={`${label} (opens in a new tab)`}
                                onClick={onClose}
                            >
                                {label}
                            </a>
                        ) : (
                            <Link to={link.href} className={className} onClick={onClose}>
                                {label}
                            </Link>
                        )}
                    </motion.div>
                );
            })}
        </nav>
    );
}

function ExpandedCard({ face, origin, onClose }: { face: CardFace; origin: CardOrigin; onClose: () => void }) {
    const panelRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const frame = expandedFrame();
    const from = {
        x: origin.left - frame.left,
        y: origin.top - frame.top,
        scaleX: origin.width / frame.width,
        scaleY: origin.height / frame.height,
    };
    const settled = { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 };
    const cardMotion = reduceMotion
        ? { initial: { ...settled, opacity: 0 }, animate: settled, exit: { ...settled, opacity: 0 } }
        : { initial: { ...from, opacity: 1 }, animate: settled, exit: { ...from, opacity: 1 } };

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const panel = panelRef.current;
        panel?.querySelector<HTMLButtonElement>('button')?.focus();

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
            className="fixed inset-0 z-[60]"
            role="presentation"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : expandDuration }}
        >
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 cursor-pointer bg-black/40 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
                onClick={onClose}
            />
            <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={face.title}
                initial={cardMotion.initial}
                animate={cardMotion.animate}
                exit={cardMotion.exit}
                transition={{ duration: reduceMotion ? 0.2 : expandDuration, ease: expandEase }}
                style={{
                    position: 'fixed',
                    top: frame.top,
                    left: frame.left,
                    width: frame.width,
                    height: frame.height,
                    originX: 0,
                    originY: 0,
                }}
                className="flex min-h-0 flex-col overflow-hidden bg-neutral-50 text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-white/5 border border-neutral-200 dark:border-white/5 rounded-sm"
            >
                    <div className="flex justify-end px-6 pt-6 md:px-8 md:pt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-black dark:text-white"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col justify-center gap-10 px-8 pb-10 md:grid md:grid-cols-2 md:items-center md:gap-16 md:px-14 md:pb-14">
                        <div className="min-w-0">
                            <div className="mb-6 flex flex-wrap items-center gap-2">
                                <span className="text-neutral-500 font-mono text-xs tracking-widest uppercase">
                                    {face.eyebrow}
                                </span>
                                {face.status && (
                                    <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${toneClass[face.status.tone]}`}>
                                        {face.status.label}
                                    </span>
                                )}
                            </div>
                            <h3 className="mb-3 break-words text-xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
                                {face.title}
                            </h3>
                            <p className="mb-6 text-sm font-light leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-base">
                                {face.summary}
                            </p>
                            <div className="flex flex-wrap gap-2 border-t border-neutral-200 pt-4 dark:border-white/5">
                                {face.tags.map((tag) => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-neutral-500">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <MenuLinks face={face} onClose={onClose} />
                    </div>
                </motion.div>
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
    concealed,
    onOpen,
}: {
    face: CardFace;
    index: number;
    expanded: boolean;
    concealed: boolean;
    onOpen: (face: CardFace, trigger: HTMLButtonElement) => void;
}) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group h-full min-w-0 cursor-pointer ${concealed ? 'pointer-events-none opacity-0' : ''}`}
        >
            <div
                data-project-card
                className="relative flex h-full min-w-0 flex-col bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-white/5 p-8 rounded-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-white/5 ring-1 ring-transparent hover:ring-black dark:hover:ring-white focus-within:ring-black dark:focus-within:ring-white"
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
            </div>
        </motion.article>
    );
}

export default function Work() {
    const [open, setOpen] = useState<{ face: CardFace; origin: CardOrigin } | null>(null);
    const [concealedId, setConcealedId] = useState<string | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const closeMenu = useCallback(() => {
        setOpen(null);
    }, []);
    const pendingFocus = useRef(false);
    const finishClose = useCallback(() => {
        pendingFocus.current = true;
        setConcealedId(null);
    }, []);
    useLayoutEffect(() => {
        if (!pendingFocus.current || concealedId !== null) return;
        pendingFocus.current = false;
        const trigger = triggerRef.current;
        if (trigger?.isConnected) trigger.focus();
    }, [concealedId]);
    const openMenu = useCallback((face: CardFace, trigger: HTMLButtonElement) => {
        triggerRef.current = trigger;
        setConcealedId(face.id);
        setOpen({ face, origin: readCardOrigin(trigger) });
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
                            expanded={open?.face.id === face.id}
                            concealed={concealedId === face.id}
                            onOpen={openMenu}
                        />
                    ))}
                </div>
                <AnimatePresence onExitComplete={finishClose}>
                    {open ? (
                        <ExpandedCard key={open.face.id} face={open.face} origin={open.origin} onClose={closeMenu} />
                    ) : null}
                </AnimatePresence>
            </div>

        </section>
    );
}
