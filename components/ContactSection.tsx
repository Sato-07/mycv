import React from 'react';
import { bookingHref, CONTACT_EMAIL } from '@/data/profile';

export const ContactSection: React.FC<{ onTalk: () => void }> = ({ onTalk }) => {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-light/10 px-10 py-40 text-center lg:py-24 sm:px-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">04 — Contact</p>
      <h2 className="mx-auto mt-6 max-w-5xl text-[7rem] font-medium leading-[0.95] tracking-tight xl:text-8xl lg:text-6xl sm:text-5xl">
        Un projet ? <span className="font-light italic text-light/50">Parlons-en.</span>
      </h2>
      <p className="mx-auto mt-8 max-w-xl font-light text-light/60">
        Dites-moi ce qui vous fait perdre du temps ou des clients. Je vous réponds sous 24 h avec une première idée et un ordre de prix.
      </p>
      <div className="mt-12 flex items-center justify-center gap-4 sm:flex-col">
        <a
          href={bookingHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-light px-8 py-4 font-medium text-dark transition hover:scale-[1.03]"
        >
          Réserver un appel
        </a>
        <button
          type="button"
          onClick={onTalk}
          className="rounded-full border border-light/30 px-8 py-4 font-medium transition hover:border-light"
        >
          Demander d'abord à mon avatar
        </button>
      </div>
      <a href={`mailto:${CONTACT_EMAIL}`} className="mt-8 inline-block font-mono text-sm text-light/50 hover:text-light">
        {CONTACT_EMAIL}
      </a>
    </section>
  );
};
