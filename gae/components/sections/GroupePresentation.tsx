"use client";

import Image from "next/image";
import Boxed from "@/components/layout/Boxed";
import Button from "@/components/ui/Button";
import { useState, useMemo } from "react";

const leftCards = [

    {
    id: "gae-holding",
    title: "GROUPE ALLANIC ÉNERGIE",
    subtitle: null,
    address: ["4, Impasse des Bleuets", "29400 PLOUGOURVEST"],
    mapPoint: {
        label: "Plougourvest",
        top: "17%",
        left: "26%",
        },
    },

    {
        id: "allanic-29",
        title: "ALLANIC 29",
        subtitle: "",
        address: ["26, Av. Bel Air", "29800 LANDERNEAU"],
        mapPoint: {
            label: "Landerneau",
            top: "21%",
            left: "22%",
        },
    },
];

const rightCards = [
    {
        id: "allanic-56",
        title: "ALLANIC 56",
        subtitle: "",
        address: ["21, route d'Auray", "Le Groho", "56330 CAMORS"],
        mapPoint: {
            label: "Camors",
            top: "52%",
            left: "47%",
        },
    },
    {
        id: "allanic-56-cvc",
        title: "ALLANIC C.V.C 56",
        subtitle: null,
        address: ["21, route d'Auray", "Le Groho", "56330 CAMORS"],
        mapPoint: {
            label: "Camors",
            top: "52%",
            left: "47%",
        },
    },
    {
        id: "acf-56",
        title: "A.C.F 56",
        subtitle: null,
        address: ["21, route d'Auray", "Le Groho", "56330 CAMORS"],
        mapPoint: {
            label: "Camors",
            top: "52%",
            left: "47%",
        },
    },
];

