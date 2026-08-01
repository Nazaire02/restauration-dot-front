import { cn } from "@/lib/utils";
import { OrderStatus } from "@/type";
import { statusLabels } from "@/utils/format";

const styles: Record<OrderStatus, string> = {
  en_attente: "bg-primary-soft text-primary",
  en_cours: "bg-gold/20 text-gold-foreground",
  servie: "bg-success/15 text-success",
};

export function StatusBadge({ status, className }: Readonly<{ status: OrderStatus; className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        styles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
}