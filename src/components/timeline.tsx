import { useState, useEffect, useRef } from 'react';
import { Building2, Calendar, MapPin } from 'lucide-react';

const items = [
  {
    id: 1,
    date: "June 2025 - Present",
    title: "SWE Intern",
    company: "TrustCircle",
    location: "San Francisco, CA",
    description: "Incoming summer 2025 SWE Intern.",
    logo: '/assets/trustcircle.png',
    current: true
  },
  {
    id: 2,
    date: "Jan 2025 - May 2025",
    title: "Campus Strategist",
    company: "Perplexity",
    location: "San Francisco, CA",
    description: "Led growth of the Perplexity platform in the midwest region and Purdue community, grew user base by thousands. Developed and executed marketing strategies to increase brand awareness and user engagement.",
    logo: '/assets/perplexity.png',
    current: false
  },
  {
    id: 3,
    date: "August 2024 - May 2025",
    title: "AI/LLM Researcher + Engineer",
    company: "Corteva",
    location: "Contract",
    description: "Worked on a team to develop an LLM-powered PDF extraction tool for Safety Data Sheets (SDS) and Crop Protection Labels. Fine-tuned open-source models to process non-standardized PDF formats, creating a structured database. Developed an AI-powered API for natural language queries.",
    logo: '/assets/corteva.png',
    current: false
  },
  {
    id: 4,
    date: "Aug 2024 - May 2025",
    title: "Undergaduate Data Science Researcher",
    company: "Data Mine @ Purdue University", 
    location: "Indianapolis, IN",
    description: "Data wrangling, visualization, and modeling in R, Python; Contracted on the Cortvea Project",
    logo: '/assets/datamine.png',
    current: false
  },
  {
    id: 5,
    date: "Jan 2023 - Present",
    title: "Global Youth Ambassador & Advisory to Global Board Member",
    company: "Foundation for the support of the United Nations",
    location: "New York, NY",
    description: "Advising the Global Board on youth engagement strategies and initiatives. Collaborating with global leaders to promote sustainable development goals and youth empowerment.", 
    logo: '/assets/fsun.png',
    current: true
  },
  {
    id: 6,
    date: "June 2022 - August 2022",
    title: "Software Engineer Intern",
    company: "TrustCircle",
    location: "San Francisco, CA",
    description: "Shadowed the Director of Engineering at TrustCircle, aided in AI/ML research, and implemented Semantic Search models that helped identify at-risk students and the roots of risk proactively. The model integration led to 2X increase in efficiency in addressing students in need by generating a summarized data analysis report for school counselors.", 
    logo: '/assets/trustcircle.png',
    current: false
  },

];

export default function Component() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(new Set(items.map(item => item.id)));
            }, 100);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '50px'
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`relative flex gap-6 transition-all duration-700 ease-out ${
              visibleItems.has(item.id) 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
            style={{ 
              transitionDelay: `${index * 200}ms` 
            }}
          >
            {/* Timeline Line and Indicator */}
            <div className="relative flex flex-col items-center flex-shrink-0">
              {/* Logo Indicator */}
              <div
                className={`flex items-center justify-center rounded-full border-2 bg-white shadow-lg transition-all duration-500 z-10 ${
                  item.current 
                    ? 'w-12 h-12 border-orange-500 ring-4 ring-blue-100' 
                    : 'w-10 h-10 border-gray-300'
                }`}
              >
                <img 
                  src={item.logo} 
                  alt={`${item.company} logo`}
                  className="rounded-full object-cover"
                  style={{ width: item.current ? '32px' : '28px', height: item.current ? '32px' : '28px' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Connecting Line - Only show if not the last item */}
              {index < items.length - 1 && (
                <div 
                  className={`w-0.5 bg-gray-300 mt-4 transition-all duration-1000 ease-out ${
                    visibleItems.has(item.id) ? 'h-20' : 'h-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 200 + 600}ms` 
                  }}
                />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
              {/* Date with Current Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-gray-500">
                <Calendar size={14} />
                <span className="font-medium">{item.date}</span>
                {item.current && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium border border-green-200">
                    Current
                  </span>
                )}
              </div>
              
              {/* Job Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {item.title}
              </h3>
              
              {/* Company and Location Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4">
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <Building2 size={16} />
                  <span className="text-base">{item.company}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={14} />
                  <span className="text-sm">{item.location}</span>
                </div>
              </div>
              
              {/* Description Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all duration-300">
                <p className="text-gray-700 leading-relaxed text-base">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}