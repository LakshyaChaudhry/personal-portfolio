import React from 'react';

function Navigation() {
    const navItems = [
        { href: '#homepage', label: 'Home' },
        { href: '#codingProjects', label: 'Projects' },
        { href: '#experience', label: 'Experience' },
        { href: '#blog', label: 'About' },
    ];

    return ( 
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full 
                       glass-light backdrop-saturate-180 shadow-lg z-50">
            <ul className="list-none flex gap-8 m-0 p-0">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <a href={item.href} 
                           className="nav-link">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navigation;