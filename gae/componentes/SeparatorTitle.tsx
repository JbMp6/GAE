'use client';

interface SeparatorTitleProps {
    title: string;
}

export default function SeparatorTitle({ title }: SeparatorTitleProps) {
    return (
        <div className="w-full h-37.5 bg-secondary flex justify-center items-center">
          <h2 className="text-primary text-2xl font-bold font-syntha">{title}</h2>
        </div>
    );
}