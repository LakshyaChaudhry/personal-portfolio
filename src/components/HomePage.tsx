import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const TYPING_SPEED = 100;

function HomePage() {
  const nameFull = 'Lakshya Chaudhry';
  const subtitleFull = 'AI @ Purdue';

  const [nameText, setNameText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [hasTypedName, setHasTypedName] = useState(false);

  useEffect(() => {
    if (nameText.length < nameFull.length) {
      const timer = setTimeout(() => {
        setNameText(nameFull.slice(0, nameText.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      setHasTypedName(true);
    }
  }, [nameText, nameFull]);

  useEffect(() => {
    if (hasTypedName && subtitleText.length < subtitleFull.length) {
      const timer = setTimeout(() => {
        setSubtitleText(subtitleFull.slice(0, subtitleText.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    }
  }, [hasTypedName, subtitleText, subtitleFull]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 
                    bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold 
                       text-gray-900 dark:text-white transition-colors duration-300">
            {nameText}
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 
                      font-light transition-colors duration-300">
            {subtitleText}
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto 
                      leading-relaxed mt-8 transition-colors duration-300">
            Building AI solutions and crafting experiences at the intersection of 
            machine learning and software engineering.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-12">
            <a 
              href="https://github.com/LakshyaChaudhry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 
                       text-gray-700 dark:text-gray-300
                       transition-all duration-200 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/lakshya-chaudhry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 
                       text-gray-700 dark:text-gray-300
                       transition-all duration-200 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:lakshya@example.com"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 
                       text-gray-700 dark:text-gray-300
                       transition-all duration-200 hover:scale-110"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 
                       text-gray-700 dark:text-gray-300
                       transition-all duration-200 hover:scale-110"
              aria-label="Resume"
            >
              <FileText size={24} />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16">
            <a href="#projects" className="inline-block animate-bounce">
              <svg 
                className="w-6 h-6 text-gray-400 dark:text-gray-600" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;