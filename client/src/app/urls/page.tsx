"use client"

import { useEffect, useState } from 'react'

type UrlEntry = {
  originalUrl: string
  slug: string
  createdAt: string
}

export default function UrlListPage() {
  const [urls, setUrls] = useState<UrlEntry[]>([])
  const [error, setError] = useState<string | null>(null)

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
            {urls.map((url) => (
              <tr key={url.slug} className="border-t">
                <td className="py-2 px-4">{url.originalUrl}</td>
                <td className="py-2 px-4">
                  <a
                    href={`${baseUrl}/${url.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {`${baseUrl}/${url.slug}`}
                  </a>
                </td>
                <td className="py-2 px-4">{url.slug}</td>
                <td className="py-2 px-4">
                  {new Date(url.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
