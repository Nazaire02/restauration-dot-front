import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  delay?: number;
}

export function StatCard({ label, value, icon: Icon, delay = 0 }: Readonly<StatCardProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5"
    >
      <div className="min-w-0">
        <p className="truncate text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="text-display mt-2 text-3xl font-semibold text-foreground">{value}</p>
      </div>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
    </motion.div>
  );
}