"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WaitressFormValues, waitressSchema } from "./schema";

const parseTables = (value: string) =>
  value
    .split(",")
    .map((v) => Number(v.trim()))
    .filter((v) => Number.isInteger(v) && v > 0);

type WaitressFormProps = {
  onSubmit: (data: { name: string; email: string; tables: number[] }) => void;
};

export function WaitressForm({ onSubmit }: Readonly<WaitressFormProps>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitressFormValues>({
    resolver: zodResolver(waitressSchema),
    defaultValues: {
      name: "",
      email: "",
      tables: "",
    },
  });

  const onValid = (values: WaitressFormValues) => {
    onSubmit({
      name: values.name,
      email: values.email,
      tables: parseTables(values.tables ?? ""),
    });
    reset();
  };

  return (
    <form
      className="surface-card grid gap-4 p-6 sm:grid-cols-4"
      onSubmit={handleSubmit(onValid)}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="w-name">Nom</Label>
        <Input
          id="w-name"
          className="min-h-11"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="w-email">E-mail</Label>
        <Input
          id="w-email"
          type="email"
          className="min-h-11"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="w-tables">Tables (ex : 1, 2, 3)</Label>
        <Input
          id="w-tables"
          className="min-h-11"
          {...register("tables")}
        />
      </div>

      <div className="flex items-end">
        <Button
          type="submit"
          className="min-h-11 w-full rounded-full"
          disabled={isSubmitting}
        >
          Ajouter
        </Button>
      </div>
    </form>
  );
}