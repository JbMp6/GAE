'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const directionRef = useRef<'left' | 'right' | null>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const getSlideAmount = () => {
    if (!containerRef.current) return 0;
    const firstCard = containerRef.current.children[0] as HTMLElement;
    if (!firstCard) return 0;
    
    // Calculate width including gap
    const style = window.getComputedStyle(containerRef.current);
    const gap = parseFloat(style.gap) || 0;
    return firstCard.offsetWidth + gap;
  };

  const handlePrevious = contextSafe(() => {
    if (directionRef.current) return;
    directionRef.current = 'left';
    
    const slideAmount = getSlideAmount();
    
    gsap.to(containerRef.current, {
      x: slideAmount,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      },
    });
  });

  const handleNext = contextSafe(() => {
    if (directionRef.current) return;
    directionRef.current = 'right';

    const slideAmount = getSlideAmount();

    gsap.to(containerRef.current, {
      x: -slideAmount,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      },
    });
  });

  useGSAP(() => {
    if (directionRef.current) {
      gsap.set(containerRef.current, { x: 0 });
      directionRef.current = null;
    }
  }, [currentIndex]);

  const visibleItems = [];
  for (let i = -2; i <= 2; i++) {
    const index = (currentIndex + i + items.length) % items.length;
    visibleItems.push(items[index]);
  }

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
          <div className="relative w-full py-4 overflow-hidden">
            <div 
              ref={containerRef}
              className="flex gap-20 justify-center"
            >
              {visibleItems.map((item, index) => (
                <div 
                  key={`${item.id}-${currentIndex}-${index}`} 
                  className="shrink-0 flex justify-center"
                  style={{ width: 'calc((100% - 10rem) / 3)' }}
                >
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
