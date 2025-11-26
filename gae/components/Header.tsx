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
            <Link href="#services" onClick={handleNav('services')} className={styles.navLink}>
              Services
            </Link>
          </li>
          <li>
            <Link href="#apropos" onClick={handleNav('apropos')} className={styles.navLink}>
              À propos
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
