import React from 'react'
import  CircularText  from '@/components/Icon'
import Link from 'next/link'


const HireMe  = () => {
  return (
    <div className='absolute left-4 bottom-8 flex items-center justify-center overflow-hidden md:right-0 md:left-auto md:top-0 md:bottom-auto lg:right-0 lg:left-auto lg:top-0 lg:bottom-auto  '>
        <div className='w-48 h-auton font-extralight flex items-center justify-center relative md:w-32 lg:w-40 2xl:w-44'>
            <CircularText className={"fill-dark dark:fill-light animate-spin-slow"}/>
            <Link href="/" className='flex items-center justify-center absolute left-1/2
            top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark dark:bg-light dark:text-dark
            text-light shadow-md border border-solid border-dark w-[70px] h-[70px] rounded-full
            hover:bg-light hover:text-black md:w-12 md:h-12 lg:w-14 lg:h-14 lg:text-[14px] md:text-[10px]'
            >
             Contact
            </Link>

        </div>
    </div>
  )
}

export default HireMe