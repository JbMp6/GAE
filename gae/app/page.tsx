'use client';

import Header from '@/componentes/Header';
import Boxed from '@/staticComponentes/Boxed';
import FixedFooter from '@/staticComponentes/FixedFooter';
import ImgBanner from '@/staticComponentes/ImgBanner';
import SeparatorTitle from '@/componentes/SeparatorTitle';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-start bg-white pt-header h-250000">
        <ImgBanner img_src="/img/home_banner.jpg"/>

        <SeparatorTitle title='actualites'/>

      </main>
      <FixedFooter />
    </>
  );
}
