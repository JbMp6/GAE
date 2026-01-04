'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Afficher le bouton si on a défilé plus de 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    
    // Attendre 400ms pour l'animation de l'éclair
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      
      // Réinitialiser l'animation après le scroll
      setTimeout(() => {
        setIsClicked(false);
      }, 800);
    }, 800);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`xl:absolute xl:flex hidden right-4 z-50 p-3 bg-secondary hover:scale-110 text-primary rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
      aria-label="Retour en haut"
    >
      {/* Double chevrons */}
      <svg
        className={`w-5 h-5 transition-all duration-300 ${
          isClicked ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 15l7-7 7 7M5 9l7-7 7 7"
        />
      </svg>
      
      {/* Éclair */}
      <Image
        src="/ilstr/eclair_01.svg"
        alt="éclair"
        width={15}
        height={15}
        className={`absolute inset-0 m-auto transition-all duration-300 ${
          isClicked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      />
    </button>
  );
}
