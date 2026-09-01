import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '../../data/models'
import { v4 as uuid } from 'uuid'
import seed from '../../data/seed'

type OrdersState = {
  byId: Record<string, Order>
  ids: string[]
}

const initialState: OrdersState = (seed as any).ordersSlice

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>) {
      const id = uuid()
      const now = new Date().toISOString()
      const order: Order = { id, ...action.payload, createdAt: now, updatedAt: now }
      state.byId[id] = order
      state.ids.unshift(id)
    },
    updateOrder(state, action: PayloadAction<{ id: string; changes: Partial<Order> }>) {
      const { id, changes } = action.payload
      const existing = state.byId[id]
      if (!existing) return
      state.byId[id] = { ...existing, ...changes, updatedAt: new Date().toISOString() }
    },
    deleteOrder(state, action: PayloadAction<string>) {
      const id = action.payload
      delete state.byId[id]
      state.ids = state.ids.filter(i => i !== id)
    }
  }
})

export const { addOrder, updateOrder, deleteOrder } = slice.actions
export default slice.reducer
