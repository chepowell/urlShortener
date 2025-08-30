'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useUser } from '../app/context/UserContext'
import { logout } from '@/lib/auth'

export default function Navbar() {
  const { userId, setUserId } = useUser()

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId && !userId) {
      setUserId(storedUserId)
    }
  }, [userId, setUserId])

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link href="/" className="text-xl font-bold">ShortenIt</Link>
      <div className="flex gap-4">
        {userId ? (
          <>
            <Link href="/">Shorten</Link>
            <Link href="/urls">Dashboard</Link>
            <button
              onClick={() => logout(setUserId)}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/signup">Sign Up</Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}