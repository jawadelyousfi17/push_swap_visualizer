import './globals.css'
import { Roboto, Roboto_Mono } from 'next/font/google'

const sans = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-sans' })
const mono = Roboto_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

export const metadata = {
  title: 'Push swap 42 visualizer',
  description:
    'Interactive push_swap visualizer for 42 School: step through sorting instructions on stacks A and B.',
  verification: { google: 'PZhWRBsPh1eT3IMNFsOU0l4ZxV662nK772ciG5r47Yo' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
