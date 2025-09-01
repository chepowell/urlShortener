'use client'

import { useState } from 'react'
import { apiFetch } from '@/lib/apiFetch'

interface UrlRowProps {
  id: string
  slug: string
  originalUrl: string
  visitCount: number
  createdAt: string
  onSlugUpdated: () => void
}

export function UrlRow({
  id,
  slug,
  originalUrl,
  visitCount,
  onSlugUpdated,
}: UrlRowProps) {
  const [newSlug, setNewSlug] = useState(slug)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const shortUrl = `http://localhost:5053/${slug}`

  const handleSave = async () => {
    setError('')
    if (newSlug === slug) {
      setEditing(false)
      return
    }

    try {
      const res = await apiFetch(`/urls/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ slug: newSlug }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to update slug')
      }

      setEditing(false)
      onSlugUpdated()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <li className="border border-gray-300 p-4 rounded space-y-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500">Original: {originalUrl}</p>
          <div className="flex items-center space-x-2 mt-2">
            {editing ? (
              <>
                <input
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded w-40"
                />
                <button
                  onClick={handleSave}
                  className="text-sm px-2 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false)
                    setNewSlug(slug)
                  }}
                  className="text-sm px-2 py-1 bg-gray-200 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={() => setEditing(true)}
                  className="text-sm bg-yellow-300 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={handleCopy}
                  className="text-sm bg-gray-200 px-2 py-1 rounded"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="mt-2 md:mt-0 text-sm text-gray-600">Visits: {visitCount}</div>
      </div>
    </li>
  )
}