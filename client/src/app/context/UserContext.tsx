'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  userId: string | null
  setUserId: (id: string | null) => void
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserIdState] = useState<string | null>(null)

  useEffect(() => {
    const storedId = localStorage.getItem('userId')
    if (storedId) setUserIdState(storedId)
  }, [])

  const setUserId = (id: string | null) => {
    if (id) {
      localStorage.setItem('userId', id)
    } else {
      localStorage.removeItem('userId')
    }
    setUserIdState(id)
  }

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}