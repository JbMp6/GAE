'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import FixedFooter from "@/staticComponents/FixedFooter";
import Footer from "@/staticComponents/Footer";
import Image from "next/image";
import FormulaireContact from "@/components/FormulaireContact";
import { getOffresRecrutement, submitCandidature } from "@/lib/queries";
import { uploadCV, uploadLettreMotivation } from "@/lib/fileValidation";
import type { OffreRecrutement, RecrutementStep, ButtonRecrutementProps } from '@/types';

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
    const [step, setStep] = useState<RecrutementStep>('home');
    const [selectedOffre, setSelectedOffre] = useState<number>(0);
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
    }, [step]);

    const handleOffreClick = (index: number) => {
      setSelectedOffre(index);
      setStep('offre-detail');
    };

    const handlePostulerClick = () => {
      setStep('postuler');
    };

    const handleBackToList = () => {
      setStep('offre-list');
    };

    const handleBackToDescription = () => {
      setStep('offre-detail');
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
      try {
        // Upload du CV si présent
        let cvUrl: string | null = null;
        if (formData.cv) {
          const cvResult = await uploadCV(formData.cv);
          if (!cvResult.success) {
            throw new Error(cvResult.error || 'Erreur lors de l\'upload du CV');
          }
          cvUrl = cvResult.url || null;
        }

        // Upload de la lettre de motivation si présente
        let lettreUrl: string | null = null;
        if (formData.lettre) {
          const lettreResult = await uploadLettreMotivation(formData.lettre);
          if (!lettreResult.success) {
            throw new Error(lettreResult.error || 'Erreur lors de l\'upload de la lettre de motivation');
          }
          lettreUrl = lettreResult.url || null;
        }

        // Soumettre la candidature avec les URLs des fichiers
        await submitCandidature({
          id_offre: offres[selectedOffre].id,
          prenom: formData.prenom,
          nom: formData.nom,
          mail: formData.email,
          tel: formData.tel,
          cv: cvUrl,
          ldm: lettreUrl,
        });
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        throw error; // Re-throw pour que FormulaireContact puisse gérer l'erreur
      }
    };

    const renderContent = () => {
      switch(step) {
        case 'home':
        case 'offre-list':
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
        
        case 'offre-detail':
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
                      (step === 'offre-detail' || step === 'postuler') && selectedOffre === index ? 'bg-secondary !text-primary' : 'text-secondary hover:bg-white/20'
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
                  {step === 'postuler' ? 'postuler' : 'Nos offres d\'emploi & de stage'}
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
            {(step === 'home' || step === 'offre-list') && (
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
            {step === 'offre-detail' && (
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
            {step === 'postuler' && (
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