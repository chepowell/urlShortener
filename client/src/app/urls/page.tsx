'use client'

import { useEffect, useState } from 'react'

type UrlEntry = {
  id: string
  originalUrl: string
  slug: string
  createdAt: string
  visits: number
}

export default function UrlListPage() {
  const [urls, setUrls] = useState<UrlEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newSlug, setNewSlug] = useState<string>('')
  const [sortByVisits, setSortByVisits] = useState<boolean>(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5053'

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch(`${apiUrl}/urls`)
        if (!res.ok) throw new Error('Failed to fetch URLs')
        const data = await res.json()
        setUrls(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load URLs')
      }
    }

    fetchUrls()
  }, [apiUrl])

  const handleEditClick = (id: string, currentSlug: string) => {
    setEditingId(id)
    setNewSlug(currentSlug)
  }

  const handleSaveClick = async (id: string, originalSlug: string) => {
    if (newSlug.trim() === originalSlug) {
      setEditingId(null)
      return
    }

    try {
      const res = await fetch(`${apiUrl}/${id}/slug`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: newSlug }),
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.message || 'Slug must be unique')
        return
      }

      const updated = await res.json()
      setUrls((prev) =>
        prev.map((url) =>
          url.id === id ? { ...url, slug: updated.slug } : url
        )
      )
      setEditingId(null)
      setNewSlug('')
    } catch (err) {
      alert('Error updating slug')
    }
  }

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      alert('Copied to clipboard!')
    } catch (err) {
      alert('Failed to copy')
    }
  }

  const sortedUrls = sortByVisits
    ? [...urls].sort((a, b) => b.visits - a.visits)
    : urls

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Shortened URLs</h1>
        <button
          onClick={() => setSortByVisits((prev) => !prev)}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
        >
          {sortByVisits ? 'Reset Sort' : 'Sort by Visits (High → Low)'}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {sortedUrls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Original URL</th>
              <th className="py-2 px-4">Short URL</th>
              <th className="py-2 px-4">Slug</th>
              <th className="py-2 px-4">Created</th>
              <th className="py-2 px-4">Visits</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUrls.map((url) => {
              const shortUrl = `${apiUrl}/${url.slug}`

              return (
                <tr key={url.id} className="border-t">
                  <td className="py-2 px-4 max-w-xs truncate">{url.originalUrl}</td>

                  <td className="py-2 px-4">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {shortUrl}
                    </a>
                  </td>

                  <td className="py-2 px-4 w-32">
                    {editingId === url.id ? (
                      <input
                        value={newSlug}
                        onChange={(e) => setNewSlug(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="inline-block w-full">{url.slug}</span>
                    )}
                  </td>

                  <td className="py-2 px-4">
                    {new Date(url.createdAt).toLocaleString()}
                  </td>

                  <td className="py-2 px-4 text-center">{url.visits}</td>

                  <td className="py-2 px-4">
                    <div className="flex gap-2 flex-wrap">
                      {editingId === url.id ? (
                        <>
                          <button
                            onClick={() => handleSaveClick(url.id, url.slug)}
                            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEditClick(url.id, url.slug)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleCopy(shortUrl)}
                        className="bg-indigo-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
