'use client';

import Image from 'next/image';
import Boxed from './Boxed';
import Button from '@/componentes/Button';

const companies = [
  {
    id: 1,
    logo: '/ilstr/allanic_electricite_29.svg',
    icon: '/ilstr/eclair_02.svg',
    text: 'Acipis elicidunt aut et quuntemquiaXimincimusam alibus modiae platem volupid qui omnihillam, qui quat omnim nos et hiciae cusae vendandit rendam ne sus aliquis ex eat. Accabo.\n\nUdaest, tempore scimus inctempor sitatae peris nimus et velignit quid mo ipiendel ium volupta voluptatium ligendi rerum. Adipsant autet ut oditate mporit aut facim auta quamenisque etum aut landis aliatur ?',
    bgColor: 'bg-[var(--color-extra)]',
    reverse: false
  },
  {
    id: 2,
    logo: '/ilstr/allanic_cvc_56.svg',
    icon: '/ilstr/chauffage_climatisation.svg',
    text: 'Acipis elicidunt aut et quuntemquiaXimincimusam alibus modiae platem volupid qui omnihillam.\n\nAdis ellest que in perum raepedis dis ut at ut eum quo omnitat ibusam, quostia doluptata atqui utem hitae nis sit fuga. Cum fuga. Ores architate labor aperis elendigendis exeria quatini consernam, omnitae corem volest et fugia quate latium velit.',
    bgColor: 'bg-[var(--color-extra)]/20', // Lighter or transparent
    reverse: true
  },
  {
    id: 3,
    logo: '/ilstr/allanic_electricite_56.svg',
    icon: '/ilstr/eclair_02.svg',
    text: 'Perepell enihici ditiores est, temquib ustios ullupti nonse culluptur, nos es autem. Et andaest, essuntiur?\n\nEdic totatquunt harum quam la que volupid elessum eos accum imini temodit atquis natur magnis aut ilis adiosae nim ad experumquas soles aute num harci blabore rchilic tem nit ommolo di vit recto volore evellor eprectinis.',
    bgColor: 'bg-[var(--color-extra)]',
    reverse: false
  },
  {
    id: 4,
    logo: '/ilstr/acf_56.svg',
    icon: '/ilstr/maintenance.svg',
    text: 'Acipis elicidunt aut et quuntemquiaXimincimusam alibus modiae platem volupid qui omnihillam.\n\nAdis ellest que in perum raepedis dis ut at ut eum quo omnitat ibusam, quostia doluptata atqui utem hitae nis sit fuga.',
    bgColor: 'bg-[var(--color-extra)]/20',
    reverse: true
  }
];

export default function SocietesPresentation() {
  return (
    <div className="w-full flex flex-col items-center">
      {companies.map((company) => (
        <div key={company.id} className={`w-full flex justify-center ${company.bgColor}`}>
          <Boxed w_size="70%" color="transparent" className="py-8 md:py-12">
            <div 
              className={`flex flex-col md:flex-row items-center justify-between w-full gap-8 ${company.reverse ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Logo & Icon Section */}
              <div className="flex items-center justify-center gap-6 w-full md:w-5/12">
                <div className={`relative w-96 h-48 ${company.reverse ? 'order-2' : 'order-1'}`}>
                  <Image 
                    src={company.logo} 
                    alt="Logo société" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div className={`relative w-24 h-24 ${company.reverse ? 'order-1' : 'order-2'}`}>
                  <Image 
                    src={company.icon} 
                    alt="Icone métier" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-5/12 text-[var(--color-secondary)] font-futura text-base leading-relaxed whitespace-pre-line text-justify">
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
