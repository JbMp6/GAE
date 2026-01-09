/**
 * Liste des offres de recrutement
 * 
 * Affiche les offres disponibles en deux modes :
 * - Desktop : Sidebar fixe avec liste cliquable
 * - Mobile : Liste pleine page avec navigation vers le détail
 * 
 * @component
 * @example
 * ```tsx
 * <OffresList 
 *   offres={offres}
 *   selectedOffre={0}
 *   step="offre-list"
 *   onOffreClick={handleOffreClick}
 *   isMobile={false}
 * />
 * ```
 */

import type { OffreRecrutement, RecrutementStep } from '@/types';

/**
 * Props pour le composant OffresList
 */
interface OffresListProps {
  /** Liste des offres de recrutement à afficher */
  offres: OffreRecrutement[];
  /** Index de l'offre actuellement sélectionnée */
  selectedOffre: number;
  /** Étape actuelle du workflow de recrutement */
  step: RecrutementStep;
  /** Callback appelé au clic sur une offre */
  onOffreClick: (index: number) => void;
  /** Mode mobile activé */
  isMobile?: boolean;
}

/**
 * Affiche la liste des offres de recrutement
 * @param {OffresListProps} props - Les propriétés du composant
 * @returns {JSX.Element} Liste des offres
 */
export default function OffresList({ 
  offres, 
  selectedOffre, 
  step,
  onOffreClick,
  isMobile = false 
}: OffresListProps) {
  if (isMobile) {
    // Version mobile - liste complète
    return (
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
              onClick={() => onOffreClick(index)}
              className="offre-item"
            >
              {offre.title}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Version desktop - sidebar
  return (
    <div className="w-[40%] h-full flex justify-center items-end">
      <div className="bg-extra w-full h-[80%] flex flex-col">
        {offres.map((offre, index) => (
          <div 
            key={index} 
            onClick={() => onOffreClick(index)}
            className={`font-futura text-2xl w-full h-20 pl-5 border-b-5 border-white flex items-center cursor-pointer transition-all ${
              (step === 'offre-detail' || step === 'postuler') && selectedOffre === index 
                ? 'bg-secondary !text-primary' 
                : 'text-secondary hover:bg-white/20'
            }`}
          >
            {offre.title}
          </div>
        ))}
      </div>
    </div>
  );
}
