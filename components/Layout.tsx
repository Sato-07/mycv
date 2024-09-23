import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({children, className = '' }: LayoutProps) => {
  return (
    <div className={`w-full h-full inline-block dark:text-light   sm:p-0  lg:p-5 p-12 dark:bg-dark ${className}`} >
      {children}
    </div>
  );
};


