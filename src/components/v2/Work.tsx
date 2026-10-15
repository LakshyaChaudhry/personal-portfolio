import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useIsPresent } from 'framer-motion';
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

function linkName(link: CardLink): string {
    if (link.label === 'Writeup') return 'Writeup';
    if (link.label === 'Code') return 'Code';
    if (link.href.includes('openreview.net')) return 'OpenReview';
    return 'Paper';
}

function linkHint(link: CardLink): string {
    if (link.label === 'Writeup') return 'on-site post';
    if (link.label === 'Code') return 'GitHub';
    if (link.href.includes('openreview.net')) return 'forum';
    return 'preprint';
}

// One spring for both directions. The shell is the only thing that moves.
const shellSpring = { type: 'spring', bounce: 0, duration: 0.45 } as const;
const contentIn = { duration: 0.2, delay: 0.12, ease: 'easeOut' } as const;
const contentOut = { duration: 0.1, ease: 'easeIn' } as const;

const shellClass =
    'absolute inset-0 border border-neutral-200 bg-neutral-50 dark:border-white/5 dark:bg-neutral-900';

function shellId(face: CardFace): string {
    return `project-card-shell-${face.id}`;
}

// Counted so a panel that opens while another is still closing cannot restore a locked state.
let scrollLocks = 0;
let unlockedStyle = { overflow: '', paddingRight: '' };

function lockPageScroll(): () => void {
    const root = document.documentElement;
    const body = document.body;
    if (scrollLocks === 0) {
        const gutter = window.innerWidth - root.clientWidth;
        unlockedStyle = { overflow: root.style.overflow, paddingRight: body.style.paddingRight };
        root.style.overflow = 'hidden';
        if (gutter > 0) body.style.paddingRight = `${gutter}px`;
    }
    scrollLocks += 1;
    let released = false;
    return () => {
        if (released) return;
        released = true;
        scrollLocks -= 1;
        if (scrollLocks > 0) return;
        root.style.overflow = unlockedStyle.overflow;
        body.style.paddingRight = unlockedStyle.paddingRight;
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

function CardHeading({ face }: { face: CardFace }) {
    return (
        <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="text-neutral-500 font-mono text-xs tracking-widest uppercase">{face.eyebrow}</span>
            {face.status && (
                <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${toneClass[face.status.tone]}`}>
                    {face.status.label}
                </span>
            )}
        </div>
    );
}

function CardTags({ face }: { face: CardFace }) {
    return (
        <div className="flex flex-wrap gap-2 border-t border-neutral-200 pt-4 dark:border-white/5">
            {face.tags.map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-neutral-500">
                    {tag}
                </span>
            ))}
        </div>
    );
}

function MenuLinks({ face, onClose }: { face: CardFace; onClose: () => void }) {
    return (
        <nav aria-label={`Links for ${face.title}`} className="mt-8 border-t border-neutral-200 dark:border-white/5">
            {cardLinks(face).map((link) => {
                const name = linkName(link);
                const hint = linkHint(link);
                const className =
                    'group/link flex items-center justify-between gap-4 border-b border-neutral-200 py-4 text-neutral-900 transition-opacity hover:opacity-50 focus-visible:opacity-50 focus-visible:outline-none dark:border-white/5 dark:text-neutral-100';
                const body = (
                    <>
                        <span className="text-lg font-bold tracking-tight">{name}</span>
                        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
                            {hint}
                            <ArrowUpRight
                                size={16}
                                className="text-neutral-400 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </span>
                    </>
                );
                return link.external ? (
                    <a
                        key={name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                        aria-label={`${name}, ${hint} (opens in a new tab)`}
                        onClick={onClose}
                    >
                        {body}
                    </a>
                ) : (
                    <Link key={name} to={link.href} className={className} aria-label={`${name}, ${hint}`} onClick={onClose}>
                        {body}
                    </Link>
                );
            })}
        </nav>
    );
}

function ExpandedCard({ face, onClose }: { face: CardFace; onClose: () => void }) {
    const panelRef = useRef<HTMLDivElement>(null);
    // Once closing starts the overlay must not swallow clicks meant for the grid.
    const isPresent = useIsPresent();
    // Rounded only where the panel floats; full-screen on phones stays square.
    const [floating] = useState(() => window.matchMedia('(min-width: 768px)').matches);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useLayoutEffect(() => {
        const unlock = lockPageScroll();
        const panel = panelRef.current;
        panel?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onCloseRef.current();
                return;
            }
            if (event.key !== 'Tab' || panel === null) return;
            const items = [...panel.querySelectorAll<HTMLElement>('a, button')];
            const first = items[0];
            const last = items[items.length - 1];
            if (first === undefined || last === undefined) return;
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus({ preventScroll: true });
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus({ preventScroll: true });
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            unlock();
        };
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[60] md:flex md:items-center md:justify-center md:p-6 ${isPresent ? '' : 'pointer-events-none'}`}
            role="presentation"
        >
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 cursor-pointer bg-neutral-950/40 dark:bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } }}
                exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }}
                onClick={onClose}
            />
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={face.title}
                data-expanded-card
                className="relative h-dvh w-full md:h-auto md:max-h-[calc(100dvh-3rem)] md:max-w-2xl"
            >
                <motion.div
                    layoutId={shellId(face)}
                    transition={shellSpring}
                    className={`${shellClass} shadow-2xl dark:shadow-black/50`}
                    style={{ borderRadius: floating ? 12 : 0 }}
                />
                <motion.div
                    className="relative h-full overflow-y-auto overscroll-contain p-8 md:max-h-[calc(100dvh-3rem)] md:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: contentIn }}
                    exit={{ opacity: 0, transition: contentOut }}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 rounded-full p-2 text-neutral-500 transition-colors hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                    <div className="mb-6 pr-10">
                        <CardHeading face={face} />
                    </div>
                    <h3 className="mb-4 break-words text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-3xl">
                        {face.title}
                    </h3>
                    <p className="mb-6 text-base font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {face.summary}
                    </p>
                    <CardTags face={face} />
                    <MenuLinks face={face} onClose={onClose} />
                </motion.div>
            </div>
        </div>
    );
}

