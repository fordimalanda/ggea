import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Adresse e-mail invalide."),
  password: z.string().min(1, "Mot de passe requis."),
});

export const bookingStatusSchema = z.enum([
  "en_attente",
  "confirmee",
  "refusee",
  "terminee",
]);
