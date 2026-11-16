import React from 'react'
import CircularText from '@/components/ui/Icon'
import { bookingHref } from '@/data/profile'

// Badge rond qui tourne, signature du site d'origine : il mène à la prise de rendez-vous.
export const HireMe = () => {
  return (
    <div className='relative flex h-36 w-36 items-center justify-center'>
      <CircularText className="fill-light animate-spin-slow" />
      <a
        href={bookingHref()}
        target="_blank"
        rel="noopener noreferrer"
        className='absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-light bg-light text-sm font-medium text-dark transition hover:bg-dark hover:text-light'
      >
        Contact
      </a>
    </div>
  )
}
