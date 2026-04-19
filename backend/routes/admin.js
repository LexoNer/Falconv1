const router = require('express').Router()
const Order = require('../models/Order')
const User = require('../models/User')
const auth = require('../middleware/auth')
const requireRole = require('../middleware/requireRole')

router.use(auth, requireRole('admin'))

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort('-createdAt').populate('distribuidor', 'name email zone')
    res.json(orders)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!order) return res.status(404).json({ error: 'Pedido no encontrado' })
    res.json(order)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/distributors', async (req, res) => {
  try {
    const users = await User.find({ role: 'distribuidor' }).select('-password').sort('zone name')
    res.json(users)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router
