import React from "react";
import { useAppSelector } from "../app/hooks";
import { PRODUCTS } from "../features/cart/types";
import { formatPounds, calculateSavings } from "../utils/cart";

export const Summary: React.FC = () => {
  const cart = useAppSelector((state) => state.cart);

  const subtotal = cart.reduce(
    (sum, item) => sum + PRODUCTS[item.productId].pricePence * item.quantity,
    0
  );

  const savings = calculateSavings(cart);
  const total = Math.max(0, subtotal - savings);

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span>Sub Total:</span> <span>{formatPounds(subtotal)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span>Savings:</span> <span>{formatPounds(savings)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span>Total Amount:</span> <span>{formatPounds(total)}</span>
      </div>
    </section>
  );
};
