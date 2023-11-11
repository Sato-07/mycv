import Link from 'next/link'
import React from 'react'
import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
 
const montserra = Montserrat({
  weight: ['600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const MotionLink =  motion(Link);

const Logo = () => {
  return (
    <div className='flex items-center justify-center mt-2'>
        <Link href='/' className={`${montserra.className} w-16  h-16 bg-dark text-light flex items-center  justify-center rounded-full border border-solid border-x-4 border-transparent dark:border-light dark:bg-dark`}>
          AB
        </Link>
    </div>
  )
}

export default Logo