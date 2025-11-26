'use client';

import styles from '@/styles/Hero.module.css';
import ArrowScroll from './ArrowScroll';

interface HeroProps {
  id: string;
  imageSrc: string;
  title?: string;
  arrowScroll?: boolean;
  arrowTargetId?: string;
  arrowColor?: string;
  arrowRotate?: boolean;
}

export default function Hero({ id, imageSrc, title = '', arrowScroll = false, arrowTargetId = '', arrowColor = "#fff", arrowRotate = false }: HeroProps) {
  return (
    <div
      id={id}
      className={styles.hero}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <h1 className={styles.heroTitle}>{title}</h1>
      {arrowScroll && (
        <div className={styles.heroArrowScroll}>
          <ArrowScroll 
          targetId={arrowTargetId}
          color={arrowColor}
          rotate={arrowRotate} />
        </div>
      )}
    </div>
  );
}