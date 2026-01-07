'use client';

import { useState, useEffect } from 'react';
import Header from "@/componentes/Header";
import FixedFooter from "@/staticComponentes/FixedFooter";
import Footer from "@/staticComponentes/Footer";
import Image from "next/image";
import FormulaireContact from "@/componentes/FormulaireContact";
import { getOffresRecrutement, submitCandidature, type OffreRecrutement } from "@/lib/queries";

type ViewType = 'home' | 'offre' | 'postuler';

interface ButtonRecrutementProps {
  text: string;
  onClick: () => void;
}

const ButtonRecrutement = ({ text, onClick }: ButtonRecrutementProps) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 bg-secondary text-white font-futura font-bold text-sm tracking-wider hover:bg-primary transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default function RecrutementPage() {
    const [currentView, setCurrentView] = useState<ViewType>('home');
    const [selectedOffre, setSelectedOffre] = useState<number>(0);
    const [mobileStep, setMobileStep] = useState<'list' | 'description' | 'form'>('list');
    const [offres, setOffres] = useState<OffreRecrutement[]>([]);

    useEffect(() => {
      const fetchOffres = async () => {
        try {
          const data = await getOffresRecrutement();
          setOffres(data);
        } catch (error) {
          console.error('Erreur lors du chargement des offres:', error);
        }
      };

      fetchOffres();
    }, []);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [mobileStep]);

    const handleOffreClick = (index: number) => {
      setSelectedOffre(index);
      setCurrentView('offre');
      setMobileStep('description');
    };

    const handlePostulerClick = () => {
      setCurrentView('postuler');
      setMobileStep('form');
    };

    const handleBackToList = () => {
      setMobileStep('list');
      setCurrentView('home');
    };

    const handleBackToDescription = () => {
      setMobileStep('description');
      setCurrentView('offre');
    };

    const handleRecrutementSubmit = async (formData: {
      prenom: string;
      nom: string;
      email: string;
      tel: string;
      message: string;
      cv: File | null;
      lettre: File | null;
    }) => {
      // Pour l'instant, on stocke juste les noms de fichiers
      // TODO: Implémenter l'upload des fichiers vers Supabase Storage
      await submitCandidature({
        id_offre: offres[selectedOffre].id,
        prenom: formData.prenom,
        nom: formData.nom,
        mail: formData.email,
        tel: formData.tel,
        cv: formData.cv?.name || null,
        ldm: formData.lettre?.name || null,
      });
    };

    const renderContent = () => {
      switch(currentView) {
        case 'home':
          return (
            <div className="w-full h-full relative">
              <Image
                src="/img/elec.jpg"
                alt="Recrutement Illustration"
                fill
                className="object-cover"
              />
            </div>
          );
        
        case 'offre':
          return (
            <div className="w-full h-full px-8 py-8 overflow-y-auto">
              <h2 className="font-futura font-bold text-secondary text-4xl mb-6">
                {offres[selectedOffre]?.title}
              </h2>
              
              <div className="space-y-4 mb-8">
                <p className="font-futura text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                  {offres[selectedOffre]?.description}
                </p>
              </div>

              <div className="flex justify-center w-full pt-5">
                <ButtonRecrutement text="POSTULER" onClick={handlePostulerClick} />
              </div>
            </div>
          );
        
        case 'postuler':
          return (
            <div className="w-full h-full px-8 pb-8 overflow-y-auto">
              <FormulaireContact postuler={true} onSubmitRecrutement={handleRecrutementSubmit} />
            </div>
          );
        
        default:
          return null;
      }
    };

    return (
      <>
        <Header />
        <main className="w-full bg-white flex flex-col pt-header xl:h-[calc(100vh-80px)]">
          {/* Desktop Layout */}
          <div className="hidden xl:flex flex-row w-full h-full">
            {/* Side Bar*/}
            <div className="w-[40%] h-full flex justify-center items-end">
              <div className="bg-extra w-full h-[80%] flex flex-col">
                {offres.map((offre, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleOffreClick(index)}
                    className={`font-futura text-2xl w-full h-20 pl-5 border-b-5 border-white flex items-center cursor-pointer transition-all ${
                      (currentView === 'offre' || currentView === 'postuler') && selectedOffre === index ? 'bg-secondary !text-primary' : 'text-secondary hover:bg-white/20'
                    }`}
                  >
                    {offre.title}
                  </div>
                ))}
              </div>
            </div>
            {/* Change Content */}
            <div className="w-[60%] h-full flex flex-col justify-start items-start overflow-hidden">
              <div className="w-full h-[20%] flex justify-center items-center">
                <h1 className="font-syntha text-secondary text-3xl">
                  {currentView === 'postuler' ? 'postuler' : 'Nos offres d\'emploi & de stage'}
                </h1>
              </div>
              <div className="w-full h-[80%] flex flex-col justify-start items-start overflow-y-auto">
                {renderContent()}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="xl:hidden flex flex-col w-full min-h-screen bg-white">
            {/* Step 1: Liste des offres */}
            {mobileStep === 'list' && (
              <div className="w-full h-full min-h-screen flex flex-col">
                <div className="w-full flex justify-center items-center py-8">
                  <h1 className="font-syntha text-secondary text-3xl text-center px-4">
                    Nos offres d'emploi & de stage
                  </h1>
                </div>
                <div className="bg-extra w-full flex flex-col flex-1">
                  {offres.map((offre, index) => (
                    <div
                      key={index}
                      onClick={() => handleOffreClick(index)}
                      className="font-futura text-xl h-12 text-secondary w-full py-6 px-5 border-b-5 border-white flex items-center cursor-pointer transition-all hover:bg-white/20 active:bg-secondary active:text-primary"
                    >
                      {offre.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Description de l'offre */}
            {mobileStep === 'description' && (
              <div className="w-full flex flex-col px-4 py-8">
                <button
                  onClick={handleBackToList}
                  className="mb-6 text-primary font-futura text-lg flex items-center gap-2"
                >
                  ← Retour aux offres
                </button>
                <h2 className="font-futura font-bold text-secondary text-3xl mb-6">
                  {offres[selectedOffre]?.title}
                </h2>
                
                <div className="space-y-4 mb-8">
                  <p className="font-futura text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                    {offres[selectedOffre]?.description}
                  </p>
                </div>

                <div className="flex justify-center w-full pt-5">
                  <ButtonRecrutement text="POSTULER" onClick={handlePostulerClick} />
                </div>
              </div>
            )}

            {/* Step 3: Formulaire */}
            {mobileStep === 'form' && (
              <div className="w-full flex flex-col px-4 py-8">
                <button
                  onClick={handleBackToDescription}
                  className="mb-6 text-primary font-futura text-lg flex items-center gap-2"
                >
                  ← Retour à l'offre
                </button>
                <h1 className="font-syntha text-secondary text-3xl text-center mb-8">
                  Postuler
                </h1>
                <FormulaireContact postuler={true} onSubmitRecrutement={handleRecrutementSubmit} />
              </div>
            )}
          </div>
        </main>
        <FixedFooter />
        <Footer />
      </>
    );
}   