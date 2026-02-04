export interface Project {
    id: string;
    title: string;
    category: 'experience' | 'project' | 'research';
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
    status?: 'in progress';
    hidden?: boolean;
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

    // --- Projects & Research ---
    {
        id: 'proj-synthbench',
        title: "SynthBench",
        category: 'project',
        shortDescription: "Benchmarking text-to-image synthetic data vs. traditional augmentation for zero-shot visual classification. Achieved 81% accuracy with zero real training examples.",
        fullDescription: "Benchmarking text-to-image synthetic data vs. traditional augmentation for zero-shot visual classification. Achieved 81% accuracy with zero real training examples.",
        technologies: ["Computer Vision", "Synthetic Data", "Zero-Shot", "PyTorch"],
        liveLink: "/blog/synthbench",
        color: "from-neutral-500 to-neutral-700",
    },
    {
        id: 'proj-signal',
        title: "Signal",
        category: 'project',
        shortDescription: "Brutalist productivity tracker with a locally fine-tuned AI coach, trained on personal behavioral data and productivity literature. Runs entirely on Apple Silicon.",
        fullDescription: "A brutalist productivity tracker with a locally fine-tuned Llama 3.1 8B AI coach. Trained on 1,442 examples combining productivity literature and 70 days of personal behavioral logs. The entire stack—training, serving, inference—runs on a single M3 Ultra Mac Studio.",
        technologies: ["MLX", "Llama", "Finetuning", "Data Synthesis"],
        liveLink: "/blog/signal-ai-coach",
        color: "from-neutral-500 to-neutral-700",
    },
    {
        id: 'res-1',
        title: "Alignment Faking Detection",
        category: 'research',
        role: "Mechanistic Interpretability Researcher",
        period: "Sep 2025 – Present",
        shortDescription: "Mechanistic interpretability research on alignment faking in misaligned LoRA-tuned models.",
        fullDescription: "Conducting mechanistic interpretability research on alignment faking in misaligned LoRA-tuned Llama-3-70B models ('HAL9000', 'Pacifist') using eval-awareness, noise-injection, and novel probing technique experiments. [Algoverse AI (Blue Team) x Redwood Research (Red Team)]",
        technologies: ["TransformerLens", "Mech Interp", "PyTorch"],
        githubLink: "https://github.com/LakshyaChaudhry/bench-af",
        color: "from-purple-500 to-violet-600",
        status: 'in progress',
    },
    {
        id: 'res-2',
        title: "Belief Graph State Management",
        category: 'research',
        role: "Theory of Mind Research",
        period: "Nov 2025 – Present",
        shortDescription: "Developing explicit belief graph architecture for LLM trading agents.",
        fullDescription: "Developing explicit belief graph architecture for LLM trading agents in adversarial multi-agent market simulations (BSE/ABIDES); implementing JSON-RPC interfaces for real-time belief updates and utility inference. [Mentor: Yuqi Sun]",
        technologies: ["LLM Agents", "Multi-Agent Sim", "Graph Theory"],
        githubLink: "https://github.com/tqmsh/hanabi-belief-graph/tree/belief_graph_variants",
        color: "from-pink-500 to-rose-600",
        hidden: true,
    },
    {
        id: 'proj-1',
        title: "Portfolio",
        category: 'project',
        shortDescription: "Minimalist portfolio with dark mode",
        fullDescription: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features include dark/light mode toggle, smooth animations with Framer Motion, and a clean minimalist design.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        githubLink: "https://github.com/LakshyaChaudhry/personal-portfolio",
        color: "from-green-500 to-emerald-600",
    },
    {
        id: 'proj-2',
        title: "Corteva SDS & Label Extractor LLM",
        category: 'project',
        shortDescription: "Contracted by Corteva Agriscience to engineer a proprietary hybrid RAG system (Vector + Graph) for crop-protection data, improving research efficiency by ~80%.",
        fullDescription: "Contracted by Corteva Agriscience to engineer a proprietary PDF extraction and hybrid RAG system for crop-protection Labels and Safety Data Sheets. The system utilized vector and graph-aware reranking to index ~300k pages, delivering real-time answers and reducing research time from hours to sub-seconds for chemical formulation scientists.",
        technologies: ["Hybrid RAG", "Azure Doc Intel", "React", "Graph DB"],
        githubLink: "https://github.com/LakshyaChaudhry",
        color: "from-orange-500 to-red-600",
    },
];
