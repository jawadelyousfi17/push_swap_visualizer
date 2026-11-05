import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Push swap 42 visualizer',
  description:
    'Interactive push_swap visualizer for 42 School: step through sorting instructions on stacks A and B.',
  verification: { google: 'PZhWRBsPh1eT3IMNFsOU0l4ZxV662nK772ciG5r47Yo' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
