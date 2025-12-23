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
    <div className="bg-extra w-full flex flex-col items-center justify-center gap-10 md:gap-20 py-16 px-4 md:px-0">
        <Boxed w_size="70%" color="extra" className="flex-col md:flex-row gap-8 md:gap-0">
            <div className="flex justify-start items-start w-full md:w-[34%] h-full">
                <h3 className="font-syntha text-secondary text-3xl relative after:content-[''] after:block after:h-[4px] after:bg-primary after:w-35 after:mt-2 uppercase">Presentation</h3>
            </div>

            <div className="flex justify-start items-start w-full md:w-[66%] h-full">
                <p className="text-left text-secondary text-xl md:text-3xl font-futura font-bold">
                    Acipis elicidunt aut et quuntemquiaXimincimusam alibus modiae
                    platem volupid qui omnihillam, qui quat omnim nos et hiciae cusae
                    vendandit rendam ne sus aliquis ex eat. Accabo. Udaest volupta.
                </p>
            </div>

        </Boxed>
        <Boxed w_size="70%" color="extra" className="flex-row">
          <p className="text-left text-secondary text-lg md:text-2xl font-futura columns-1 md:columns-3 gap-x-8">
            Acipis elicidunt aut et quuntemquiaXimincimusam alibus modiae platem volupid qui omnihillam, qui quat omnim nos et hiciae cusae vendandit rendam ne sus aliquis ex eat. Accabo. Udaest, tempore scimus inctempor sitatae peris nimus et velignit quid mo ipiendel ium volupta voluptatium ligendi rerum.Ullaborehenis dolupta tibusciam et et, etum aut landis aliatur? et di cullaiq uaspero tem as senthictatem expedis.
          </p>
        </Boxed>
        <Boxed w_size="70%" color="extra" className="hidden md:flex flex-col gap-12">
            <div className="flex justify-start items-start w-full">
                <h3 className="font-syntha text-secondary text-3xl relative after:content-[''] after:block after:h-[4px] after:bg-primary after:w-35 after:mt-2">IMPLANTATION</h3>
            </div>

            <div className="flex flex-row justify-between items-start w-full gap-4">
                <div className="flex flex-col gap-4 w-1/4">
                    {leftCards.map((card) => (
                        <div key={card.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <h4 className="font-bold text-lg text-secondary">
                                {card.title} <span className="font-normal text-gray-500 text-sm">{card.subtitle}</span>
                            </h4>
                            <div className="mt-2 text-gray-600 text-sm">
                                {card.address.map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center w-1/2">
                     <Image 
                        src="/ilstr/carte_bretagne.svg" 
                        alt="Carte Implantation" 
                        width={600} 
                        height={400}
                        className="w-full h-auto object-contain"
                     />
                </div>

                <div className="flex flex-col gap-4 w-1/4">
                    {rightCards.map((card) => (
                        <div key={card.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <h4 className="font-bold text-lg text-secondary">
                                {card.title} {card.subtitle && <span className="font-normal text-gray-500 text-sm">{card.subtitle}</span>}
                            </h4>
                            <div className="mt-2 text-gray-600 text-sm">
                                {card.address.map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Boxed>
        <Boxed w_size="70%" color="extra" className="flex-col gap-8">
            <div className="flex justify-start items-start w-full">
                <h3 className="font-syntha text-secondary text-3xl relative after:content-[''] after:block after:h-[4px] after:bg-primary after:w-35 after:mt-2 uppercase">VALEURS DU GROUPE</h3>
            </div>
            
            <p className="text-left text-secondary text-lg md:text-2xl font-futura">
                Acipis elicidunt aut et quuntemquiaXimincimusam alibus modiae platem volupid qui omnihillam, qui quat omnim nos et hiciae cusae vendandit rendam ne sus aliquis ex eat. Accabo. Udaest, tempore scimus inctempor sitatae peris nimus et velignit quid mo ipiendel ium volupta voluptatium ligendi rerum.Ullaborehenis dolupta tibusciam et et, ut quodit recus adipsant autet ut oditate mporit aut facim auta quamenisque etum aut landis aliatur?
            </p>

            <div className="flex justify-center items-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr] w-full mt-4">
                 <div className="hidden md:block"></div>
                 <Button title="+" />
                 <span className="text-gray-500 text-lg md:text-xl font-futura font-light md:ml-8">En savoir plus ...</span>
            </div>
        </Boxed>
    </div>
  );
}
