'use client';

import { useState } from 'react';
import Header from '@/componentes/Header';
import Boxed from '@/staticComponentes/Boxed';
import FixedFooter from '@/staticComponentes/FixedFooter';
import ImgBanner from '@/staticComponentes/ImgBanner';
import SeparatorTitle from '@/componentes/SeparatorTitle';
import Button from '@/componentes/Button';
import ActuCard from '@/componentes/ActuCard';
import ActuSlider from '@/componentes/ActuSlider';
import GroupePresentation from '@/staticComponentes/GroupePresentation';
import ServicePresentation from '@/staticComponentes/ServicePresentation';
import SocietesPresentation from '@/staticComponentes/SocietesPresentation';
import Footer from '@/staticComponentes/Footer';
import { Parallax } from '@/componentes/Parallax';

export default function Home() {
  const [headerBottom, setHeaderBottom] = useState<number>(0);

  const actuItems = [
    {
      id: '1',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      description: 'Découvrez notre nouveau complexe résidentiel situé au cœur de la ville, offrant des espaces de vie modernes et confortables pour tous.',
      href: '/actualites'
    },
    {
      id: '2',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 574205.jpg',
      imageAlt: 'Architecture contemporaine',
      title: 'Design architectural innovant',
      subtitle: 'Architecture durable',
      description: 'Notre équipe présente une approche innovante de l\'architecture durable, alliant esthétique contemporaine et respect de l\'environnement.',
      href: '/actualites'
    },
    {
      id: '3',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 878696.jpg',
      imageAlt: 'Rénovation urbaine',
      title: 'Projet de rénovation urbaine',
      subtitle: 'Développement urbain',
      description: 'Transformation complète d\'un quartier historique avec préservation du patrimoine et intégration de solutions modernes pour une ville durable.',
      href: '/actualites'
    },
    {
      id: '4',
      image: '/img/actu/Firefly_des batiments appartement moderne avec voiture et personnage 497604.jpg',
      imageAlt: 'Bâtiment écologique',
      title: 'Construction écologique',
      subtitle: 'Développement durable',
      description: 'Notre dernier projet met en avant des techniques de construction écologiques et des matériaux durables pour un avenir plus vert.',
      href: '/actualites'
    }
  ];

  return (
    <>
      <Header onHeaderBottomChange={setHeaderBottom} />
      <main className="flex flex-col items-center justify-start bg-white pt-header min-h-screen h-auto">
        <ImgBanner img_src="/img/home_banner.jpg"/>

        <SeparatorTitle id="actualites" title='actualites' headerBottom={headerBottom} />

        <ActuSlider items={actuItems} />

        <SeparatorTitle id="groupe" title='groupe allanic' headerBottom={headerBottom} />

        <GroupePresentation />

        <Parallax 
          image="/img/elec.jpg" 
          height="500px" 
        />

        <SeparatorTitle id="services" title='services' headerBottom={headerBottom} />

        <ServicePresentation />

        <SeparatorTitle id="societes" title='societes' headerBottom={headerBottom} />

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
