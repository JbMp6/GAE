/**
 * Wrapper pour le formulaire de postulation
 * 
 * Encapsule le composant FormulaireContact en mode recrutement.
 * Gère l'affichage des champs CV et lettre de motivation.
 * 
 * @component
 * @example
 * ```tsx
 * <PostulerForm 
 *   onSubmit={handleRecrutementSubmit}
 *   onBack={handleBackToDescription}
 *   isMobile={true}
 * />
 * ```
 */

import FormulaireContact from '@/components/forms/FormulaireContact';
import type { RecrutementFormData } from '@/types';

/**
 * Props pour le composant PostulerForm
 */
interface PostulerFormProps {
  /** Callback appelé lors de la soumission du formulaire */
  onSubmit: (formData: RecrutementFormData) => Promise<void>;
  /** Callback optionnel pour revenir en arrière (mode mobile) */
  onBack?: () => void;
  /** Mode mobile activé */
  isMobile?: boolean;
}

/**
 * Affiche le formulaire de candidature
 * @param {PostulerFormProps} props - Les propriétés du composant
 * @returns {JSX.Element} Formulaire de postulation
 */
export default function PostulerForm({ 
  onSubmit, 
  onBack,
  isMobile = false 
}: PostulerFormProps) {
  if (isMobile) {
    // Version mobile avec bouton retour et titre
    return (
      <div className="w-full flex flex-col px-4 py-8">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 text-primary font-futura text-lg flex items-center gap-2"
          >
            ← Retour à l'offre
          </button>
        )}
        <h1 className="font-syntha text-secondary text-3xl text-center mb-8">
          Postuler
        </h1>
        <FormulaireContact postuler={true} onSubmitRecrutement={onSubmit} />
      </div>
    );
  }

  // Version desktop
  return (
    <div className="w-full h-full px-8 pb-8 overflow-y-auto">
      <FormulaireContact postuler={true} onSubmitRecrutement={onSubmit} />
    </div>
  );
}
