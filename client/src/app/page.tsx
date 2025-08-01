'use client'

import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted:', url)
  }

  return (
    <main className="flex flex-col items-center mt-10">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="border p-2 rounded w-80"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Shorten
        </button>
      </form>
    </main>
  )
}
