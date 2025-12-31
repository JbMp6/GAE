
import React from "react";

export default function FormulaireContact() {
  return (
    <form className="contact-form max-w-4xl mx-auto flex flex-wrap gap-8 justify-center">
      <div className="flex-1 min-w-[320px] flex flex-col gap-4">
        <input type="text" placeholder="Prénom" className="w-full mb-2 px-4 py-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        <input type="text" placeholder="Nom" className="w-full mb-2 px-4 py-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        <input type="email" placeholder="E-mail" className="w-full mb-2 px-4 py-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        <textarea placeholder="Votre message" rows={7} className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
      </div>
      <div className="flex-1 min-w-[320px] flex flex-col gap-4 justify-start">
        <label className="font-semibold text-lg mb-1">CV</label>
        <input type="file" className="mb-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80" />
        <label className="font-semibold text-lg mb-1">Lettre de motivation</label>
        <input type="file" className="mb-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80" />
        <div className="flex items-center my-3">
          <input type="checkbox" id="privacy" className="mr-2 accent-primary" />
          <label htmlFor="privacy" className="text-sm">
            J'ai lu et accepte la politique de confidentialité de ce site
          </label>
        </div>
        <button type="submit" className="bg-[#aebf1a] text-white font-semibold text-xl rounded-lg py-2 px-8 cursor-pointer mt-2 hover:bg-[#bcd42b] transition-colors">
          ENVOYER
        </button>
        <span className="text-green-600 text-base mt-2">
          Message envoyé avec succès.
        </span>
      </div>
    </form>
  );
}
