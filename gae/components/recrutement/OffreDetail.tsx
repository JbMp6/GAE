/**
 * Affichage du détail d'une offre de recrutement
 * 
 * Présente les informations complètes d'une offre (titre, description, missions)
 * avec un bouton d'action "Postuler" et optionnellement un bouton retour.
 * 
 * @component
 * @example
 * ```tsx
 * <OffreDetail 
 *   offre={selectedOffre}
 *   onPostulerClick={handlePostulerClick}
 *   onBackToList={handleBackToList}
 *   isMobile={true}
 * />
 * ```
 */

import type { OffreRecrutement } from '@/types';
import ButtonRecrutement from './ButtonRecrutement';

/**
 * Props pour le composant OffreDetail
 */
interface OffreDetailProps {
  /** Offre de recrutement à afficher */
  offre: OffreRecrutement;
  /** Callback appelé au clic sur "Postuler" */
  onPostulerClick: () => void;
  /** Callback optionnel pour revenir à la liste (mode mobile) */
  onBackToList?: () => void;
  /** Mode mobile activé */
  isMobile?: boolean;
}

/**
 * Affiche le détail complet d'une offre de recrutement
 * @param {OffreDetailProps} props - Les propriétés du composant
 * @returns {JSX.Element} Détail de l'offre
 */
export default function OffreDetail({ 
  offre, 
  onPostulerClick, 
  onBackToList,
  isMobile = false 
}: OffreDetailProps) {
  if (isMobile) {
    // Version mobile avec bouton retour
    return (
      <div className="w-full flex flex-col px-4 py-8">
        {onBackToList && (
          <button
            onClick={onBackToList}
            className="mb-6 text-primary font-futura text-lg flex items-center gap-2"
          >
            ← Retour aux offres
          </button>
        )}
        <h2 className="font-futura font-bold text-secondary text-3xl mb-6">
          {offre.title}
        </h2>
        
        <div className="space-y-4 mb-8">
          <p className="font-futura text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
            {offre.description}
          </p>
        </div>

        <div className="flex justify-center w-full pt-5">
          <ButtonRecrutement text="POSTULER" onClick={onPostulerClick} />
        </div>
      </div>
    );
  }

  // Version desktop
  return (
    <div className="w-full h-full px-8 py-8 overflow-y-auto">
      <h2 className="font-futura font-bold text-secondary text-4xl mb-6">
        {offre.title}
      </h2>
      
      <div className="space-y-4 mb-8">
        <p className="font-futura text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
          {offre.description}
        </p>
      </div>

      <div className="flex justify-center w-full pt-5">
        <ButtonRecrutement text="POSTULER" onClick={onPostulerClick} />
      </div>
    </div>
  );
}
