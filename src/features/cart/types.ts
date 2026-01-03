export type ProductId = 'bread' | 'milk' | 'cheese' | 'soup' | 'butter';

export type Product = {
  id: ProductId;
  name: string;
  pricePence: number;
};

export type CartItem = {
  productId: ProductId;
  quantity: number;
};


export const PRODUCTS: Record<ProductId, Product> = {
  bread:  { id: 'bread',  name: 'Bread',  pricePence: 110 },
  milk:   { id: 'milk',   name: 'Milk',   pricePence:  50 },
  cheese: { id: 'cheese', name: 'Cheese', pricePence:  90 },
  soup:   { id: 'soup',   name: 'Soup',   pricePence:  60 },
  butter: { id: 'butter', name: 'Butter', pricePence: 120 },
};
