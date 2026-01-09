/**
 * Module de requêtes Supabase
 * 
 * Fournit les fonctions pour interagir avec la base de données Supabase.
 * Toutes les fonctions utilisent les constantes SUPABASE_CONFIG pour les noms de tables.
 * 
 * @module queries
 */

import { supabase } from './supabase';
import type { Service, Actu, Realisation, OffreRecrutement } from '@/types';
import { SUPABASE_CONFIG } from '@/config/constants';

export type { Service, Actu, Realisation, OffreRecrutement };

/**
 * Récupère tous les services depuis la base de données
 * 
 * Réorganise les services pour alterner les couleurs de fond.
 * 
 * @returns {Promise<Service[]>} Liste des services réorganisés
 * @throws {Error} Si la requête échoue
 * 
 * @example
 * ```typescript
 * const services = await getServices();
 * ```
 */
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from(SUPABASE_CONFIG.TABLES.SERVICES)
    .select('*')
    .order('created_at');
  
  if (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
  
  // Réorganiser les services pour alterner les couleurs de fond
  if (!data) return [];
  
  // Séparer par couleur de fond
  const groupedByBg = data.reduce((acc, service) => {
    if (!acc[service.bg]) {
      acc[service.bg] = [];
    }
    acc[service.bg].push(service);
    return acc;
  }, {} as Record<string, Service[]>);
  
  // Obtenir les groupes de couleurs
  const bgGroups: Service[][] = Object.values(groupedByBg);
  
  // Alterner entre les groupes
  const alternated: Service[] = [];
  const maxLength = Math.max(...bgGroups.map(g => g.length));
  
  for (let i = 0; i < maxLength; i++) {
    bgGroups.forEach(group => {
      if (group[i]) {
        alternated.push(group[i]);
      }
    });
  }
  
  return alternated;
}

export async function getActus(): Promise<Actu[]> {
  const { data, error } = await supabase
    .from(SUPABASE_CONFIG.TABLES.ACTUS)
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching actus:', error);
    throw error;
  }
  
  return data || [];
}

export async function getRealisations(): Promise<Realisation[]> {
  const { data, error } = await supabase
    .from(SUPABASE_CONFIG.TABLES.REALISATIONS)
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching realisations:', error);
    throw error;
  }
  
  return data || [];
}

export async function getOffresRecrutement(): Promise<OffreRecrutement[]> {
  const { data, error } = await supabase
    .from(SUPABASE_CONFIG.TABLES.OFFRES)
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching offres recrutement:', error);
    throw error;
  }
  
  return data || [];
}

export async function submitContact(contact: {
  prenom: string;
  nom: string;
  mail: string;
  tel: string;
  message: string;
}) {
  const { error } = await supabase
    .from(SUPABASE_CONFIG.TABLES.CONTACTS)
    .insert([contact]);
  
  if (error) {
    console.error('Error submitting contact:', error);
    throw new Error('Erreur lors de l\'envoi du formulaire.');
  }
}

export async function submitCandidature(candidature: {
  id_offre: number;
  prenom: string;
  nom: string;
  mail: string;
  tel: string;
  cv: string | null; // URL du fichier dans Supabase Storage
  ldm: string | null; // URL du fichier dans Supabase Storage
}) {
  const { error } = await supabase
    .from(SUPABASE_CONFIG.TABLES.CANDIDATURES)
    .insert([candidature]);
  
  if (error) {
    console.error('Error submitting candidature:', error);
    throw new Error('Erreur lors de l\'envoi de la candidature.');
  }
}
