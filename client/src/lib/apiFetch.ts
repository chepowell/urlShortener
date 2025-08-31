export async function apiFetch(path: string, options: RequestInit = {}) {
  const baseUrl = 'http://localhost:5053'
  const userId = localStorage.getItem('userId')
  console.log('apiFetch -> userId:', userId)
  console.log('apiFetch -> path:', path)

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(userId ? { 'x-user-id': userId } : {}),
    },
  })

  return res
}