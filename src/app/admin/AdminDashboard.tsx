"use client";

import { useEffect, useState } from "react";
import { LogOut, Phone, RefreshCw, MessageCircle } from "lucide-react";
import type { Booking, BookingStatus } from "@/types/booking";

const statusLabels: Record<BookingStatus, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  refusee: "Refusée",
  terminee: "Terminée",
};

export default function AdminDashboard({ email }: { email: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadBookings() {
    setLoading(true);
    const response = await fetch("/api/admin/bookings", { cache: "no-store" });
    const result = (await response.json()) as { bookings?: Booking[]; error?: string };
    if (!response.ok) setError(result.error || "Chargement impossible.");
    else setBookings(result.bookings || []);
    setLoading(false);
  }

  useEffect(() => { void loadBookings(); }, []);

  async function updateStatus(id: string, status: BookingStatus) {
    const response = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status } : booking));
    else setError("Le statut n'a pas pu être mis à jour.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-sm text-emerald-400">Espace sécurisé</p><h1 className="text-3xl font-bold text-white">Réservations</h1><p className="mt-1 text-sm text-slate-400">{email}</p></div>
          <div className="flex gap-3"><button onClick={() => void loadBookings()} className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-400"><RefreshCw className="size-4" /> Actualiser</button><button onClick={() => void logout()} className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-red-400"><LogOut className="size-4" /> Déconnexion</button></div>
        </header>
        {error && <p role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-4">Client</th><th className="px-4 py-4">Véhicule</th><th className="px-4 py-4">Commune / Adresse</th><th className="px-4 py-4">Date souhaitée</th><th className="px-4 py-4">Notes</th><th className="px-4 py-4">Statut</th></tr></thead>
            <tbody className="divide-y divide-slate-800">{loading ? <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">Chargement...</td></tr> : bookings.length === 0 ? <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">Aucune réservation.</td></tr> : bookings.map((booking) => <tr key={booking.id} className="align-top hover:bg-slate-800/40"><td className="px-4 py-4"><p className="font-semibold text-white">{booking.full_name}</p><div className="mt-2 flex gap-3"><a href={`tel:${booking.phone}`} aria-label={`Appeler ${booking.full_name}`} className="text-emerald-400 hover:text-emerald-300"><Phone className="size-4" /></a><a href={`https://wa.me/${booking.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${booking.full_name}`} className="text-emerald-400 hover:text-emerald-300"><MessageCircle className="size-4" /></a><span className="text-slate-500">{booking.phone}</span></div></td><td className="px-4 py-4 text-slate-300">{booking.car_model}</td><td className="max-w-xs px-4 py-4 text-slate-300">{booking.adresse}</td><td className="px-4 py-4 text-slate-300">{new Date(`${booking.preferred_date}T00:00:00`).toLocaleDateString("fr-FR")}</td><td className="max-w-xs whitespace-pre-wrap px-4 py-4 text-slate-400">{booking.notes || "-"}</td><td className="px-4 py-4"><select value={booking.status} onChange={(event) => void updateStatus(booking.id, event.target.value as BookingStatus)} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400">{(Object.keys(statusLabels) as BookingStatus[]).map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
