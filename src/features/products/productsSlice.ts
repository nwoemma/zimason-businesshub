import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../data/models'
import { v4 as uuid } from 'uuid'
import seed from '../../data/seed'

type ProductsState = {
  byId: Record<string, Product>
  ids: string[]
}

const initialState: ProductsState = (seed as any).productsSlice

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) {
      const id = uuid()
      const now = new Date().toISOString()
      const product: Product = {
        id,
        ...action.payload,
        createdAt: now,
        updatedAt: now
      }
      state.byId[id] = product
      state.ids.unshift(id)
    },
    updateProduct(state, action: PayloadAction<{ id: string; changes: Partial<Product> }>) {
      const { id, changes } = action.payload
      const existing = state.byId[id]
      if (!existing) return
      state.byId[id] = { ...existing, ...changes, updatedAt: new Date().toISOString() }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      const id = action.payload
      delete state.byId[id]
      state.ids = state.ids.filter(i => i !== id)
    },
    adjustStock(state, action: PayloadAction<{ id: string; delta: number }>) {
      const { id, delta } = action.payload
      const p = state.byId[id]
      if (!p) return
      p.currentStock = Math.max(0, p.currentStock + delta)
      p.updatedAt = new Date().toISOString()
    }
  }
})

export const { addProduct, updateProduct, deleteProduct, adjustStock } = slice.actions
export default slice.reducer
