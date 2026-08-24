"use client";

import { MessageCircle, Facebook, Instagram, FileText, ExternalLink } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contacts = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp",
    description:
      "Discutez directement avec notre équipe et réservez votre diagnostic en quelques messages.",
    buttonLabel: "Discuter sur WhatsApp",
    href: "https://wa.me/243000000000?text=Bonjour%20GGEA%2C%20je%20voudrais%20r%C3%A9server%20un%20diagnostic.",
    accentColor: "emerald",
    iconBg: "bg-emerald-500/15 border border-emerald-500/30",
    iconColor: "text-emerald-400",
    btnVariant: "default" as const,
    glowColor: "hover:shadow-emerald-500/20",
  },
  {
    id: "messenger",
    icon: Facebook,
    title: "Facebook Messenger",
    description:
      "Contactez-nous via notre page Facebook pour plus d'informations sur nos services.",
    buttonLabel: "Écrire sur Messenger",
    href: "https://m.me/GGEAKinshasa",
    accentColor: "blue",
    iconBg: "bg-blue-500/15 border border-blue-500/30",
    iconColor: "text-blue-400",
    btnVariant: "secondary" as const,
    glowColor: "hover:shadow-blue-500/20",
  },
  {
    id: "instagram",
    icon: Instagram,
    title: "Instagram",
    description:
      "Suivez-nous pour voir nos diagnostics en action et les témoignages de nos clients.",
    buttonLabel: "Voir notre page",
    href: "https://instagram.com/ggea.kinshasa",
    accentColor: "pink",
    iconBg: "bg-pink-500/15 border border-pink-500/30",
    iconColor: "text-pink-400",
    btnVariant: "secondary" as const,
    glowColor: "hover:shadow-pink-500/20",
  },
  {
    id: "form",
    icon: FileText,
    title: "Formulaire de Réservation",
    description:
      "Préférez remplir un formulaire? Réservez directement en ligne, c'est rapide.",
    buttonLabel: "Remplir le formulaire",
    href: "#booking-form",
    accentColor: "amber",
    iconBg: "bg-amber-400/15 border border-amber-400/30",
    iconColor: "text-amber-400",
    btnVariant: "amber" as const,
    glowColor: "hover:shadow-amber-500/20",
  },
];

export default function ContactGrid() {
  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-medium tracking-[0.25em] uppercase mb-3">
            Nous sommes disponibles
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Contactez-nous &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Réservez
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Choisissez votre canal préféré. Notre équipe répond rapidement, 7 jours sur 7.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <Card
                key={contact.id}
                className={`group flex flex-col transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl ${contact.glowColor} cursor-pointer`}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 ${contact.iconBg}`}
                  >
                    <Icon className={`size-6 ${contact.iconColor}`} />
                  </div>
                  <CardTitle className="text-white text-xl">{contact.title}</CardTitle>
                  <CardDescription>{contact.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter>
                  <Button
                    id={`contact-btn-${contact.id}`}
                    variant={contact.btnVariant}
                    className="w-full group/btn"
                    onClick={() => handleClick(contact.href)}
                  >
                    {contact.buttonLabel}
                    <ExternalLink className="size-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Phone number strip */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-slate-900/80 border border-slate-700/60 rounded-full px-6 py-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 text-sm">Appel direct disponible:</span>
            <a
              href="tel:+243000000000"
              className="text-white font-semibold hover:text-emerald-400 transition-colors"
            >
              +243 000 000 000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
