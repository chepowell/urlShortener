export async function apiFetch(url: string, options: RequestInit = {}) {
  const userId = localStorage.getItem('userId')

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(userId ? { 'x-user-id': userId } : {}),
    },
  })
}