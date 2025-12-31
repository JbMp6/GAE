
import React from "react";
import Header from "@/componentes/Header";
import FixedFooter from "@/staticComponentes/FixedFooter";
import Footer from "@/staticComponentes/Footer";
import FormulaireContact from "@/componentes/FormulaireContact";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="h-[100vh] bg-white flex flex-col pt-header">
        <h1 className="text-center font-syntha font-normal mt-8 mb-6 text-3xl xl:text-4xl tracking-wider text-primary">CONTACT</h1>
        <FormulaireContact />
        <FixedFooter />
        <Footer />
      </main>
    </>
  );
}
