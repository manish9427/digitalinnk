import React from "react";
import { useAppSelector } from "../app/hooks";
import {
  selectSubtotalPence,
  selectOfferResult,
  selectTotalSavingsPence,
  selectTotalPence,
} from "../features/cart/selectors";
import { formatPounds } from "../utils/currency";

export const Summary: React.FC = () => {
  const subtotal = useAppSelector(selectSubtotalPence);
  const offers = useAppSelector(selectOfferResult);
  const totalSavings = useAppSelector(selectTotalSavingsPence);
  const total = useAppSelector(selectTotalPence);

  return (
    <section>
      <h2>Summary</h2>
      <div>
        <b>Sub Total:</b> {formatPounds(subtotal)}
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <b>Special offers:</b>
        {offers.savings.length === 0 ? (
          <div style={{ color: "#666" }}>No offers applied</div>
        ) : (
          <ul style={{ marginTop: "0.25rem" }}>
            {offers.savings.map((s) => (
              <li key={s.id} style={{ color: "#c0392b" }}>
                {s.description}: -{formatPounds(s.savingPence)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <b>Savings:</b> {formatPounds(totalSavings)}
      </div>
      <div style={{ marginTop: "0.5rem", fontWeight: 700 }}>
        <b>Total Amount:</b> {formatPounds(total)}
      </div>
    </section>
  );
};
