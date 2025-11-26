'use client';

import styles from '@/styles/ArrowScroll.module.css';
import useSmoothScroll from '@/hooks/useSmoothScroll';

interface ArrowScrollProps {
  targetId: string; // id de l'ancre à atteindre
  color?: string;
  rotate?: boolean;
}

export default function ArrowScroll({ targetId, color = "#fff", rotate = false }: ArrowScrollProps) {
  const scrollToId = useSmoothScroll();
  const handleClick = () => {
    scrollToId(targetId);
  };

  return (
    <button
      type="button"
      aria-label="Scroll to section"
      onClick={handleClick}
      className={`${styles.arrowScroll} ${rotate ? styles.arrowScrollRotate : ''}`}
      style={{ color }}
    >
      <svg fill="currentColor" width="40" height="40" viewBox="0 0 30.727 30.727" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"/>
        </g>
      </svg>
    </button>
  );
}
