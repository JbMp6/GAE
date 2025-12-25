'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Boxed from './Boxed';
import Button from '@/componentes/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const companies = [
  {
    id: 1,
    logo: '/ilstr/allanic_electricite_56.svg',
    icon: '/ilstr/eclair_02.svg',
    text: "Spécialiste reconnu de l'installation et de la rénovation électrique pour l'habitat collectif, cette entité accompagne les projets neufs et les résidences de grande envergure. Son expertise couvre l'ensemble des réseaux électriques basse et haute tension, incluant la pose de tableaux de protection et la mise en œuvre de systèmes de ventilation (VMC) pour garantir le confort et la sécurité des occupants.",
    bgColor: 'bg-[var(--color-extra)]',
    reverse: false
  },
  {
    id: 2,
    logo: '/ilstr/allanic_electricite_29.svg',
    icon: '/ilstr/eclair_02.svg',
    text: "Tournée vers le secteur industriel et tertiaire, cette agence déploie des solutions techniques pointues en électricité générale et électromécanique. Elle se distingue par une spécialisation rare dans les systèmes de levage ainsi que par une forte réactivité pour les opérations de dépannage et de maintenance curative, assurant ainsi la continuité d'activité des infrastructures professionnelles et agricoles.",
    bgColor: 'bg-[var(--color-extra)]/20',
    reverse: true
  },
  {
    id: 3,
    logo: '/ilstr/allanic_cvc_56.svg',
    icon: '/ilstr/chauffage_climatisation.svg',
    text: "Expert en génie climatique, Allanic C.V.C. intervient sur les lots fluides et énergies pour les bâtiments collectifs. De la plomberie sanitaire au chauffage, en passant par la climatisation et le traitement de l'air, ses équipes conçoivent des installations performantes répondant aux dernières normes environnementales pour une gestion thermique optimale et durable.",
    bgColor: 'bg-[var(--color-extra)]',
    reverse: false
  },
  {
    id: 4,
    logo: '/ilstr/acf_56.svg',
    icon: '/ilstr/maintenance.svg',
    text: "Véritable partenaire de la gestion technique du bâtiment, A.C.F. est l'expert des courants faibles et de la sécurité. La société assure l'installation et la maintenance rigoureuse des systèmes d'interphonie, de contrôle d'accès et de sécurité incendie. Elle pilote également des contrats de maintenance multi-techniques pour pérenniser l'ensemble des installations électriques et de ventilation.",
    bgColor: 'bg-[var(--color-extra)]/20',
    reverse: true
  }
];

export default function SocietesPresentation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const texts = gsap.utils.toArray<HTMLElement>('.company-text');
    
    texts.forEach((text) => {
      const isReverse = text.getAttribute('data-reverse') === 'true';
      
      gsap.fromTo(text, 
        { 
          opacity: 0, 
          x: isReverse ? -300 : 300
        },
        {
          opacity: 1,
          x: 0,
          duration: 2.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center overflow-hidden">
      {companies.map((company) => (
        <div key={company.id} className={`w-full flex justify-center ${company.bgColor}`}>
          <Boxed w_size="70%" color="transparent" className="py-8 md:py-12">
            <div 
              className={`flex flex-col md:flex-row items-center justify-between w-full gap-8 ${company.reverse ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Logo & Icon Section */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 w-full md:w-5/12">
                {/* Icon */}
                <div className={`relative w-16 h-16 md:w-24 md:h-24 order-1 ${company.reverse ? 'md:order-1' : 'md:order-2'}`}>
                  <Image 
                    src={company.icon} 
                    alt="Icone métier" 
                    fill 
                    className="object-contain"
                  />
                </div>

                {/* Logo */}
                <div className={`relative w-64 h-32 md:w-96 md:h-48 order-2 ${company.reverse ? 'md:order-2' : 'md:order-1'}`}>
                  <Image 
                    src={company.logo} 
                    alt="Logo société" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div 
                className="company-text hidden md:block w-full md:w-5/12 text-[var(--color-secondary)] font-futura text-base leading-relaxed whitespace-pre-line text-justify"
                data-reverse={company.reverse}
              >
                {company.text}
              </div>
            </div>
          </Boxed>
        </div>
      ))}
      
      <div className="w-full flex justify-center bg-[var(--color-extra)]/20">
        <Boxed w_size="70%" color="transparent" className="py-12">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full">
            <div></div>
            <div className="flex justify-center">
              <Button title="+" onClick={() => {}} />
            </div>
            <div className="pl-4">
              <span className="text-[var(--color-secondary)] font-futura text-sm italic">En savoir plus ...</span>
            </div>
          </div>
        </Boxed>
      </div>
    </div>
  );
}
