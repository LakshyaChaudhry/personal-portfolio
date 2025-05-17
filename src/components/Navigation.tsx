import React from 'react';
import '../Navigation.css';

function Navigation() {
    return ( 
        <nav className="navbar">
            <ul>
                <li>
                    <a href="#homepage">Home</a>
                </li>
                <li>
                    <a href="#codingProjects">Coding Projects</a>
                </li>
                <li>
                    <a href="#blog">Blog</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;