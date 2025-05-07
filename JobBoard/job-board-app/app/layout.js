// app/layout.js
import Navbar from './components/Navbar'
import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Job Board',
  description: 'Find your next opportunity',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
