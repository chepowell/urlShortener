'use client'

import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/apiFetch'
import UrlRow from '@/components/UrlRow'

type UrlEntry = {
  id: string
  slug: string
  originalUrl: string
  visits: number
}

export default function DashboardPage() {
  const [urls, setUrls] = useState<UrlEntry[]>([])
  const [error, setError] = useState('')

  const fetchUrls = async () => {
    try {
      const res = await apiFetch('http://localhost:5053/urls')
      if (!res.ok) throw new Error('Failed to fetch URLs')
      const data = await res.json()
      setUrls(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Shortened URLs</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {urls.map((url) => (
          <UrlRow key={url.id} {...url} onSlugUpdated={fetchUrls} />
        ))}
      </ul>
    </main>
  )
}