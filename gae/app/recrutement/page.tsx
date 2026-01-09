'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import FixedFooter from "@/staticComponents/FixedFooter";
import Footer from "@/staticComponents/Footer";
import Image from "next/image";
import { getOffresRecrutement, submitCandidature } from "@/lib/queries";
import { uploadCV, uploadLettreMotivation } from "@/lib/fileValidation";
import type { OffreRecrutement, RecrutementStep } from '@/types';
import OffresList from "@/components/recrutement/OffresList";
import OffreDetail from "@/components/recrutement/OffreDetail";
import PostulerForm from "@/components/recrutement/PostulerForm";

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
            <OffreDetail 
              offre={offres[selectedOffre]} 
              onPostulerClick={handlePostulerClick}
            />
          );
        
        case 'postuler':
          return (
            <PostulerForm onSubmit={handleRecrutementSubmit} />
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
            {/* Side Bar */}
            <OffresList 
              offres={offres}
              selectedOffre={selectedOffre}
              step={step}
              onOffreClick={handleOffreClick}
            />
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
              <OffresList 
                offres={offres}
                selectedOffre={selectedOffre}
                step={step}
                onOffreClick={handleOffreClick}
                isMobile
              />
            )}

            {/* Step 2: Description de l'offre */}
            {step === 'offre-detail' && (
              <OffreDetail 
                offre={offres[selectedOffre]}
                onPostulerClick={handlePostulerClick}
                onBackToList={handleBackToList}
                isMobile
              />
            )}

            {/* Step 3: Formulaire */}
            {step === 'postuler' && (
              <PostulerForm 
                onSubmit={handleRecrutementSubmit}
                onBack={handleBackToDescription}
                isMobile
              />
            )}
          </div>
        </main>
        <FixedFooter />
        <Footer />
      </>
    );
}   