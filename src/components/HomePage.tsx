import React, { useState, useEffect } from 'react';
import LCViewer from './LCViewer';

const TYPING_SPEED = 100;

function HomePage() {
  const nameFull = 'Lakshya Chaudhry';
  const subtitleFull = 'AI @ Purdue';

  const [nameText, setNameText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [hasTypedName, setHasTypedName] = useState(false);
  const [hasTypedSubtitle, setHasTypedSubtitle] = useState(false);

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
    <div className="flex-none w-screen min-h-screen scroll-snap-start flex flex-col justify-center items-center bg-gradient-to-br from-white to-gray-100 px-4 py-8">
      <div className="hidden lg:flex items-center justify-center w-full max-w-7xl gap-16">
        {/* 3D model */}
        <div className="flex-1 max-w-2xl">
          <div style={{ width: '100%', height: '70vh', minHeight: '500px' }}>
            <LCViewer />
          </div>
        </div>

        <div className="flex-1 max-w-xl">
          <div className="text-left">
            <h1
              className="text-6xl xl:text-7xl font-light text-gray-900 mb-2 leading-tight"
              style={{ fontFamily: 'RobotoRegular, sans-serif' }}
            >
              {nameText}
            </h1>

            <p
              className="text-2xl xl:text-3xl text-black font-light tracking-wide mb-4"
              style={{ fontFamily: 'RobotoRegular, sans-serif' }}
            >
              {subtitleText}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="lg:hidden flex flex-col items-center justify-center w-full max-w-4xl">

        <div className="w-full mb-8">
          <div style={{ width: '100%', height: '50vh', minHeight: '300px' }}>
            <LCViewer />
          </div>
        </div>

        <div className="text-center px-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-2 leading-tight"
            style={{ fontFamily: 'RobotoRegular, sans-serif' }}
          >
            {nameText}
          </h1>

          <p
            className="text-xl sm:text-2xl text-black font-light tracking-wide mb-4"
            style={{ fontFamily: 'RobotoRegular, sans-serif' }}
          >
            {subtitleText}
          </p>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
