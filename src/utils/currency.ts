export const formatPounds = (pence: number): string => {
  const sign = pence < 0 ? "-" : "";
  const abs = Math.abs(pence);
  const pounds = (abs / 100).toFixed(2);
  return `${sign}£${pounds}`;
};
