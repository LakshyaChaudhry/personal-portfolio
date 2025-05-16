import React from 'react';
import Hero3D from '../components/Hero3D';
import '../HomePage.css';

function HomePage() {
    return (
        <div className="page-section">

            <h1> Welcome Page </h1>
            <p> Learn about my work, projects, and hobbies</p>
            
            <div >
                { <Hero3D /> }
            </div>

        </div>


    );
}

export default HomePage;