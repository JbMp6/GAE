import { supabase } from './supabase';

export interface Service {
  id: string;
  title: string;
  icon: string;
  bg: string;
  buttonColor: string;
  description?: string;
  created_at?: string;
}

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

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at');
  
  if (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
  
  return data || [];
}

export async function getActus(): Promise<Actu[]> {
  const { data, error } = await supabase
    .from('actus')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching actus:', error);
    throw error;
  }
  
  return data || [];
}
