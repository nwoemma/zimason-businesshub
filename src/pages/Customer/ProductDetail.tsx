import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'

export default function ProductDetail() {
  const { sku } = useParams()
  const productsState = useSelector((s: RootState) => s.products)
  const product = productsState.ids.map(id => productsState.byId[id]).find(p => p.sku === sku)

  if (!product) return <div className="p-6">Product not found</div>

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex items-start gap-6">
        <div className="w-56 h-40 bg-gray-100 rounded" />
        <div>
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <div className="text-sm text-gray-600">{product.sku} • {product.category}</div>
          <div className="mt-3 text-lg font-semibold">₦{product.sellingPrice.toLocaleString()}</div>
          <div className="mt-3"><strong>Availability:</strong> {product.currentStock} {product.unit}</div>
          <div className="mt-4 text-gray-700">{product.description}</div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-zimason-500 text-white rounded">Request quote / Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}
