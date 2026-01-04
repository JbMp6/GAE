'use client';

import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  icon: string;
  bg: string;
  buttonColor: string;
}

export default function ServiceCard({ title, icon, bg, buttonColor }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center w-full min-w-[300px] max-w-[300px]">
      <div className={`${bg} aspect-square rounded-[30px] flex flex-col items-center justify-center p-4 w-[300px] h-[300px] transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
        <div className="relative w-2/3 h-2/3 mx-auto">
          <Image 
            src={icon} 
            alt={title} 
            fill 
            className="object-contain"
          />
        </div>
        <h3 className="text-[var(--color-secondary)] text-center font-futura text-lg font-medium leading-tight mt-4">
          {title}
        </h3>
      </div>
    </div>
  );
}
