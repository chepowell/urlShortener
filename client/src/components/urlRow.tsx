// frontend/components/UrlRow.tsx
'use client'

import { useState } from 'react'

interface UrlRowProps {
  id: string
  slug: string
  originalUrl: string
  visits: number
  onSlugUpdated: () => void
}

export default function UrlRow({ id, slug, originalUrl, visits, onSlugUpdated }: UrlRowProps) {
  const [editing, setEditing] = useState(false)
  const [newSlug, setNewSlug] = useState(slug)
  const [error, setError] = useState('')

  const handleSave = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      setError('You must be signed in.')
      return
    }

    const res = await fetch(`http://localhost:5053/${id}/slug`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify({ newSlug }),
    })

    if (res.ok) {
      setEditing(false)
      setError('')
      onSlugUpdated() // Refresh URL list
    } else {
      const data = await res.json()
      setError(data.message || 'Failed to update slug')
    }
  }

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex flex-col">
        <span className="font-medium">{originalUrl}</span>
        {editing ? (
          <input
            className="border px-2 py-1 mt-1"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
          />
        ) : (
          <span className="text-sm text-gray-600">/{slug}</span>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-500">{visits} visits</span>
        {editing ? (
          <button className="text-green-600" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="text-blue-600" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  )
}