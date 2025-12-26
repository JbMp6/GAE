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
      <div className="grid grid-cols-1 2xl:grid-cols-4 gap-10 w-full">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div className={`${service.bg} aspect-square rounded-[30px] flex flex-col items-center justify-center p-4 2xl:w-full 2xl:p-6 w-[60vw] max-w-[600px] mx-auto 2xl:max-w-full transition-all duration-300 group hover:scale-105 hover:shadow-2xl`}>
              <div className="relative w-2/3 h-2/3 mx-auto">
                 <Image 
                   src={service.icon} 
                   alt={service.title} 
                   fill 
                   className="object-contain"
                 />
              </div>
              <h3 className="text-[var(--color-secondary)] text-center font-futura text-lg font-medium leading-tight mt-4">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </Boxed>
  );
}
