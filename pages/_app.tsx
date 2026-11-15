import '@/styles/globals.css'
import { JetBrains_Mono, Montserrat } from 'next/font/google'
import type { AppProps } from 'next/app'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: "--font-mont",
})

// Police à chasse fixe pour les étiquettes « machine » (statut de l'IA, libellés) : le contraste avec Montserrat signe le côté IA.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400','500'],
  variable: "--font-mono",
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <main className={`font-mont bg-dark text-light antialiased w-full min-h-screen ${montserrat.variable} ${mono.variable}`}>
        <Component {...pageProps} />
      </main>
  )
}

export default MyApp
