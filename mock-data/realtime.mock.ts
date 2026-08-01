import { Order } from "@/type";
import { initialDishes } from "./menu.mock";

type RealtimeEvent = "order:new";
type Handler = (order: Order) => void;

/**
 * Mock temps réel : même surface qu'un client Socket.IO (`on` / `off` / `emit`),
 * de sorte qu'un vrai socket puisse le remplacer sans toucher aux composants.
 */
class MockRealtimeClient {
  private handlers = new Map<RealtimeEvent, Set<Handler>>();
  private timer: ReturnType<typeof setInterval> | null = null;

  on(event: RealtimeEvent, handler: Handler) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    this.ensureRunning();
    return () => this.off(event, handler);
  }

  off(event: RealtimeEvent, handler: Handler) {
    this.handlers.get(event)?.delete(handler);
    if (![...this.handlers.values()].some((set) => set.size > 0)) this.stop();
  }

  emit(event: RealtimeEvent, order: Order) {
    this.handlers.get(event)?.forEach((handler) => handler(order));
  }

  private ensureRunning() {
    if (this.timer) return;
    this.timer = setInterval(() => this.emit("order:new", randomOrder()), 25_000);
  }

  private stop() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }
}

function randomOrder(): Order {
  const available = initialDishes.filter((d) => d.available);
  const dish = available[Math.floor(Math.random() * available.length)];
  return {
    id: `o${Math.random().toString(36).slice(2, 9)}`,
    table: 1 + Math.floor(Math.random() * 11),
    chair: 1 + Math.floor(Math.random() * 8),
    items: [{ dishId: dish.id, name: dish.name, quantity: 1 + Math.floor(Math.random() * 2) }],
    status: "en_attente",
    createdAt: Date.now(),
    waitressId: null,
  };
}

export const realtimeClient = new MockRealtimeClient();