import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseServer } from "@/lib/supabase/server";
import { bookingStatusSchema } from "@/lib/validations/admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { data, error } = await supabaseServer
    .from("bookings")
    .select("id, created_at, full_name, phone, car_model, adresse, preferred_date, notes, status")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur récupération réservations:", error.message);
    return NextResponse.json({ error: "Réservations indisponibles." }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  try {
    const body = (await request.json()) as { id?: unknown; status?: unknown };
    const status = bookingStatusSchema.safeParse(body.status);
    if (typeof body.id !== "string" || !status.success) {
      return NextResponse.json({ error: "Identifiant ou statut invalide." }, { status: 400 });
    }

    const { error } = await supabaseServer
      .from("bookings")
      .update({ status: status.data })
      .eq("id", body.id);

    if (error) {
      console.error("Erreur mise à jour réservation:", error.message);
      return NextResponse.json({ error: "Statut non mis à jour." }, { status: 500 });
    }

    return NextResponse.json({ message: "Statut mis à jour." });
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
}
