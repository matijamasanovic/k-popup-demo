export type Category = {
  id: string;
  created_at: string;
  name_sr: string;
  name_en: string;
  slug: string;
  description_sr: string | null;
  description_en: string | null;
  image: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  created_at: string;
  updated_at: string;
  name_sr: string;
  name_en: string;
  description_sr: string | null;
  description_en: string | null;
  price: number;
  discount_percent: number;
  category_id: string | null;
  category?: Category;
  in_stock: boolean;
  featured: boolean;
  images: string[];
  stock_quantity: number; // ← DODAJ OVO
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type PaymentMethod = "cash_on_delivery" | "card" | "bank_transfer";

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name_en: string;
  product_name_sr: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export type Order = {
  id: string;
  created_at: string;
  updated_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  address_street: string;
  address_city: string;
  address_postal_code: string | null;
  address_country: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total: number;
  customer_note: string | null;
  admin_note: string | null;
  order_items?: OrderItem[];
};

export type BlogPost = {
  id: string;
  created_at: string;
  updated_at: string;
  title_en: string;
  title_sr: string;
  slug: string;
  excerpt_en: string | null;
  excerpt_sr: string | null;
  content_en: string | null;
  content_sr: string | null;
  cover_image: string | null;
  published: boolean;
  featured: boolean;
  author: string;
};
