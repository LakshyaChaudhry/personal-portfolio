import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

function ScrollHint() {
  const [isVisible, setIsVisible] = useState(true);

  // Hide after user scrolls or after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000);
    
    const handleScroll = () => setIsVisible(false);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-pulse">
      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 text-white/80 text-sm">
        <span className="hidden sm:inline">Swipe to explore</span>
        <span className="sm:hidden">Swipe</span>
        <div className="flex">
          <ChevronRight size={16} className="animate-bounce" style={{ animationDelay: '0ms' }} />
          <ChevronRight size={16} className="animate-bounce -ml-2" style={{ animationDelay: '150ms' }} />
          <ChevronRight size={16} className="animate-bounce -ml-2" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export default ScrollHint;