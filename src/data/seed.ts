import { v4 as uuid } from 'uuid'
import type { Product, Customer, Order } from './models'
const now = new Date().toISOString()

function skuFrom(name: string) {
  return name.toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 20)
}

const products: Product[] = [
  {
    id: uuid(),
    sku: skuFrom('Calcium Carbonate 25kg'),
    name: 'Calcium Carbonate 25kg',
    category: 'Powders',
    unit: 'bag',
    currentStock: 120,
    minStockLevel: 20,
    buyingPrice: 12000,
    sellingPrice: 17000,
    description: 'Industrial grade calcium carbonate in 25kg bag for manufacturing',
    images: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: uuid(),
    sku: skuFrom('Sodium Hydroxide Flakes 25kg'),
    name: 'Sodium Hydroxide Flakes 25kg',
    category: 'Chemicals',
    unit: 'bag',
    currentStock: 60,
    minStockLevel: 10,
    buyingPrice: 18000,
    sellingPrice: 24000,
    description: 'Caustic soda flakes, 25kg bag',
    images: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: uuid(),
    sku: skuFrom('Ethanol 96% 20L'),
    name: 'Ethanol 96% 20L',
    category: 'Solvents',
    unit: 'drum',
    currentStock: 18,
    minStockLevel: 5,
    buyingPrice: 45000,
    sellingPrice: 70000,
    description: 'Ethanol 96% industrial, 20L drum',
    images: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: uuid(),
    sku: skuFrom('Polypropylene Bags 50kg'),
    name: 'Polypropylene Bags 50kg',
    category: 'Packaging',
    unit: 'pcs',
    currentStock: 500,
    minStockLevel: 100,
    buyingPrice: 400,
    sellingPrice: 600,
    description: 'Generic 50kg polypropylene bags for packaging',
    images: [],
    createdAt: now,
    updatedAt: now
  }
]

const customers: Customer[] = [
  {
    id: uuid(),
    name: 'Ifeanyi Okonkwo',
    phone: '+2348031234567',
    address: 'Aba, Abia State, Nigeria',
    email: 'ifeanyi@acme-ng.com',
    createdAt: now,
    updatedAt: now
  },
  {
    id: uuid(),
    name: 'Chidinma Nwachukwu',
    phone: '+2348029876543',
    address: 'Aba, Abia State, Nigeria',
    email: 'chidinma@beautyco.ng',
    createdAt: now,
    updatedAt: now
  }
]

// Minimal order examples
const orders: Order[] = [
  {
    id: uuid(),
    orderNumber: `ZB-${new Date().toISOString().slice(0,10)}-0001`,
    customerId: customers[0].id,
    items: [
      { sku: products[0].sku, quantity: 10, unitPrice: products[0].sellingPrice, subtotal: 10 * products[0].sellingPrice }
    ],
    subtotal: 10 * products[0].sellingPrice,
    total: 10 * products[0].sellingPrice,
    amountPaid: products[0].sellingPrice * 5,
    outstanding: products[0].sellingPrice * 5,
    paymentStatus: 'Partially Paid',
    orderStatus: 'Confirmed',
    source: 'staff',
    createdAt: now,
    updatedAt: now
  }
]

export default {
  productsSlice: {
    byId: products.reduce((acc, p) => ({ ...acc, [p.id]: p }), {}),
    ids: products.map(p => p.id)
  },
  customersSlice: {
    byId: customers.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}),
    ids: customers.map(c => c.id)
  },
  ordersSlice: {
    byId: orders.reduce((acc, o) => ({ ...acc, [o.id]: o }), {}),
    ids: orders.map(o => o.id)
  }
}
