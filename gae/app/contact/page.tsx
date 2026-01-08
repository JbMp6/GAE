
'use client';

import React from "react";
import Header from "@/components/Header";
import FixedFooter from "@/staticComponents/FixedFooter";
import Footer from "@/staticComponents/Footer";
import FormulaireContact from "@/components/FormulaireContact";
import { submitContact } from "@/lib/queries";

export default function ContactPage() {
  const handleContactSubmit = async (formData: {
    prenom: string;
    nom: string;
    email: string;
    tel: string;
    message: string;
  }) => {
    await submitContact({
      prenom: formData.prenom,
      nom: formData.nom,
      mail: formData.email,
      tel: formData.tel,
      message: formData.message,
    });
  };

  return (
    <>
      <Header />
      <main className="h-auto w-full bg-white flex flex-col pt-header">
        <div className="flex flex-row w-full h-[calc(100vh-180px)]">
          <div className="w-[40%] max-w- h-full xl:flex hidden justify-center items-end">
            <div className="bg-extra w-full h-[80%]"></div>
          </div>
          <div className="w-full xl:w-[60%] h-full flex flex-col xl:pl-10 px-5">
            <div className="w-full h-[20%] flex justify-start items-center">
              <h1 className="font-syntha text-secondary text-3xl">Contact</h1>
            </div>
            <div className="w-full h-[80%] flex justify-start items-start pb-10">
              <FormulaireContact onSubmit={handleContactSubmit} />
            </div>
          </div>
        </div>
      </main>
      <FixedFooter />
      <Footer />
    </>
  );
}
