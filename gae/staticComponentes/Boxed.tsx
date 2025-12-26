'use client';
import React from 'react';

interface BoxedProps {
    children: React.ReactNode;
    w_size: '100%' | '70%' | '50%';
    color: 'primary' | 'secondary' | 'white' | 'extra' | 'transparent';
    className?: string;
}

export default function Boxed({ children, color, w_size, className }: BoxedProps) {
    const widthClasses = {
        '100%': 'w-full 2xl:w-full',
        '70%': 'w-full 2xl:w-[70%]',
        '50%': 'w-full 2xl:w-1/2'
    };

    const colorClasses = {
        'primary': 'bg-primary',
        'secondary': 'bg-secondary',
        'white': 'bg-white',
        'extra': 'bg-extra',
        'transparent': 'bg-transparent'
    };

    return (
        <div className={`flex flex-col items-center justify-center h-auto max-w-[1920px] ${widthClasses[w_size]} ${colorClasses[color]} ${className ?? ''}`}>
            {children}
        </div>
    );
}