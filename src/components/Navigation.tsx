import React from 'react';
import '../Navigation.css';

function Navigation() {
    return ( 
        <nav className="site-navigation">
            <ul className="nav-list">
                <li>
                    <a href="#homepage">Home</a>
                </li>
                <li>
                    <a href="#codingProjects">Projects</a>
                </li>
                <li>
                    <a href="#experience">Experience</a>
                </li>
                <li>
                    <a href="#blog">Blog</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;