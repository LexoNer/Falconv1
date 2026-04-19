const router = require('express').Router()
const Product = require('../models/Product')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ active: true }).sort('category name')
    res.json(products)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(product)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router
