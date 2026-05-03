import { UserRole, OrderStatus } from "@prisma/client";

export interface User {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  role: UserRole;
  createdAt: Date;
}

export interface Restaurant {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  bannerImage?: string | null;
  address: string;
  city: string;
  rating: number;
  deliveryFee: number;
  minOrder: number;
  deliveryTime: number;
  isOpen: boolean;
  deliveryRadius: number;
  ownerId: string;
}

export interface Category {
  id: string;
  name: string;
  image?: string | null;
  restaurantId: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  isAvailable: boolean;
  inventory: number;
  categoryId: string;
  restaurantId: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  restaurantId: string;
  restaurant?: Restaurant;
  status: OrderStatus;
  totalAmount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  addressId: string;
  createdAt: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  street: string;
  city: string;
  state?: string | null;
  zipCode: string;
  isDefault: boolean;
}

export interface Stats {
  todayRevenue: number;
  ordersCount: number;
  activeUsers?: number;
  commissionRevenue?: number;
}
