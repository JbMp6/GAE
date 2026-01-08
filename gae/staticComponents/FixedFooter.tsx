'use client';

import Image from 'next/image';
import ScrollToTop from '@/components/ScrollToTop';

export default function FixedFooter() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="w-full xl:h-footer h-header bg-primary text-black sticky bottom-0 z-25 flex flex-col xl:flex-row justify-center items-center px-10">

            <div className="flex flex-row justify-center items-center gap-6">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Image 
                        src="/ilstr/facebook_logo.svg" 
                        alt="Facebook" 
                        width={40} 
                        height={40}
                        className="hover:scale-110 hover:drop-shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
                    />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Image 
                        src="/ilstr/instagram_logo.svg" 
                        alt="Instagram" 
                        width={40} 
                        height={40}
                        className="hover:scale-110 hover:drop-shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
                    />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Image 
                        src="/ilstr/linkedin_logo.svg" 
                        alt="LinkedIn" 
                        width={40} 
                        height={40}
                        className="hover:scale-110 hover:drop-shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
                    />
                </a>
                <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                    <Image 
                        src="/ilstr/x_logo.svg" 
                        alt="X (Twitter)" 
                        width={40} 
                        height={40}
                        className="hover:scale-110 hover:drop-shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
                    />
                </a>
            </div>

            <p className="block xl:absolute xl:pt-0 pt-2.5 left-15 font-futura text-[12px] font-normal">© {currentYear} GROUPE ALLANIC ENERGIE • Tous droits réservés</p>

            <ScrollToTop />

        </footer>
    );
}
