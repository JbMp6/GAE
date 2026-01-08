/**
 * Utilitaires de validation et upload sécurisé de fichiers
 * @module fileValidation
 */

import { supabase } from './supabase';
import type { FileValidationResult, FileUploadResult } from '@/types';

export type { FileValidationResult, FileUploadResult };

/**
 * Types de fichiers autorisés avec leurs MIME types
 */
export const ALLOWED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
} as const;

/**
 * Taille maximale des fichiers (5MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Valide un fichier selon les critères de sécurité
 * @param file - Le fichier à valider
 * @returns Résultat de la validation avec message d'erreur si invalide
 */
export function validateFile(file: File | null): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'Aucun fichier sélectionné' };
  }

  // Vérifier le type MIME
  if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
    return {
      valid: false,
      error: 'Type de fichier non autorisé. Formats acceptés : PDF, DOC, DOCX',
    };
  }

  // Vérifier la taille
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `Fichier trop volumineux. Taille maximale : ${sizeMB}MB`,
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
 * Génère un nom de fichier sécurisé avec UUID
 * @param originalName - Nom original du fichier
 * @returns Nom sécurisé avec UUID et extension
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
 * @param file - Le fichier à uploader
 * @param bucket - Le bucket Supabase où uploader
 * @param folder - Le dossier dans le bucket (optionnel)
 * @returns Résultat de l'upload avec URL publique ou erreur
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
        error: 'Erreur lors de l\'upload du fichier',
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
 * @param file - Le fichier CV à uploader
 * @returns Résultat de l'upload
 */
export async function uploadCV(file: File): Promise<FileUploadResult> {
  return uploadFileToSupabase(file, 'candidatures', 'cv');
}

/**
 * Upload une lettre de motivation vers Supabase Storage
 * @param file - Le fichier lettre de motivation à uploader
 * @returns Résultat de l'upload
 */
export async function uploadLettreMotivation(file: File): Promise<FileUploadResult> {
  return uploadFileToSupabase(file, 'candidatures', 'lettres');
}

/**
 * Supprime un fichier du stockage Supabase
 * @param url - L'URL du fichier à supprimer
 * @param bucket - Le bucket Supabase
 * @returns True si la suppression a réussi
 */
export async function deleteFileFromSupabase(
  url: string,
  bucket: string = 'candidatures'
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
