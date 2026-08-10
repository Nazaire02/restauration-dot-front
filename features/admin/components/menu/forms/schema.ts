import z from "zod";

export const dishSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis"),
  description: z.string().trim().optional(),
  image: z.string().trim().optional(),
});

export type DishFormValues = z.infer<typeof dishSchema>;

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
