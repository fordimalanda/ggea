"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  LogOut,
  Phone,
  RefreshCw,
  User,
  Car,
  MapPin,
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  SlidersHorizontal,
  X,
  ExternalLink,
  ShieldCheck,
  LayoutGrid,
  List,
  Sparkles,
} from "lucide-react";
import type { Booking, BookingStatus } from "@/types/booking";

// Official WhatsApp SVG Icon with high-fidelity brand appearance
function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.87 11.87 0 0012.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.13 1.6 5.93L.12 24l6.35-1.67a11.86 11.86 0 005.61 1.43h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.43-8.42zM12.09 21.76h-.01a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.85 9.85 0 01-1.51-5.25c0-5.44 4.43-9.86 9.87-9.86 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.44-4.43 9.87-9.85 9.87zm5.41-7.39c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}

const statusConfig: Record<
  BookingStatus,
  {
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    dotClass: string;
    icon: typeof AlertCircle;
  }
> = {
  en_attente: {
    label: "En attente",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-300",
    borderClass: "border-amber-500/30",
    dotClass: "bg-amber-400 animate-pulse",
    icon: AlertCircle,
  },
  confirmee: {
    label: "Confirmée",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-300",
    borderClass: "border-emerald-500/30",
    dotClass: "bg-emerald-400",
    icon: CheckCircle2,
  },
  refusee: {
    label: "Refusée",
    bgClass: "bg-rose-500/10",
    textClass: "text-rose-300",
    borderClass: "border-rose-500/30",
    dotClass: "bg-rose-400",
    icon: XCircle,
  },
  terminee: {
    label: "Terminée",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-300",
    borderClass: "border-blue-500/30",
    dotClass: "bg-blue-400",
    icon: CheckCircle2,
  },
};