export default function GroupePresentation() {
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
    const [hoveredMapLabel, setHoveredMapLabel] = useState<string | null>(null);

    // Regroupe les map points par label unique (ex: Camors)
    const uniqueMapPoints = useMemo(() => {
        const allPoints = [...leftCards, ...rightCards]
            .map(card => card.mapPoint)
            .filter(Boolean);
        const map = new Map();
        allPoints.forEach(point => {
            if (!map.has(point.label)) {
                map.set(point.label, point);
            }
        });
        return Array.from(map.values());
    }, []);

    // Liste des labels liés à la card survolée
    const hoveredLabels = useMemo(() => {
        if (hoveredCardId) {
            const card = [...leftCards, ...rightCards].find(c => c.id === hoveredCardId);
            return card && card.mapPoint ? [card.mapPoint.label] : [];
        }
        if (hoveredMapLabel) {
            return [hoveredMapLabel];
        }
        return [];
    }, [hoveredCardId, hoveredMapLabel]);

    return (
        <div className="bg-extra w-full flex flex-col items-center justify-center gap-10 xl:gap-20 py-25 px-10 xl:px-0">
            <Boxed w_size="70%" color="extra" className="flex-col xl:flex-row gap-8 xl:gap-0 items-start">
                <div className="flex justify-start items-start w-full xl:w-[34%] h-full">
                    <h3 className="font-syntha text-secondary text-2xl xl:text-3xl relative after:content-[''] after:block after:h-[4px] after:bg-primary after:w-35 after:mt-2">
                        presentation
                    </h3>
                </div>
                <div className="flex justify-start items-start w-full xl:w-[66%] h-full">
                    <p className="text-left text-secondary text-lg xl:text-2xl font-futura font-[300]">
                        Le Groupe Allanic Énergie propose une offre globale en génie électrique et climatique à travers quatre entités spécialisées. Ses expertises couvrent l'électricité générale, le chauffage, la ventilation (CVC) et les courants faibles pour les secteurs du bâtiment, de l'industrie et de l'agriculture.
                    </p>
                </div>
            </Boxed>

            <Boxed w_size="70%" color="extra" className="flex-row">
                <p className="text-left text-secondary text-base xl:text-2xl font-futura font-[400] columns-1 xl:columns-3 gap-x-8">
                    L’activité du groupe s’articule autour de deux piliers complémentaires : l’installation neuve ou la rénovation, et la maintenance opérationnelle des équipements. En maîtrisant l’ensemble de la chaîne des fluides et des réseaux de communication, le groupe assure la mise en œuvre de solutions techniques performantes et pérennes. De la gestion de l'énergie à la sécurisation des accès et des infrastructures, chaque filiale apporte ses compétences spécifiques pour garantir le bon fonctionnement et la sécurité des installations professionnelles et résidentielles.
                </p>
            </Boxed>

            <Boxed w_size="70%" color="extra" className="hidden xl:flex flex-col gap-12">
                <div className="flex justify-start items-start w-full">
                    <h3 className="font-syntha text-secondary text-2xl xl:text-3xl relative after:content-[''] after:block after:h-[4px] after:bg-primary after:w-35 after:mt-2">
                        implantations
                    </h3>
                </div>
                <div className="flex flex-row justify-between items-start w-full gap-4">
                    {/* Left cards */}
                    <div className="flex flex-col gap-4 w-1/4">
                        {leftCards.map((card) => {
                            const isActive = hoveredLabels.length === 0 || (card.mapPoint && hoveredLabels.includes(card.mapPoint.label));
                            const isHovered = hoveredCardId === card.id || (hoveredMapLabel && card.mapPoint && hoveredMapLabel === card.mapPoint.label);
                            return (
                                <div
                                    key={card.id}
                                    className={`bg-white p-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 ${isHovered ? 'scale-105 shadow-lg z-10' : ''}`}
                                    style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
                                    onMouseEnter={() => setHoveredCardId(card.id)}
                                    onMouseLeave={() => setHoveredCardId(null)}
                                >
                                    <h4 className="font-bold text-lg text-secondary">
                                        {card.title} <span className="font-normal text-gray-500 text-sm">{card.subtitle}</span>
                                    </h4>
                                    <div className="mt-2 text-gray-600 text-sm">
                                        {card.address.map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Map + points */}
                    <div className="flex justify-center items-center w-1/2 h-full">
                        <div className="w-full aspect-[6/4] relative">
                            <Image
                                src="/ilstr/carte_bzh.svg"
                                alt="Carte Implantation"
                                fill
                                className="object-contain"
                            />
                            {/* Map points uniques par label */}
                            {uniqueMapPoints.map(point => {
                                const isHovered = hoveredLabels.includes(point.label);
                                const isAnyHovered = hoveredLabels.length > 0;
                                return (
                                    <span
                                        key={point.label}
                                        className="absolute z-10 flex flex-col items-center transition-all duration-500"
                                        style={{
                                            top: point.top,
                                            left: point.left,
                                            transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
                                            opacity: isAnyHovered ? (isHovered ? 1 : 0) : 1,
                                            pointerEvents: isAnyHovered && !isHovered ? 'none' : 'auto',
                                        }}
                                        onMouseEnter={() => setHoveredMapLabel(point.label)}
                                        onMouseLeave={() => setHoveredMapLabel(null)}
                                    >
                                        <span className="w-4 h-4 rounded-full border-2 border-white bg-secondary shadow-2xl"></span>
                                        <span
                                            className="mt-1 text-xs text-secondary font-futura whitespace-nowrap bg-white bg-opacity-80 px-1 rounded uppercase"
                                            style={{
                                                opacity: isHovered ? 1 : 0,
                                                transition: 'opacity 0.4s',
                                            }}
                                        >
                                            {point.label}
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right cards */}
                    <div className="flex flex-col gap-4 w-1/4">
                        {rightCards.map((card) => {
                            const isActive = hoveredLabels.length === 0 || (card.mapPoint && hoveredLabels.includes(card.mapPoint.label));
                            const isHovered = hoveredCardId === card.id || (hoveredMapLabel && card.mapPoint && hoveredMapLabel === card.mapPoint.label);
                            return (
                                <div
                                    key={card.id}
                                    className={`bg-white p-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 ${isHovered ? 'scale-105 shadow-lg z-10' : ''}`}
                                    style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
                                    onMouseEnter={() => setHoveredCardId(card.id)}
                                    onMouseLeave={() => setHoveredCardId(null)}
                                >
                                    <h4 className="font-bold text-lg text-secondary">
                                        {card.title} {card.subtitle && <span className="font-normal text-gray-500 text-sm">{card.subtitle}</span>}
                                    </h4>
                                    <div className="mt-2 text-gray-600 text-sm">
                                        {card.address.map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Boxed>

            <Boxed w_size="70%" color="extra" className="flex-col gap-8">
                <div className="flex justify-start items-start w-full">
                    <h3 className="font-syntha text-secondary text-2xl xl:text-3xl relative after:content-[''] after:block after:h-[4px] after:bg-primary after:w-35 after:mt-2">
                        valeurs du groupe
                    </h3>
                </div>
                <p className="text-left text-secondary text-base xl:text-2xl font-futura font-[400]">
                    Le Groupe Allanic Énergie cultive la synergie entre ses filiales pour offrir une expertise globale. Proximité et réactivité guident nos équipes au quotidien, garantissant des solutions techniques fiables en électricité et génie climatique. Nous plaçons la satisfaction client au cœur de nos engagements, alliant savoir-faire historique et innovation pour sécuriser vos infrastructures durablement.
                </p>
            </Boxed>

        </div>
    );
}
