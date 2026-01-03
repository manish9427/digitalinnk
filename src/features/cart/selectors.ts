import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { PRODUCTS } from "./types";
import { calculateOffers } from "../../utils/offers";

export const selectCart = (state: RootState) => state.cart;

export const selectCartDetailed = createSelector([selectCart], (items) =>
  items.map((i) => ({
    product: PRODUCTS[i.productId],
    quantity: i.quantity,
    linePricePence: i.quantity * PRODUCTS[i.productId].pricePence,
  }))
);

export const selectSubtotalPence = createSelector(
  [selectCartDetailed],
  (detailed) => detailed.reduce((acc, d) => acc + d.linePricePence, 0)
);

export const selectOfferResult = createSelector([selectCart], (items) =>
  calculateOffers(items)
);

export const selectTotalSavingsPence = createSelector(
  [selectOfferResult],
  (r) => r.totalSavingPence
);

export const selectTotalPence = createSelector(
  [selectSubtotalPence, selectTotalSavingsPence],
  (sub, save) => Math.max(0, sub - save)
);

export const selectItemSavingsMap = createSelector(
  [selectOfferResult],
  (r) => r.itemSavingsPence
);
