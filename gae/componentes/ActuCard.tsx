'use client';

import Image from 'next/image';
import Button from '@/componentes/Button';
import { useState } from 'react';
import { on } from 'events';

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

export default function ActuCard({image, imageAlt, title, subtitle, description, content, onClick}: ActuCardProps) {
  const [descriptionMobile, setDescriptionMobile] = useState(0);
  // Set real to false by default if not provided
  const real = typeof arguments[0].real === 'undefined' ? false : arguments[0].real;
  const developText = () => {
    if (descriptionMobile === 1) return setDescriptionMobile(0);
    setDescriptionMobile(1);
  };
  const handleClick = onClick ? onClick : developText;
  return (
    <div className="bg-white rounded-2xl overflow-hidden border-2 border-primary hover:shadow-xl hover:scale-105 transition-all duration-300 w-full max-w-[370px] h-full flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-100 rounded-2xl">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Container */}
      <div className={`p-6 flex flex-col ${real ? 'justify-center items-center' : ''}`}>
        {/* Title and Subtitle */}
        <div className="mb-4">
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
      </div>
    </div>
  );
}