const toneClass = {
    accepted:
        'text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-950/30',
    review:
        'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-600/50 bg-amber-50 dark:bg-amber-950/30',
    sky: 'text-neutral-600 border-neutral-500 dark:text-neutral-400 dark:border-white/20',
    neutral: 'text-neutral-600 border-neutral-500 dark:text-neutral-400 dark:border-white/20',
} as const;

function ProjectCard({
    face,
    index,
    expanded,
    returning,
    onOpen,
    onReturned,
}: {
    face: CardFace;
    index: number;
    expanded: boolean;
    returning: boolean;
    onOpen: (face: CardFace, trigger: HTMLButtonElement) => void;
    onReturned: () => void;
}) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            // While the shell flies back it has to sit above the fading backdrop.
            className={`group relative h-full min-w-0 cursor-pointer ${returning && !expanded ? 'z-[70]' : ''}`}
        >
            <div
                data-project-card
                className="relative h-full min-w-0 rounded-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-white/5 ring-1 ring-transparent hover:ring-black dark:hover:ring-white focus-within:ring-black dark:focus-within:ring-white"
            >
                {!expanded && (
                    <motion.div
                        layoutId={shellId(face)}
                        transition={shellSpring}
                        className={`${shellClass} dark:bg-neutral-900/20`}
                        style={{ borderRadius: 2 }}
                        onLayoutAnimationComplete={returning ? onReturned : undefined}
                    />
                )}
                <motion.div
                    className="relative flex h-full min-w-0 flex-col p-8"
                    initial={false}
                    animate={{ opacity: expanded ? 0 : 1, transition: expanded ? contentOut : contentIn }}
                >
                    <CardOverlay face={face} expanded={expanded} onOpen={onOpen} />
                    <div className="flex justify-between items-start mb-6">
                        <CardHeading face={face} />
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

                    <div className="mt-auto">
                        <CardTags face={face} />
                    </div>
                </motion.div>
            </div>
        </motion.article>
    );
}

export default function Work() {
    const [open, setOpen] = useState<CardFace | null>(null);
    const [returningId, setReturningId] = useState<string | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const closeMenu = useCallback(() => {
        setReturningId(open?.id ?? null);
        setOpen(null);
    }, [open]);
    const clearReturning = useCallback(() => setReturningId(null), []);
    // Fallback for when no layout animation runs (reduced motion, interrupted flight).
    useEffect(() => {
        if (returningId === null) return;
        const timer = window.setTimeout(clearReturning, 800);
        return () => window.clearTimeout(timer);
    }, [returningId, clearReturning]);
    const finishClose = useCallback(() => {
        const trigger = triggerRef.current;
        if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    }, []);
    const openMenu = useCallback((face: CardFace, trigger: HTMLButtonElement) => {
        triggerRef.current = trigger;
        setReturningId(null);
        setOpen(face);
    }, []);

    return (
        <MotionConfig reducedMotion="user">
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
                            expanded={open?.id === face.id}
                            returning={returningId === face.id}
                            onOpen={openMenu}
                            onReturned={clearReturning}
                        />
                    ))}
                </div>
                <AnimatePresence onExitComplete={finishClose}>
                    {open ? <ExpandedCard key={open.id} face={open} onClose={closeMenu} /> : null}
                </AnimatePresence>
            </div>

        </section>
        </MotionConfig>
    );
}
