"use client";

import { CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "obd2",
    emoji: "🔌",
    title: "Scanner OBD2 Professionnel",
    description:
      "Lecture complète des codes d'erreur du calculateur moteur. Identification précise des pannes électroniques.",
    tags: ["Codes défauts", "Données live", "Réinitialisations"],
    accent: "emerald",
  },
  {
    id: "moteur",
    emoji: "⚙️",
    title: "Contrôle Moteur",
    description:
      "Inspection de la compression, des courroies, des niveaux d'huile et de la santé générale du bloc moteur.",
    tags: ["Compression", "Courroies", "Niveaux"],
    accent: "teal",
  },
  {
    id: "freins",
    emoji: "🛑",
    title: "Système de Freinage",
    description:
      "Vérification des plaquettes, disques, étriers et fluide de frein. Sécurité garantie.",
    tags: ["Plaquettes", "Disques", "Fluide"],
    accent: "amber",
  },
  {
    id: "suspension",
    emoji: "🔩",
    title: "Suspension & Direction",
    description:
      "Contrôle des amortisseurs, rotules, triangles de suspension et de la géométrie de direction.",
    tags: ["Amortisseurs", "Rotules", "Géométrie"],
    accent: "blue",
  },
  {
    id: "electricite",
    emoji: "⚡",
    title: "Électricité & Batterie",
    description:
      "Test complet de la batterie, de l'alternateur, du démarreur et de tout le circuit électrique.",
    tags: ["Batterie", "Alternateur", "Câblage"],
    accent: "yellow",
  },
  {
    id: "carrosserie",
    emoji: "🚗",
    title: "Carrosserie & Châssis",
    description:
      "Inspection visuelle approfondie de la carrosserie, du châssis et détection de rouille cachée ou de chocs.",
    tags: ["Châssis", "Rouille", "Impacts"],
    accent: "slate",
  },
];

const accentMap: Record<string, { border: string; bg: string; tag: string; check: string }> = {
  emerald: {
    border: "border-emerald-500/30 group-hover:border-emerald-500/60",
    bg: "group-hover:bg-emerald-500/5",
    tag: "bg-emerald-500/10 text-emerald-400",
    check: "text-emerald-400",
  },
  teal: {
    border: "border-teal-500/30 group-hover:border-teal-500/60",
    bg: "group-hover:bg-teal-500/5",
    tag: "bg-teal-500/10 text-teal-400",
    check: "text-teal-400",
  },
  amber: {
    border: "border-amber-400/30 group-hover:border-amber-400/60",
    bg: "group-hover:bg-amber-400/5",
    tag: "bg-amber-400/10 text-amber-400",
    check: "text-amber-400",
  },
  blue: {
    border: "border-blue-500/30 group-hover:border-blue-500/60",
    bg: "group-hover:bg-blue-500/5",
    tag: "bg-blue-500/10 text-blue-400",
    check: "text-blue-400",
  },
  yellow: {
    border: "border-yellow-400/30 group-hover:border-yellow-400/60",
    bg: "group-hover:bg-yellow-400/5",
    tag: "bg-yellow-400/10 text-yellow-400",
    check: "text-yellow-400",
  },
  slate: {
    border: "border-slate-500/30 group-hover:border-slate-400/60",
    bg: "group-hover:bg-slate-500/5",
    tag: "bg-slate-500/20 text-slate-300",
    check: "text-slate-400",
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-medium tracking-[0.25em] uppercase mb-3">
            Diagnostic 360°
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ce que nous{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              vérifions
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Notre inspection couvre tous les systèmes critiques de votre véhicule. Un rapport détaillé vous est remis à la fin.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const a = accentMap[service.accent];
            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl border ${a.border} bg-slate-900/60 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${a.bg}`}
              >
                {/* Emoji icon */}
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">
                  {service.emoji}
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${a.tag}`}
                    >
                      <CheckCircle2 className={`size-3 ${a.check}`} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <div className="mt-20">
          <h3 className="text-center text-2xl font-bold text-white mb-10">
            Comment ça{" "}
            <span className="text-emerald-400">fonctionne</span>?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden sm:block absolute top-8 left-1/4 right-1/4 h-px bg-gradient-to-r from-emerald-500/30 via-emerald-500/60 to-emerald-500/30" />

            {[
              { step: "01", title: "Réservez", desc: "Contactez-nous via WhatsApp, Messenger ou le formulaire. Choisissez votre créneau." },
              { step: "02", title: "Nous venons à vous", desc: "Notre technicien se déplace chez vous — domicile, bureau, ou toute adresse à Kinshasa." },
              { step: "03", title: "Recevez le rapport", desc: "Diagnostic complet livré en moins d'1h. Rapport écrit avec recommandations et devis." },
            ].map((step) => (
              <div key={step.step} className="relative flex flex-col items-center text-center gap-3">
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h4 className="text-white font-semibold text-lg">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
