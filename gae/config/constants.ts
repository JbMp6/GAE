/**
 * Configuration centralisée de l'application
 * @module config/constants
 */

/**
 * Configuration pour les fichiers (upload, validation)
 */
export const FILE_CONFIG = {
  /** Taille maximale des fichiers en bytes (5MB) */
  MAX_SIZE: 5 * 1024 * 1024,
  
  /** Types MIME autorisés pour les fichiers */
  ALLOWED_MIME_TYPES: {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  } as const,
  
  /** Extensions de fichiers autorisées */
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx'] as const,
} as const;

/**
 * Configuration pour le module recrutement
 */
export const RECRUITMENT_CONFIG = {
  /** Largeur de la sidebar desktop */
  SIDEBAR_WIDTH: '40%',
  
  /** Largeur du contenu desktop */
  CONTENT_WIDTH: '60%',
  
  /** Hauteur de la zone d'affichage */
  DISPLAY_HEIGHT: '80%',
} as const;

/**
 * Textes de l'application (prêt pour i18n)
 */
export const TEXTS = {
  FR: {
    // Recrutement
    RECRUITMENT_TITLE: "Nos offres d'emploi & de stage",
    APPLY: "POSTULER",
    BACK_TO_LIST: "← Retour aux offres",
    BACK: "← Retour",
    
    // Formulaires
    FORM_REQUIRED: "Champs requis *",
    FORM_PRENOM: "Prénom",
    FORM_NOM: "Nom",
    FORM_EMAIL: "E-mail",
    FORM_TELEPHONE: "Téléphone",
    FORM_MESSAGE: "Votre message",
    FORM_CV: "CV (PDF, DOC, DOCX - Max 5MB)",
    FORM_LETTRE: "Lettre de motivation (PDF, DOC, DOCX - Max 5MB)",
    FORM_SEND: "ENVOYER",
    
    // Messages d'erreur
    ERROR_FILE_TOO_LARGE: "Le fichier est trop volumineux (max 5MB)",
    ERROR_FILE_TYPE: "Type de fichier non autorisé. Formats acceptés : PDF, DOC, DOCX",
    ERROR_UPLOAD_FAILED: "Erreur lors de l'upload du fichier",
    ERROR_SUBMISSION_FAILED: "Erreur lors de l'envoi du formulaire",
    
    // Messages de succès
    SUCCESS_SUBMISSION: "Votre candidature a été envoyée avec succès !",
    SUCCESS_CONTACT: "Votre message a été envoyé avec succès !",
  },
} as const;

/**
 * Configuration des layout et dimensions
 */
export const LAYOUT_CONFIG = {
  /** Hauteur du header */
  HEADER_HEIGHT: '100px',
  
  /** Hauteur du footer */
  FOOTER_HEIGHT: '80px',
  
  /** Hauteur des gradients sur les images */
  GRADIENT_HEIGHT: '64px', // 16rem = 256px, mais utilisé comme h-64
  
  /** Breakpoints responsive (correspond à Tailwind) */
  BREAKPOINTS: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

/**
 * Configuration Supabase
 */
export const SUPABASE_CONFIG = {
  /** Bucket de stockage pour les candidatures */
  CANDIDATURES_BUCKET: 'candidatures',
  
  /** Tables de la base de données */
  TABLES: {
    SERVICES: 'services',
    ACTUS: 'actus',
    REALISATIONS: 'real',
    OFFRES: 'recrutement_offre',
    CANDIDATURES: 'recrutement_rep',
    CONTACTS: 'contact',
  },
} as const;

/**
 * Type helpers pour TypeScript
 */
export type AllowedMimeType = keyof typeof FILE_CONFIG.ALLOWED_MIME_TYPES;
export type Language = keyof typeof TEXTS;
export type TableName = typeof SUPABASE_CONFIG.TABLES[keyof typeof SUPABASE_CONFIG.TABLES];
