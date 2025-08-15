// app/not-found.tsx
'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-lg text-gray-700">Page not found.</p>
      <p className="text-gray-500 mt-2 mb-6">The link may be broken or the page may have been removed.</p>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Go back home
      </Link>
    </div>
  )
}
