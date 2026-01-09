/**
 * Utilitaires de validation et upload sécurisé de fichiers
 * @module fileValidation
 */

import { supabase } from './supabase';
import type { FileValidationResult, FileUploadResult } from '@/types';
import { FILE_CONFIG, TEXTS, SUPABASE_CONFIG } from '@/config/constants';

export type { FileValidationResult, FileUploadResult };

/**
 * Types de fichiers autorisés avec leurs MIME types
 */
export const ALLOWED_FILE_TYPES = FILE_CONFIG.ALLOWED_MIME_TYPES;

/**
 * Taille maximale des fichiers (5MB)
 */
export const MAX_FILE_SIZE = FILE_CONFIG.MAX_SIZE;

/**
 * Valide un fichier selon les critères de sécurité
 * 
 * Effectue trois vérifications :
 * 1. Fichier non null
 * 2. Type MIME autorisé (PDF, DOC, DOCX)
 * 3. Taille <= 5MB
 * 4. Nom de fichier sécurisé (caractères alphanumériques uniquement)
 * 
 * @param {File | null} file - Le fichier à valider
 * @returns {FileValidationResult} Résultat avec `valid: true` ou `valid: false` + message d'erreur
 * 
 * @example
 * ```typescript
 * const result = validateFile(file);
 * if (!result.valid) {
 *   console.error(result.error);
 * }
 * ```
 */
export function validateFile(file: File | null): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'Aucun fichier sélectionné' };
  }

  // Vérifier le type MIME
  if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
    return {
      valid: false,
      error: TEXTS.FR.ERROR_FILE_TYPE,
    };
  }

  // Vérifier la taille
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: TEXTS.FR.ERROR_FILE_TOO_LARGE,
    };
  }

  // Vérifier le nom du fichier (caractères valides uniquement)
  const invalidChars = /[^a-zA-Z0-9._-]/;
  if (invalidChars.test(file.name)) {
    return {
      valid: false,
      error: 'Le nom du fichier contient des caractères non autorisés',
    };
  }

  return { valid: true };
}

/**
 * Génère un nom de fichier sécurisé avec timestamp et chaîne aléatoire
 * 
 * Crée un nom unique pour éviter les collisions et les vulnérabilités de sécurité.
 * Format : `{timestamp}-{random}.{extension}`
 * 
 * @param {string} originalName - Nom original du fichier avec extension
 * @returns {string} Nom sécurisé avec UUID et extension préservée
 * 
 * @example
 * ```typescript
 * generateSecureFileName('mon cv.pdf')
 * // => '1704837600000-abc123def456.pdf'
 * ```
 */
export function generateSecureFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop() || '';
  
  // UUID simplifié avec timestamp + random string
  const secureFileName = `${timestamp}-${randomStr}.${extension}`;
  
  return secureFileName;
}

/**
 * Upload un fichier vers Supabase Storage avec validation
 * 
 * Effectue les étapes suivantes :
 * 1. Validation du fichier (taille, type MIME, nom)
 * 2. Génération d'un nom sécurisé
 * 3. Upload vers Supabase Storage
 * 4. Récupération de l'URL publique
 * 
 * @param {File} file - Le fichier à uploader
 * @param {string} [bucket='candidatures'] - Le bucket Supabase où uploader
 * @param {string} [folder='cv'] - Le dossier dans le bucket
 * @returns {Promise<FileUploadResult>} Résultat avec `success: true` + URL ou `success: false` + erreur
 * 
 * @example
 * ```typescript
 * const result = await uploadFileToSupabase(cvFile, 'candidatures', 'cv');
 * if (result.success) {
 *   console.log('File URL:', result.url);
 * }
 * ```
 */
export async function uploadFileToSupabase(
  file: File,
  bucket: string = 'candidatures',
  folder: string = 'cv'
): Promise<FileUploadResult> {
  // Valider le fichier
  const validation = validateFile(file);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  try {
    // Générer un nom sécurisé
    const secureFileName = generateSecureFileName(file.name);
    const filePath = folder ? `${folder}/${secureFileName}` : secureFileName;

    // Upload vers Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return {
        success: false,
        error: TEXTS.FR.ERROR_UPLOAD_FAILED,
      };
    }

    // Récupérer l'URL publique
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrlData.publicUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'Erreur inattendue lors de l\'upload',
    };
  }
}

/**
 * Upload un CV vers Supabase Storage
 * 
 * Wrapper spécialisé pour l'upload de CV dans le dossier 'cv'.
 * Utilise le bucket configuré dans SUPABASE_CONFIG.CANDIDATURES_BUCKET.
 * 
 * @param {File} file - Le fichier CV à uploader (PDF, DOC, DOCX)
 * @returns {Promise<FileUploadResult>} Résultat de l'upload
 * 
 * @example
 * ```typescript
 * const result = await uploadCV(cvFile);
 * if (result.success) {
 *   console.log('CV uploaded:', result.url);
 * }
 * ```
 */
export async function uploadCV(file: File): Promise<FileUploadResult> {
  return uploadFileToSupabase(file, SUPABASE_CONFIG.CANDIDATURES_BUCKET, 'cv');
}

/**
 * Upload une lettre de motivation vers Supabase Storage
 * 
 * Wrapper spécialisé pour l'upload de lettres dans le dossier 'lettres'.
 * Utilise le bucket configuré dans SUPABASE_CONFIG.CANDIDATURES_BUCKET.
 * 
 * @param {File} file - Le fichier lettre de motivation à uploader (PDF, DOC, DOCX)
 * @returns {Promise<FileUploadResult>} Résultat de l'upload
 * 
 * @example
 * ```typescript
 * const result = await uploadLettreMotivation(lettreFile);
 * if (result.success) {
 *   console.log('Lettre uploaded:', result.url);
 * }
 * ```
 */
export async function uploadLettreMotivation(file: File): Promise<FileUploadResult> {
  return uploadFileToSupabase(file, SUPABASE_CONFIG.CANDIDATURES_BUCKET, 'lettres');
}

/**
 * Supprime un fichier du stockage Supabase
 * 
 * Extrait le chemin du fichier depuis l'URL et le supprime du bucket.
 * Utile pour nettoyer les fichiers lors de l'annulation ou remplacement.
 * 
 * @param {string} url - L'URL publique du fichier à supprimer
 * @param {string} [bucket=SUPABASE_CONFIG.CANDIDATURES_BUCKET] - Le bucket Supabase
 * @returns {Promise<boolean>} `true` si la suppression a réussi, `false` sinon
 * 
 * @example
 * ```typescript
 * const deleted = await deleteFileFromSupabase(fileUrl);
 * if (deleted) {
 *   console.log('File deleted successfully');
 * }
 * ```
 */
export async function deleteFileFromSupabase(
  url: string,
  bucket: string = SUPABASE_CONFIG.CANDIDATURES_BUCKET
): Promise<boolean> {
  try {
    // Extraire le chemin du fichier depuis l'URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const folder = urlParts[urlParts.length - 2];
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}
