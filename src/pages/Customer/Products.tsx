import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { Link } from 'react-router-dom'

export default function ProductsPage() {
  const productsState = useSelector((s: RootState) => s.products)
  const [q, setQ] = useState('')
  const products = productsState.ids
    .map(id => productsState.byId[id])
    .filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" className="px-3 py-2 border rounded" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">{p.category}</div>
            <div className="font-medium mt-1">{p.name}</div>
            <div className="text-sm mt-2">Available: {p.currentStock} {p.unit}</div>
            <div className="mt-2 font-semibold">₦{p.sellingPrice.toLocaleString()}</div>
            <div className="mt-3">
              <Link to={`/products/${p.sku}`} className="text-sm text-zimason-700">View details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
