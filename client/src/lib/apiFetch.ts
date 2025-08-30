export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const userId = localStorage.getItem('userId')

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (userId) {
    headers['x-user-id'] = userId
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  return res
}