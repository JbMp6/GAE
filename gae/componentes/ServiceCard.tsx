'use client';

import Image from 'next/image';
import Button from './Button';

interface ServiceCardProps {
  title: string;
  icon: string;
  iconAlt?: string;
  bg: string;
  onClick?: () => void;
}

export default function ServiceCard({ title, icon, iconAlt, bg, onClick }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center 2xl:w-75 2xl:h-90 w-60 h-72">
      <div className={`${bg} rounded-[30px] flex flex-col items-center justify-center p-4 w-full h-full transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
        <div className="relative w-2/4 h-2/4 mx-auto">
          {icon ? (
            <Image 
              src={icon} 
              alt={title} 
              fill 
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
              <span className="text-gray-400">No icon</span>
            </div>
          )}
        </div>
        <h3 className="text-[var(--color-secondary)] text-center font-futura text-lg font-medium leading-tight mt-4">
          {title}
        </h3>
        {/* Button */}
        <div className="flex justify-center pt-7">
            <Button
              title="Lire la suite ..."
              hoverColor={'hover:text-white'}
              onClick={onClick}
            />
        </div>
      </div>
    </div>
  );
}
