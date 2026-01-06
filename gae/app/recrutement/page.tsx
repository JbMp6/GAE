'use client';

import { useState } from 'react';
import Header from "@/componentes/Header";
import FixedFooter from "@/staticComponentes/FixedFooter";
import Footer from "@/staticComponentes/Footer";
import Image from "next/image";
import FormulaireContact from "@/componentes/FormulaireContact";

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

interface Offre {
  title: string;
  description: string[];
}

const offres: Offre[] = [
  { 
    title: "ELECTRICIEN BATIMENT (H/F)",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      "Lorem ipsum dolor sit amet, cons adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
    ]
  },
  { 
    title: "TECHNICO COMMERCIAL (H/F)",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      "Lorem ipsum dolor sit amet, cons adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
    ]
  },
];

export default function RecrutementPage() {
    const [currentView, setCurrentView] = useState<ViewType>('home');
    const [selectedOffre, setSelectedOffre] = useState<number>(0);
    const [mobileStep, setMobileStep] = useState<'list' | 'description' | 'form'>('list');

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
            <>
              <h2 className="font-futura font-bold text-secondary text-4xl mb-6">
                {offres[selectedOffre].title}
              </h2>
              
              <div className="space-y-4 mb-8">
                {offres[selectedOffre].description.map((paragraph, index) => (
                  <p key={index} className="font-futura text-gray-700 text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex justify-center w-full pt-5">
                <ButtonRecrutement text="POSTULER" onClick={handlePostulerClick} />
              </div>
            </>
          );
        
        case 'postuler':
          return (
            <div className="w-full h-full">
              <FormulaireContact postuler={true} />
            </div>
          );
        
        default:
          return null;
      }
    };

    return (
      <>
        <Header />
        <main className="w-full xl:bg-white bg-extra flex flex-col pt-header xl:h-[calc(100vh-100px)] min-h-screen xl:min-h-0">
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
          <div className="xl:hidden flex flex-col w-full min-h-full bg-white">
            {/* Step 1: Liste des offres */}
            {mobileStep === 'list' && (
              <div className="w-full flex flex-col">
                <div className="w-full flex justify-center items-center py-8">
                  <h1 className="font-syntha text-secondary text-3xl text-center px-4">
                    Nos offres d'emploi & de stage
                  </h1>
                </div>
                <div className="bg-extra w-full flex flex-col">
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
                  {offres[selectedOffre].title}
                </h2>
                
                <div className="space-y-4 mb-8">
                  {offres[selectedOffre].description.map((paragraph, index) => (
                    <p key={index} className="font-futura text-gray-700 text-base leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
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
                <FormulaireContact postuler={true} />
              </div>
            )}
          </div>
        </main>
        <FixedFooter />
        <Footer />
      </>
    );
}   