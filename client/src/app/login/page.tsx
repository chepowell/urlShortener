'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/apiFetch'
import { useUser } from '../context/UserContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUserId } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await apiFetch('/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      console.log('SIGNIN RESPONSE:', res.status, data)
      if (res.ok && data.userId) {
        setUserId(data.userId)
        router.push('/urls')
      } else {
        throw new Error('Login failed')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Sign In
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  )
}