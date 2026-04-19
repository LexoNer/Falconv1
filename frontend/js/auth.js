import { api } from './api.js'

export async function requireAuth(allowedRole) {
  const token = localStorage.getItem('falcon_token')
  if (!token) { window.location.href = '/login.html'; return null }

  try {
    const { user } = await api.get('/auth/me')
    if (allowedRole && user.role !== allowedRole) {
      window.location.href = user.role === 'admin' ? '/admin.html' : '/dashboard.html'
      return null
    }
    return user
  } catch {
    localStorage.removeItem('falcon_token')
    window.location.href = '/login.html'
    return null
  }
}

export async function logout() {
  localStorage.removeItem('falcon_token')
  window.location.href = '/login.html'
}
