'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';

interface ServiceCardModalProps {
  icon: string;
  title: string;
  description: string;
  onClose: () => void;
}

export default function ServiceCardModal({ icon, title, description, onClose }: ServiceCardModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-2">
      <div className="relative bg-white rounded-[2.5rem] border-4 border-primary shadow-2xl w-[95vw] xl:w-[70vw] h-[80vh] xl:h-[calc(100vh-180px)] flex flex-col xl:flex-row p-8 xl:p-20 fade-in-modal overflow-hidden">
        {/* Bouton fermer */}
        <button
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border-3 border-primary bg-white text-primary hover:border-secondary hover:text-secondary transition-colors focus:outline-none z-10"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        <div className='w-full xl:w-[50%] pr-0 xl:pr-5 flex flex-col justify-between items-center mb-6 xl:mb-0'>
            <div className='relative flex w-[100%] h-[200px] xl:h-[60%] rounded-4xl items-center justify-center'>
                <div className="relative w-2/3 h-2/3">
                  <Image
                    src={icon} 
                    alt={title}
                    fill
                    className="object-contain"
                  />
                </div>
            </div>
            
            <div className='flex flex-col justify-center items-center text-center xl:pb-45'>
              <h2 className="font-futura font-bold text-secondary text-3xl xl:text-5xl leading-tight">{title}</h2>
            </div>
        </div>
        <div className='w-full xl:w-[50%] pl-0 xl:pl-5 pt-0 xl:pt-25 flex flex-col min-h-0'>
          <div className="mt-auto flex flex-col items-start w-full overflow-y-auto">
            <p className='text-secondary font-futura text-lg xl:text-2xl mb-4 text-justify'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
