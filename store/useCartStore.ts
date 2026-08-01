import { OrderItem, Dish } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: OrderItem[];
  add: (dish: Dish) => void;
  increment: (dishId: string) => void;
  decrement: (dishId: string) => void;
  remove: (dishId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (dish) =>
        set((state) => {
          const existing = state.items.find((i) => i.dishId === dish.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.dishId === dish.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return {
            items: [...state.items, { dishId: dish.id, name: dish.name, quantity: 1 }],
          };
        }),
      increment: (dishId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.dishId === dishId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),
      decrement: (dishId) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.dishId === dishId ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        })),
      remove: (dishId) =>
        set((state) => ({ items: state.items.filter((i) => i.dishId !== dishId) })),
      clear: () => set({ items: [] }),
    }),
    { name: "dot-cart" },
  ),
);

export const selectCartCount = (items: OrderItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);