import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addOne, removeOne } from "../features/cart/cartSlice";
import { PRODUCTS } from "../features/cart/types";
import { formatPounds, calculateLineSaving } from "../utils/cart";

export const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart);

  const hasItems = items.length > 0;

  return (
    <section>
      <h2>Basket</h2>
      <hr />
      {!hasItems && <p>No items yet.</p>}

      {hasItems && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((it) => {
            const product = PRODUCTS[it.productId];
            const linePrice = product.pricePence * it.quantity;

            const lineSaving = calculateLineSaving(items, product.id as keyof typeof PRODUCTS);

            return (
              <li
                key={product.id}
                style={{ borderBottom: "1px solid #eee", padding: "8px 0" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>{product.name}</strong>
                  <span style={{ width: 80 }}>
                    {formatPounds(product.pricePence)}
                  </span>
                  <div>
                    <button onClick={() => dispatch(removeOne(product.id))}>-</button>
                    <span style={{ margin: "0 8px" }}>{it.quantity}</span>
                    <button onClick={() => dispatch(addOne(product.id))}>+</button>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#444",
                    marginTop: "4px",
                    textAlign: "right",
                  }}
                >
                  <div>
                    <b>Item price:</b> {formatPounds(product.pricePence)} × {it.quantity} ={" "}
                    {formatPounds(linePrice)}
                  </div>
                  {lineSaving > 0 && (
                    <div style={{ marginTop: "4px", color: "red" }}>
                      <b>Savings:</b> {formatPounds(lineSaving)}
                    </div>
                  )}
                  <div style={{ marginTop: "4px" }}>
                    <b>Item cost:</b> {formatPounds(linePrice - lineSaving)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
