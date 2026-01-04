'use client';

import { useState, useEffect } from 'react';
import Header from '@/componentes/Header';
import FixedFooter from '@/staticComponentes/FixedFooter';
import ImgBanner from '@/staticComponentes/ImgBanner';
import SeparatorTitle from '@/componentes/SeparatorTitle';
import Slider from '@/componentes/Slider';
import ActuCard from '@/componentes/ActuCard';
import GroupePresentation from '@/staticComponentes/GroupePresentation';
import SocietesPresentation from '@/staticComponentes/SocietesPresentation';
import Footer from '@/staticComponentes/Footer';
import { Parallax } from '@/componentes/Parallax';
import ActuCardModal from '@/componentes/ActuCardModal';
import ServiceCard from '@/componentes/ServiceCard';
import { getActus, getServices } from '@/lib/queries';
import type { Actu, Service } from '@/lib/queries';

export default function Home() {
  const [headerBottom, setHeaderBottom] = useState<number>(0);
  const [selectedArticle, setSelectedArticle] = useState<Actu | null>(null);
  const [actuItems, setActuItems] = useState<Actu[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getActus(),
      getServices()
    ])
      .then(([actus, servicesData]) => {
        setActuItems(actus);
        setServices(servicesData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl">Chargement...</p>
      </div>
    );
  }

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

      <main className="flex flex-col items-center justify-start bg-white pt-header min-h-screen h-auto">

        <ImgBanner 
          img_src="/img/home_banner.jpg"
        />

        <SeparatorTitle 
          id="actualites" 
          title='actualites' 
          headerBottom={headerBottom} 
        />

        <Slider items={actuItems}>
          {(item) => (
            <ActuCard {...item} onClick={() => setSelectedArticle(item)} />
          )}
        </Slider>

        <SeparatorTitle 
          id="groupe" 
          title='groupe allanic' 
          headerBottom={headerBottom} 
        />
        <GroupePresentation />

        <Parallax 
          image="/img/elec.jpg" 
          height="500px" 
        />

        <SeparatorTitle 
          id="services" 
          title='services' 
          headerBottom={headerBottom} 
        />

        <Slider items={services}>
          {(item) => (
            <ServiceCard {...item} />
          )}
        </Slider>

        <SeparatorTitle 
          id="societes" 
          title='societes' 
          headerBottom={headerBottom} 
        />
        <SocietesPresentation />

        <Parallax 
          image="/img/salon.jpg" 
          height="500px" 
        />

        <FixedFooter />

        <Footer />

      </main>
    </>
  );
} 
