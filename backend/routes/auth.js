const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth')

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email, active: true })
    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name, zone: user.zone },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    const isProd = !!process.env.RAILWAY_ENVIRONMENT || process.env.NODE_ENV === 'production'
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({ ok: true, user: { id: user._id, email: user.email, role: user.role, name: user.name, zone: user.zone } })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ ok: true })
})

router.get('/me', auth, (req, res) => {
  res.json({ user: req.user })
})

module.exports = router
