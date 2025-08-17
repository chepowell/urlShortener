'use client'

import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    let processedUrl = url.trim()
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = `https://${processedUrl}`
    }

    setError('')
    setShortUrl(null)
    setCopied(false)

    const baseApiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:5053'
        : 'http://server:3000')

    try {
      const res = await fetch(`${baseApiUrl}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: processedUrl }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Something went wrong')
      }

      const data: { slug: string; shortUrl: string } = await res.json()
      setShortUrl(data.shortUrl)
    } catch (err) {
      if (err instanceof Error) {
        console.error('[URL Shorten Error]', err)
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main className="flex flex-col items-center mt-10">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="border p-2 rounded w-80"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4 flex items-center gap-2">
          <p>
            Short URL:{' '}
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {shortUrl}
            </a>
          </p>
          <button
            onClick={handleCopy}
            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </main>
  )
}
