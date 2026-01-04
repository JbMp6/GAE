
'use client';

import { useState, useRef, ReactElement } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Boxed from '@/staticComponentes/Boxed';

// Props for the slider
interface GenericSliderProps<T> {
  items: T[];
  w_size?: '100%' | '70%' | '50%';
  children: (item: T, index: number) => ReactElement;
}

// Main slider component - now generic
export default function Slider<T>({ items, w_size = '70%', children }: GenericSliderProps<T>) {
  // Ref for the sliding container
  const containerRef = useRef<HTMLDivElement>(null);
  // Current index of the centered card
  const [currentIndex, setCurrentIndex] = useState(0);
  // Ref to keep track of animation direction
  const directionRef = useRef<'left' | 'right' | null>(null);

  // GSAP context for animation
  const { contextSafe } = useGSAP({ scope: containerRef });

  // Helper: get the slide distance (card width + gap)
  const getSlideAmount = () => {
    if (!containerRef.current) return 0;
    const firstCard = containerRef.current.children[0] as HTMLElement;
    if (!firstCard) return 0;
    // Get the gap between cards
    const style = window.getComputedStyle(containerRef.current);
    const gap = parseFloat(style.gap) || 0;
    return firstCard.offsetWidth + gap;
  };

  // Handle left arrow click (slide right)
  const handlePrevious = contextSafe(() => {
    if (directionRef.current) return;
    directionRef.current = 'left';
    const slideAmount = getSlideAmount();
    // Animate the container to the right
    gsap.to(containerRef.current, {
      x: slideAmount,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      },
    });
  });

  // Handle right arrow click (slide left)
  const handleNext = contextSafe(() => {
    if (directionRef.current) return;
    directionRef.current = 'right';
    const slideAmount = getSlideAmount();
    // Animate the container to the left
    gsap.to(containerRef.current, {
      x: -slideAmount,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      },
    });
  });

  // After index update, reset the container position instantly
  useGSAP(() => {
    if (directionRef.current) {
      gsap.set(containerRef.current, { x: 0 });
      directionRef.current = null;
    }
  }, [currentIndex]);

  // Compute the 5 visible items (2 before, center, 2 after)
  const visibleItems = [];
  for (let i = -2; i <= 2; i++) {
    const index = (currentIndex + i + items.length) % items.length;
    visibleItems.push(items[index]);
  }

  // For mobile: last 3 items only
  const lastThreeItems = items.slice(-3);

  return (
    <div className="w-full flex justify-center items-center h-auto py-10 relative">
      {/* --- Desktop Slider --- */}
      <div className="hidden xl:flex items-center justify-center gap-0 w-full max-w-[1920px] h-full">
        {/* --- Left Arrow --- */}
        <div className="w-[15%] flex justify-center">
          <button
            onClick={handlePrevious}
            aria-label="Précédent"
            className="hover:scale-125 transition-transform duration-300 cursor-pointer w-16 h-16 relative"
          >
            {/* SVG or Image for left arrow */}
            <Image
              src="/ilstr/bouton_fleche.svg"
              alt="Flèche précédente"
              fill
              className="object-contain"
            />
          </button>
        </div>

        {/* --- Cards in Boxed --- */}
        <Boxed color="white" w_size="70%">
          {/* Overflow visible to allow shadow to show on hover */}
          <div className="relative flex justify-center items-center w-full py-20 px-5 overflow-visible min-h-[540px] h-full overflow-x-hidden">
            <div
              ref={containerRef}
              className="flex 2xl:gap-20 gap-[35px] justify-center h-full"
              style={{ transition: 'none' }}
            >
              {visibleItems.map((item, index) => (
                <div
                  key={`slider-${currentIndex}-${index}`}
                  className="shrink-0 flex justify-center"
                  style={{ width: 'calc((100% - 10rem) / 3)', maxWidth: 400 }}
                >
                  {/* Card with hover effect, but overflow is managed by parent */}
                  <div className="w-full h-full flex items-center justify-center">
                    {children(item, index)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Boxed>

        {/* --- Right Arrow --- */}
        <div className="w-[15%] flex justify-center">
          <button
            onClick={handleNext}
            aria-label="Suivant"
            className="hover:scale-125 transition-transform duration-300 cursor-pointer w-16 h-16 relative"
          >
            {/* SVG or Image for right arrow (rotated) */}
            <Image
              src="/ilstr/bouton_fleche.svg"
              alt="Flèche suivante"
              fill
              className="object-contain rotate-180"
            />
          </button>
        </div>
      </div>

      {/* --- Mobile List --- */}
      <div className="flex xl:hidden flex-col justify-center items-center gap-10 w-full h-auto px-4">
        {lastThreeItems.map((item, index) => (
          <div key={`mobile-${index}`} className="w-[85%] flex justify-center items-center">
            {children(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}