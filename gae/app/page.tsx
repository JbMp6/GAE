'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import FixedFooter from '@/components/layout/FixedFooter';
import ImgBanner from '@/components/layout/ImgBanner';
import SeparatorTitle from '@/components/ui/SeparatorTitle';
import ActuCard from '@/components/cards/ActuCard';
import GroupePresentation from '@/components/sections/GroupePresentation';
import SocietesPresentation from '@/components/sections/SocietesPresentation';
import Footer from '@/components/layout/Footer';
import { Parallax } from '@/components/ui/Parallax';
import ActuCardModal from '@/components/cards/ActuCardModal';
import ServiceCardModal from '@/components/cards/ServiceCardModal';
import ServiceCard from '@/components/cards/ServiceCard';
import { getActus, getServices } from '@/lib/queries';
import type { Actu, Service } from '@/lib/queries';
import NewSlider from '@/components/sliders/NewSlider';

export default function Home() {
  const [headerBottom, setHeaderBottom] = useState<number>(0);
  const [selectedArticle, setSelectedArticle] = useState<Actu | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [actuItems, setActuItems] = useState<Actu[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    Promise.all([
      getActus(),
      getServices()
    ])
      .then(([actus, servicesData]) => {
        setActuItems(actus);
        setServices(servicesData);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Header onHeaderBottomChange={setHeaderBottom} />

      {/* Modal Article */}

      {selectedArticle && (
        <ActuCardModal
          image={selectedArticle.image}
          imageAlt={selectedArticle.imageAlt}
          title={selectedArticle.title}
          subtitle={selectedArticle.subtitle}
          content={selectedArticle.content}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Modal Service */}

      {selectedService && (
        <ServiceCardModal
          icon={selectedService.icon}
          title={selectedService.title}
          description={selectedService.description || ''}
          onClose={() => setSelectedService(null)}
        />
      )}

      <main className="flex flex-col items-center justify-start bg-white pt-header min-h-screen h-auto">

        <ImgBanner 
          img_src="/img/home_banner.jpg"
        />

        <SeparatorTitle 
          id="actualites" 
          title='actualites' 
          headerBottom={headerBottom} 
        />

        <NewSlider items={actuItems}>
          {(item) => (
            <ActuCard {...item} onClick={() => setSelectedArticle(item)} />
          )}
        </NewSlider>

        <Parallax 
          image="/img/elec.jpg" 
          height="500px" 
        />

        <SeparatorTitle 
          id="groupe" 
          title='groupe allanic energie' 
          headerBottom={headerBottom} 
        />
        <GroupePresentation />

        <SeparatorTitle 
          id="services" 
          title='services' 
          headerBottom={headerBottom} 
        />


        <NewSlider items={services}>
          {(item) => (
            <ServiceCard {...item} onClick={() => setSelectedService(item)} />
          )}
        </NewSlider>

        <Parallax 
          image="/img/elec.jpg" 
          height="500px" 
        />

        <SeparatorTitle 
          id="societes" 
          title='societes' 
          headerBottom={headerBottom} 
        />
        <SocietesPresentation />
        
        <FixedFooter />

        <Footer />

      </main>
    </>
  );
}
