export function logout() {
  localStorage.removeItem('userId')
  window.location.href = '/login'
}