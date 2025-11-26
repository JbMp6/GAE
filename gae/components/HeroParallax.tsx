'use client';

import styles from '@/styles/HeroParallax.module.css';

interface HeroParallaxProps {
  imageSrc: string;
}

export default function HeroParallax({ imageSrc }: HeroParallaxProps) {
  return (
    <div 
      className={styles.heroParallax}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
    </div>
  );
}