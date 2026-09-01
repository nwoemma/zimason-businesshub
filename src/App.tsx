import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import AdminShell from './components/layout/AdminShell'
import CustomerShell from './components/layout/CustomerShell'
import AdminDashboard from './pages/Admin/Dashboard'
import InventoryPage from './pages/Admin/Inventory'
import CustomerHome from './pages/Customer/Home'
import ProductsPage from './pages/Customer/Products'
import ProductDetail from './pages/Customer/ProductDetail'
import SettingsPage from './pages/Admin/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerShell />}>
        <Route index element={<CustomerHome />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:sku" element={<ProductDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route path="/admin" element={<AdminShell />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<div className="p-8">Page not found — <Link to="/">Go home</Link></div>} />
    </Routes>
  )
}
