import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const loadingMessages = [
      'Initializing...',
      'Loading components...',
      'Preparing interface...',
      'Almost ready...',
      'Welcome to Pulse!'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Pulse Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer pulse rings */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-20"></div>
            <div className="absolute inset-2 rounded-full border-4 border-purple-400 animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-4 rounded-full border-4 border-indigo-400 animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
            
            {/* Center circle */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white text-xl font-semibold mb-4 animate-pulse">
          {loadingText}
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Percentage */}
        <div className="text-white text-sm mt-2 opacity-75">
          {progress}%
        </div>

        {/* Team Credits */}
        <div className="text-white text-xs mt-8 opacity-60">
          A project of Team Legends @Moeed ul Hassan
        </div>
      </div>
    </div>
  );
};

export default Preloader; 