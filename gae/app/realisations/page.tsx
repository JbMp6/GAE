'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/componentes/Header';
import ActuCard from '@/componentes/ActuCard';
import FixedFooter from '@/staticComponentes/FixedFooter';
import Footer from '@/staticComponentes/Footer';

export default function Home() {
  const [headerBottom, setHeaderBottom] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Les données
  const actuItems = [
    ...Array.from({ length: 15 }, (_, i) => ({
      id: String(i + 1),
      image: '/img/actu/Firefly_batiment appartement dans la ville avec voiture et personnage 422534.jpg',
      imageAlt: 'Immeuble résidentiel moderne',
      title: `Nouveau projet résidentiel ${i + 1}`,
      subtitle: 'Immobilier urbain',
      description: i === 8 ? 'Découvrez notre dernier projet résidentiel situé au cœur de la ville, offrant des appartements modernes avec toutes les commodités.' : undefined,
      real: true,
    }))
  ];

  // Synchronise currentPage with query param
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const pageNum = pageParam ? parseInt(pageParam, 10) : 1;
    setCurrentPage(isNaN(pageNum) || pageNum < 1 ? 1 : pageNum);
  }, [searchParams]);

  // Calcul des index pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = actuItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(actuItems.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    // Met à jour le paramètre de page dans l'URL
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <Header onHeaderBottomChange={setHeaderBottom} />

      <main className="flex flex-col justify-center items-center bg-white pt-header min-h-screen h-auto">

        <div className="grid 2xl:grid-cols-3 grid-cols-1 2xl:grid-rows-3 grid-rows-9 gap-8 max-w-5xl w-[70%] mx-auto my-15 justify-items-center">
          {currentItems.map((item) => (
            <ActuCard key={item.id} {...item} />
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center items-center mb-[60px] gap-4 select-none">
          <button
            onClick={() => goToPage(currentPage - 1)}
            aria-label="Page précédente"
            className="w-16 h-16 flex items-center justify-center rounded-md bg-white text-primary text-3xl font-bold transition hover:text-secondary"
            type="button"
          >
            <Image src="/ilstr/bouton_fleche.svg" alt="Précédent" width={36} height={36} className="w-10 h-10 transition-transform duration-150 hover:scale-125" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`w-10 h-10 flex items-center justify-center border-2 rounded-md transition-transform duration-150 border-primary bg-white hover:border-secondary hover:text-secondary text-xl hover:scale-110 ${currentPage === i + 1 ? 'text-secondary' : 'text-primary'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            aria-label="Page suivante"
            className="w-16 h-16 flex items-center justify-center rounded-md bg-white text-primary text-3xl font-bold transition-transform duration-150 hover:text-secondary hover:scale-125"
            type="button"
          >
            <Image src="/ilstr/bouton_fleche.svg" alt="Suivant" width={36} height={36} className="w-10 h-10 rotate-180 transition-transform duration-150 hover:scale-105" />
          </button>
        </div>

        <div className="fixed bottom-footer left-0 w-full h-70 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      
      <FixedFooter />

      <Footer />

      </main>
    </>
  );
}