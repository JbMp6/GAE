
'use client';

import React, { useState } from "react";

interface FormulaireContactProps {
  postuler?: boolean;
  onSubmit?: (formData: {
    prenom: string;
    nom: string;
    email: string;
    tel: string;
    message: string;
  }) => Promise<void>;
  onSubmitRecrutement?: (formData: {
    prenom: string;
    nom: string;
    email: string;
    tel: string;
    message: string;
    cv: File | null;
    lettre: File | null;
  }) => Promise<void>;
}

export default function FormulaireContact({ postuler = false, onSubmit, onSubmitRecrutement }: FormulaireContactProps) {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    tel: '',
    message: '',
    acceptePolicy: false,
    cv: null as File | null,
    lettre: null as File | null,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'cv' | 'lettre') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(null);
    
    try {
      // Si une fonction onSubmitRecrutement est fournie (cas du formulaire recrutement avec postuler)
      if (onSubmitRecrutement && postuler) {
        await onSubmitRecrutement({
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          tel: formData.tel,
          message: formData.message,
          cv: formData.cv,
          lettre: formData.lettre,
        });
      }
      // Si une fonction onSubmit est fournie (cas du formulaire contact)
      else if (onSubmit) {
        await onSubmit({
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          tel: formData.tel,
          message: formData.message,
        });
      } else {
        // Sinon, simuler l'envoi
        console.log('Form data:', formData);
      }
      
      // Afficher le message de succès
      setIsSuccess(true);
      
      // Réinitialiser le formulaire
      setFormData({
        prenom: '',
        nom: '',
        email: '',
        tel: '',
        message: '',
        acceptePolicy: false,
        cv: null,
        lettre: null,
      });
      
      // Masquer le message après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl h-full flex flex-col gap-4">
      {/* Prénom */}
      <input
        type="text"
        name="prenom"
        value={formData.prenom}
        onChange={handleChange}
        placeholder="Prénom"
        required
        className="w-full px-5 py-3 border border-secondary rounded-full bg-white text-secondary font-futura placeholder:text-secondary/50 focus:outline-none focus:border-primary transition-colors"
      />

      {/* Nom */}
      <input
        type="text"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        placeholder="Nom"
        required
        className="w-full px-5 py-3 border border-secondary rounded-full bg-white text-secondary font-futura placeholder:text-secondary/50 focus:outline-none focus:border-primary transition-colors"
      />

      {/* E-mail et Téléphone sur la même ligne */}
      <div className="flex flex-col xl:flex-row gap-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail"
          required
          className="flex-1 px-5 py-3 border border-secondary rounded-full bg-white text-secondary font-futura placeholder:text-secondary/50 focus:outline-none focus:border-primary transition-colors"
        />
        <input
          type="tel"
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          placeholder="Téléphone"
          required
          className="flex-1 px-5 py-3 border border-secondary rounded-full bg-white text-secondary font-futura placeholder:text-secondary/50 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Votre message avec checkbox et bouton */}
      <div className="flex flex-col xl:flex-row gap-4 flex-1">
        {/* Votre message */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message"
          required
          className="flex-1 xl:h-full h-32 px-5 py-3 border border-secondary rounded-3xl bg-white text-secondary font-futura placeholder:text-secondary/50 focus:outline-none focus:border-primary transition-colors resize-none"
        />

        {/* Colonne droite : Upload CV/Lettre (si postuler) OU juste Checkbox + Bouton */}
        <div className="flex flex-col gap-4">
          {/* Upload CV et Lettre de motivation (si postuler) - même hauteur que textarea */}
          {postuler && (
            <div className="flex flex-col gap-4 xl:h-full h-auto justify-start">
              {/* Upload CV */}
              <div className="flex flex-col">
                <label className="block text-xs text-secondary font-futura mb-1">CV</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'cv')}
                  className="w-full px-4 py-2 border border-secondary rounded-2xl bg-white text-secondary font-futura text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-futura file:bg-primary file:text-secondary hover:file:bg-secondary hover:file:text-white cursor-pointer focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Upload Lettre de motivation */}
              <div className="flex flex-col">
                <label className="block text-xs text-secondary font-futura mb-1">Lettre de motivation</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'lettre')}
                  className="w-full px-4 py-2 border border-secondary rounded-2xl bg-white text-secondary font-futura text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-futura file:bg-primary file:text-secondary hover:file:bg-secondary hover:file:text-white cursor-pointer focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}

          {/* Checkbox politique de confidentialité */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="acceptePolicy"
              name="acceptePolicy"
              checked={formData.acceptePolicy}
              onChange={handleChange}
              required
              className="mt-1 w-4 h-4 border-2 border-secondary accent-primary cursor-pointer flex-shrink-0"
            />
            <label htmlFor="acceptePolicy" className="text-sm text-secondary font-futura cursor-pointer">
              J'ai lu et accepte la politique de confidentialité de ce site
            </label>
          </div>

          {/* Bouton Envoyer */}
          <button
            type="submit"
            className="px-12 py-3 bg-secondary text-white font-futura text-lg rounded-lg hover:bg-primary hover:text-secondary transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            ENVOYER
          </button>
        </div>
      </div>

      {/* Message de succès */}
      {isSuccess && (
        <p className="text-primary font-futura text-center">
          Message envoyé avec succès.
        </p>
      )}
      
      {/* Message d'erreur */}
      {error && (
        <p className="text-red-600 font-futura text-center">
          {error}
        </p>
      )}
    </form>
  );
}
