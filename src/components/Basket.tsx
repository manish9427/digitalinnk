import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addOne, removeOne, removeProduct, clearCart } from "../features/cart/cartSlice";
import { PRODUCTS } from "../features/cart/types";

const formatPounds = (pence: number) => `£${(pence / 100).toFixed(2)}`;

export const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart);

  const hasItems = items.length > 0;

  const qty = (id: keyof typeof PRODUCTS) =>
    items.find((i) => i.productId === id)?.quantity ?? 0;

  return (
    <section>
      <h2>Your basket</h2>
      {!hasItems && <p>No items yet.</p>}

      {hasItems && (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((it) => {
              const product = PRODUCTS[it.productId];
              const linePrice = product.pricePence * it.quantity;

              const lineSaving = (() => {
                switch (product.id) {
                  case "cheese":
                    return Math.floor(it.quantity / 2) * product.pricePence;
                  case "bread": {
                    const eligibleBread = Math.min(qty("soup"), qty("bread"));
                    return eligibleBread * Math.round(product.pricePence / 2);
                  }
                  case "butter":
                    return it.quantity * Math.round(product.pricePence / 3);
                  default:
                    return 0;
                }
              })();

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
                    <div>
                      <button
                        onClick={() => dispatch(removeOne(product.id))}
                        aria-label="decrease"
                      >
                        -
                      </button>
                      <span style={{ margin: "0 8px" }}>{it.quantity}</span>
                      <button
                        onClick={() => dispatch(addOne(product.id))}
                        aria-label="increase"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeProduct(product.id))}
                        style={{ marginLeft: "8px" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: "14px", color: "#444", marginTop: "4px" }}>
                    <div>
                      <b>Item price:</b> {formatPounds(product.pricePence)} ×{" "}
                      {it.quantity} = {formatPounds(linePrice)}
                    </div>
                    {lineSaving > 0 && (
                      <div style={{ marginTop: "4px", color: "green" }}>
                        <b>You saved:</b> {formatPounds(lineSaving)}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <button onClick={() => dispatch(clearCart())} style={{ marginTop: "8px" }}>
            Clear cart
          </button>
        </>
      )}
    </section>
  );
};
