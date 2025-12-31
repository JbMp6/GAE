'use client';

import { useEffect, useRef, useState } from 'react';

interface SeparatorTitleProps {
    title: string;
    headerBottom?: number;
    onPositionChange?: (yTop: number, yBottom: number) => void;
    id?: string;
}

export default function SeparatorTitle({ title, headerBottom = 0, onPositionChange, id }: SeparatorTitleProps) {
    const separatorRef = useRef<HTMLDivElement>(null);
    const [isHeaderInside, setIsHeaderInside] = useState(false);

    useEffect(() => {
        if (separatorRef.current) {
            const rect = separatorRef.current.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;
            const absoluteTopY = rect.top + scrollY;
            const absoluteBottomY = rect.bottom + scrollY;
            
            const inside = headerBottom >= absoluteTopY && headerBottom <= absoluteBottomY;
            setIsHeaderInside(inside);
            
            if (onPositionChange) {
                onPositionChange(absoluteTopY, absoluteBottomY);
            }
        }
    }, [headerBottom, onPositionChange]);

    return (
        <div
            id={id}
            ref={separatorRef}
            className={`relative w-full h-[150px] flex justify-center items-center transition-colors duration-400 ease-in-out ${isHeaderInside ? 'bg-[#6b7173]' : 'bg-secondary'}`}
        >
            <h2 className={`text-3xl xl:text-4xl font-syntha text-primary absolute bottom-10`}>
                {title}
            </h2>
            <div className='h-[6px] bg-primary absolute bottom-0 w-75'></div>
        </div>
    );
}