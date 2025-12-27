export interface Project {
    id: string;
    title: string;
    category: 'experience' | 'project' | 'publication';
    role?: string; // For timeline
    period?: string; // For timeline
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    githubLink?: string;
    paperLink?: string;
    liveLink?: string;
    imageUrl?: string;
    color: string;
};

export const projects: Project[] = [
    {
        id: '1',
        title: "TrustCircle",
        category: 'experience',
        role: "Machine Learning Intern",
        period: "Summer 2024",
        shortDescription: "Developed Semantic Search models to identify at-risk students.",
        fullDescription: "Implemented Semantic Search models that helped identify at-risk students and the roots of risk proactively during my internship at TrustCircle.",
        technologies: ["Python", "Machine Learning", "NLP", "Semantic Search"],
        color: "from-blue-500 to-cyan-600",
    },
    {
        id: '2',
        title: "Corteva Agriscience",
        category: 'experience',
        role: "Data Mine Corporate Partner Student",
        period: "Aug 2023 - May 2024",
        shortDescription: "Designed full-stack system for SDS & Label extraction.",
        fullDescription: "Collaborated within a team of five students and five corporate mentors through Purdue Data Mine.",
        technologies: ["Python", "Azure", "RAG", "LangChain"],
        githubLink: "https://datamine.purdue.edu/posters/TDM_Symposium2025_Poster_Corteva_LabelsLLM.pdf",
        color: "from-orange-500 to-red-600",
    },
    {
        id: 'purdue-ra',
        title: "Purdue University",
        category: 'experience',
        role: "Undergraduate Research Assistant",
        period: "Jan 2023 - Present",
        shortDescription: "AI Safety & Alignment Research",
        fullDescription: "Conducting research on AI safety and alignment.",
        technologies: ["Python", "PyTorch", "LLMs"],
        color: "from-yellow-500 to-amber-600",
    },
    {
        id: '3',
        title: "Deep-Fake Detection System",
        category: 'publication',
        shortDescription: "Research on differentiating generative video from authentic footage.",
        fullDescription: "Solving the Big Deep-Fake Challenge by leveraging the open-source video generation model CogVideoX-5B.",
        technologies: ["PyTorch", "Computer Vision", "Generative AI"],
        githubLink: "https://github.com/LakshyaChaudhry",
        color: "from-purple-500 to-pink-600",
    },
    {
        id: '4',
        title: "Portfolio V2",
        category: 'project',
        shortDescription: "Minimalist portfolio with dark mode",
        fullDescription: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        githubLink: "https://github.com/LakshyaChaudhry/personal-portfolio",
        color: "from-green-500 to-emerald-600",
    },
];
