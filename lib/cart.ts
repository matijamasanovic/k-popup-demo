import { Product } from "./types";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

export function calculateCart(items: CartItem[]): CartState {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price =
      item.product.discount_percent > 0
        ? item.product.price -
          (item.product.price * item.product.discount_percent) / 100
        : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return { items, totalItems, totalPrice };
}
