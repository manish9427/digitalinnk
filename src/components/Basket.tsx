import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeOne, addOne, removeProduct } from '../features/cart/cartSlice';
import { selectCartDetailed } from '../features/cart/selectors';
import { formatPounds } from '../utils/currency';

export const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartDetailed);

  return (
    <section>
      <h2>Basket</h2>
      {items.length === 0 && <p>No items yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(it => {
          const itemCost = it.linePricePence;
          return (
            <li key={it.product.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{it.product.name}</strong>
                <div>
                  <button onClick={() => dispatch(removeOne(it.product.id))} aria-label="decrease">-</button>
                  <span style={{ margin: '0 8px' }}>{it.quantity}</span>
                  <button onClick={() => dispatch(addOne(it.product.id))} aria-label="increase">+</button>
                  <button onClick={() => dispatch(removeProduct(it.product.id))} style={{ marginLeft: '8px' }}>
                    Remove
                  </button>
                </div>
              </div>
              <div style={{ fontSize: '14px', color: '#444', marginTop: '4px' }}>
                <div><b>Item price:</b> {formatPounds(it.product.pricePence)} × {it.quantity} = {formatPounds(it.linePricePence)}</div>
                <div><b>Item cost:</b> {formatPounds(itemCost)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
