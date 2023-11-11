import React, { ReactNode } from 'react';
import Questions from './Questions';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  message? : string;
}

const Layout = ({ message,children, className = '' }: LayoutProps) => {
  return (
    <div className={`w-full h-full inline-block dark:text-light  sm:p-0  lg:p-5 p-12 dark:bg-dark ${className}`} >
      {children}
    </div>
  );
};

export default Layout;

