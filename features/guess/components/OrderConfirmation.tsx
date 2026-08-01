import { motion } from "motion/react";

interface OrderConfirmationProps {
  table: number;
  chair: number;
  onDone: () => void;
}

export function OrderConfirmation({ table, chair, onDone }: Readonly<OrderConfirmationProps>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/95 px-6 text-center backdrop-blur"
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="size-24"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
        <motion.path
          d="M32 52 L45 64 L69 38"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="max-w-sm"
      >
        <h2 className="text-display text-3xl font-semibold text-foreground">Commande envoyée</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Table {table} · chaise {chair}. Une serveuse arrive vers vous très bientôt.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Suivre ma commande
        </button>
      </motion.div>
    </motion.div>
  );
}