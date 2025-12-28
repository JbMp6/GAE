'use client';

import Image from 'next/image';
import Button from '@/componentes/Button';

interface ActuCardProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  onClick?: () => void;
}

export default function ActuCard({image,imageAlt,title,subtitle,description,onClick}: ActuCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border-2 border-primary hover:shadow-xl hover:scale-105 transition-all duration-300 w-full max-w-[370px] h-[480px] flex flex-col">
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
      <div className="p-6 flex flex-col">
        {/* Title and Subtitle */}
        <div className="mb-4">
          <h3 className="text-xl font-futura font-bold text-secondary mb-1">
            {title}
          </h3>
          <p className="text-sm font-futura text-primary font-semibold">
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-secondary font-futura leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <Button
            title="+"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}
