import React from 'react'
import seed from '../../data/seed'

export default function SettingsPage() {
  function resetDemo() {
    if (!confirm('Reset demo data? This will replace local data with seeded demo data.')) return
    try {
      localStorage.clear()
      // write seeds
      localStorage.setItem('zimason:products', JSON.stringify(seed.productsSlice))
      localStorage.setItem('zimason:customers', JSON.stringify(seed.customersSlice))
      localStorage.setItem('zimason:orders', JSON.stringify(seed.ordersSlice))
      alert('Demo data reset. Reloading...')
      location.reload()
    } catch (e) {
      alert('Unable to reset demo data: ' + String(e))
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium">Demo data</h3>
        <p className="text-sm text-gray-600">Reset or reseed the demo data used by this frontend-only prototype.</p>
        <div className="mt-3">
          <button onClick={resetDemo} className="px-4 py-2 rounded bg-red-600 text-white">Reset demo data</button>
        </div>
      </div>
    </div>
  )
}
