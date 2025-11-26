'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
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
            <Link href="#" className={styles.navLink}>
              Accueil
            </Link>
          </li>
          <li>
            <Link href="#" className={styles.navLink}>
              Services
            </Link>
          </li>
          <li>
            <Link href="#" className={styles.navLink}>
              À propos
            </Link>
          </li>
          <li>
            <Link href="#" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
