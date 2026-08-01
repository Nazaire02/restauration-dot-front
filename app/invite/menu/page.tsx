"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { useGuestStore } from "@/store/useGuestStore";
import { useCartStore } from "@/store/useCartStore";
import { useDataStore } from "@/store/useDataStore";
import { DishCard } from "@/features/guess/components/DishCard";
import { OrderConfirmation } from "@/features/guess/components/OrderConfirmation";

export default function MenuPage() {
  const seat = useGuestStore((s) => s.seat);
  const setActiveOrderId = useGuestStore((s) => s.setActiveOrderId);

  const dishes = useDataStore((s) => s.dishes);
  const createOrder = useDataStore((s) => s.createOrder);

  const items = useCartStore((s) => s.items);
  const add = useCartStore((s) => s.add);
  const clear = useCartStore((s) => s.clear);

  const [cartOpen, setCartOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleValidate = () => {
    if (!seat || items.length === 0) return;
    const order = createOrder({ table: seat.table, chair: seat.chair, items });
    setActiveOrderId(order.id);
    clear();
    setCartOpen(false);
    setConfirmed(true);
  };

  return (
    <div
    >
      <PageHeader
        eyebrow={seat ? `Table ${seat.table} · chaise ${seat.chair}` : undefined}
        title="Le menu"
        description="Composez votre assiette. Notre équipe prépare et sert directement à votre place."
      />

      {dishes.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon={UtensilsCrossed} title="Aucun plat dans cette catégorie" />
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              quantity={1}
              onAdd={(d) => {
                add(d);
                setCartOpen(true);
              }}
            />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {confirmed && seat ? (
          <OrderConfirmation
            table={seat.table}
            chair={seat.chair}
            onDone={() => {
              setConfirmed(false);
            //   navigate({ to: "/invite/commande" });
            }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}