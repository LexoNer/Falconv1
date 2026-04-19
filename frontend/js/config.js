const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

export const API_BASE_URL = isLocal
  ? 'http://localhost:3001/api'
  : 'https://RAILWAY-URL-AQUI.up.railway.app/api'

export const BRAND = {
  name: 'Falcon',
  tagline: 'Red de distribuidores',
}
