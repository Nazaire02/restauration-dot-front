import { StatusBadge } from "@/components/common/StatusBadge";
import { formatTime } from "@/utils/format";
import { Order } from "../types/order";

interface LatestOrdersProps {
  orders: Order[];
  limit?: number;
}

function OrderListItem({ order }: Readonly<{ order: Order }>) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm text-foreground">
          Table {order.table} · chaise {order.chair}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {formatTime(order.createdAt)} · {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
        </p>
      </div>
      <StatusBadge status={order.status} className="shrink-0" />
    </li>
  );
}

export function LatestOrders({ orders, limit = 6 }: Readonly<LatestOrdersProps>) {
  return (
    <section className="surface-card p-6 mt-4">
      <h2 className="text-display text-2xl font-medium text-foreground">Dernières commandes</h2>
      <ul className="mt-5 divide-y divide-border">
        {orders.map((order, index) => (
          <OrderListItem key={index + 1} order={order} />
        ))}
      </ul>
    </section>
  );
}
