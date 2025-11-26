'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import styles from './page.module.css';

export default function Home() {

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>

        <Hero
          id="accueil"
          imageSrc="/img/batiment2.jpeg"
          title="G.A.E"
          arrowScroll={true}
          arrowTargetId="services"
        />

      </main>
      <Footer />
    </div>
  );
}
