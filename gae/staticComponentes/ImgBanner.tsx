'use client';

import React from 'react';
import Image from 'next/image';

interface ImgBannerProps {
    children?: React.ReactNode;
    img_src: string;
}

export default function ImgBanner({ children, img_src }: ImgBannerProps) {
    return (
        <div className="w-full h-[calc(100vh-var(--spacing-header)-var(--spacing-footer))] relative">
            <Image
                src={img_src}
                alt="Banner Image"
                fill
                className="object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-64 md:hidden z-10">
                <Image
                    src="/ilstr/gae_logo_02.svg"
                    alt="Logo GAE"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center h-auto">
                {children}
            </div>
        </div>
    );
}