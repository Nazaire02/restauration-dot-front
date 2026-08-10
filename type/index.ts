export type Role = "admin" | "serveuse";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  available: boolean;
}

export interface Waitress {
  id: string;
  name: string;
  email: string;
  tables: number[];
  online: boolean;
}

export type OrderStatus = "en_attente" | "en_cours" | "servie";

export interface OrderItem {
  dishId: string;
  name: string;
  quantity: number;
}

export interface Order {
  id: string;
  table: number;
  chair: number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: number;
  waitressId: string | null;
}

export interface GuestSeat {
  table: number;
  chair: number;
}