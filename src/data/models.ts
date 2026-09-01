export type ID = string

export interface Product {
  id: ID
  sku: string
  name: string
  category: string
  unit: string
  currentStock: number
  minStockLevel: number
  buyingPrice: number
  sellingPrice: number
  description?: string
  images?: string[]
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: ID
  name: string
  phone: string
  address: string
  email?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  sku: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface Order {
  id: ID
  orderNumber: string
  customerId: ID | null
  items: OrderItem[]
  subtotal: number
  total: number
  amountPaid: number
  outstanding: number
  paymentStatus: 'Paid' | 'Partially Paid' | 'Unpaid'
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Completed' | 'Cancelled'
  source: 'portal' | 'staff'
  createdAt: string
  updatedAt: string
}
