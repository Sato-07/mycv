// pages/_app.tsx
import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'
import type { AppProps } from 'next/app'
import NavBar from '@/components/NavBar'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800'],
  style: ['normal', 'italic'],
  variable:"--font-mont"
})



function MyApp({ Component, pageProps }: AppProps) {

  return (
      <main className={`font-mont bg-light dark:bg-dark w-full min-h-screen ${montserrat.variable}`}>
        <Component {...pageProps} />
      </main>
  )
}

export default MyApp
