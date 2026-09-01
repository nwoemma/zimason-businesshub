import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Customer } from '../../data/models'
import { v4 as uuid } from 'uuid'
import seed from '../../data/seed'

type CustomersState = {
  byId: Record<string, Customer>
  ids: string[]
}

const initialState: CustomersState = (seed as any).customersSlice

const slice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer(state, action: PayloadAction<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>) {
      const id = uuid()
      const now = new Date().toISOString()
      const customer: Customer = { id, ...action.payload, createdAt: now, updatedAt: now }
      state.byId[id] = customer
      state.ids.unshift(id)
    },
    updateCustomer(state, action: PayloadAction<{ id: string; changes: Partial<Customer> }>) {
      const { id, changes } = action.payload
      const existing = state.byId[id]
      if (!existing) return
      state.byId[id] = { ...existing, ...changes, updatedAt: new Date().toISOString() }
    },
    deleteCustomer(state, action: PayloadAction<string>) {
      const id = action.payload
      delete state.byId[id]
      state.ids = state.ids.filter(i => i !== id)
    }
  }
})

export const { addCustomer, updateCustomer, deleteCustomer } = slice.actions
export default slice.reducer
