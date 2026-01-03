import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeOne, addOne, removeProduct } from "../features/cart/cartSlice";
import {
  selectCartDetailed,
  selectItemSavingsMap,
} from "../features/cart/selectors";
import { formatPounds } from "../utils/currency";

export const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartDetailed);
  const itemSavings = useAppSelector(selectItemSavingsMap);

  return (
    <section>
      <h2>Your basket</h2>
      {items.length === 0 && <p>No items yet.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((it) => {
          const savings = itemSavings[it.product.id] ?? 0;
          const itemCost = Math.max(0, it.linePricePence - savings);
          return (
            <li
              key={it.product.id}
              style={{ borderBottom: "1px solid #eee", padding: "0.5rem 0" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>{it.product.name}</strong>
                <div>
                  <button
                    onClick={() => dispatch(removeOne(it.product.id))}
                    aria-label="decrease"
                  >
                    -
                  </button>
                  <span style={{ margin: "0 0.5rem" }}>{it.quantity}</span>
                  <button
                    onClick={() => dispatch(addOne(it.product.id))}
                    aria-label="increase"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeProduct(it.product.id))}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#444",
                  marginTop: "0.25rem",
                }}
              >
                <div>
                  <b>Item price:</b> {formatPounds(it.product.pricePence)} ×{" "}
                  {it.quantity} = {formatPounds(it.linePricePence)}
                </div>
                {savings > 0 && (
                  <div style={{ color: "#c0392b" }}>
                    <b>Savings:</b> -{formatPounds(savings)}
                  </div>
                )}
                <div>
                  <b>Item cost:</b> {formatPounds(itemCost)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
