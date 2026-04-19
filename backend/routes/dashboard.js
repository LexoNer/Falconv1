const router = require('express').Router()
const Order = require('../models/Order')
const User = require('../models/User')
const auth = require('../middleware/auth')

router.get('/stats', auth, async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin'
    const orderQuery = isAdmin ? {} : { distribuidor: req.user.id }

    const [totalOrders, pendingOrders, distributorCount, orders] = await Promise.all([
      Order.countDocuments(orderQuery),
      Order.countDocuments({ ...orderQuery, status: 'pendiente' }),
      isAdmin ? User.countDocuments({ role: 'distribuidor', active: true }) : Promise.resolve(null),
      Order.find(orderQuery).sort('-createdAt').limit(5).populate('distribuidor', 'name zone'),
    ])

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

    res.json({
      totalOrders,
      pendingOrders,
      distributorCount,
      totalRevenue,
      recentOrders: orders,
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router
