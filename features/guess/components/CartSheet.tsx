import { AnimatePresence, motion } from "motion/react";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { pluralize } from "@/utils/format";
import { selectCartCount, useCartStore } from "@/store/useCartStore";

interface CartSheetProps {
  onValidate: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ onValidate, open, onOpenChange }: Readonly<CartSheetProps>) {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const count = selectCartCount(items);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="min-h-11 rounded-full">
          <ShoppingBag className="size-4" aria-hidden />
          <span>Panier</span>
          <AnimatePresence>
            {count > 0 ? (
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="ml-1 grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground"
              >
                {count}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-display text-2xl">Votre commande</SheetTitle>
          <SheetDescription>
            {count > 0
              ? `${count} ${pluralize(count, "article")} sélectionné${count > 1 ? "s" : ""}.`
              : "Votre panier est vide pour le moment."}
          </SheetDescription>
        </SheetHeader>

        <ul className="flex-1 space-y-3 overflow-y-auto px-4">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li
                key={item.dishId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-3"
              >
                <p className="min-w-0 truncate text-sm text-foreground">{item.name}</p>
                <div className="flex shrink-0 items-center gap-1">
                  <span className="w-6 text-center text-sm tabular-nums">{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="min-h-11 min-w-11 text-muted-foreground"
                    aria-label={`Supprimer ${item.name}`}
                    onClick={() => remove(item.dishId)}
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </Button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="border-t border-border p-4">
          <Button
            className="min-h-12 w-full rounded-full"
            disabled={count === 0}
            onClick={onValidate}
          >
            Valider la commande
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}