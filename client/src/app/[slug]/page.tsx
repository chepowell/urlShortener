import { redirect } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export default async function RedirectPage({ params }: Props) {
  const { slug } = params

  try {
    const res = await fetch(`http://server:3000/${slug}`, {
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
    redirect('/404')
  }
}