import { api } from './api.js'

export function getUser() {
  const token = localStorage.getItem('falcon_token')
  const user = localStorage.getItem('falcon_user')
  if (!token || !user) return null
  try { return JSON.parse(user) } catch { return null }
}

export function requireAuth(allowedRole) {
  const user = getUser()
  if (!user) { window.location.href = '/login.html'; return null }
  if (allowedRole && user.role !== allowedRole) {
    window.location.href = user.role === 'admin' ? '/admin.html' : '/dashboard.html'
    return null
  }
  return user
}

export function logout() {
  localStorage.removeItem('falcon_token')
  localStorage.removeItem('falcon_user')
  window.location.href = '/login.html'
}
