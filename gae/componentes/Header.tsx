'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <header className="w-full h-header bg-secondary text-white flex justify-between items-center fixed top-0 px-20">
      {/* Logo section */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image 
            src="/ilstr/gae_logo_02.svg" 
            alt="G.a.e Logo" 
            width={252} 
            height={90}
            className="absolute left-20 top-1.5 cursor-pointer"
            priority
          />
        </Link>
        <Image 
          src="/ilstr/eclair_01.svg" 
          alt="Éclair" 
          width={30} 
          height={30}
          className="absolute left-110"
        />
      </div>

      {/* Navigation */}
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
    </header>
  );
}
