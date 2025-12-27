export interface Project {
    id: string;
    title: string;
    category: 'experience' | 'project' | 'publication';
    role?: string; // For timeline / research
    period?: string; // For timeline / research
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
    // --- Experience ---
    {
        id: 'exp-1',
        title: "TrustCircle",
        category: 'experience',
        role: "AI/ML Research Intern",
        period: "May 2025 – Present",
        shortDescription: "Built production-ready RAG for emotional-support retrieval.",
        fullDescription: "Built a production-ready RAG for emotional-support retrieval (AI-powered recommendation system that matches students with mental health resources) using OpenAI embeddings + MongoDB Atlas vector search.",
        technologies: ["OpenAI", "MongoDB Atlas", "RAG", "Vector Search"],
        color: "from-blue-500 to-cyan-600",
    },
    {
        id: 'exp-2',
        title: "Perplexity AI",
        category: 'experience',
        role: "Campus Strategist",
        period: "Jan 2025 – May 2025",
        shortDescription: "Drove 15,000+ new student registrations.",
        fullDescription: "Selected as 1 of 2 Campus Strategists at Purdue University; drove 15,000+ new student registrations by building ambassador network across the Midwest region and executing data-driven growth campaigns.",
        technologies: ["Growth Strategy", "Data Analysis", "Campaign Management"],
        color: "from-teal-500 to-emerald-600",
    },
    {
        id: 'exp-3',
        title: "Corteva Agriscience",
        category: 'experience',
        role: "AI/LLM Engineer + Researcher",
        period: "Aug 2024 – May 2025",
        shortDescription: "Engineered proprietary PDF extraction and hybrid RAG.",
        fullDescription: "Engineered proprietary PDF extraction and hybrid RAG (vector + graph context) for crop-protection Labels/SDS; benchmarked open- and closed-source tools.",
        technologies: ["Azure Doc Intel", "Hybrid RAG", "React", "Graph DB"],
        color: "from-orange-500 to-red-600",
    },
    {
        id: 'exp-4',
        title: "TrustCircle",
        category: 'experience',
        role: "Software Engineer Intern",
        period: "May 2024 – Aug 2024",
        shortDescription: "Integrated OpenAI LLMs into student well-being platform.",
        fullDescription: "Integrated OpenAI LLMs (GPT-4o via Microsoft Azure, FERPA/COPPA compliant) into student well-being platform to analyze unstructured data from counselor notes/logs and identify students at risk.",
        technologies: ["GPT-4o", "Azure", "Compliance", "NLP"],
        color: "from-blue-500 to-indigo-600",
    },

    // --- Research (Publications) ---
    {
        id: 'res-1',
        title: "Alignment Faking Detection",
        category: 'publication',
        role: "Mechanistic Interpretability Researcher", // Inferred from description
        period: "Sep 2025 – Present",
        shortDescription: "Mechanistic interpretability research on alignment faking in misaligned LoRA-tuned models.",
        fullDescription: "Conducting mechanistic interpretability research on alignment faking in misaligned LoRA-tuned Llama-3-70B models (“HAL9000”, “Pacifist”) using eval-awareness, noise-injection, and novel probing technique experiments. [Algoverse AI (Blue Team) × Redwood Research (Red Team)]",
        technologies: ["Mech Interp", "Llama-3", "LoRA", "PyTorch"],
        githubLink: "https://github.com/LakshyaChaudhry/bench-af",
        color: "from-purple-500 to-violet-600",
    },
    {
        id: 'res-2',
        title: "Belief Graph State Management",
        category: 'publication',
        role: "Theory of Mind Research",
        period: "Nov 2025 – Present",
        shortDescription: "Developing explicit belief graph architecture for LLM trading agents.",
        fullDescription: "Developing explicit belief graph architecture for LLM trading agents in adversarial multi-agent market simulations (BSE/ABIDES); implementing JSON-RPC interfaces for real-time belief updates and utility inference. [Mentor: Yuqi Sun]",
        technologies: ["LLM Agents", "Multi-Agent Sim", "Graph Theory"],
        githubLink: "https://github.com/tqmsh/hanabi-belief-graph/tree/belief_graph_variants",
        color: "from-pink-500 to-rose-600",
    },

    // --- Projects ---
    {
        id: 'proj-1',
        title: "Portfolio V2",
        category: 'project',
        shortDescription: "Minimalist portfolio with dark mode",
        fullDescription: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features include dark/light mode toggle, smooth animations with Framer Motion, and a clean minimalist design.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        githubLink: "https://github.com/LakshyaChaudhry/personal-portfolio",
        color: "from-green-500 to-emerald-600",
    },
    {
        id: 'proj-2',
        title: "Deep-Fake Detection System",
        category: 'project',
        shortDescription: "AI video generation and classification research",
        fullDescription: "Solving the Big Deep-Fake Challenge by leveraging the open-source video generation model CogVideoX-5B. Training it on local deepfake video datasets to develop a deep-fake video generator. Building a classifier to distinguish between videos generated by the model and real videos.",
        technologies: ["Python", "CogVideoX-5B", "PyTorch"],
        githubLink: "https://github.com/LakshyaChaudhry",
        color: "from-purple-500 to-pink-600",
    },
];
