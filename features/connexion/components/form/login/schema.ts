import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export type FormValues = z.infer<typeof schema>;
