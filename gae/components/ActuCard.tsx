'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import { useState, useRef } from 'react';

interface ActuCardProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description?: string;
  content?: string;
  real?: boolean;
  onClick?: () => void;
}

export default function ActuCard({image, imageAlt, title, subtitle, description, content, real = false, onClick}: ActuCardProps) {
  const [descriptionMobile, setDescriptionMobile] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const developText = () => {
    if (descriptionMobile === 1) {
      setDescriptionMobile(0);
    } else {
      // Sauvegarder la position avant d'agrandir
      if (cardRef.current) {
        const cardTop = cardRef.current.getBoundingClientRect().top + window.scrollY;
        setDescriptionMobile(1);
        // Maintenir la position après le rendu
        setTimeout(() => {
          window.scrollTo({ top: cardTop - 20, behavior: 'smooth' });
        }, 0);
      }
    }
  };
  const handleClick = () => {
    // En version desktop (xl), ouvrir la modal si onClick existe
    if (onClick && window.innerWidth >= 1280) {
      onClick();
    } else {
      // En version mobile, développer/réduire le texte
      developText();
    }
  };
  return (
    <div ref={cardRef} className="bg-white relative rounded-2xl overflow-hidden border-2 border-primary xl:hover:shadow-xl xl:hover:scale-105 transition-all duration-300 w-full max-w-[370px] h-full flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-100 rounded-2xl">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className={`p-6 flex flex-col ${real ? 'justify-center items-center' : ''}`}>
        {/* Title and Subtitle */}
        <div className={`mb-4 ${real ? 'justify-center items-center text-center' : ''}`}>
          <h3 className="text-2xl font-futura font-bold text-secondary mb-1">
            {title}
          </h3>
          <p className="text-lg font-futura text-primary font-semibold">
            {subtitle}
          </p>
        </div>

        {!real && (
          <>
            {/* Description */}
            <p className="text-lg text-secondary font-futura leading-relaxed mb-6 flex-grow">
              {descriptionMobile === 0 ? description : content}
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <Button
                title={descriptionMobile === 0 ? "Lire la suite ..." : "Retour ..."}
                onClick={handleClick}
              />
            </div>
          </>
        )}
        {real && (
            <div className='absolute bottom-0 w-[45%] h-[5px] bg-primary'></div>
          )}
      </div>
    </div>
  );
}
