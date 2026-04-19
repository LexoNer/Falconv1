require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')

const products = [
  { name: 'Desengrasante Biodegradable Falcon', sku: 'FAL-001', category: 'Desengrasantes', description: 'Desengrasante industrial de fórmula biodegradable. Ideal para superficies de cocina, maquinaria y pisos industriales.', price: 4800, unit: 'litro', minOrder: 6, eco: true },
  { name: 'Limpiador Multiusos Falcon Verde', sku: 'FAL-002', category: 'Multiusos', description: 'Limpiador de uso general con fragancia natural. Certificación Bandera Azul Ecológica.', price: 2900, unit: 'litro', minOrder: 12, eco: true },
  { name: 'Jabón Líquido de Manos Aloe', sku: 'FAL-003', category: 'Higiene Personal', description: 'Jabón líquido con aloe vera y extractos naturales. pH neutro. Biodegradable al 98%.', price: 3200, unit: 'litro', minOrder: 6, eco: true },
  { name: 'Cloro Concentrado Ecológico', sku: 'FAL-004', category: 'Desinfectantes', description: 'Hipoclorito de sodio al 5%. Formulación de bajo impacto ambiental para sanitización de superficies.', price: 2100, unit: 'litro', minOrder: 12, eco: true },
  { name: 'Lavaloza Concentrado Citrus', sku: 'FAL-005', category: 'Lavavajillas', description: 'Detergente lavaloza con extracto de limón y naranja. Alta dilución — 1:10. Biodegradable.', price: 3600, unit: 'litro', minOrder: 6, eco: true },
  { name: 'Limpiador de Baños Falcon', sku: 'FAL-006', category: 'Baños', description: 'Elimina sarro, hongos y bacterias. Sin cloro agresivo. Apto para inodoros, pisos y azulejos.', price: 3900, unit: 'litro', minOrder: 6, eco: true },
  { name: 'Desinfectante de Pisos Floral', sku: 'FAL-007', category: 'Pisos', description: 'Desinfectante concentrado con fragancia floral. Activo contra el 99.9% de bacterias comunes.', price: 2600, unit: 'litro', minOrder: 12, eco: true },
  { name: 'Quitamanchas Ropa Falcon', sku: 'FAL-008', category: 'Lavandería', description: 'Prelavado para manchas difíciles. Formulación enzimática biodegradable. Sin fosfatos.', price: 4100, unit: 'litro', minOrder: 6, eco: true },
  { name: 'Gel Antibacterial Manos 70%', sku: 'FAL-009', category: 'Higiene Personal', description: 'Gel con 70% etanol. Secado rápido. Apto para uso frecuente. Presentación galón dispensable.', price: 5500, unit: 'galón', minOrder: 4, eco: false },
  { name: 'Limpiador Vidrios Cristal Clear', sku: 'FAL-010', category: 'Vidrios', description: 'Sin amoniaco. Deja superficies de vidrio sin rayas ni residuos. Biodegradable.', price: 3100, unit: 'litro', minOrder: 6, eco: true },
]

const users = [
  { email: 'admin@falcon.cr', password: 'admin123', role: 'admin', name: 'Karolina Campos', phone: '8888-0001' },
  { email: 'poas@falcon.test', password: 'demo123', role: 'distribuidor', name: 'Ferretería El Poas', phone: '8888-0002', zone: 'Alajuela Centro' },
  { email: 'grecia@falcon.test', password: 'demo123', role: 'distribuidor', name: 'Abastecedor Grecia', phone: '8888-0003', zone: 'Grecia, Alajuela' },
  { email: 'naranjo@falcon.test', password: 'demo123', role: 'distribuidor', name: 'Distribuidora Naranjo', phone: '8888-0004', zone: 'Naranjo, Alajuela' },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✅ MongoDB conectado')

  await User.deleteMany({})
  await Product.deleteMany({})

  await Product.insertMany(products)
  console.log(`✅ ${products.length} productos creados`)

  for (const u of users) {
    await User.create(u)
  }
  console.log(`✅ ${users.length} usuarios creados`)

  console.log('\n📋 Credenciales del demo:')
  console.log('  Admin:       admin@falcon.cr / admin123')
  console.log('  Distribuidor: poas@falcon.test / demo123')

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch(err => {
  console.error('❌', err.message)
  process.exit(1)
})
