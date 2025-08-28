export function logout(setUserId: (id: string | null) => void) {
  localStorage.removeItem('userId')
  setUserId(null)
  window.location.href = '/login'
}