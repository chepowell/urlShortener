'use client'

import { useEffect, useState } from 'react'

type UrlEntry = {
  id: string
  originalUrl: string
  slug: string
  createdAt: string
}

export default function UrlListPage() {
  const [urls, setUrls] = useState<UrlEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [newSlug, setNewSlug] = useState<string>('')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch('http://localhost:5053/urls')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setUrls(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load URLs')
      }
    }

    fetchUrls()
  }, [])

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5053'

  const handleCopy = async (fullUrl: string, slug: string) => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  const handleEditSubmit = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/urls/${id}/slug`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: newSlug }),
      })

      if (!res.ok) throw new Error('Failed to update slug')

      const updatedUrl = await res.json()
      setUrls((prev) =>
        prev.map((u) => (u.id === id ? { ...u, slug: updatedUrl.slug } : u))
      )
      setEditingSlug(null)
      setNewSlug('')
    } catch (err) {
      alert('Slug must be unique.')
      console.error(err)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Shortened URLs</h1>
      {error && <p className="text-red-500">{error}</p>}

      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Original URL</th>
              <th className="py-2 px-4">Short URL</th>
              <th className="py-2 px-4">Slug</th>
              <th className="py-2 px-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => {
              const fullShortUrl = `${baseUrl}/${url.slug}`
              return (
                <tr key={url.id} className="border-t">
                  <td className="py-2 px-4">{url.originalUrl}</td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <a
                      href={fullShortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {fullShortUrl}
                    </a>
                    <button
                      onClick={() => handleCopy(fullShortUrl, url.slug)}
                      className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
                    >
                      {copiedSlug === url.slug ? 'Copied!' : 'Copy'}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    {editingSlug === url.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSlug}
                          onChange={(e) => setNewSlug(e.target.value)}
                          className="border px-2 py-1 rounded"
                        />
                        <button
                          onClick={() => handleEditSubmit(url.id)}
                          className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingSlug(null)}
                          className="text-sm bg-gray-300 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        {url.slug}{' '}
                        <button
                          onClick={() => {
                            setEditingSlug(url.id)
                            setNewSlug(url.slug)
                          }}
                          className="ml-2 text-sm text-blue-500"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(url.createdAt).toLocaleString()}
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
