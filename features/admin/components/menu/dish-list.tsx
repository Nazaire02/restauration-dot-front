"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Menu } from "@/features/guess/types/menu";

type Dish = {
  id: string;
  name: string;
  description: string;
  image: string;
  available: boolean;
};

type DishListProps = {
  dishes: Menu[];
  onUpdate: (id: string, data: Partial<Pick<Dish, "available">>) => void;
  onRemove: (id: string) => void;
};

export function DishList({ dishes, onUpdate, onRemove }: Readonly<DishListProps>) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish) => (
        <li key={dish.id} className="surface-card overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            width={800}
            height={800}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="space-y-3 p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
              <div className="min-w-0">
                <p className="text-display truncate text-lg text-foreground">
                  {dish.name}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {dish.description}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="min-h-11 min-w-11 shrink-0"
                aria-label={`Supprimer ${dish.name}`}
                onClick={() => onRemove(dish.id)}
              >
                <Trash2 className="size-4" aria-hidden />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id={`avail-${dish.id}`}
                checked={dish.available}
                onCheckedChange={(available) =>
                  onUpdate(dish.id, { available })
                }
              />
              <Label htmlFor={`avail-${dish.id}`}>Disponible</Label>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}