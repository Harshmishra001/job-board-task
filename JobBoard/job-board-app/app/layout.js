// app/layout.js
import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Job Board',
  description: 'Find your next opportunity',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark"> 
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
