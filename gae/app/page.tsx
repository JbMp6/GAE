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

export default function Home() {
  const [headerBottom, setHeaderBottom] = useState<number>(0);

  const actuItems = [
    {
      id: '1',
      image: '/img/home_banner.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      description: 'Découvrez notre nouveau complexe résidentiel situé au cœur de la ville, offrant des espaces de vie modernes et confortables pour tous.',
      href: '/actualites'
    },
    {
      id: '2',
      image: '/img/home_banner.jpg',
      imageAlt: 'Architecture contemporaine',
      title: 'Design architectural innovant',
      subtitle: 'Architecture durable',
      description: 'Notre équipe présente une approche innovante de l\'architecture durable, alliant esthétique contemporaine et respect de l\'environnement.',
      href: '/actualites'
    },
    {
      id: '3',
      image: '/img/home_banner.jpg',
      imageAlt: 'Rénovation urbaine',
      title: 'Projet de rénovation urbaine',
      subtitle: 'Développement urbain',
      description: 'Transformation complète d\'un quartier historique avec préservation du patrimoine et intégration de solutions modernes pour une ville durable.',
      href: '/actualites'
    },
    {
      id: '4',
      image: '/img/home_banner.jpg',
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
      <main className="flex flex-col items-center justify-start bg-white pt-header min-h-screen h-[25555555px] pb-footer">
        <ImgBanner img_src="/img/home_banner.jpg"/>

        <SeparatorTitle title='actualites' headerBottom={headerBottom} />

        <ActuSlider items={actuItems} />

        <SeparatorTitle title='groupe  allanic' headerBottom={headerBottom} />

        <GroupePresentation />

      </main>
      <FixedFooter />
    </>
  );
} 
