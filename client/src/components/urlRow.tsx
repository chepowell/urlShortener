'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import { apiFetch } from '@/lib/apiFetch'
import { formatDistanceToNow } from 'date-fns'

interface UrlRowProps {
  id: string
  slug: string
  originalUrl: string
  visits: number
  createdAt: string
  onSlugUpdated: () => void
}

export function UrlRow({
  id,
  slug,
  originalUrl,
  visits,
  createdAt,
  onSlugUpdated,
}: UrlRowProps) {
  const [editing, setEditing] = useState(false)
  const [newSlug, setNewSlug] = useState(slug)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSave = async () => {
    try {
      await apiFetch(`/urls/${id}/slug`, {
        method: 'PATCH',
        body: JSON.stringify({ newSlug }),
      })
      setEditing(false)
      setError('')
      onSlugUpdated()
    } catch (err: any) {
      setError(err.message || 'Failed to update slug')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${slug}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex justify-between items-start border-b pb-3">
      <div className="flex flex-col">
        <span className="font-medium break-words">{originalUrl}</span>
        {editing ? (
          <input
            className="border px-2 py-1 mt-1 w-full max-w-xs"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
          />
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <span>/ {slug}</span>
            <button
              onClick={handleCopy}
              className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
        <span className="text-xs text-gray-400 mt-1">
          Created {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div className="flex flex-col items-end gap-1 text-sm text-gray-700">
        <span>{visits} visits</span>
        {editing ? (
          <button
            className="text-green-600 hover:underline text-sm"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}