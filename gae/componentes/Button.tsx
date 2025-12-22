'use client';

import Link from 'next/link';

interface ButtonProps {
  title: string;
  href?: string;
  onClick?: () => void;
}

export default function Button({ title, href, onClick }: ButtonProps) {
  const buttonClasses = 'px-16 py-4 bg-primary text-secondary font-futura font-bold text-xl hover:scale-110 hover:shadow-lg active:scale-100 transition-all duration-300 ease-in-out cursor-pointer rounded';

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {title}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {title}
    </button>
  );
}
