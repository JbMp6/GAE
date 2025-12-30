'use client';

import { useState } from 'react';
import Header from '@/componentes/Header';
import ActuCard from '@/componentes/ActuCard';
import FixedFooter from '@/staticComponentes/FixedFooter';
import Footer from '@/staticComponentes/Footer';

export default function Home() {
  const [headerBottom, setHeaderBottom] = useState<number>(0);

  const actuItems = [
    {
      id: '1',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      real: true,
    },
    {
      id: '2',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      real: true,
    },
        {
      id: '3',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      real: true,
    },
        {
      id: '4',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      real: true,
    },
        {
      id: '5',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      real: true,
    },
        {
      id: '6',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      real: true,
    },
        {
      id: '7',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      real: true,
    },
        {
      id: '8',
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: 'Nouveau projet résidentiel',
      subtitle: 'Immobilier urbain',
      real: true,
    },
    {
        id: '9',
        image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
        imageAlt: 'Immeuble résidentiel moderne',
        title: 'Nouveau projet résidentiel',
        subtitle: 'Immobilier urbain',
        description: 'Découvrez notre dernier projet résidentiel situé au cœur de la ville, offrant des appartements modernes avec toutes les commodités.',
        real: true,
    }
  ]

  return (
      <>
        <Header onHeaderBottomChange={setHeaderBottom} />

        <main className="flex flex-col justify-center items-center bg-white pt-header min-h-screen h-auto">

          <div className="grid 2xl:grid-cols-3 grid-cols-1 2xl:grid-rows-3 grid-rows-9 gap-8 w-full max-w-5xl mx-auto my-15 justify-items-center">
            {actuItems.map((item) => (
                <ActuCard key={item.id} {...item} />
              ))}
          </div>

          <div className="fixed bottom-footer left-0 w-full h-70 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        
        <FixedFooter />
  
        <Footer />

        </main>
      </>
    );
  } 