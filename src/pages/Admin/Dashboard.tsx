import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { format } from 'date-fns'

export default function AdminDashboard() {
  const productsState = useSelector((s: RootState) => s.products)
  const ordersState = useSelector((s: RootState) => s.orders)
  const customersState = useSelector((s: RootState) => s.customers)

  const totalProducts = productsState.ids.length
  const lowStock = productsState.ids
    .map(id => productsState.byId[id])
    .filter(p => p.currentStock <= p.minStockLevel)

  const totalOrders = ordersState.ids.length
  const totalCustomers = customersState.ids.length

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Products</div>
          <div className="text-xl font-bold">{totalProducts}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Low stock items</div>
          <div className="text-xl font-bold">{lowStock.length}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Orders</div>
          <div className="text-xl font-bold">{totalOrders}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Customers</div>
          <div className="text-xl font-bold">{totalCustomers}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Recent Orders</h3>
          <ul>
            {ordersState.ids.slice(0, 6).map(id => {
              const o = ordersState.byId[id]
              return (
                <li key={id} className="py-2 border-b">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-medium">{o.orderNumber}</div>
                      <div className="text-xs text-gray-500">{format(new Date(o.createdAt), 'PP p')}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">₦{o.total.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{o.orderStatus}</div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Low stock products</h3>
          <ul>
            {lowStock.slice(0, 8).map(p => (
              <li key={p.id} className="py-2 border-b flex justify-between">
                <div>
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.sku}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{p.currentStock} {p.unit}</div>
                </div>
              </li>
            ))}
            {lowStock.length === 0 && <li className="text-sm text-gray-500 p-2">No low stock items</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
