'use client'

import { useEffect, useState } from 'react'
import { UrlRow } from '@/components/UrlRow'
import { apiFetch } from '@/lib/apiFetch'

interface Url {
  id: string
  slug: string
  originalUrl: string
  visitCount: number
  createdAt: string
}

export default function DashboardPage() {
  const [urls, setUrls] = useState<Url[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchUrls = async () => {
    try {
      setError('')
      setLoading(true)

      console.log('Fetching URLs with userId:', localStorage.getItem('userId'))

      const res = await apiFetch('/urls') // <-- this will include x-user-id from apiFetch
      if (!res.ok) throw new Error('Failed to fetch URLs')

      const data: Url[] = await res.json()
      setUrls(data.sort((a, b) => b.visitCount - a.visitCount))
    } catch (err) {
      console.error(err)
      setError('Failed to load URLs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your shortened URLs</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!loading && urls.length === 0 && !error ? (
        <p>No URLs found.</p>
      ) : (
        <ul className="space-y-4">
          {urls.map((url) => (
            <UrlRow
              key={url.id}
              id={url.id}
              slug={url.slug}
              originalUrl={url.originalUrl}
              visits={url.visitCount}
              createdAt={url.createdAt}
              onSlugUpdated={fetchUrls}
            />
          ))}
        </ul>
      )}
    </div>
  )
}