import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectTotalPence } from '../features/cart/selectors';
import { formatPounds } from '../utils/currency';

export const Summary: React.FC = () => {
  const total = useAppSelector(selectTotalPence);

  return (
    <section>
      <h2><b>Total Amount:</b> {formatPounds(total)}</h2>
    </section>
  );
};
