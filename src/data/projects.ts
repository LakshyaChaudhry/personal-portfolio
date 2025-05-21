export type project = {
    id: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    stack: string[];
    link?: string;
};

export const projects: project[] = [
    {
        id: "pdf-extractor",
        title: "PDF Extractor LLM",
        tagline: "Parse any SDS & ask it questions",
        description:
          "Fine-tuned pdfplumber & OpenAI functions to build a QA layer over non-standard PDFs. Handles tables, scanned text and noisy OCR.",
        image: '',
        stack: ["Python", "LangChain", "FastAPI"],
        link: "https://github.com/…",
      },
 ];
