import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
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

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
            <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white px-8 py-6 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold tracking-tighter">LC</Link>
                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                        <a href={sectionHref('#work')} className="hover:opacity-50 transition-opacity">WORK</a>
                        <a href={sectionHref('#projects')} className="hover:opacity-50 transition-opacity">PROJECTS</a>
                        <a href={sectionHref('#about')} className="hover:opacity-50 transition-opacity">ABOUT</a>
                        <Link to="/blog" className="hover:opacity-50 transition-opacity">BLOG</Link>
                    </nav>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </header>

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
