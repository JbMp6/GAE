'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-secondary)] text-white py-12 px-4 2xl:px-20 min-h-[calc(100vh-240px)] 2xl:min-h-0">
        <div className="w-full grid grid-cols-1 2xl:grid-cols-3 gap-8 2xl:gap-4">
          
          {/* Colonne 1 : Groupe */}
          <div className="flex flex-col items-start">
            <h3 className="font-syntha text-lg 2xl:text-2xl mb-6">groupe allanic energie</h3>
            <div className="font-futura text-sm space-y-2">
              <p>Siège social : PLOUGOURVEST (29400)</p>
              <p>Président : Sylvain Baron</p>
            </div>
          </div>

          {/* Colonne 2 : Contact */}
          <div className="flex flex-col items-start 2xl:items-center">
            <div className="flex flex-col items-start">
                <h3 className="font-syntha text-lg 2xl:text-2xl mb-6">contact</h3>
                <div className="font-futura text-sm space-y-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <Image 
                        src="/ilstr/telephone_picto.svg" 
                        alt="Téléphone" 
                        width={40} 
                        height={40}
                        className="object-contain"
                        />
                    </div>
                    <a href="tel:0297392244" className="hover:text-[var(--color-primary)] transition-colors">02 97 39 22 44</a>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <Image 
                        src="/ilstr/mail_picto.svg" 
                        alt="Email" 
                        width={40} 
                        height={40}
                        className="object-contain"
                        />
                    </div>
                    <a href="mailto:contact@allanic-electricite.com" className="hover:text-[var(--color-primary)] transition-colors">contact@allanic-electricite.com</a>
                </div>
                </div>
            </div>
          </div>

          {/* Colonne 3 : Liens Utiles */}
          <div className="flex flex-col items-start 2xl:items-end">
            <div className="flex flex-col items-start 2xl:items-end">
                <h3 className="font-syntha text-lg 2xl:text-2xl mb-6 ">liens utiles</h3>
                <div className="font-futura text-sm space-y-2 flex flex-col items-start 2xl:items-end">
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
