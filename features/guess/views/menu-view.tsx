"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { useGuestStore } from "@/store/useGuestStore";
import { useCartStore } from "@/store/useCartStore";
import { DishCard } from "@/features/guess/components/DishCard";
import { OrderConfirmation } from "@/features/guess/components/OrderConfirmation";
import { OrderReviewModal } from "@/features/guess/components/OrderReviewModal";
import { SeatEditorCard } from "@/features/guess/components/SeatEditorCard";
import { addOrder, fetchMenu } from "../services/guess-services";
import { toast } from "react-toastify";
import { isErrorResponse } from "@/services/error-handler"
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";

export default function MenuView() {
  const seat = useGuestStore((s) => s.seat);
  const items = useCartStore((s) => s.items);
  const add = useCartStore((s) => s.add);
  const clear = useCartStore((s) => s.clear);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    if (!seat || items.length === 0) return;

    try {
      await addOrder({ table: seat.table, chair: seat.chair, items });
      setConfirmed(true);
    } catch (error: unknown) {
      const message = isErrorResponse(error)
        ? error.details
        : "Une erreur est survenue.";
      toast.error(message);
    } finally {
      clear();
      setReviewOpen(false);
    }
  };

  const handleCancel = () => {
    clear();
    setReviewOpen(false);
  };

  const { data: responseMenu, error: errorMenu, loading: loadingMenu } = fetchMenu()

  if (errorMenu) {
    return <ErrorState/>
  }

  if(loadingMenu){
    return <LoadingState title="Chargement" description="Chargement des plats en cours"/>
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:flex-nowrap">
        <PageHeader
          title="Le menu"
          description="Composez votre assiette. Notre équipe prépare et sert directement à votre place."
        />
      </div>

      <SeatEditorCard />

      {responseMenu?.length === 0 ? (
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
          {responseMenu?.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onAdd={(d) => {
                add(d);
                setReviewOpen(true);
              }}
            />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {reviewOpen && seat ? (
          <OrderReviewModal
            table={seat.table}
            chair={seat.chair}
            items={items}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {confirmed && seat ? (
          <OrderConfirmation
            table={seat.table}
            chair={seat.chair}
            onDone={() => {
              setConfirmed(false);
            }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
