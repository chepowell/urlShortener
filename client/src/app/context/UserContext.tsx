// frontend/context/UserContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  userId: string | null
  setUserId: (id: string | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedId = localStorage.getItem('userId')
    if (storedId) setUserId(storedId)
  }, [])

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used inside UserProvider')
  return context
}
