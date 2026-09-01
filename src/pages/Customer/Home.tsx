import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'

export default function CustomerHome() {
  const productsState = useSelector((s: RootState) => s.products)
  const featured = productsState.ids.slice(0, 4).map(id => productsState.byId[id])

  return (
    <div>
      <section className="bg-white p-6 rounded shadow mb-6">
        <h1 className="text-2xl font-semibold">Welcome to Zimason BusinessHub</h1>
        <p className="text-gray-600 mt-2">We supply quality chemicals, raw materials and packaging to businesses in Aba and beyond.</p>
        <div className="mt-4">
          <Link to="/products" className="px-4 py-2 bg-zimason-500 text-white rounded">Browse products</Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Featured Products</h2>
        <div className="grid grid-cols-4 gap-4">
          {featured.map(p => (
            <div key={p.id} className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">{p.category}</div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm mt-2">₦{p.sellingPrice.toLocaleString()}</div>
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
