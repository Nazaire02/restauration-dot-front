"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "../../types/dish";
import { CategoryFormValues, categorySchema } from "./forms/schema";

type CategorySectionProps = {
  categories: Category[];
  onAdd: (data: { name: string; description: string }) => void;
  onRemove: (id: string) => void;
};

export function CategorySection({
  categories,
  onAdd,
  onRemove,
}: Readonly<CategorySectionProps>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  const onValid = (values: CategoryFormValues) => {
    onAdd({ name: values.name, description: "" });
    reset();
  };

  return (
    <section className="surface-card p-6">
      <h2 className="text-display text-2xl text-foreground">Catégories</h2>

      <form
        className="mt-4 flex flex-wrap items-start gap-3"
        onSubmit={handleSubmit(onValid)}
        noValidate
      >
        <div className="space-y-1">
          <Input
            aria-label="Nouvelle catégorie"
            placeholder="Nouvelle catégorie"
            className="min-h-11 max-w-xs"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="min-h-11 rounded-full"
          disabled={isSubmitting}
        >
          Ajouter
        </Button>
      </form>

      <ul className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex items-center gap-1 rounded-full bg-secondary px-4 py-1 text-sm"
          >
            {c.name}
            <Button
              size="icon"
              variant="ghost"
              className="size-8"
              aria-label={`Supprimer la catégorie ${c.name}`}
              onClick={() => onRemove(c.id)}
            >
              <Trash2 className="size-3.5" aria-hidden />
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}