"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToForm = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-mechanic.jpg"
          alt="Mécanicien GGEA effectuant un diagnostic OBD2 à Kinshasa"
          fill
          priority
          className="object-cover object-center scale-105"
          style={{ filter: "brightness(0.45)" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/50 to-slate-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/40" />
      </div>

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Brand pill */}
        <div className="hero-fade-in flex justify-center mb-6">
          <Badge
            variant="emerald"
            className="px-4 py-1.5 text-sm tracking-widest uppercase"
          >
            🇨🇩 Service Certifié — Kinshasa, DRC
          </Badge>
        </div>

        {/* Business name */}
        <p className="hero-fade-in-delay-1 text-emerald-400 text-sm sm:text-base font-medium tracking-[0.3em] uppercase mb-4">
          GGEA — Garage Général Electronique Automobile
        </p>

        {/* Main headline */}
        <h1 className="hero-fade-in-delay-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Checking Automobile
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            À Domicile
          </span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-200">
            à Kinshasa
          </span>
        </h1>

        {/* Value proposition */}
        <p className="hero-fade-in-delay-3 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          Évitez les mauvaises surprises avant d&apos;acheter ou avant un long voyage.
        </p>
        <div className="hero-fade-in-delay-3 flex flex-wrap items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 bg-slate-800/70 backdrop-blur-sm border border-slate-700/60 rounded-full px-5 py-2">
            <span className="text-slate-400 text-sm">Déplacement</span>
            <span className="text-2xl font-bold text-emerald-400">$0</span>
          </div>
          <div className="w-px h-6 bg-slate-600 hidden sm:block" />
          <div className="flex items-center gap-2 bg-slate-800/70 backdrop-blur-sm border border-slate-700/60 rounded-full px-5 py-2">
            <span className="text-slate-400 text-sm">Diagnostic Complet</span>
            <span className="text-2xl font-bold text-amber-400">$35</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-fade-in-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            id="hero-cta-primary"
            size="xl"
            onClick={scrollToContact}
            className="group bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <Phone className="size-5" />
            Prendre Rendez-vous
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <button
            id="hero-cta-secondary"
            onClick={scrollToForm}
            className="text-slate-300 hover:text-emerald-300 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
          >
            Discuter avec l&apos;équipe →
          </button>
        </div>

        {/* Trust badges */}
        <div className="hero-fade-in-delay-4 flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-400 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Techniciens certifiés
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Rapport écrit fourni
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Disponible 7j/7
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Scanner OBD2 professionnel
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContact}
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-400 hover:text-emerald-400 transition-colors animate-bounce"
      >
        <ChevronDown className="size-8" />
      </button>
    </section>
  );
}
