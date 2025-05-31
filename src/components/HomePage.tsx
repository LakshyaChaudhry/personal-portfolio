import { useState, useEffect } from 'react';
import LCViewer from './LCViewer';

const TYPING_SPEED = 100;

function HomePage() {
  const nameFull = 'Lakshya Chaudhry';
  const subtitleFull = 'AI @ Purdue';

  const [nameText, setNameText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [hasTypedName, setHasTypedName] = useState(false);
  const [hasTypedSubtitle, setHasTypedSubtitle] = useState(false);
  const [viewerKey, setViewerKey] = useState(0);

  // Force re-render of 3D viewer on significant resize
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setViewerKey(prev => prev + 1);
      }, 300); // Debounce resize
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

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
    } else if (
      hasTypedName &&
      subtitleText.length === subtitleFull.length &&
      !hasTypedSubtitle
    ) {
      setHasTypedSubtitle(true);
    }
  }, [hasTypedName, subtitleText, subtitleFull, hasTypedSubtitle]);

  return (
    <div className="flex-none w-screen min-h-screen scroll-snap-start flex flex-col justify-center items-center bg-gradient-to-br px-4 py-8">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          
          {/* 3D Model with key for forced re-render */}
          <div className="w-full lg:flex-1 lg:max-w-2xl order-1 lg:order-1">
            <div className="w-full h-[50vh] lg:h-[70vh] min-h-[300px] lg:min-h-[500px]">
              <LCViewer key={viewerKey} />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:flex-1 lg:max-w-xl order-2 lg:order-2">
            <div className="text-center lg:text-left px-4 lg:px-0">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-medium text-gray-900 mb-2 leading-tight"
                style={{ fontFamily: 'RobotoRegular, sans-serif' }}
              >
                {nameText}
              </h1>

              <p
                className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl text-black font-light tracking-wide mb-4"
                style={{ fontFamily: 'RobotoRegular, sans-serif' }}
              >
                {subtitleText}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;