'use client';

import { ReactNode } from 'react';
import Header from '@/componentes/Header';


interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const handleHeaderBottomChange = (absoluteBottomY: number) => {
    console.log(absoluteBottomY);
  };

  return (
    <>
      <Header onHeaderBottomChange={handleHeaderBottomChange} />
      {children}
    </>
  );
}
