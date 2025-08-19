'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  userId: string | null
  setUserId: (id: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserIdState] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) setUserIdState(storedUserId)
  }, [])

  // ... existing code ...
  const setUserId = (id: string | null) => {
    setUserIdState(id)
    if (id) {
      localStorage.setItem('userId', id)
    } else {
      localStorage.removeItem('userId')
    }
  }
// ... existing code ...

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}