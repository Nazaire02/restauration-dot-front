import { motion } from "motion/react";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@/type";

interface OrderReviewModalProps {
  table: number;
  chair: number;
  items: OrderItem[];
  onCancel: () => void;
  onConfirm: () => void;
}

export function OrderReviewModal({
  table,
  chair,
  items,
  onCancel,
  onConfirm,
}: Readonly<OrderReviewModalProps>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 px-4 py-6 backdrop-blur"
    >
      <motion.div
        initial={{ y: 16, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 12, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
        className="w-full max-w-lg rounded-[2rem] border border-border bg-background p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Avant validation</p>
            <h2 id="review-title" className="mt-2 text-display text-2xl font-semibold text-foreground">
              Vérifiez votre choix
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Votre commande sera envoyée à la table {table} · chaise {chair}.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Fermer la prévisualisation"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">Résumé de la commande</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
              <CheckCircle2 className="size-4" aria-hidden />
              <span>Prêt à envoyer</span>
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={item.dishId}
                className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" className="min-h-11 rounded-full" onClick={onCancel}>
            Modifier
          </Button>
          <Button type="button" className="min-h-11 rounded-full" onClick={onConfirm}>
            Confirmer la commande
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
