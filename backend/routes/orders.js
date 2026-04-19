const router = require('express').Router()
const Order = require('../models/Order')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { distribuidor: req.user.id }
    const orders = await Order.find(query).sort('-createdAt').populate('distribuidor', 'name email zone')
    res.json(orders)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const { items, notes } = req.body
    if (!items?.length) return res.status(400).json({ error: 'El pedido está vacío' })

    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

    const order = await Order.create({
      distribuidor: req.user.id,
      distributorName: req.user.name,
      distributorZone: req.user.zone,
      items,
      total,
      notes,
    })

    res.status(201).json(order)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('distribuidor', 'name email zone')
    if (!order) return res.status(404).json({ error: 'Pedido no encontrado' })
    if (req.user.role !== 'admin' && order.distribuidor._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Sin permiso' })
    }
    res.json(order)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router
