import React, { useState, useEffect, useRef } from 'react';
import { Building2, Calendar, MapPin } from 'lucide-react';
// import {
//   Timeline,
//   TimelineContent,
//   TimelineDate,
//   TimelineHeader,
//   TimelineIndicator,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineTitle,
// } from "@/components/ui/timeline"

const items = [
  {
    id: 1,
    date: "Jan 2024 - Present",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    description: "Led development of React-based dashboard serving 10k+ users. Implemented modern state management and optimized performance by 40%.",
    logo: "https://via.placeholder.com/40x40/4F46E5/white?text=TC",
    current: true
  },
  {
    id: 2,
    date: "Jun 2022 - Dec 2023",
    title: "Frontend Developer",
    company: "StartupCo",
    location: "Remote",
    description: "Built responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components.",
    logo: "https://via.placeholder.com/40x40/059669/white?text=SC",
    current: false
  },
  {
    id: 3,
    date: "Aug 2021 - May 2022",
    title: "Junior Developer",
    company: "WebAgency", 
    location: "New York, NY",
    description: "Developed client websites using modern web technologies. Gained experience in full-stack development and agile methodologies.",
    logo: "https://via.placeholder.com/40x40/DC2626/white?text=WA",
    current: false
  },
  {
    id: 4,
    date: "Jan 2021 - Jul 2021",
    title: "Web Development Intern",
    company: "Digital Solutions",
    location: "Boston, MA", 
    description: "Assisted in building e-commerce platforms. Learned industry best practices and modern development workflows.",
    logo: "https://via.placeholder.com/40x40/7C3AED/white?text=DS",
    current: false
  }
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