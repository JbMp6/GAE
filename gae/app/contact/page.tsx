
import React from "react";
import Header from "@/componentes/Header";
import FixedFooter from "@/staticComponentes/FixedFooter";
import Footer from "@/staticComponentes/Footer";
import FormulaireContact from "@/componentes/FormulaireContact";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="h-full w-full bg-white flex flex-col pt-header">
        <div className="flex flex-row w-full h-[calc(100vh-340px)]">
          <div className="w-[40%] h-full flex justify-center items-end">
            <div className="bg-extra w-full h-[80%]"></div>
          </div>
          <div className="w-[60%] h-full flex flex-col pl-10">
            <div className="w-full h-[20%] flex justify-start items-center">
              <h1 className="font-syntha text-secondary text-3xl">Contacte</h1>
            </div>
            <div className="w-full h-[80%] flex justify-start items-start pb-10">
              <FormulaireContact />
            </div>
          </div>
        </div>
        <FixedFooter />
        <Footer />
      </main>
    </>
  );
}
