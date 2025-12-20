'use client';

import React from 'react';
import Image from 'next/image';

interface ImgBannerProps {
    children?: React.ReactNode;
    img_src: string;
}

export default function ImgBanner({ children, img_src }: ImgBannerProps) {
    return (
        <div className="w-full h-[calc(100vh-var(--spacing-header))] relative">
            <Image
                src={img_src}
                alt="Banner Image"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center h-auto">
                {children}
            </div>
        </div>
    );
}