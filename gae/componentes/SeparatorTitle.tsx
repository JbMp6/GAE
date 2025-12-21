'use client';

import { useEffect, useRef, useState } from 'react';

interface SeparatorTitleProps {
    title: string;
    headerBottom?: number;
    onPositionChange?: (yTop: number, yBottom: number) => void;
}

export default function SeparatorTitle({ title, headerBottom = 0, onPositionChange }: SeparatorTitleProps) {
    const separatorRef = useRef<HTMLDivElement>(null);
    const [topY, setTopY] = useState<number>(0);
    const [bottomY, setBottomY] = useState<number>(0);

    useEffect(() => {
        const updatePosition = () => {
            if (separatorRef.current) {
                const rect = separatorRef.current.getBoundingClientRect();
                const scrollY = window.scrollY || window.pageYOffset;
                const absoluteTopY = rect.top + scrollY;
                const absoluteBottomY = rect.bottom + scrollY;
                
                setTopY(absoluteTopY);
                setBottomY(absoluteBottomY);
                
                if (onPositionChange) {
                    onPositionChange(absoluteTopY, absoluteBottomY);
                }
            }
        };

        // Position initiale uniquement
        updatePosition();
    }, [onPositionChange]);

    // Vérifier si headerBottom est entre topY et bottomY
    const isHeaderInside = headerBottom >= topY && headerBottom <= bottomY;

    return (
        <div ref={separatorRef} className="w-full h-37.5 bg-secondary flex justify-center items-center">
          <h2 className={`text-4xl font-bold font-syntha transition-colors duration-300 ease-in-out ${isHeaderInside ? 'text-white' : 'text-primary'}`}>
            {title}
          </h2>
        </div>
    );
}