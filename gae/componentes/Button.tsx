'use client';

import Link from 'next/link';

interface ButtonProps {
  title: string;
  href?: string;
  onClick?: () => void;
}

export default function Button({ title, href, onClick }: ButtonProps) {
  const buttonClasses = 'font-futura text-xl italic text-secondary hover:text-primary transition-colors duration-300';

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
