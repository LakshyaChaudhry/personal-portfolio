import React from 'react';
import '../Experience.css';
import Component from './timeline.tsx';

function Experience() {
    return (
        <div className='page-section'>
            <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl"> Experience </h1>
            <Component />
        </div>
    );
}

export default Experience;