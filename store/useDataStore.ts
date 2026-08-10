import { initialCategories, initialDishes } from "@/mock-data/menu.mock";
import { initialOrders } from "@/mock-data/orders.mock";
import { initialWaitresses } from "@/mock-data/staff.mock";
import { Category, Dish, Order, OrderItem, OrderStatus, Waitress } from "@/type";
import { create } from "zustand";

interface DataState {
  categories: Category[];
  dishes: Dish[];
  waitresses: Waitress[];
  orders: Order[];

  createOrder: (input: { table: number; chair: number; items: OrderItem[] }) => Order;
  pushOrder: (order: Order) => void;
  setOrderStatus: (orderId: string, status: OrderStatus, waitressId?: string | null) => void;

  addDish: (dish: Omit<Dish, "id">) => void;
  updateDish: (id: string, patch: Partial<Omit<Dish, "id">>) => void;
  removeDish: (id: string) => void;

  addCategory: (category: Omit<Category, "id">) => void;
  removeCategory: (id: string) => void;

  addWaitress: (waitress: Omit<Waitress, "id" | "online">) => void;
  updateWaitress: (id: string, patch: Partial<Omit<Waitress, "id">>) => void;
  removeWaitress: (id: string) => void;
}

const uid = (prefix: string) => `${prefix}${Math.random().toString(36).slice(2, 9)}`;

function assignWaitress(waitresses: Waitress[], table: number): string | null {
  return waitresses.find((w) => w.tables.includes(table))?.id ?? null;
}

export const useDataStore = create<DataState>()((set, get) => ({
  categories: initialCategories,
  dishes: initialDishes,
  waitresses: initialWaitresses,
  orders: initialOrders,

  createOrder: ({ table, chair, items }) => {
    const order: Order = {
      id: uid("o"),
      table,
      chair,
      items,
      status: "en_attente",
      createdAt: Date.now(),
      waitressId: null,
    };
    set((state) => ({ orders: [order, ...state.orders] }));
    return order;
  },

  pushOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),

  setOrderStatus: (orderId, status, waitressId) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              waitressId:
                waitressId !== undefined
                  ? waitressId
                  : (o.waitressId ?? assignWaitress(get().waitresses, o.table)),
            }
          : o,
      ),
    })),

  addDish: (dish) => set((state) => ({ dishes: [...state.dishes, { ...dish, id: uid("d") }] })),
  updateDish: (id, patch) =>
    set((state) => ({
      dishes: state.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    })),
  removeDish: (id) => set((state) => ({ dishes: state.dishes.filter((d) => d.id !== id) })),

  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, { ...category, id: uid("c") }] })),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),

  addWaitress: (waitress) =>
    set((state) => ({
      waitresses: [...state.waitresses, { ...waitress, id: uid("w"), online: false }],
    })),
  updateWaitress: (id, patch) =>
    set((state) => ({
      waitresses: state.waitresses.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    })),
  removeWaitress: (id) =>
    set((state) => ({ waitresses: state.waitresses.filter((w) => w.id !== id) })),
}));