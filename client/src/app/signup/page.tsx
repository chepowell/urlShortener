'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '../context/UserContext'
import { useState } from 'react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUserId } = useUser()
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await fetch('http://localhost:5053/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.message || 'Signup failed')
    } else {
      const data = await res.json()
      localStorage.setItem('userId', data.id)
      setUserId(data.id)
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl mb-4">Create Account</h1>
      <input
        className="mb-2 w-full border px-2 py-1"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-2 w-full border px-2 py-1"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 w-full" type="submit">
        Sign Up
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  )
}