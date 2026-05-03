import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,

      addItem: (product) => {
        const { items, restaurantId } = get();
        
        // If adding from a different restaurant, clear cart first
        if (restaurantId && restaurantId !== product.restaurantId) {
          if (!confirm("Adding this item will clear your cart from the previous restaurant. Continue?")) {
            return;
          }
          set({ items: [], restaurantId: product.restaurantId });
        }

        const existingItem = items.find((item) => item.productId === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: Math.random().toString(36).substring(7),
                productId: product.id,
                product,
                quantity: 1,
              },
            ],
            restaurantId: product.restaurantId,
          });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        const newItems = items.filter((item) => item.productId !== productId);
        set({
          items: newItems,
          restaurantId: newItems.length === 0 ? null : get().restaurantId,
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [], restaurantId: null }),

      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

      subtotal: () => get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);
