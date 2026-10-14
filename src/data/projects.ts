import { buildWork, on } from '../domain/cards'
import type { CardDraft, ExperienceDraft } from '../domain/cards'
import { RL_OR_DATA_PAPER_URL } from '../content/papers'

const experience = [
  {
    id: "exp-mars",
    title: "Cambridge AI Safety Hub",
    role: "AI Research Fellow, MARS 5.0",
    period: "Jun 2026 – Present",
    tags: [
      "AI Control",
      "AI Security",
      "Alignment",
    ],
  },
  {
    id: "exp-0",
    title: "Cisco",
    role: "AI/ML Engineering Intern",
    period: "Summer 2026",
    tags: [
      "AI/ML",
    ],
  },
  {
    id: "exp-1",
    title: "TrustCircle",
    role: "AI/ML Research Intern",
    period: "May 2025 – Aug 2025",
    tags: [
      "OpenAI",
      "MongoDB Atlas",
      "RAG",
      "Vector Search",
    ],
  },
  {
    id: "exp-2",
    title: "Perplexity AI",
    role: "Campus Strategist",
    period: "Jan 2025 – May 2025",
    tags: [
      "Growth Strategy",
      "Data Analysis",
      "Campaign Management",
    ],
  },
  {
    id: "exp-3",
    title: "Corteva Agriscience",
    role: "AI/LLM Engineer + Researcher",
    period: "Aug 2024 – May 2025",
    tags: [
      "Azure Doc Intel",
      "Hybrid RAG",
      "React",
      "Graph DB",
    ],
  },
  {
    id: "exp-4",
    title: "TrustCircle",
    role: "Software Engineer Intern",
    period: "May 2024 – Aug 2024",
    tags: [
      "GPT-4o",
      "Azure",
      "Compliance",
      "NLP",
    ],
  },
] as const satisfies readonly ExperienceDraft[]

const cards = [
  {
    id: "res-rl-or-data",
    kind: "research",
    title: "Is It RL or Data? A Controlled Comparison of GRPO and Rejection-Sampling Fine-Tuning",
    summary: "On a counting task where every answer can be checked, GRPO beats rejection-sampling fine-tuning by about 8–11 points even when both methods see the same prompts and the same checker. Giving the supervised method the prompts GRPO actually learns from does not close that gap.",
    tags: [
      "GRPO",
      "RFT",
      "Post-training",
      "Qwen3",
    ],
    status: { kind: 'preprint' },
    writeup: "rl-or-data",
    paper: RL_OR_DATA_PAPER_URL,
    code: "https://github.com/LakshyaChaudhry/rl-or-data",
  },
  {
    id: "res-beyond-lie-detection",
    kind: "research",
    title: "Beyond Lie Detection: Sample-Level White-Box Auditing of Alignment Faking",
    summary: "Introduced a per-rollout labeling procedure separating alignment faking from plain lying and situational awareness. Probes trained on controlled synthetic AF data gain +12% AUROC and +15% AUPRC over existing lie-detection baselines.",
    tags: [
      "Mechanistic Interpretability",
      "Linear Probes",
      "PyTorch",
      "TransformerLens",
    ],
    status: { kind: 'accepted', venue: 'ICML 2026 TAIGR' },
    writeup: "beyond-lie-detection",
    code: "https://github.com/LakshyaChaudhry/bench-af",
  },
  {
    id: "res-sample-whitebox-af",
    kind: "research",
    title: "Sample-Level White-Box Detection of Alignment Faking",
    summary: "First systematic study of sample-level white-box AF detection. Shows truth probe directions drift substantially across fine-tuning lineage (+0.15–0.40 cosine similarity drop), motivating within-model probing for reliable detection.",
    tags: [
      "Mechanistic Interpretability",
      "Linear Probes",
      "PyTorch",
      "TransformerLens",
    ],
    status: { kind: 'accepted', venue: 'ICML 2026' },
    writeup: "beyond-lie-detection",
    code: "https://github.com/LakshyaChaudhry/bench-af",
  },
  {
    id: "res-colm",
    kind: "research",
    title: "Don't Make the LLM Read the Graph — Make the Graph Think",
    summary: "Investigating whether belief graphs improve LLM cooperation in Hanabi across 3,000+ trials and four model families. Identified \"Planner Defiance\" — a novel failure mode where LLMs override correct graph recommendations. Under review at COLM 2026.",
    tags: [
      "Multi-Agent",
      "Hanabi",
      "Belief Graphs",
      "LLM Reasoning",
    ],
    status: { kind: 'under-review', venue: 'COLM 2026' },
    publishedOn: on('2025-11-01'),
    paper: "https://openreview.net/forum?id=y3TtQFiodt",
  },
  {
    id: "proj-distill",
    kind: "project",
    title: "Distill",
    summary: "Agentic CLI that turns arXiv papers into structured, linked Obsidian notes using a 6-tool pipeline orchestrated by Claude's tool-calling API.",
    tags: [
      "Agents",
      "Azure Doc Intel",
      "Python",
      "CLI",
    ],
    writeup: "distill",
    code: "https://github.com/LakshyaChaudhry/Distill",
  },
  {
    id: "proj-synthbench",
    kind: "project",
    title: "SynthBench",
    summary: "Benchmarking text-to-image synthetic data vs. traditional augmentation for zero-shot visual classification. Achieved 81% accuracy with zero real training examples.",
    tags: [
      "Computer Vision",
      "Synthetic Data",
      "Zero-Shot",
      "PyTorch",
    ],
    writeup: "synthbench",
    code: "https://github.com/LakshyaChaudhry/SynthBench",
  },
  {
    id: "proj-signal",
    kind: "project",
    title: "Signal",
    summary: "Brutalist productivity tracker with a locally fine-tuned AI coach, trained on personal behavioral data and productivity literature. Runs entirely on Apple Silicon.",
    tags: [
      "MLX",
      "Llama",
      "Finetuning",
      "Data Synthesis",
    ],
    writeup: "signal-ai-coach",
  },
  {
    id: "proj-2",
    kind: "project",
    title: "Corteva SDS & Label Extractor LLM",
    summary: "Contracted by Corteva Agriscience to engineer a proprietary hybrid RAG system (Vector + Graph) for crop-protection data, improving research efficiency by ~80%.",
    tags: [
      "Hybrid RAG",
      "Azure Doc Intel",
      "React",
      "Graph DB",
    ],
    publishedOn: on('2025-05-01'),
    code: "https://github.com/LakshyaChaudhry",
  },
  {
    id: "proj-1",
    kind: "project",
    title: "Portfolio",
    summary: "Minimalist portfolio with dark mode",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    publishedOn: on('2024-08-01'),
    code: "https://github.com/LakshyaChaudhry/personal-portfolio",
  },
] as const satisfies readonly CardDraft[]

export const { experienceRows, cardFaces } = buildWork({ experience, cards })

export type { CardFace, CardLink, ExperienceRow } from '../domain/cards'
