import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';
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

const expandEase = [0.4, 0, 0.2, 1] as const;
const expandDuration = 0.7;

type CardOrigin = { top: number; left: number; width: number; height: number };

type Flight = { x: number; y: number; scaleX: number; scaleY: number; opacity: number };

const settledFlight: Flight = { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 };

function readCardOrigin(trigger: HTMLElement): CardOrigin {
    const card = trigger.closest('[data-project-card]');
    const rect = (card ?? trigger).getBoundingClientRect();
    return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

function readLayoutBox(element: HTMLElement): CardOrigin {
    const style = getComputedStyle(element);
    return {
        top: Number.parseFloat(style.top) || 0,
        left: Number.parseFloat(style.left) || 0,
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
}

function flightBetween(origin: CardOrigin, frame: CardOrigin): Flight {
    const width = frame.width > 0 ? frame.width : 1;
    const height = frame.height > 0 ? frame.height : 1;
    return {
        x: origin.left - frame.left,
        y: origin.top - frame.top,
        scaleX: origin.width / width,
        scaleY: origin.height / height,
        opacity: 1,
    };
}

function sameFlight(a: Flight, b: Flight): boolean {
    return (
        Math.abs(a.x - b.x) < 0.5 &&
        Math.abs(a.y - b.y) < 0.5 &&
        Math.abs(a.scaleX - b.scaleX) < 0.002 &&
        Math.abs(a.scaleY - b.scaleY) < 0.002
    );
}

const expandedPanelClass =
    'fixed overflow-y-auto rounded-sm border border-neutral-200 bg-neutral-50 text-neutral-900 shadow-lg dark:border-white/5 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-white/5 inset-0 h-dvh w-full md:inset-auto md:top-6 md:right-auto md:bottom-auto md:left-[max(1rem,calc((100vw-min(52rem,100vw-2rem))/2))] md:h-auto md:max-h-[calc(100dvh-3rem)] md:w-[min(52rem,calc(100vw-2rem))]';

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
        <nav className="flex flex-col gap-6 border-t border-neutral-200 px-8 py-8 dark:border-white/5 lg:border-l lg:border-t-0 lg:pr-14">
            {cardLinks(face).map((link, index) => {
                const name = linkName(link);
                const hint = linkHint(link);
                const className =
                    'group block text-left text-neutral-900 transition-opacity hover:opacity-50 dark:text-neutral-100';
                const body = (
                    <>
                        <span className="inline-flex items-center gap-2 text-lg font-bold tracking-tight lg:text-xl">
                            {name}
                            <ArrowUpRight size={16} className="text-neutral-400" aria-hidden="true" />
                        </span>
                        <span className="mt-1 block text-sm font-light text-neutral-500">{hint}</span>
                    </>
                );
                return (
                    <motion.div
                        key={name}
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
                                aria-label={`${name}, ${hint} (opens in a new tab)`}
                                onClick={onClose}
                            >
                                {body}
                            </a>
                        ) : (
                            <Link to={link.href} className={className} aria-label={`${name}, ${hint}`} onClick={onClose}>
                                {body}
                            </Link>
                        )}
                    </motion.div>
                );
            })}
        </nav>
    );
}

function ExpandedCard({
    face,
    measureOrigin,
    onClose,
}: {
    face: CardFace;
    measureOrigin: () => CardOrigin;
    onClose: () => void;
}) {
    const panelRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const controls = useAnimationControls();
    const [exitFlight, setExitFlight] = useState<Flight>(settledFlight);
    const measureOriginRef = useRef(measureOrigin);
    measureOriginRef.current = measureOrigin;

    useLayoutEffect(() => {
        const panel = panelRef.current;
        if (panel === null) return;
        let started = false;

        const syncFlight = (startAnimation: boolean) => {
            const frame = readLayoutBox(panel);
            if (frame.width < 1 || frame.height < 1) return;
            const next = flightBetween(measureOriginRef.current(), frame);
            setExitFlight((current) => (sameFlight(current, next) ? current : next));
            if (!startAnimation || started) return;
            started = true;
            if (reduceMotion) {
                controls.set({ ...settledFlight, opacity: 0 });
                void controls.start({ opacity: 1, transition: { duration: 0.2 } });
                return;
            }
            controls.set(next);
            void controls.start({
                ...settledFlight,
                transition: { duration: expandDuration, ease: expandEase },
            });
        };

        syncFlight(true);
        const onResize = () => syncFlight(false);
        window.addEventListener('resize', onResize);
        const observer = new ResizeObserver(onResize);
        observer.observe(panel);
        const source = panel.ownerDocument.querySelector('[data-project-card]');
        const concealed = document.querySelector('#projects article.opacity-0 [data-project-card]');
        if (concealed instanceof HTMLElement) observer.observe(concealed);
        else if (source instanceof HTMLElement) observer.observe(source);
        return () => {
            window.removeEventListener('resize', onResize);
            observer.disconnect();
        };
    }, [controls, reduceMotion]);

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

    const exit = reduceMotion ? { ...settledFlight, opacity: 0 } : exitFlight;

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
                data-expanded-card
                initial={false}
                animate={controls}
                exit={exit}
                style={{ originX: 0, originY: 0 }}
                className={expandedPanelClass}
            >
                <div className="sticky top-0 z-10 flex h-0 justify-end overflow-visible">
                    <button
                        type="button"
                        onClick={onClose}
                        className="relative top-3 right-3 rounded-full p-2 text-black transition-colors hover:bg-black/10 dark:text-white dark:hover:bg-white/10"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(13rem,0.85fr)] lg:items-start">
                        <div className="min-w-0 p-8 pr-14">
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
                            <h3 className="mb-3 break-words text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 lg:text-2xl">
                                {face.title}
                            </h3>
                            <p className="mb-6 text-sm font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
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
    const [open, setOpen] = useState<CardFace | null>(null);
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
        setOpen(face);
    }, []);
    const measureOrigin = useCallback((): CardOrigin => {
        const trigger = triggerRef.current;
        if (trigger?.isConnected) return readCardOrigin(trigger);
        return { top: 0, left: 0, width: 1, height: 1 };
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
                            expanded={open?.id === face.id}
                            concealed={concealedId === face.id}
                            onOpen={openMenu}
                        />
                    ))}
                </div>
                <AnimatePresence onExitComplete={finishClose}>
                    {open ? (
                        <ExpandedCard key={open.id} face={open} measureOrigin={measureOrigin} onClose={closeMenu} />
                    ) : null}
                </AnimatePresence>
            </div>

        </section>
    );
}
