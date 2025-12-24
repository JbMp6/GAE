'use client';

import Image from 'next/image';
import Boxed from './Boxed';

const services = [
  {
    title: 'Électricité',
    icon: '/ilstr/eclair_02.svg',
    bg: 'bg-[var(--color-extra)]',
    buttonColor: 'bg-[var(--color-extra)]'
  },
  {
    title: 'Courant faible',
    icon: '/ilstr/courant_faible.svg',
    bg: 'bg-[var(--color-primary)]',
    buttonColor: 'bg-[var(--color-primary)]'
  },
  {
    title: 'Chauffage & climatisation',
    icon: '/ilstr/chauffage_climatisation.svg',
    bg: 'bg-[var(--color-extra)]',
    buttonColor: 'bg-[var(--color-extra)]'
  },
  {
    title: 'Maintenance',
    icon: '/ilstr/maintenance.svg',
    bg: 'bg-[var(--color-primary)]',
    buttonColor: 'bg-[var(--color-primary)]'
  }
];

export default function ServicePresentation() {
  return (
    <Boxed w_size="70%" color="white" className="py-25 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`${service.bg} w-3/4 md:w-full aspect-square rounded-[30px] flex flex-col items-center justify-center p-6 relative group transition-transform hover:scale-105 duration-300`}>
              <div className="relative w-40 h-40 mb-6">
                 <Image 
                   src={service.icon} 
                   alt={service.title} 
                   fill 
                   className="object-contain"
                 />
              </div>
              <h3 className="text-[var(--color-secondary)] text-center font-futura text-sm font-medium leading-tight">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </Boxed>
  );
}
