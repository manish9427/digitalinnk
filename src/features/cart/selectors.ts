import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { PRODUCTS } from './types';

export const selectCart = (state: RootState) => state.cart;

export const selectCartDetailed = createSelector([selectCart], (items) =>
  items.map(i => ({
    product: PRODUCTS[i.productId],
    quantity: i.quantity,
    linePricePence: i.quantity * PRODUCTS[i.productId].pricePence, // before savings
  }))
);

export const selectSubtotalPence = createSelector([selectCartDetailed], (detailed) =>
  detailed.reduce((acc, d) => acc + d.linePricePence, 0)
);

export const selectTotalPence = createSelector([selectSubtotalPence], (sub) => sub);
