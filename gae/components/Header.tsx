'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import React from 'react';

export default function Header() {
  const scrollToId = useSmoothScroll();
  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/img/gae.png"
            alt="Allanic Energie Logo"
            width={80}
            height={80}
            className={styles.logoImage}
            priority
          />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="#accueil" onClick={handleNav('accueil')} className={styles.navLink}>
              Accueil
            </Link>
          </li>
          <li>
            <Link href="#qui-sommes-nous" onClick={handleNav('qui-sommes-nous')} className={styles.navLink}>
              Qui sommes-nous ?
            </Link>
          </li>
          <li>
            <Link href="#actualites" onClick={handleNav('actualites')} className={styles.navLink}>
              Actualités
            </Link>
          </li>
          <li>
            <Link href="#nous-rejoindre" onClick={handleNav('nous-rejoindre')} className={styles.navLink}>
              Nous rejoindre
            </Link>
          </li>
          <li>
            <Link href="#contact" onClick={handleNav('contact')} className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
