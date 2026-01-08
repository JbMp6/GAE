/**
 * Types centralisés pour l'application GAE
 * @module types
 */

// ============================================================================
// Types de données Supabase
// ============================================================================

/**
 * Représente un service offert par l'entreprise
 */
export interface Service {
  id: string;
  title: string;
  icon: string;
  bg: string;
  buttonColor: string;
  description?: string;
  created_at?: string;
}

/**
 * Représente une actualité/article
 */
export interface Actu {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  image: string;
  imageAlt: string;
  href: string;
  created_at?: string;
}

/**
 * Représente une réalisation/projet
 */
export interface Realisation {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  imageAlt: string;
  created_at?: string;
}

/**
 * Représente une offre de recrutement
 */
export interface OffreRecrutement {
  id: number;
  title: string;
  description: string;
  created_at?: string;
}

// ============================================================================
// Types de formulaires
// ============================================================================

/**
 * Données de formulaire de contact simple
 */
export interface ContactFormData {
  prenom: string;
  nom: string;
  email: string;
  tel: string;
  message: string;
}

/**
 * Données de formulaire de recrutement avec fichiers
 */
export interface RecrutementFormData extends ContactFormData {
  cv: File | null;
  lettre: File | null;
}

/**
 * Props du composant FormulaireContact
 */
export interface FormulaireContactProps {
  postuler?: boolean;
  onSubmit?: (formData: ContactFormData) => Promise<void>;
  onSubmitRecrutement?: (formData: RecrutementFormData) => Promise<void>;
}

// ============================================================================
// Types de composants UI
// ============================================================================

/**
 * Props pour les boutons de recrutement
 */
export interface ButtonRecrutementProps {
  text: string;
  onClick: () => void;
}

/**
 * Props pour le composant LoadingSpinner
 */
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
}

// ============================================================================
// Types de navigation et états
// ============================================================================

/**
 * Étapes possibles dans le processus de recrutement
 */
export type RecrutementStep = 'home' | 'offre-list' | 'offre-detail' | 'postuler';

// ============================================================================
// Types de validation de fichiers
// ============================================================================

/**
 * Résultat de la validation d'un fichier
 */
export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Résultat de l'upload d'un fichier
 */
export interface FileUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Types MIME autorisés pour les fichiers
 */
export type AllowedFileType = 'application/pdf' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
