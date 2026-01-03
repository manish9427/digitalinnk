import type { CartItem, OfferSaving } from "../features/cart/types";
import { PRODUCTS } from "../features/cart/types";

export type OfferResult = {
  savings: OfferSaving[];
  itemSavingsPence: Partial<Record<string, number>>;
  totalSavingPence: number;
};

export const calculateOffers = (items: CartItem[]): OfferResult => {
  const qty = (id: keyof typeof PRODUCTS) =>
    items.find((i) => i.productId === id)?.quantity ?? 0;

  const savings: OfferSaving[] = [];
  const itemSavingsPence: Partial<Record<string, number>> = {};

  const cheeseQty = qty("cheese");
  if (cheeseQty >= 2) {
    const freeCheese = Math.floor(cheeseQty / 2);
    const save = freeCheese * PRODUCTS.cheese.pricePence;
    if (save > 0) {
      savings.push({
        id: "cheese-bogo",
        description: "Buy 1 Get 1 Free on Cheese",
        savingPence: save,
      });
      itemSavingsPence["cheese"] = (itemSavingsPence["cheese"] ?? 0) + save;
    }
  }

  const soupQty = qty("soup");
  const breadQty = qty("bread");
  const eligibleBread = Math.min(soupQty, breadQty);
  if (eligibleBread > 0) {
    const halfBreadSaving = Math.round(PRODUCTS.bread.pricePence / 2);
    const save = eligibleBread * halfBreadSaving;
    savings.push({
      id: "soup-bread-half",
      description: "Half Price Bread with Soup",
      savingPence: save,
    });
    itemSavingsPence["bread"] = (itemSavingsPence["bread"] ?? 0) + save;
  }

  const butterQty = qty("butter");
  if (butterQty > 0) {
    const perButterSaving = Math.round(PRODUCTS.butter.pricePence / 3);
    const save = butterQty * perButterSaving;
    savings.push({
      id: "butter-third-off",
      description: "One third off Butter",
      savingPence: save,
    });
    itemSavingsPence["butter"] = (itemSavingsPence["butter"] ?? 0) + save;
  }

  const totalSavingPence = savings.reduce((acc, s) => acc + s.savingPence, 0);

  return { savings, itemSavingsPence, totalSavingPence };
};
