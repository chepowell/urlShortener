'use client'

import { useState } from 'react'
import { useUser } from './context/UserContext'
import { apiFetch } from '@/lib/apiFetch'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const { userId } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setShortUrl('')

    if (!url) {
      setError('Please enter a URL.')
      return
    }

    try {
      const res = await apiFetch('http://localhost:5053/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to shorten URL')
      }

      const data = await res.json()
      setShortUrl(data.shortUrl)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Shorten Your URL</h1>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          placeholder="Enter a long URL"
          className="flex-1 px-4 py-2 border rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Shorten
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {shortUrl && (
        <div className="mt-4">
          <p className="text-green-600 font-semibold">Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  )
}