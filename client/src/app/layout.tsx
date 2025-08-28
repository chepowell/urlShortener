// app/layout.tsx
import './globals.css'
import Navbar from '@/components/Navbar'
import { UserProvider } from './context/UserContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  )
}