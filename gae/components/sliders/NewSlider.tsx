'use client';

import { useState, ReactElement, useRef } from 'react';
import Image from 'next/image';
import Boxed from '@/components/layout/Boxed';
import Button from '@/components/ui/Button';

interface GenericSliderProps<T> {
  items: T[];
  w_size?: '100%' | '70%' | '50%';
  children: (item: T, index: number) => ReactElement;
}

export default function NewSlider<T>({ items, w_size = '70%', children }: GenericSliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const sliderRef = useRef<HTMLDivElement>(null);
  const savedScrollPosition = useRef<number>(0);

  const handleShowMore = () => {
    // Sauvegarder la position avant d'ouvrir
    savedScrollPosition.current = window.scrollY;
    setShowAllMobile(true);
  };

  const handleShowLess = () => {
    setShowAllMobile(false);
    // Restaurer la position après la fermeture
    setTimeout(() => {
      window.scrollTo({ top: savedScrollPosition.current, behavior: 'smooth' });
    }, 0);
  };

  const handlePrevious = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // Get visible items (2 before, center, 2 after)
  const visibleItems = [];
  for (let i = -2; i <= 2; i++) {
    const index = (currentIndex + i + items.length) % items.length;
    visibleItems.push(items[index]);
  }

  const animationClass = direction === 'next' ? 'carousel-slide-next' : 'carousel-slide-prev';

  const lastThreeItems = items.slice(-3);

  return (
    <div ref={sliderRef} className="w-full flex justify-center items-center h-auto py-10 relative">
      {/* Desktop Slider */}
      <div className="hidden xl:flex items-center justify-center gap-0 w-full max-w-[1920px] h-full">
        {/* Left Arrow */}
        <div className="w-[15%] flex justify-center">
          <button
            onClick={handlePrevious}
            className="hover:scale-125 transition-transform duration-300 cursor-pointer w-16 h-16 relative"
          >
            <Image
              src="/ilstr/bouton_fleche.svg"
              alt="Précédent"
              fill
              className="object-contain"
            />
          </button>
        </div>

        {/* Cards Container */}
        <Boxed color="white" w_size="70%">
          <div className="relative flex justify-center items-center w-full py-20 px-5 overflow-x-hidden min-h-[540px]">
            <div
              key={`${currentIndex}-${direction}`}
              className={`flex 2xl:gap-20 gap-15 justify-center h-full w-full carousel-track ${animationClass}`}
            >
              {visibleItems.map((item, index) => (
                <div
                  key={`slider-${currentIndex}-${index}`}
                  className="shrink-0 flex justify-center transition-opacity duration-300"
                  style={{ width: 'calc((100% - 10rem) / 3)', maxWidth: 400 }}
                >
                  {children(item, index)}
                </div>
              ))}
            </div>
          </div>
        </Boxed>

        {/* Right Arrow */}
        <div className="w-[15%] flex justify-center">
          <button
            onClick={handleNext}
            className="hover:scale-125 transition-transform duration-300 cursor-pointer w-16 h-16 relative"
          >
            <Image
              src="/ilstr/bouton_fleche.svg"
              alt="Suivant"
              fill
              className="object-contain rotate-180"
            />
          </button>
        </div>
      </div>

      {/* Mobile List */}
      <div className="flex xl:hidden flex-col justify-center items-center gap-10 w-full h-auto px-4">
        {(showAllMobile ? items : lastThreeItems).map((item, index) => (
          <div key={`mobile-${index}`} className="w-[85%] flex justify-center items-center">
            {children(item, index)}
          </div>
        ))}
        {!showAllMobile && items.length > 3 && (
          <Button 
            title="Voir plus..." 
            onClick={handleShowMore} 
          />
        )}
        {showAllMobile && (
          <Button 
            title="Voir moins" 
            onClick={handleShowLess} 
          />
        )}
      </div>

      <style jsx>{`
        .carousel-track {
          will-change: transform;
          backface-visibility: hidden;
        }

        .carousel-slide-next {
          animation: carouselSlideNext 0.55s cubic-bezier(0.33, 1, 0.68, 1) both;
        }

        .carousel-slide-prev {
          animation: carouselSlidePrev 0.55s cubic-bezier(0.33, 1, 0.68, 1) both;
        }

        @keyframes carouselSlideNext {
          from {
            transform: translateX(35%);
          }
          to {
            transform: translateX(0%);
          }
        }

        @keyframes carouselSlidePrev {
          from {
            transform: translateX(-35%);
          }
          to {
            transform: translateX(0%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-slide-next,
          .carousel-slide-prev {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
