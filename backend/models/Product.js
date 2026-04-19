const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  unit: { type: String, default: 'unidad' },
  minOrder: { type: Number, default: 1 },
  stock: { type: Number, default: 100 },
  eco: { type: Boolean, default: true },
  image: String,
  active: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
