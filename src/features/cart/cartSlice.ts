import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, ProductId } from './types';

type CartState = CartItem[];

const initialState: CartState = [];

const upsert = (state: CartState, productId: ProductId, delta: number) => {
  const idx = state.findIndex(i => i.productId === productId);
  if (idx >= 0) {
    const qty = state[idx].quantity + delta;
    if (qty <= 0) state.splice(idx, 1);
    else state[idx].quantity = qty;
  } else if (delta > 0) {
    state.push({ productId, quantity: delta });
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOne(state, action: PayloadAction<ProductId>) {
      upsert(state, action.payload, 1);
    },
    removeOne(state, action: PayloadAction<ProductId>) {
      upsert(state, action.payload, -1);
    },
    setQuantity(state, action: PayloadAction<{ productId: ProductId; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const idx = state.findIndex(i => i.productId === productId);
      if (quantity <= 0) {
        if (idx >= 0) state.splice(idx, 1);
      } else if (idx >= 0) {
        state[idx].quantity = quantity;
      } else {
        state.push({ productId, quantity });
      }
    },
    removeProduct(state, action: PayloadAction<ProductId>) {
      const idx = state.findIndex(i => i.productId === action.payload);
      if (idx >= 0) state.splice(idx, 1);
    },
    clearCart() {
      return [];
    },
  },
});

export const { addOne, removeOne, setQuantity, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
