const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  sku: String,
  price: Number,
  qty: Number,
})

const orderSchema = new mongoose.Schema({
  distribuidor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  distributorName: String,
  distributorZone: String,
  items: [itemSchema],
  total: Number,
  status: {
    type: String,
    enum: ['pendiente', 'confirmado', 'en_camino', 'entregado', 'cancelado'],
    default: 'pendiente',
  },
  notes: String,
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
