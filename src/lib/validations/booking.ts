import { z } from "zod";

export const bookingSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(60, "Nom trop long"),
  telephone: z
    .string()
    .trim()
    .min(9, "Numéro de téléphone invalide")
    .regex(/^[+\d\s()-]{9,20}$/, "Format de téléphone invalide"),
  modele: z
    .string()
    .trim()
    .min(2, "Veuillez indiquer le modèle de votre véhicule")
    .max(80, "Modèle trop long"),
  date: z.string().min(1, "Veuillez choisir une date"),
  adresse: z
    .string()
    .trim()
    .min(5, "Veuillez indiquer votre adresse complète")
    .max(200, "Adresse trop longue"),
  notes: z.string().trim().max(500, "Notes trop longues").optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
