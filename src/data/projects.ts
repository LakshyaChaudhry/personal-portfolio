export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    githubLink: string;
    liveLink?: string;
    imageUrl?: string;
    color: string;
};

export const projects: Project[] = [
    {
        id: '1',
        title: "Corteva SDS & Label Extractor LLM",
        shortDescription: "LLM-powered PDF extraction tool",
        fullDescription:"Fine-tuned pdfplumber & OpenAI functions to build a QA layer over non-standard PDFs. Handles tables, scanned text and noisy OCR.",
        technologies: ["Python", "LangChain", "FastAPI"],
        githubLink: "https://github.com/…",
        liveLink: "",
        imageUrl: "https://example.com/image1.jpg",
        color: "from-orange-500 to-red-600",
      },
 ];
