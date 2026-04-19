import { api } from './api.js'

export async function requireAuth(allowedRole) {
  try {
    const { user } = await api.get('/auth/me')
    if (allowedRole && user.role !== allowedRole) {
      window.location.href = user.role === 'admin' ? '/admin.html' : '/dashboard.html'
      return null
    }
    return user
  } catch {
    window.location.href = '/login.html'
    return null
  }
}

export async function logout() {
  await api.post('/auth/logout')
  window.location.href = '/login.html'
}
