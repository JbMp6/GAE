'use client';

import { useState, useEffect, ReactNode } from 'react';

const LoadingScreen = ({ progress, isExiting }: { progress: number; isExiting: boolean }) => {
  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-white transition-opacity duration-500 z-150 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Rotating ring */}
        <div
          className="absolute w-32 h-32 rounded-full border-4 border-transparent border-t-primary border-r-primary"
          style={{
            animation: 'spin 2s linear infinite',
          }}
        />
        
        {/* Lightning icon */}
        <img
          src="/icons/ui/eclair_01.svg"
          alt="Loading"
          width={40}
          height={40}
          className="z-10"
        />
      </div>
      
      {/* Percentage text */}
      <div className="absolute bottom-20">
        <p className="text-4xl font-bold text-primary">{progress}%</p>
      </div>
    </div>
  );
};

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Timer de 2 secondes
    const startTime = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min(Math.floor((elapsed / duration) * 100), 99);
      setProgress(percentage);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsExiting(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading && <LoadingScreen progress={progress} isExiting={isExiting} />}
      {children}
    </>
  );
}
