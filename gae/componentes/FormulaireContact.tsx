
'use client';

import React, { useState } from "react";

export default function FormulaireContact() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    message: '',
    acceptePolicy: false,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler l'envoi du formulaire
    console.log('Form data:', formData);
    
    // Afficher le message de succès
    setIsSuccess(true);
    
    // Réinitialiser le formulaire
    setFormData({
      prenom: '',
      nom: '',
      email: '',
      message: '',
      acceptePolicy: false,
    });
    
    // Masquer le message après 5 secondes
    setTimeout(() => setIsSuccess(false), 5000);
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

      {/* E-mail */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="E-mail"
        required
        className="w-full px-5 py-3 border border-secondary rounded-full bg-white text-secondary font-futura placeholder:text-secondary/50 focus:outline-none focus:border-primary transition-colors"
      />

      {/* Votre message avec checkbox et bouton */}
      <div className="flex flex-col xl:flex-row gap-4 xl:items-end flex-1">
        {/* Votre message */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message"
          required
          className="flex-1 xl:h-full h-32 px-5 py-3 border border-secondary rounded-3xl bg-white text-secondary font-futura placeholder:text-secondary/50 focus:outline-none focus:border-primary transition-colors resize-none"
        />

        {/* Colonne droite : Checkbox + Bouton */}
        <div className="flex flex-col gap-4">
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
    </form>
  );
}
