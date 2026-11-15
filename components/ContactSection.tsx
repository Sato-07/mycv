import React from 'react';
import { AnimatedTitle } from '@/components/ui/AnimatedTitle';
import { bookingHref, CONTACT_EMAIL } from '@/data/profile';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="w-full py-32 lg:py-20 px-10 sm:px-5 flex flex-col items-center text-center">
      <AnimatedTitle
        className="text-8xl lg:text-6xl sm:text-4xl font-medium leading-none"
        text="Un projet ? Parlons-en."
      />
      <p className="font-light mt-6 max-w-2xl">
        Dites-moi ce qui vous fait perdre du temps ou des clients. Je vous réponds sous 24 h avec une première idée et un
        ordre de prix.
      </p>
      <div className="flex items-center gap-4 mt-10 sm:flex-col">
        <a
          href={bookingHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-dark dark:bg-light text-light dark:text-dark border border-solid border-dark dark:border-light px-8 py-3 font-medium hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light transition-colors"
        >
          Réserver un appel
        </a>
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-light underline underline-offset-4 hover:opacity-50">
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  );
};
