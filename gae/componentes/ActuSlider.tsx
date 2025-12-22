'use client';

import { useState } from 'react';
import Image from 'next/image';
import Boxed from '@/staticComponentes/Boxed';
import ActuCard from '@/componentes/ActuCard';

interface ActuItem {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  href?: string;
}

interface ActuSliderProps {
  items: ActuItem[];
  w_size?: '100%' | '70%' | '50%';
}

export default function ActuSlider({ items, w_size = '70%' }: ActuSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const handlePrevious = () => {
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      setSlideDirection(null);
    }, 300);
  };

  const handleNext = () => {
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      setSlideDirection(null);
    }, 300);
  };

  const visibleItems = [
    items[(currentIndex - 1 + items.length) % items.length],
    items[currentIndex],
    items[(currentIndex + 1) % items.length],
  ];

  return (
    <div className="flex items-center justify-center gap-0 w-full py-16">
      {/* Left Arrow - 15% */}
      <div className="w-[15%] flex justify-center">
        <button
          onClick={handlePrevious}
          className="hover:scale-125 transition-transform duration-300 cursor-pointer w-16 h-16 relative"
        >
          <Image
            src="/ilstr/bouton_fleche.svg"
            alt="Flèche précédente"
            fill
            className="object-contain"
          />
        </button>
      </div>

      {/* Cards in Boxed - 70% */}
      <Boxed color="white" w_size="70%">
        <div className="relative w-full py-4">
          <div 
            className={`flex gap-20 justify-center transition-all duration-300 ease-out
              ${slideDirection === 'right' ? '-translate-x-20 opacity-0' : ''}
              ${slideDirection === 'left' ? 'translate-x-20 opacity-0' : ''}
              ${!slideDirection ? 'translate-x-0 opacity-100' : ''}
            `}
          >
            {visibleItems.map((item, index) => (
              <ActuCard
                key={`${item.id}-${currentIndex}-${index}`}
                image={item.image}
                imageAlt={item.imageAlt}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </Boxed>

      {/* Right Arrow - 15% */}
      <div className="w-[15%] flex justify-center">
        <button
          onClick={handleNext}
          className="hover:scale-125 transition-transform duration-300 cursor-pointer w-16 h-16 relative"
        >
          <Image
            src="/ilstr/bouton_fleche.svg"
            alt="Flèche suivante"
            fill
            className="object-contain rotate-180"
          />
        </button>
      </div>
    </div>
  );
}
