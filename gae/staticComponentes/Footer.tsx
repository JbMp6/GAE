'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-secondary)] text-white p-12 h-auto z-25 flex justify-between">
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-4">
          
          {/* Colonne 1 : Groupe */}
          <div className="flex flex-col items-start">
            <h3 className="font-syntha text-lg xl:text-2xl mb-6">groupe allanic energie</h3>
            <div className="font-futura text-sm space-y-2">
              <p>Siège social : PLOUGOURVEST (29400)</p>
              <p>Président : Sylvain Baron</p>
            </div>
          </div>


          {/* Colonne 2 : Liens Utiles */}
          <div className="flex flex-col items-start xl:items-end">
            <div className="flex flex-col items-start xl:items-end">
                <h3 className="font-syntha text-lg xl:text-2xl mb-6 ">liens utiles</h3>
                <div className="font-futura text-sm space-y-2 flex flex-col items-start xl:items-end">
                <Link href="/mentions-legales" className="hover:text-[var(--color-primary)] transition-colors">
                    Mentions légales
                </Link>
                <Link href="/politique-confidentialite" className="hover:text-[var(--color-primary)] transition-colors">
                    Politique de confidentialité
                </Link>
                </div>
            </div>
          </div>

        </div>
    </footer>
  );
}
