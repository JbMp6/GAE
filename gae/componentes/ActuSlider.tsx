
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Boxed from '@/staticComponentes/Boxed';
import ActuCard from '@/componentes/ActuCard';

// TypeScript interface for a news item (card)
interface ActuItem {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  href?: string;
}

// Props for the slider
interface ActuSliderProps {
  items: ActuItem[];
  w_size?: '100%' | '70%' | '50%';
}

// Main slider component
export default function ActuSlider({ items, w_size = '70%' }: ActuSliderProps) {
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
    <div className="w-full flex justify-center items-center py-16">
      {/* --- Desktop Slider --- */}
      <div className="hidden 2xl:flex items-center justify-center gap-0 w-full max-w-[1920px]">
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
          {/* Overflow hidden to keep cards inside the box, even on hover. min-h-[540px] ensures shadow is always visible. */}
          <div className="relative w-full py-4 overflow-hidden min-h-[540px]">
            <div
              ref={containerRef}
              className="flex gap-20 justify-center"
              style={{ transition: 'none' }}
            >
              {visibleItems.map((item, index) => (
                <div
                  key={`${item.id}-${currentIndex}-${index}`}
                  className="shrink-0 flex justify-center"
                  style={{ width: 'calc((100% - 10rem) / 3)', maxWidth: 400 }}
                >
                  {/* Card with hover effect, but overflow is managed by parent */}
                  <div className="w-full h-full flex items-center justify-center">
                    <ActuCard
                      image={item.image}
                      imageAlt={item.imageAlt}
                      title={item.title}
                      subtitle={item.subtitle}
                      description={item.description + " ..."}
                      href={item.href}
                    />
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
      <div className="flex 2xl:hidden flex-col justify-center items-center gap-8 w-full px-4">
        {lastThreeItems.map((item, index) => (
          <div key={`mobile-${item.id}-${index}`} className="w-[85%] flex justify-center items-center">
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
