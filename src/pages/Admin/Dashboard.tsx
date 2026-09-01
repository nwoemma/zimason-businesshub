import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { format } from 'date-fns'

function Stat({label, value, note}:{label:string; value:React.ReactNode; note?:string}){
  return (
    <div className="p-4 bg-white rounded shadow min-w-[160px]">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
      {note && <div className="text-xs text-gray-400 mt-2">{note}</div>}
    </div>
  )
}

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

  const today = new Date().toISOString().slice(0,10)
  const todaysSales = ordersState.ids
    .map(id => ordersState.byId[id])
    .filter(o => o.createdAt.slice(0,10) === today)
    .reduce((s, o) => s + (o.total||0), 0)

  const inventoryValue = productsState.ids
    .map(id => productsState.byId[id])
    .reduce((s, p) => s + (p.buyingPrice || 0) * (p.currentStock || 0), 0)

  // Best sellers (simple count)
  const counts: Record<string, number> = {}
  ordersState.ids.forEach(id => {
    const o = ordersState.byId[id]
    o.items.forEach(it => { counts[it.sku] = (counts[it.sku] || 0) + it.quantity })
  })
  const best = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Business Overview</h2>
          <div className="text-sm text-gray-500">A quick snapshot of Zimason BusinessHub — data is sample/demo-only.</div>
        </div>
        <div className="text-sm text-gray-500">{format(new Date(), 'PPpp')}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <Stat label="Today's sales" value={`₦${todaysSales.toLocaleString()}`} note={"Sales recorded today"} />
        <Stat label="Total products" value={totalProducts} note={"Active SKUs"} />
        <Stat label="Total orders" value={totalOrders} note={"All orders & sales"} />
        <Stat label="Low stock" value={lowStock.length} note={"Products below min level"} />
        <Stat label="Customers" value={totalCustomers} note={"Registered customers"} />
        <Stat label="Inventory value" value={`₦${inventoryValue.toLocaleString()}`} note={"Cost value of stock"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Recent Orders</h3>
          <ul>
            {ordersState.ids.slice(0, 8).map(id => {
              const o = ordersState.byId[id]
              return (
                <li key={id} className="py-2 border-b flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">{o.orderNumber}</div>
                    <div className="text-xs text-gray-500">{o.items.length} items • {format(new Date(o.createdAt), 'PP')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₦{o.total.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{o.orderStatus} • {o.paymentStatus}</div>
                  </div>
                </li>
              )
            })}
            {ordersState.ids.length === 0 && <li className="p-4 text-gray-500">No orders yet</li>}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Best-selling SKUs</h3>
          <ul>
            {best.length === 0 && <li className="text-sm text-gray-500">No sales data</li>}
            {best.map(([sku,qty]) => (
              <li key={sku} className="py-2 border-b flex justify-between">
                <div className="text-sm">{sku}</div>
                <div className="text-sm font-semibold">{qty}</div>
              </li>
            ))}
          </ul>

          <h3 className="font-medium mt-4 mb-2">Low stock</h3>
          <ul>
            {lowStock.slice(0,6).map(p => (
              <li key={p.id} className="py-2 border-b flex justify-between">
                <div className="text-sm">{p.name}</div>
                <div className="text-sm font-semibold">{p.currentStock} {p.unit}</div>
              </li>
            ))}
            {lowStock.length === 0 && <li className="text-sm text-gray-500 p-2">No low stock items</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