function formatBookingDate(dateString: string): string {
  if (!dateString) return "-";
  try {
    const date = new Date(`${dateString}T00:00:00`);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

function formatCreationTime(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "";
  }
}

function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function generateWhatsAppLink(booking: Booking): string {
  const cleanPhone = cleanPhoneNumber(booking.phone).replace("+", "");
  const message = encodeURIComponent(
    `Bonjour ${booking.full_name}, nous avons bien reçu votre demande de réservation GGEA pour le véhicule ${booking.car_model || "votre véhicule"} le ${formatBookingDate(booking.preferred_date)}.`
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

export default function AdminDashboard({ email }: { email: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filters & State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/bookings", { cache: "no-store" });
      const result = (await response.json()) as { bookings?: Booking[]; error?: string };
      if (!response.ok) {
        setError(result.error || "Impossible de charger les réservations.");
      } else {
        setBookings(result.bookings || []);
      }
    } catch {
      setError("Erreur réseau lors du chargement des réservations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function init() {
      try {
        const response = await fetch("/api/admin/bookings", { cache: "no-store" });
        const result = (await response.json()) as { bookings?: Booking[]; error?: string };
        if (isMounted) {
          if (!response.ok) {
            setError(result.error || "Impossible de charger les réservations.");
          } else {
            setBookings(result.bookings || []);
          }
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setError("Erreur réseau lors du chargement des réservations.");
          setLoading(false);
        }
      }
    }
    void init();
    return () => {
      isMounted = false;
    };
  }, []);

  async function updateStatus(id: string, status: BookingStatus) {
    setUpdatingId(id);
    setError(null);
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        setBookings((current) =>
          current.map((b) => (b.id === id ? { ...b, status } : b))
        );
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking((prev) => (prev ? { ...prev, status } : null));
        }
        setSuccessToast(`Statut mis à jour : "${statusConfig[status].label}"`);
        setTimeout(() => setSuccessToast(null), 3000);
      } else {
        setError("Le statut n'a pas pu être mis à jour.");
      }
    } catch {
      setError("Erreur de communication avec le serveur.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  // Statistics
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "en_attente").length;
    const confirmed = bookings.filter((b) => b.status === "confirmee").length;
    const completed = bookings.filter((b) => b.status === "terminee").length;
    const rejected = bookings.filter((b) => b.status === "refusee").length;
    return { total, pending, confirmed, completed, rejected };
  }, [bookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus =
        selectedStatus === "all" ? true : b.status === selectedStatus;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesStatus;

      const matchesSearch =
        b.full_name.toLowerCase().includes(query) ||
        b.phone.toLowerCase().includes(query) ||
        b.car_model.toLowerCase().includes(query) ||
        b.adresse.toLowerCase().includes(query) ||
        (b.notes && b.notes.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [bookings, selectedStatus, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-slate-900/95 px-4 py-3 text-emerald-300 shadow-2xl shadow-emerald-950/50 backdrop-blur-md animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="size-5 text-emerald-400" />
          <span className="text-sm font-medium">{successToast}</span>
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <header className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-xl">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 size-64 rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                  <ShieldCheck className="size-3.5" /> Espace Administrateur
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Gestion des Réservations
              </h1>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                Connecté en tant que <span className="text-slate-200">{email}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => void loadBookings()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-medium text-slate-200 transition hover:border-emerald-400 hover:bg-slate-800 hover:text-white disabled:opacity-50 sm:text-sm"
              >
                <RefreshCw
                  className={`size-4 ${loading ? "animate-spin text-emerald-400" : ""}`}
                />
                <span>Actualiser</span>
              </button>

              <button
                type="button"
                onClick={() => void logout()}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-medium text-slate-200 transition hover:border-rose-500 hover:bg-rose-500/10 hover:text-rose-300 sm:text-sm"
              >
                <LogOut className="size-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div
            role="alert"
            className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="size-5 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-rose-200"
              aria-label="Fermer l'alerte"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* KPI Summary Cards */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition-all hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium uppercase tracking-wider">Total</span>
              <Sparkles className="size-4 text-slate-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">{stats.total}</p>
            <span className="text-[11px] text-slate-500">Toutes demandes</span>
          </div>

          <div
            onClick={() => setSelectedStatus("en_attente")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all ${
              selectedStatus === "en_attente"
                ? "border-amber-400/60 bg-amber-500/15 ring-2 ring-amber-400/20"
                : "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40"
            }`}
          >
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs font-medium uppercase tracking-wider">En attente</span>
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-amber-500" />
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-amber-300 sm:text-3xl">{stats.pending}</p>
            <span className="text-[11px] text-amber-400/80">À traiter rapidement</span>
          </div>

          <div
            onClick={() => setSelectedStatus("confirmee")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all ${
              selectedStatus === "confirmee"
                ? "border-emerald-400/60 bg-emerald-500/15 ring-2 ring-emerald-400/20"
                : "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40"
            }`}
          >
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-medium uppercase tracking-wider">Confirmées</span>
              <CheckCircle2 className="size-4 text-emerald-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-300 sm:text-3xl">{stats.confirmed}</p>
            <span className="text-[11px] text-emerald-400/80">Rendez-vous validés</span>
          </div>

          <div
            onClick={() => setSelectedStatus("terminee")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all ${
              selectedStatus === "terminee"
                ? "border-blue-400/60 bg-blue-500/15 ring-2 ring-blue-400/20"
                : "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40"
            }`}
          >
            <div className="flex items-center justify-between text-blue-400">
              <span className="text-xs font-medium uppercase tracking-wider">Terminées</span>
              <CheckCircle2 className="size-4 text-blue-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-300 sm:text-3xl">{stats.completed}</p>
            <span className="text-[11px] text-blue-400/80">Interventions finies</span>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher par nom, téléphone, modèle, adresse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-700/80 bg-slate-950/80 pl-10 pr-10 text-sm text-white placeholder-slate-500 transition focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                aria-label="Effacer la recherche"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedStatus("all")}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                selectedStatus === "all"
                  ? "bg-slate-700 text-white shadow"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              Tous ({bookings.length})
            </button>
            <button
              onClick={() => setSelectedStatus("en_attente")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                selectedStatus === "en_attente"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-amber-300"
              }`}
            >
              <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
              En attente ({stats.pending})
            </button>
            <button
              onClick={() => setSelectedStatus("confirmee")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                selectedStatus === "confirmee"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-emerald-300"
              }`}
            >
              <span className="size-2 rounded-full bg-emerald-400" />
              Confirmées ({stats.confirmed})
            </button>
            <button
              onClick={() => setSelectedStatus("terminee")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                selectedStatus === "terminee"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-blue-300"
              }`}
            >
              <span className="size-2 rounded-full bg-blue-400" />
              Terminées ({stats.completed})
            </button>
            <button
              onClick={() => setSelectedStatus("refusee")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                selectedStatus === "refusee"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-rose-300"
              }`}
            >
              <span className="size-2 rounded-full bg-rose-400" />
              Refusées ({stats.rejected})
            </button>
          </div>

          {/* View Toggle */}
          <div className="hidden items-center gap-1 rounded-xl border border-slate-800 bg-slate-950/60 p-1 sm:flex">
            <button
              onClick={() => setViewMode("grid")}
              title="Affichage en cartes"
              className={`rounded-lg p-2 transition ${
                viewMode === "grid"
                  ? "bg-slate-800 text-emerald-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              title="Affichage en tableau"
              className={`rounded-lg p-2 transition ${
                viewMode === "table"
                  ? "bg-slate-800 text-emerald-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <List className="size-4" />
            </button>
          </div>
        </section>

        {/* Bookings List / Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 py-20 text-center">
            <RefreshCw className="size-8 animate-spin text-emerald-400" />
            <p className="mt-4 text-sm text-slate-400">Chargement des réservations...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-20 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
              <SlidersHorizontal className="size-6" />
            </div>
            <p className="mt-4 text-base font-semibold text-slate-300">Aucune réservation trouvée</p>
            <p className="mt-1 text-sm text-slate-500">
              {searchQuery || selectedStatus !== "all"
                ? "Essayez de modifier vos filtres ou termes de recherche."
                : "Les réservations effectuées apparaîtront ici."}
            </p>
            {(searchQuery || selectedStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus("all");
                }}
                className="mt-4 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-emerald-400 hover:border-emerald-400"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* Cards Grid View */
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredBookings.map((booking) => {
              const currentStatus = statusConfig[booking.status] || statusConfig.en_attente;
              const isUpdating = updatingId === booking.id;

              return (
                <div
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-900/50 p-5 shadow-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-emerald-950/20"
                >
                  {/* Top Status and User Header */}
                  <div>
                    <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
                          <User className="size-5" />
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {booking.full_name}
                          </h2>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Clock className="size-3 text-slate-500" />
                            <span>{formatCreationTime(booking.created_at)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative shrink-0"
                      >
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${currentStatus.bgClass} ${currentStatus.textClass} ${currentStatus.borderClass}`}
                        >
                          <span className={`size-2 rounded-full ${currentStatus.dotClass}`} />
                          <span>{currentStatus.label}</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details with Distinct Icons */}
                    <div className="mt-4 space-y-3 text-sm">
                      {/* Car Model */}
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                          <Car className="size-4 text-emerald-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] uppercase tracking-wider text-slate-500 block">
                            Véhicule
                          </span>
                          <span className="font-medium text-slate-200 truncate block">
                            {booking.car_model || "Non spécifié"}
                          </span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-2.5 text-slate-300">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 mt-0.5">
                          <MapPin className="size-4 text-teal-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] uppercase tracking-wider text-slate-500 block">
                            Lieu / Commune
                          </span>
                          <span className="font-medium text-slate-200 line-clamp-1">
                            {booking.adresse}
                          </span>
                        </div>
                      </div>

                      {/* Preferred Date */}
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                          <Calendar className="size-4 text-amber-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] uppercase tracking-wider text-slate-500 block">
                            Date souhaitée
                          </span>
                          <span className="font-semibold text-amber-300">
                            {formatBookingDate(booking.preferred_date)}
                          </span>
                        </div>
                      </div>

                      {/* Notes snippet */}
                      <div className="flex items-start gap-2.5 text-slate-300">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 mt-0.5">
                          <FileText className="size-4 text-slate-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] uppercase tracking-wider text-slate-500 block">
                            Notes
                          </span>
                          <p className="text-xs text-slate-400 italic line-clamp-2">
                            {booking.notes ? `« ${booking.notes} »` : "Aucune note additionnelle."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Communication Footer */}
                  <div className="mt-5 border-t border-slate-800/80 pt-4">
                    <div className="flex items-center gap-2">
                      {/* Direct Call Icon Button */}
                      <a
                        href={`tel:${cleanPhoneNumber(booking.phone)}`}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Appeler ${booking.full_name}`}
                        title={`Appeler ${booking.phone}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500 hover:text-slate-950"
                      >
                        <Phone className="size-3.5 shrink-0" />
                        <span className="truncate">{booking.phone}</span>
                      </a>

                      {/* True WhatsApp Icon Button */}
                      <a
                        href={generateWhatsAppLink(booking)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Contacter ${booking.full_name} sur WhatsApp`}
                        title="Ouvrir WhatsApp"
                        className="flex items-center justify-center rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 p-2.5 text-[#25D366] transition hover:bg-[#25D366] hover:text-slate-950 shrink-0"
                      >
                        <WhatsAppIcon className="size-4" />
                      </a>

                      {/* Status Quick Changer Dropdown */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative shrink-0"
                      >
                        <select
                          disabled={isUpdating}
                          value={booking.status}
                          onChange={(e) =>
                            void updateStatus(booking.id, e.target.value as BookingStatus)
                          }
                          aria-label="Modifier le statut"
                          className="h-9 rounded-xl border border-slate-700 bg-slate-950 px-2.5 text-xs font-medium text-slate-200 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 cursor-pointer disabled:opacity-50"
                        >
                          <option value="en_attente">⏳ En attente</option>
                          <option value="confirmee">✅ Confirmée</option>
                          <option value="terminee">🏁 Terminée</option>
                          <option value="refusee">❌ Refusée</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-950/60 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="size-3.5 text-emerald-400" /> Client
                    </span>
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Car className="size-3.5 text-emerald-400" /> Véhicule
                    </span>
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-teal-400" /> Adresse
                    </span>
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-amber-400" /> Date souhaitée
                    </span>
                  </th>
                  <th className="px-4 py-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="size-3.5 text-slate-400" /> Notes
                    </span>
                  </th>
                  <th className="px-4 py-4 font-semibold">Statut</th>
                  <th className="px-4 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredBookings.map((booking) => {
                  const currentStatus =
                    statusConfig[booking.status] || statusConfig.en_attente;
                  const isUpdating = updatingId === booking.id;

                  return (
                    <tr
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      className="cursor-pointer transition hover:bg-slate-800/50"
                    >
                      {/* Client */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                            <User className="size-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{booking.full_name}</p>
                            <p className="text-xs text-slate-400">{booking.phone}</p>
                          </div>
                        </div>
                      </td>

                      {/* Car Model */}
                      <td className="px-4 py-4 text-slate-300 font-medium">
                        {booking.car_model || "-"}
                      </td>

                      {/* Address */}
                      <td className="max-w-[200px] truncate px-4 py-4 text-slate-300">
                        {booking.adresse}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 font-medium text-amber-300">
                        {formatBookingDate(booking.preferred_date)}
                      </td>

                      {/* Notes */}
                      <td className="max-w-[200px] truncate px-4 py-4 text-slate-400 text-xs italic">
                        {booking.notes || "-"}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="relative"
                        >
                          <select
                            disabled={isUpdating}
                            value={booking.status}
                            onChange={(e) =>
                              void updateStatus(
                                booking.id,
                                e.target.value as BookingStatus
                              )
                            }
                            className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none ${currentStatus.bgClass} ${currentStatus.textClass} ${currentStatus.borderClass} bg-slate-950 cursor-pointer`}
                          >
                            <option value="en_attente">⏳ En attente</option>
                            <option value="confirmee">✅ Confirmée</option>
                            <option value="terminee">🏁 Terminée</option>
                            <option value="refusee">❌ Refusée</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-right">
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-end gap-2"
                        >
                          <a
                            href={`tel:${cleanPhoneNumber(booking.phone)}`}
                            title={`Appeler ${booking.phone}`}
                            className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition"
                          >
                            <Phone className="size-4" />
                          </a>
                          <a
                            href={generateWhatsAppLink(booking)}
                            target="_blank"
                            rel="noreferrer"
                            title="WhatsApp"
                            className="rounded-lg border border-[#25D366]/40 bg-[#25D366]/20 p-2 text-[#25D366] hover:bg-[#25D366] hover:text-slate-950 transition"
                          >
                            <WhatsAppIcon className="size-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdateStatus={updateStatus}
          isUpdating={updatingId === selectedBooking.id}
        />
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// Modal for Detailed View of a Reservation
// ─────────────────────────────────────────────────────────────
function BookingDetailModal({
  booking,
  onClose,
  onUpdateStatus,
  isUpdating,
}: {
  booking: Booking;
  onClose: () => void;
  onUpdateStatus: (id: string, status: BookingStatus) => Promise<void>;
  isUpdating: boolean;
}) {
  const currentStatus = statusConfig[booking.status] || statusConfig.en_attente;

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-emerald-950/30 animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="relative border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full border border-slate-700 bg-slate-800/80 p-2 text-slate-400 transition hover:border-slate-500 hover:text-white"
            aria-label="Fermer le dialogue"
          >
            <X className="size-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
              <User className="size-7" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Fiche Réservation
              </span>
              <h2 className="text-2xl font-bold text-white">{booking.full_name}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="size-3.5 text-slate-500" />
                <span>Demande soumise le {formatCreationTime(booking.created_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
          {/* Status Management Pill Selector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Statut actuel
              </label>
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${currentStatus.bgClass} ${currentStatus.textClass} ${currentStatus.borderClass}`}
              >
                <span className={`size-2 rounded-full ${currentStatus.dotClass}`} />
                <span>{currentStatus.label}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(
                [
                  { key: "en_attente", label: "En attente", icon: AlertCircle, color: "hover:border-amber-400 hover:text-amber-300" },
                  { key: "confirmee", label: "Confirmer", icon: CheckCircle2, color: "hover:border-emerald-400 hover:text-emerald-300" },
                  { key: "terminee", label: "Terminer", icon: CheckCircle2, color: "hover:border-blue-400 hover:text-blue-300" },
                  { key: "refusee", label: "Refuser", icon: XCircle, color: "hover:border-rose-400 hover:text-rose-300" },
                ] as const
              ).map((item) => {
                const isSelected = booking.status === item.key;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    disabled={isUpdating}
                    onClick={() => void onUpdateStatus(booking.id, item.key)}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/20 text-white ring-1 ring-emerald-500"
                        : `border-slate-800 bg-slate-900 text-slate-400 ${item.color}`
                    } disabled:opacity-50`}
                  >
                    <Icon className="size-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Info Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Person & Contact */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <User className="size-4 text-emerald-400" />
                <span>Client & Contact</span>
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-white">{booking.full_name}</p>
                <p className="text-sm text-slate-300 flex items-center gap-2">
                  <Phone className="size-3.5 text-emerald-400" /> {booking.phone}
                </p>
              </div>
            </div>

            {/* Car Model */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Car className="size-4 text-emerald-400" />
                <span>Véhicule concerné</span>
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-white">
                  {booking.car_model || "Non spécifié"}
                </p>
                <p className="text-xs text-slate-400">Diagnostic & Entretien</p>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <MapPin className="size-4 text-teal-400" />
                <span>Adresse / Commune</span>
              </div>
              <p className="text-sm font-medium text-slate-200">{booking.adresse}</p>
            </div>

            {/* Preferred Date */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Calendar className="size-4 text-amber-400" />
                <span>Date souhaitée</span>
              </div>
              <p className="text-base font-bold text-amber-300">
                {formatBookingDate(booking.preferred_date)}
              </p>
            </div>
          </div>

          {/* Notes Section */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <FileText className="size-4 text-slate-400" />
              <span>Notes & Demandes spéciales du client</span>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
              {booking.notes ? booking.notes : "Aucune note particulière fournie par le client."}
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="border-t border-slate-800 bg-slate-950 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Call */}
            <a
              href={`tel:${cleanPhoneNumber(booking.phone)}`}
              className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-500 hover:text-slate-950"
            >
              <Phone className="size-4" />
              <span>Appeler</span>
            </a>

            {/* WhatsApp with Official Brand styling */}
            <a
              href={generateWhatsAppLink(booking)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-[#25D366]/20 transition hover:bg-[#20bd5a]"
            >
              <WhatsAppIcon className="size-4" />
              <span>Contacter sur WhatsApp</span>
              <ExternalLink className="size-3 opacity-70" />
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-3 sm:mt-0 w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
