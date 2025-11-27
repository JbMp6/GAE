'use client'

import styles from '@/styles/CompanyCard.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CompanyCardProps {
  id: string;
  logo: string;
  description: string;
  btnLink: string;
}

export default function CompanyCard({ id, logo, description, btnLink }: CompanyCardProps) {
    const router = useRouter();

    return (
    <div 
    id={id}
    className={styles.card}
    >

      <Image 
      src={logo} 
      alt="Company Logo" 
      width={350} 
      height={248} 
      />

      <p>
        {description}
      </p>
      <button className={styles.btn} onClick={() => router.push(btnLink)}>Voir plus</button>
    </div>
  );
}