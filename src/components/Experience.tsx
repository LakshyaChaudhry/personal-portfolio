import Component from './timeline.tsx';

function Experience() {
    return (
        <div className="flex-none w-screen min-h-screen scroll-snap-start flex flex-col justify-start items-center py-24 px-4">
            <div className="text-center mb-12 max-w-4xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                    Professional Experience
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    Roles, challenges, and experiences that shaped my skills and perspective.
                </p>
            </div>
            
            <div className="w-full flex-1">
                <Component />
            </div>
        </div>
    );
}

export default Experience;