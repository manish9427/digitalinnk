import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, ProductId } from "./types";

type CartState = CartItem[];
const initialState: CartState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOne(state, action: PayloadAction<ProductId>) {
      const id = action.payload;
      const item = state.find((i) => i.productId === id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ productId: id, quantity: 1 });
      }
    },
    removeOne(state, action: PayloadAction<ProductId>) {
      const id = action.payload;
      const item = state.find((i) => i.productId === id);
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        const idx = state.findIndex((i) => i.productId === id);
        if (idx >= 0) state.splice(idx, 1);
      }
    }
  },
});

export const { addOne, removeOne } =
  cartSlice.actions;
export default cartSlice.reducer;
