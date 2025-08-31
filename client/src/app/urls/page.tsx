'use client'

import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/apiFetch'
import { useUser } from '../../app/context/UserContext'
import UrlRow from '../../components/UrlRow'

export default function DashboardPage() {
  const { userId } = useUser()
  const [urls, setUrls] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await apiFetch('http://localhost:5053/urls')
        const data = await res.json()
        if (res.ok) {
          setUrls(data)
        } else {
          throw new Error(data.message || 'Failed to fetch URLs')
        }
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchUrls()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Shortened URLs</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {urls.map((url) => (
          <UrlRow key={url.id} url={url} />
        ))}
      </ul>
    </div>
  )
}