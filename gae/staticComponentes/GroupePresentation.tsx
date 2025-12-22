"use client";

import Image from "next/image";
import Boxed from "@/staticComponentes/Boxed";
import Button from "@/componentes/Button";

const leftCards = [
  {
    id: "allanic-29",
    title: "ALLANIC 29",
    subtitle: "ELECTRICITÉ",
    address: ["26 Av. Bel Air", "29800 LANDERNEAU"],
  },
];

const rightCards = [
  {
    id: "allanic-56",
    title: "ALLANIC 56",
    subtitle: "ELECTRICITÉ",
    address: ["La Grée", "Route de Pluvigner", "56330 CAMORS"],
  },
  {
    id: "allanic-56-cvc",
    title: "ALLANIC 56 C.V.C",
    subtitle: null,
    address: ["21 route d'Auray", "56330 CAMORS"],
  },
  {
    id: "acf-56",
    title: "A.C.F 56",
    subtitle: null,
    address: ["La Grée", "Route de Pluvigner", "56330 CAMORS"],
  },
];

export default function GroupePresentation() {
  return (
    <div className="bg-extra w-full flex flex-col items-center justify-center gap-4 py-8">
        <Boxed w_size="70%" color="extra" className="flex-row">
            <div className="flex justify-start items-start w-[30%] h-full">
                <h3>Presentation</h3>
            </div>

            <div className="flex justify-start items-start w-[70%] h-full">
                <p className="text-left">
                    Le Groupe ALLANIC, c’est avant tout une histoire de famille et de passion pour le métier d’électricien. 
                    Fondée en 1983 par M. Allanic, l’entreprise a su évoluer au fil des années pour devenir un acteur majeur dans le domaine de l’électricité et des services associés.
                </p>
            </div>

        </Boxed>
    </div>
  );
}
