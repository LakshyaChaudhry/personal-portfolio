import React from 'react';
import LCViewer from './LCViewer';
import '../HomePage.css';

function HomePage() {
    return (
        <div className="page-section">

            {/* <h1> Welcome Page </h1>
            <p> Learn about my work, projects, and hobbies</p> */}
            
            <div style={{ width: '100vw', height: '80vh'}}>
                <LCViewer />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl">
                Lakshya Chaudhry
            </h1>

        </div>

    );
}

export default HomePage;