import { PRODUCTS } from "../features/cart/types";

export const formatPounds = (pence: number) => `£${(pence / 100).toFixed(2)}`;

export const calculateSavings = (
  cart: { productId: keyof typeof PRODUCTS; quantity: number }[]
) => {
  let savings = 0;

  const qty = (id: keyof typeof PRODUCTS) =>
    cart.find((i) => i.productId === id)?.quantity ?? 0;

  const cheeseQty = qty("cheese");
  savings += Math.floor(cheeseQty / 2) * PRODUCTS.cheese.pricePence;

  const soupQty = qty("soup");
  const breadQty = qty("bread");
  savings += Math.min(soupQty, breadQty) * Math.round(PRODUCTS.bread.pricePence / 2);

  const butterQty = qty("butter");
  savings += butterQty * Math.round(PRODUCTS.butter.pricePence / 3);

  return savings;
};

export const calculateLineSaving = (
  cart: { productId: keyof typeof PRODUCTS; quantity: number }[],
  productId: keyof typeof PRODUCTS
) => {
  const qty = (id: keyof typeof PRODUCTS) =>
    cart.find((i) => i.productId === id)?.quantity ?? 0;

  switch (productId) {
    case "cheese":
      return Math.floor(qty("cheese") / 2) * PRODUCTS.cheese.pricePence;
    case "bread": {
      const eligibleBread = Math.min(qty("soup"), qty("bread"));
      return eligibleBread * Math.round(PRODUCTS.bread.pricePence / 2);
    }
    case "butter":
      return qty("butter") * Math.round(PRODUCTS.butter.pricePence / 3);
    default:
      return 0;
  }
};
