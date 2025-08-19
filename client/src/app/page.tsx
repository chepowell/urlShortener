'use client'

import { useEffect, useState } from 'react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const id = localStorage.getItem('userId')
    setUserId(id)
  }, [])

  const handleShorten = async () => {
    if (!url || !userId) {
      setMessage('Please enter a URL and make sure you’re signed in.')
      return
    }

    try {
      const res = await fetch('http://localhost:5053/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ originalUrl: url }),
      })

      if (!res.ok) throw new Error('Failed to shorten URL')
      const data = await res.json()
      setMessage(`Shortened URL: ${data.shortUrl}`)
      setUrl('')
    } catch (err) {
      setMessage('Error shortening URL.')
    }
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shorten a URL</h1>
      <input
        className="border px-3 py-2 w-full mb-2"
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleShorten}
      >
        Shorten
      </button>
      {message && <p className="mt-4">{message}</p>}
    </main>
  )
}
