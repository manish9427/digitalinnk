import React from "react";
import { useAppDispatch } from "../app/hooks";
import { addOne } from "../features/cart/cartSlice";
import { PRODUCTS } from "../features/cart/types";

const formatPounds = (pence: number) => `£${(pence / 100).toFixed(2)}`;

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = Object.values(PRODUCTS);

  return (
    <div>
      <h2>Products</h2>
      <hr />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((p) => (
          <li
            key={p.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "8px",
            }}
          >
            <span style={{ width: 140 }}>{p.name}</span>
            <span style={{ width: 80 }}>{formatPounds(p.pricePence)}</span>
            <button onClick={() => dispatch(addOne(p.id))}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
