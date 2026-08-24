"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Car, MapPin, Phone, User, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

const bookingSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(60, "Nom trop long"),
  telephone: z
    .string()
    .min(9, "Numéro de téléphone invalide")
    .regex(/^[+\d\s()-]{9,20}$/, "Format de téléphone invalide"),
  modele: z
    .string()
    .min(2, "Veuillez indiquer le modèle de votre véhicule")
    .max(80, "Modèle trop long"),
  date: z.string().min(1, "Veuillez choisir une date"),
  adresse: z
    .string()
    .min(5, "Veuillez indiquer votre adresse complète")
    .max(200, "Adresse trop longue"),
  notes: z.string().max(500, "Notes trop longues").optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const fieldConfig = [
  {
    id: "nom",
    name: "nom" as const,
    label: "Nom Complet",
    placeholder: "Ex: Jean-Baptiste Mbemba",
    icon: User,
    type: "text",
    colSpan: "sm:col-span-1",
  },
  {
    id: "telephone",
    name: "telephone" as const,
    label: "Numéro de Téléphone",
    placeholder: "Ex: +243 81 234 5678",
    icon: Phone,
    type: "tel",
    colSpan: "sm:col-span-1",
  },
  {
    id: "modele",
    name: "modele" as const,
    label: "Marque & Modèle du Véhicule",
    placeholder: "Ex: Toyota Land Cruiser 2018",
    icon: Car,
    type: "text",
    colSpan: "sm:col-span-1",
  },
  {
    id: "date",
    name: "date" as const,
    label: "Date Souhaitée",
    placeholder: "",
    icon: CalendarDays,
    type: "date",
    colSpan: "sm:col-span-1",
  },
  {
    id: "adresse",
    name: "adresse" as const,
    label: "Adresse / Lieu d'Intervention",
    placeholder: "Ex: Av. du Commerce, Gombe, Kinshasa",
    icon: MapPin,
    type: "text",
    colSpan: "sm:col-span-2",
  },
];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    // Simulate API call / WhatsApp pre-fill
    await new Promise((r) => setTimeout(r, 1200));

    // Build WhatsApp message
    const msg = encodeURIComponent(
      `*Réservation GGEA*\n\n` +
        `👤 Nom: ${data.nom}\n` +
        `📞 Tél: ${data.telephone}\n` +
        `🚗 Véhicule: ${data.modele}\n` +
        `📅 Date: ${data.date}\n` +
        `📍 Adresse: ${data.adresse}` +
        (data.notes ? `\n📝 Notes: ${data.notes}` : "")
    );

    setIsLoading(false);
    setSubmitted(true);
    reset();

    // Open WhatsApp after short delay
    setTimeout(() => {
      window.open(`https://wa.me/243000000000?text=${msg}`, "_blank", "noopener,noreferrer");
    }, 800);
  };

  if (submitted) {
    return (
      <section id="booking-form" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-12">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="size-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Réservation envoyée!</h3>
            <p className="text-slate-400 mb-6">
              WhatsApp s&apos;ouvre pour confirmer votre réservation. Notre équipe vous contactera sous peu.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Faire une autre réservation
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-form" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-emerald-400 text-sm font-medium tracking-[0.25em] uppercase mb-3">
            Réservation en ligne
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Réservez votre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Diagnostic
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            Remplissez le formulaire. Nous confirmons sous 2h, 7j/7.
          </p>
        </div>

        {/* Price reminder */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2">
            <span className="text-emerald-400 text-sm">✓ Déplacement gratuit</span>
            <span className="text-emerald-400 font-bold">$0</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-5 py-2">
            <span className="text-amber-400 text-sm">✓ Diagnostic complet</span>
            <span className="text-amber-400 font-bold">$35</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fieldConfig.map((field) => {
              const Icon = field.icon;
              const error = errors[field.name];
              return (
                <div key={field.id} className={`flex flex-col gap-1.5 ${field.colSpan}`}>
                  <Label htmlFor={field.id}>
                    {field.label}
                    <span className="text-emerald-400 ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 pointer-events-none" />
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      className={`pl-10 ${error ? "border-red-500/60 focus:ring-red-500/40" : ""}`}
                      {...register(field.name)}
                    />
                  </div>
                  {error && (
                    <p className="text-red-400 text-xs mt-0.5">{error.message}</p>
                  )}
                </div>
              );
            })}

            {/* Notes (optional) */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="notes">
                Notes / Problèmes observés{" "}
                <span className="text-slate-500 font-normal">(optionnel)</span>
              </Label>
              <Textarea
                id="notes"
                placeholder="Décrivez les symptômes ou problèmes que vous avez remarqués sur votre véhicule..."
                className={errors.notes ? "border-red-500/60" : ""}
                {...register("notes")}
              />
              {errors.notes && (
                <p className="text-red-400 text-xs">{errors.notes.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
            <Button
              id="booking-form-submit"
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 transition-all duration-300 hover:scale-[1.02] min-w-48"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <CalendarDays className="size-4" />
                  Confirmer la Réservation
                </>
              )}
            </Button>
            <p className="text-slate-500 text-xs text-center sm:text-left">
              En soumettant, vous acceptez d&apos;être contacté par notre équipe via WhatsApp ou téléphone.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
