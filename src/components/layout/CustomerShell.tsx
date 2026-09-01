import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function CustomerShell() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link to="/" className="text-lg font-semibold text-zimason-700">Zimason BusinessHub</Link>
            <div className="text-xs text-gray-500">Chemicals and Raw Materials — Aba, Nigeria</div>
          </div>
          <nav className="space-x-4">
            <Link to="/products" className="text-gray-700 hover:text-zimason-700">Products</Link>
            <Link to="/my-orders" className="text-gray-700 hover:text-zimason-700">My Orders</Link>
            <Link to="/account" className="text-gray-700 hover:text-zimason-700">Account</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
