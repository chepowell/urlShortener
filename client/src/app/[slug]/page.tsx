import { redirect } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default async function RedirectPage({ params }: Props) {
  const { slug } = params

  try {
    const res = await fetch(`http://localhost:5053/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) throw new Error('Redirect failed')

    const data = await res.json()

    if (data?.originalUrl) {
      redirect(data.originalUrl)
    } else {
      redirect('/404')
    }
  } catch (err) {
    console.error('Redirection error:', err)
    redirect('/404')
  }
}