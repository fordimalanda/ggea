"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "jean",
    initials: "JB",
    name: "Jean-Baptiste M.",
    role: "Acheteur de véhicule d'occasion",
    rating: 5,
    quote:
      "GGEA m'a sauvé d'une très mauvaise affaire ! Grâce à leur diagnostic, j'ai découvert que la voiture que je voulais acheter avait un moteur endommagé. Service impeccable, rapide et professionnel. Je recommande à 100%.",
    gradient: "from-emerald-500 to-teal-500",
    border: "border-emerald-500/30",
    highlight: "border-l-4 border-l-emerald-500",
  },
  {
    id: "marie",
    initials: "MA",
    name: "Marie-Ange K.",
    role: "Cliente longue distance",
    rating: 5,
    quote:
      "Avant mon voyage Kinshasa–Matadi, j'avais des inquiétudes sur ma voiture. Le technicien de GGEA est venu chez moi à 8h du matin, a tout vérifié en détail et m'a remis un rapport complet. Voyage effectué sans problème!",
    gradient: "from-amber-400 to-orange-400",
    border: "border-amber-400/30",
    highlight: "border-l-4 border-l-amber-400",
  },
  {
    id: "patrice",
    initials: "PL",
    name: "Patrice L.",
    role: "Chef d'entreprise, Gombe",
    rating: 5,
    quote:
      "En tant que professionnel, je ne pouvais pas me permettre de me déplacer dans un garage. GGEA est venu directement à mon bureau. Diagnostic complet en moins d'une heure. Service de très haute qualité, tarifs honnêtes.",
    gradient: "from-blue-500 to-indigo-500",
    border: "border-blue-500/30",
    highlight: "border-l-4 border-l-blue-500",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < count ? "fill-amber-400 text-amber-400" : "text-slate-600"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-medium tracking-[0.25em] uppercase mb-3">
            Avis clients
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Nos Clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Témoignent
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Des centaines de Kinois nous font confiance. Voici ce qu&apos;ils disent de nous.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[
              { value: "200+", label: "Diagnostics effectués" },
              { value: "4.9/5", label: "Note moyenne" },
              { value: "100%", label: "Satisfaction client" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`group relative rounded-2xl border ${t.border} bg-slate-900/80 backdrop-blur-sm p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl ${t.highlight} flex flex-col gap-4`}
            >
              {/* Quote mark */}
              <div className="text-4xl text-slate-700 font-serif leading-none select-none">&ldquo;</div>

              <p className="text-slate-300 text-sm leading-relaxed flex-1">{t.quote}</p>

              <div className="flex items-center gap-4 pt-2 border-t border-slate-800">
                <Avatar className="size-12">
                  <AvatarFallback
                    className={`bg-gradient-to-br ${t.gradient} text-white font-bold text-sm`}
                  >
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                  <StarRating count={t.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
