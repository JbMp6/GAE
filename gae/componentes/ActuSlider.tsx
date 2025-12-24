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

  const lastThreeItems = items.slice(-3);

  return (
    <div className="w-full py-16">
      {/* Desktop Slider */}
      <div className="hidden md:flex items-center justify-center gap-0 w-full">
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

      {/* Mobile List */}
      <div className="flex md:hidden flex-col items-center gap-8 w-full px-4">
        {lastThreeItems.map((item, index) => (
          <div key={`mobile-${item.id}-${index}`} className="w-[85%]">
            <ActuCard
              image={item.image}
              imageAlt={item.imageAlt}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              href={item.href}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
