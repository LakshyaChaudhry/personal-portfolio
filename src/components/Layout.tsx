import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const sectionHref = (hash: string) => isHome ? hash : `/${hash}`;

    const navLinks = [
        { label: 'WORK', href: sectionHref('#work'), isRoute: false },
        { label: 'PROJECTS', href: sectionHref('#projects'), isRoute: false },
        { label: 'ABOUT', href: sectionHref('#about'), isRoute: false },
        { label: 'BLOG', href: '/blog', isRoute: true },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
            <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white px-8 py-6 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold tracking-tighter">LC</Link>
                <div className="flex items-center gap-4 md:gap-8">
                    <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                        {navLinks.map(link =>
                            link.isRoute ? (
                                <Link key={link.label} to={link.href} className="hover:opacity-50 transition-opacity">{link.label}</Link>
                            ) : (
                                <a key={link.label} href={link.href} className="hover:opacity-50 transition-opacity">{link.label}</a>
                            )
                        )}
                    </nav>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Open Menu"
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-white dark:bg-black flex flex-col"
                    >
                        <div className="px-8 py-6 flex justify-between items-center">
                            <Link to="/" className="text-xl font-bold tracking-tighter text-black dark:text-white">LC</Link>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-black dark:text-white"
                                aria-label="Close Menu"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <nav className="flex-1 flex flex-col items-center justify-center gap-10">
                            {navLinks.map((link, index) => {
                                const className = "text-4xl font-bold tracking-tighter text-black dark:text-white hover:opacity-50 transition-opacity";
                                return (
                                    <motion.div
                                        key={link.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {link.isRoute ? (
                                            <Link to={link.href} onClick={() => setIsMenuOpen(false)} className={className}>{link.label}</Link>
                                        ) : (
                                            <a href={link.href} onClick={() => setIsMenuOpen(false)} className={className}>{link.label}</a>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-1 pt-32 px-4 md:px-8 pb-20 max-w-7xl mx-auto w-full">
                {children}
            </main>

            <footer className="px-8 py-12 flex justify-between items-end border-t border-neutral-200 dark:border-white/10 mx-8">
                <div className="text-sm text-neutral-500">
                    &copy; {new Date().getFullYear()} Lakshya Chaudhry
                </div>
                <div className="text-sm font-medium text-neutral-900 dark:text-white">
                    SCROLL TO TOP &uarr;
                </div>
            </footer>
        </div>
    );
};

export default Layout;
