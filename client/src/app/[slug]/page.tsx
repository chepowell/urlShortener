// client/src/app/[slug]/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectPage({ params }: { params: { slug: string } }) {
  const router = useRouter()

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        const res = await fetch(`http://localhost:5053/${params.slug}`)
        const data = await res.json()

        if (res.ok && data.originalUrl) {
          window.location.href = data.originalUrl
        } else {
          router.push('/not-found')
        }
      } catch (err) {
        router.push('/not-found')
      }
    }

    redirectToOriginalUrl()
  }, [params.slug, router])

  return <p>Redirecting...</p>
}