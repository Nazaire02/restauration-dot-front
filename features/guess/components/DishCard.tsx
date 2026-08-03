import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dish } from "@/type";
import Image from "next/image";

interface DishCardProps {
  dish: Dish;
  onAdd: (dish: Dish) => void;
}

export function DishCard({ dish, onAdd }: Readonly<DishCardProps>) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      whileHover={{ y: -4 }}
      className="surface-card flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={dish.image}
          alt={dish.name}
          width={800}
          height={800}
          className="size-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="min-w-0">
          <h3 className="text-display text-xl font-medium text-foreground">{dish.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{dish.description}</p>
        </div>
        <Button
          type="button"
          variant={dish.available ? "default" : "secondary"}
          disabled={!dish.available}
          onClick={() => onAdd(dish)}
          className="mt-auto min-h-11 rounded-full"
          aria-label={`Ajouter ${dish.name} au panier`}
        >
          <Plus className="size-4" aria-hidden />
          <span>{dish.available ? "Commander" : "Indisponible"}</span>
        </Button>
      </div>
    </motion.article>
  );
}