import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function AdminShell() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-72 bg-white border-r">
        <div className="p-4 border-b">
          <Link to="/admin" className="text-lg font-semibold text-zimason-700">Zimason BusinessHub</Link>
        </div>
        <nav className="p-4 space-y-1">
          <Link to="/admin/dashboard" className="block p-2 rounded hover:bg-zimason-50">Dashboard</Link>
          <Link to="/admin/inventory" className="block p-2 rounded hover:bg-zimason-50">Inventory</Link>
          <Link to="/admin/settings" className="block p-2 rounded hover:bg-zimason-50">Settings</Link>
        </nav>
      </aside>

      <main className="flex-1">
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded hover:bg-gray-100"><Bars3Icon className="w-6 h-6 text-gray-600" /></button>
            <h1 className="text-xl font-medium">Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700">Staff</div>
          </div>
        </header>

        <section className="p-6">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
