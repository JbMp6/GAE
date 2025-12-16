'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/actualites', label: 'ACTUALITÉS' },
  { href: '/groupe', label: 'GROUPE' },
  { href: '/services', label: 'SERVICES' },
  { href: '/societes', label: 'SOCIÉTÉS' },
  { href: '/realisations', label: 'RÉALISATIONS' },
  { href: '/recrutement', label: 'RECRUTEMENT' },
  { href: '/contact', label: 'CONTACT' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full h-header bg-secondary text-white fixed top-0 z-50">
      {/* Header Desktop - Caché sur mobile */}
      <div className="hidden 2xl:flex justify-between items-center h-full px-20">
        {/* Logo section */}
        <div className="flex items-center gap-4">
          <Link href="/"
            className="absolute left-20 top-1.5">
            <Image 
              src="/ilstr/gae_logo_02.svg" 
              alt="G.a.e Logo" 
              width={252} 
              height={90}
              className="cursor-pointer"
              priority
          />
        </Link>
        <Image 
          src="/ilstr/eclair_01.svg" 
          alt="Éclair" 
          width={30} 
          height={30}
          className="absolute left-110 hidden min-[1740px]:block" 
        />

      {/* Navigation Desktop */}
      </div>        
        <nav className="flex items-center h-full gap-11 font-futura text-[24px] font-normal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`h-full flex items-center ${
                pathname === link.href
                  ? 'nav-link-active'
                  : 'nav-link'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Header Mobile - Caché sur desktop */}
      <div className="2xl:hidden flex justify-center items-center h-full relative">
        {/* Logo Mobile - Éclair uniquement */}
        <Link href="/"
          className="absolute left-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
          <Image 
            src="/ilstr/eclair_01.svg" 
            alt="Éclair" 
            width={35} 
            height={35}
            className="cursor-pointer"
            priority
          />
        </Link>

        {/* Hamburger button */}
        <button 
          className="flex flex-col gap-2 w-12 h-12 justify-center items-center z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-10 h-1 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-3' : ''}`} />
          <span className={`w-10 h-1 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-10 h-1 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-3' : ''}`} />
        </button>

        {/* Navigation Mobile - Menu slide-in */}
        <nav className={`
          fixed top-header left-0 w-full h-[calc(100vh-100px)]
          bg-secondary
          flex flex-col items-center justify-center gap-10
          font-futura text-2xl font-normal
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 translate-x-0 visible' : 'opacity-0 -translate-x-full invisible'}
        `}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`${
                pathname === link.href
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              } transition-colors duration-200`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
