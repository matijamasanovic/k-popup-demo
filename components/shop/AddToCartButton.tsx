"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/CartContext";

interface Props {
  product: {
    id: string;
    name_en: string;
    name_sr: string;
    price: number;
    discount_percent: number;
    images?: string[] | null;
    in_stock: boolean;
    stock_quantity: number;
  };
}

export function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product as any, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (!product.in_stock) {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center gap-1.5 bg-muted text-muted-foreground px-3 py-2 rounded-xl text-xs font-medium cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
        added
          ? "bg-green-500 text-white"
          : "bg-primary hover:bg-primary/90 text-primary-foreground"
      }`}
    >
      {added ? (
        <>
          <Check className="w-3 h-3" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="w-3 h-3" />
          Add to Cart
        </>
      )}
    </button>
  );
}
