import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'

export default function CustomerHome() {
  const productsState = useSelector((s: RootState) => s.products)
  const featured = productsState.ids.slice(0, 6).map(id => productsState.byId[id])

  return (
    <div>
      <section className="bg-gradient-to-r from-zimason-50 to-white p-8 rounded-lg shadow mb-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-6">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold">Zimason BusinessHub</h1>
            <p className="text-gray-700 mt-3">Reliable suppliers of chemicals, raw materials and packaging in Aba. Browse products, request orders, and manage your business with trade credit options for verified customers.</p>

            <div className="mt-4 flex gap-3">
              <Link to="/products" className="px-4 py-2 bg-zimason-500 text-white rounded">Browse products</Link>
              <Link to="/order/new" className="px-4 py-2 border rounded">Request an order</Link>
            </div>

            <div className="mt-4 text-sm text-gray-500">Trusted by local manufacturers and traders across Aba and the South-East.</div>
          </div>

          <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Contact</div>
            <div className="font-medium">Zimason Nigeria Limited</div>
            <div className="text-sm text-gray-600">12 Industrial Road, Aba, Abia State</div>
            <div className="text-sm mt-2">Phone: +234 803 000 0000</div>
            <div className="text-sm">Email: info@zimason.ng</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(p => (
            <div key={p.id} className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">{p.category}</div>
              <div className="font-medium mt-1">{p.name}</div>
              <div className="text-sm mt-2">Available: {p.currentStock} {p.unit}</div>
              <div className="mt-2 font-semibold">₦{p.sellingPrice.toLocaleString()}</div>
              <div className="mt-3">
                <Link to={`/products/${p.sku}`} className="text-sm text-zimason-700">View</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
