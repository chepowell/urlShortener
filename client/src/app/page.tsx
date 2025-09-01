'use client'

import { useState } from 'react'
import { apiFetch } from '@/lib/apiFetch'

export default function ShortenPage() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setShortUrl('')
    setCopied(false)

    try {
      const res = await apiFetch('/urls', {
        method: 'POST',
        body: JSON.stringify({ originalUrl }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to shorten URL')
      }

      const data = await res.json()
      const baseUrl = 'http://localhost:5053'
      setShortUrl(`${baseUrl}/${data.slug}`)
      setOriginalUrl('')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
    }
  }

  return (
    <main className="max-w-xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Shorten a URL</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter a long URL"
          required
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Shorten
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {shortUrl && (
        <div className="mt-6 bg-gray-100 p-4 rounded flex items-center justify-between">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="ml-4 text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </main>
  )
}