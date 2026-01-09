/**
 * Bouton de recrutement réutilisable
 * 
 * Composant de bouton standardisé pour les actions de recrutement.
 * Utilise la classe CSS `btn-primary` pour un style cohérent.
 * 
 * @component
 * @example
 * ```tsx
 * <ButtonRecrutement 
 *   text="POSTULER" 
 *   onClick={handlePostulerClick} 
 * />
 * ```
 */

import type { ButtonRecrutementProps } from '@/types';

/**
 * Affiche un bouton d'action pour le recrutement
 * @param {ButtonRecrutementProps} props - Les propriétés du composant
 * @param {string} props.text - Le texte à afficher dans le bouton
 * @param {() => void} props.onClick - Fonction appelée au clic
 * @returns {JSX.Element} Bouton de recrutement
 */
export default function ButtonRecrutement({ text, onClick }: ButtonRecrutementProps) {
  return (
    <button
      onClick={onClick}
      className="btn-primary"
    >
      {text}
    </button>
  );
}
