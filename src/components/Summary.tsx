import React from "react";
import { useAppSelector } from "../app/hooks";
import { PRODUCTS } from "../features/cart/types";

const formatPounds = (pence: number) => `£${(pence / 100).toFixed(2)}`;

export const Summary: React.FC = () => {
  const cart = useAppSelector((state) => state.cart);

  const subtotal = cart.reduce(
    (sum, item) => sum + PRODUCTS[item.productId].pricePence * item.quantity,
    0
  );

  let savings = 0;

  const qty = (id: keyof typeof PRODUCTS) =>
    cart.find((i) => i.productId === id)?.quantity ?? 0;

  const cheeseQty = qty("cheese");
  if (cheeseQty >= 2) {
    savings += Math.floor(cheeseQty / 2) * PRODUCTS.cheese.pricePence;
  }

  const soupQty = qty("soup");
  const breadQty = qty("bread");
  const eligibleBread = Math.min(soupQty, breadQty);
  if (eligibleBread > 0) {
    savings += eligibleBread * Math.round(PRODUCTS.bread.pricePence / 2);
  }

  const butterQty = qty("butter");
  if (butterQty > 0) {
    savings += butterQty * Math.round(PRODUCTS.butter.pricePence / 3);
  }

  const total = Math.max(0, subtotal - savings);

  return (
    <section
    >
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        {" "}
        <span>Sub Total:</span> <span>{formatPounds(subtotal)}</span>{" "}
      </div>{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        {" "}
        <span>
          Savings:
        </span>{" "}
        <span>{formatPounds(savings)}</span>{" "}
      </div>{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        {" "}
        <span>Total Amount:</span> <span>{formatPounds(total)}</span>{" "}
      </div>{" "}
    </section>
  );
};
