import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Données de réservation invalides.", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nom, telephone, modele, date, adresse, notes } = result.data;
    const { data, error } = await supabaseServer
      .from("bookings")
      .insert({
        full_name: nom,
        phone: telephone,
        car_model: modele,
        adresse,
        preferred_date: date,
        notes: notes || null,
        status: "en_attente",
      })
      .select("id, created_at, status")
      .single();

    if (error) {
      console.error("Erreur lors de la création de la réservation:", error);
      return NextResponse.json(
        { error: "La réservation n'a pas pu être enregistrée." },
        { status: 500 }
      );
    }

    return NextResponse.json({ booking: data }, { status: 201 });
  } catch (error) {
    console.error("Erreur API bookings:", error);
    return NextResponse.json(
      { error: "Requête invalide ou serveur indisponible." },
      { status: 400 }
    );
  }
}
