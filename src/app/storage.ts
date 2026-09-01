import seedData from '../data/seed'
import type { RootState } from './store'

const LS_PREFIX = 'zimason:'

export function loadInitialState(): Partial<RootState> | undefined {
  try {
    const products = localStorage.getItem(LS_PREFIX + 'products')
    const customers = localStorage.getItem(LS_PREFIX + 'customers')
    const orders = localStorage.getItem(LS_PREFIX + 'orders')
    if (products && customers && orders) {
      return {
        products: JSON.parse(products),
        customers: JSON.parse(customers),
        orders: JSON.parse(orders)
      }
    }
  } catch (e) {
    // ignore
  }
  // seed
  return {
    products: seedData.productsSlice,
    customers: seedData.customersSlice,
    orders: seedData.ordersSlice
  }
}

export function saveState(state: Partial<RootState>) {
  try {
    if (state.products) {
      localStorage.setItem(LS_PREFIX + 'products', JSON.stringify(state.products))
    }
    if (state.customers) {
      localStorage.setItem(LS_PREFIX + 'customers', JSON.stringify(state.customers))
    }
    if (state.orders) {
      localStorage.setItem(LS_PREFIX + 'orders', JSON.stringify(state.orders))
    }
  } catch (e) {
    console.error('Unable to save state', e)
  }
}
