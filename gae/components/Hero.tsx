'use client';

import React, { ReactNode } from 'react';
import styles from '@/styles/Hero.module.css';

interface HeroProps {
  id: string;
  imageSrc: string;
  children?: ReactNode;
}

export default function Hero({ id, imageSrc, children }: HeroProps) {
  return (
    <div
      id={id}
      className={styles.hero}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {children}
    </div>
  );
}