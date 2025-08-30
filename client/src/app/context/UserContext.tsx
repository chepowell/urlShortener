'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  userId: string | null
  setUserId: (id: string | null) => void
  ready: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('userId')
    if (stored) {
      setUserId(stored)
    }
    setReady(true) // ✅ mark ready once we’ve checked localStorage
  }, [])

  return (
    <UserContext.Provider value={{ userId, setUserId, ready }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}