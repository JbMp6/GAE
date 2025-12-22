'use client';

import { useState } from 'react';
import Header from '@/componentes/Header';
import Boxed from '@/staticComponentes/Boxed';
import FixedFooter from '@/staticComponentes/FixedFooter';
import ImgBanner from '@/staticComponentes/ImgBanner';
import SeparatorTitle from '@/componentes/SeparatorTitle';
import Button from '@/componentes/Button';

export default function Home() {
  const [headerBottom, setHeaderBottom] = useState<number>(0);

  return (
    <>
      <Header onHeaderBottomChange={setHeaderBottom} />
      <main className="flex flex-col items-center justify-start bg-white pt-header min-h-screen h-[25555555px] pb-footer">
        <ImgBanner img_src="/img/home_banner.jpg"/>

        <SeparatorTitle title='actualites' headerBottom={headerBottom} />

        <Boxed>

        </Boxed>


      </main>
      <FixedFooter />
    </>
  );
}
