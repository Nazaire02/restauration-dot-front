"use client";

import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useElapsedTime } from "@/hooks/useElapsedTime";
import { formatTime } from "@/utils/format";
import type { Order } from "@/type";

interface ServeuseOrderCardProps {
  order: Order;
  onTake: () => void;
  onServe: () => void;
}

export function ServeuseOrderCard({ order, onTake, onServe }: Readonly<ServeuseOrderCardProps>) {
  const elapsed = useElapsedTime(order.createdAt);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card flex flex-col p-5"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h2 className="text-display text-xl font-medium text-foreground">
            Table {order.table} · chaise {order.chair}
          </h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4 shrink-0" aria-hidden />
            {formatTime(order.createdAt)} · {elapsed}
          </p>
        </div>
        <StatusBadge status={order.status} className="shrink-0" />
      </div>

      <ul className="my-5 space-y-1 border-y border-border py-4 text-sm">
        {order.items.map((item) => (
          <li key={item.dishId} className="flex justify-between gap-3">
            <span className="min-w-0 truncate text-foreground">{item.name}</span>
            <span className="shrink-0 text-muted-foreground">× {item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="min-h-11 flex-1 rounded-full"
          disabled={order.status === "en_cours"}
          onClick={onTake}
        >
          Prendre en charge
        </Button>
        <Button className="min-h-11 flex-1 rounded-full" onClick={onServe}>
          Marquer servie
        </Button>
      </div>
    </motion.article>
  );
}
