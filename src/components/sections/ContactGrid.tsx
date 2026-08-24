"use client";

import { MessageCircle, FileText, ExternalLink } from "lucide-react";

// Brand SVG icons (lucide removed Facebook/Instagram in recent versions)
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type IconComponent = React.ComponentType<{ className?: string }>;

interface ContactItem {
  id: string;
  icon: IconComponent;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  iconBg: string;
  iconColor: string;
  btnVariant: "default" | "secondary" | "ghost" | "outline" | "link" | "amber";
  glowColor: string;
}

const contacts: ContactItem[] = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp",
    description:
      "Discutez directement avec notre équipe et réservez votre diagnostic en quelques messages.",
    buttonLabel: "Discuter sur WhatsApp",
    href: "https://wa.me/243000000000?text=Bonjour%20GGEA%2C%20je%20voudrais%20r%C3%A9server%20un%20diagnostic.",
    iconBg: "bg-emerald-500/15 border border-emerald-500/30",
    iconColor: "text-emerald-400",
    btnVariant: "default",
    glowColor: "hover:shadow-emerald-500/20",
  },
  {
    id: "messenger",
    icon: FacebookIcon,
    title: "Facebook Messenger",
    description:
      "Contactez-nous via notre page Facebook pour plus d'informations sur nos services.",
    buttonLabel: "Écrire sur Messenger",
    href: "https://m.me/GGEAKinshasa",
    iconBg: "bg-blue-500/15 border border-blue-500/30",
    iconColor: "text-blue-400",
    btnVariant: "secondary",
    glowColor: "hover:shadow-blue-500/20",
  },
  {
    id: "instagram",
    icon: InstagramIcon,
    title: "Instagram",
    description:
      "Suivez-nous pour voir nos diagnostics en action et les témoignages de nos clients.",
    buttonLabel: "Voir notre page",
    href: "https://instagram.com/ggea.kinshasa",
    iconBg: "bg-pink-500/15 border border-pink-500/30",
    iconColor: "text-pink-400",
    btnVariant: "secondary",
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
    iconBg: "bg-amber-400/15 border border-amber-400/30",
    iconColor: "text-amber-400",
    btnVariant: "amber",
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
              +243 85 44 55 818
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
