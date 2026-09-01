import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import customersReducer from '../features/customers/customersSlice'
import ordersReducer from '../features/orders/ordersSlice'
import { loadInitialState, saveState } from './storage'

const preloadedState = loadInitialState()

export const store = configureStore({
  reducer: {
    products: productsReducer,
    customers: customersReducer,
    orders: ordersReducer
  },
  preloadedState
})

// Persist simple slices to localStorage on every change (debounced simple)
let timeout = 0
store.subscribe(() => {
  clearTimeout(timeout)
  timeout = window.setTimeout(() => {
    saveState({
      products: store.getState().products,
      customers: store.getState().customers,
      orders: store.getState().orders
    })
  }, 300)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
