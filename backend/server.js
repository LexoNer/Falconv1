require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { connectDB } = require('./lib/db')

const app = express()
const PORT = process.env.PORT || 3001

const ALLOWED_ORIGINS = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) cb(null, true)
    else cb(new Error(`CORS bloqueado: ${origin}`))
  },
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.get('/api/health', async (req, res) => {
  const mongoose = require('mongoose')
  const state = mongoose.connection.readyState
  res.json({ ok: true, timestamp: new Date().toISOString(), db: state === 1 ? 'connected' : 'disconnected' })
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/dashboard', require('./routes/dashboard'))

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🦅 Falcon API corriendo en puerto ${PORT}`))
}).catch(err => {
  console.error('❌ Error conectando a MongoDB:', err.message)
  process.exit(1)
})
