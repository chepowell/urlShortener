export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const userId = localStorage.getItem('userId')
  console.log('🧠 x-user-id being sent:', userId)

  const headers = {
    ...init.headers,
    ...(userId ? { 'x-user-id': userId } : {}),
  }

  return fetch(input, { ...init, headers })
}