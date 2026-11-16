import Link from 'next/link';
import React from 'react';

export const Logo = () => {
  return (
    <div className='flex items-center justify-center'>
        <Link href='/' className="font-mont font-semibold w-14 h-14 bg-dark text-light flex items-center justify-center rounded-full border border-solid border-x-4 border-transparent dark:border-light dark:bg-light dark:text-dark">
          AB
        </Link>
    </div>
  );
};

