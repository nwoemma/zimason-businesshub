import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../app/store'
import { addProduct, updateProduct, deleteProduct } from '../../features/products/productsSlice'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

function currency(n: number) {
  return '₦' + n.toLocaleString()
}

export default function InventoryPage() {
  const productsState = useSelector((s: RootState) => s.products)
  const dispatch = useDispatch()
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<any>({})

  const products = productsState.ids
    .map(id => productsState.byId[id])
    .filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))

  function startAdd() {
    setEditing('new')
    setForm({
      sku: '',
      name: '',
      category: '',
      unit: 'pcs',
      currentStock: 0,
      minStockLevel: 0,
      buyingPrice: 0,
      sellingPrice: 0,
      description: ''
    })
  }

  function startEdit(p: any) {
    setEditing(p.id)
    setForm({ ...p })
  }

  function save() {
    if (editing === 'new') {
      dispatch(addProduct({ ...form }))
    } else if (editing) {
      dispatch(updateProduct({ id: editing, changes: form }))
    }
    setEditing(null)
    setForm({})
  }

  function remove(id: string) {
    if (!confirm('Delete product?')) return
    dispatch(deleteProduct(id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="px-3 py-2 border rounded" />
          <button onClick={startAdd} className="px-3 py-2 rounded bg-zimason-500 text-white">Add product</button>
        </div>
      </div>

      {editing && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-3 gap-3">
            <input className="p-2 border" placeholder="SKU" value={form.sku || ''} onChange={e => setForm({...form, sku: e.target.value})} />
            <input className="p-2 border" placeholder="Name" value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} />
            <input className="p-2 border" placeholder="Category" value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})} />
            <input className="p-2 border" placeholder="Unit" value={form.unit || ''} onChange={e => setForm({...form, unit: e.target.value})} />
            <input type="number" className="p-2 border" placeholder="Stock" value={form.currentStock || 0} onChange={e => setForm({...form, currentStock: Number(e.target.value)})} />
            <input type="number" className="p-2 border" placeholder="Min stock" value={form.minStockLevel || 0} onChange={e => setForm({...form, minStockLevel: Number(e.target.value)})} />
            <input type="number" className="p-2 border" placeholder="Buying price" value={form.buyingPrice || 0} onChange={e => setForm({...form, buyingPrice: Number(e.target.value)})} />
            <input type="number" className="p-2 border" placeholder="Selling price" value={form.sellingPrice || 0} onChange={e => setForm({...form, sellingPrice: Number(e.target.value)})} />
            <input className="p-2 border col-span-3" placeholder="Description" value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} />
          </div>

          <div className="mt-3 flex gap-2">
            <button onClick={save} className="px-3 py-2 bg-zimason-500 text-white rounded">Save</button>
            <button onClick={() => { setEditing(null); setForm({}) }} className="px-3 py-2 border rounded">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right">Selling</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">{p.sku}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 text-right">{p.currentStock} {p.unit}</td>
                <td className="px-4 py-3 text-right">{currency(p.sellingPrice)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => startEdit(p)} className="px-2 py-1 border rounded text-sm">Edit</button>
                    <button onClick={() => remove(p.id)} className="px-2 py-1 border rounded text-sm text-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-gray-500">No products found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
