import Component from './timeline.tsx';

function Experience() {
    return (
        <div className="min-h-screen py-20 px-4 
                       bg-white dark:bg-gray-950 
                       transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 
                                 transition-colors duration-300">
                        Experience
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto 
                                transition-colors duration-300">
                        Roles, challenges, and experiences that shaped my skills and perspective
                    </p>
                </div>
                
                <div className="w-full">
                    <Component />
                </div>
            </div>
        </div>
    );
}

export default Experience;