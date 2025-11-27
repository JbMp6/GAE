'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ArrowScroll from '@/components/ArrowScroll';
import styles from './page.module.css';

export default function Home() {

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>

        <Hero id="accueil" imageSrc="/img/batiment2.jpeg">
          <h1 className={styles.heroHomeTitle}>G.A.E</h1>
          <div className={styles.heroHomeArrowScroll}>
            <ArrowScroll targetId="qui-sommes-nous" />
          </div>
        </Hero>

        <section id="qui-sommes-nous" className={styles.quiSommesNous}>
          <h2>Qui sommes-nous ?</h2>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
