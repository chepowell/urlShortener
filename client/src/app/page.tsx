'use client'

import { useState } from 'react'
import { apiFetch } from '@/lib/apiFetch'
import { useUser } from './context/UserContext'
import { Copy } from 'lucide-react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const { userId } = useUser()

  const handleShorten = async () => {
    setError('')
    setShortUrl('')
    setCopied(false)

    try {
      new URL(url)
    } catch {
      setError('Please enter a valid URL.')
      return
    }

    try {
      const data = await apiFetch('/urls', {
        method: 'POST',
        body: JSON.stringify({ originalUrl: url }),
      })
      setShortUrl(data.shortUrl)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Enter your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleShorten}
      >
        Shorten
      </button>

      {shortUrl && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-green-600 font-medium">{shortUrl}</span>
          <button
            onClick={handleCopy}
            className="bg-gray-100 border rounded p-1 hover:bg-gray-200"
            aria-label="Copy to clipboard"
          >
            <Copy size={16} />
          </button>
          {copied && <span className="text-sm text-green-500 ml-2">Copied!</span>}
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </main>
  )
}