import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

function Navigation() {
    const { theme, toggleTheme } = useTheme();
    
    const navItems = [
        { href: '#homepage', label: 'Home' },
        { href: '#projects', label: 'Projects' },
        { href: '#experience', label: 'Experience' },
        { href: '#about', label: 'About' },
    ];

    return ( 
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full 
                       bg-white/80 dark:bg-gray-900/80 backdrop-blur-md 
                       border border-gray-200 dark:border-gray-700
                       shadow-lg z-50 transition-all duration-300">
            <ul className="list-none flex items-center gap-6 m-0 p-0">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <a href={item.href} 
                           className="text-gray-700 dark:text-gray-300 hover:text-gray-900 
                                    dark:hover:text-white font-medium transition-colors duration-200
                                    text-sm md:text-base">
                            {item.label}
                        </a>
                    </li>
                ))}
                <li>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 
                                 transition-colors duration-200"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <Moon size={18} className="text-gray-700" />
                        ) : (
                            <Sun size={18} className="text-gray-300" />
                        )}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;